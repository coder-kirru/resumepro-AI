import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json({ limit: "10mb" }));

  // Lazy initialize Gemini client to avoid crashes if API key is not present on boot
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      throw new Error("GEMINI_API_KEY is not set or is empty. Please set it in Settings > Secrets.");
    }
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // --- API Routes ---

  // Generate Professional Summary
  app.post("/api/ai/generate-summary", async (req, res) => {
    try {
      const { jobTitle, skills, experienceSummary } = req.body;
      
      try {
        const ai = getGeminiClient();
        const prompt = `Write a professional, high-impact resume summary (3-4 sentences, approx 60-80 words) for a professional with the job title "${jobTitle}".
        Key skills: ${skills ? skills.join(", ") : "Not specified"}.
        Experience overview: ${experienceSummary || "Not specified"}.
        Make it sound extremely sophisticated, result-oriented, and ATS-friendly. Focus on value delivered. Do not use generic buzzwords. Return ONLY the summary text, no conversational preamble.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });

        const summary = response.text?.trim() || "";
        return res.json({ success: true, summary });
      } catch (geminiError: any) {
        console.warn("Using fallback summary generator. Reason:", geminiError.message);
        // Fallback premium summary builder
        const title = jobTitle || "Professional";
        const skillList = skills && skills.length > 0 ? skills.slice(0, 3).join(" and ") : "core competencies";
        const fallbackSummary = `Results-driven ${title} with a proven track record of leveraging ${skillList} to deliver exceptional organizational outcomes. Adept at spearheading strategic initiatives, streamlining complex workflows, and collaborating across cross-functional teams to drive efficiency and high-performance solutions. Committed to continuous improvement and deploying innovative methodologies that align with enterprise goals and elevate brand value.`;
        return res.json({ 
          success: true, 
          summary: fallbackSummary, 
          isDemo: true,
          notice: "Using pre-designed template summary (add GEMINI_API_KEY in Secrets for live AI generation)." 
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to generate summary" });
    }
  });

  // Suggest Skills
  app.post("/api/ai/suggest-skills", async (req, res) => {
    try {
      const { jobTitle, currentSkills } = req.body;

      try {
        const ai = getGeminiClient();
        const prompt = `Recommend 8 highly sought-after, industry-standard professional skills/technologies for a candidate seeking a job as a "${jobTitle}".
        Current skills listed (avoid repeating these if possible): ${currentSkills ? currentSkills.join(", ") : "None"}.
        Format the response as a JSON array of strings containing just the skill names. Use the exact structure ["Skill 1", "Skill 2", ...]. Provide only JSON output, no explanation.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        });

        const suggestedString = response.text?.trim() || "[]";
        const suggestions = JSON.parse(suggestedString);
        return res.json({ success: true, suggestions });
      } catch (geminiError: any) {
        console.warn("Using fallback skill suggestions. Reason:", geminiError.message);
        
        // Comprehensive job-to-skills dictionary
        const fallbackSkills: Record<string, string[]> = {
          developer: ["TypeScript", "React", "Node.js", "Docker", "GraphQL", "Next.js", "CI/CD", "AWS"],
          software: ["Java", "System Design", "Microservices", "Python", "Git", "Kubernetes", "PostgreSQL", "Agile"],
          designer: ["UI/UX Design", "Figma", "Design Systems", "Prototyping", "Adobe Creative Suite", "Wireframing", "User Research", "Interaction Design"],
          product: ["Product Strategy", "Roadmapping", "Agile/Scrum", "Market Analysis", "User Analytics", "A/B Testing", "Jira", "Cross-functional Leadership"],
          marketing: ["SEO Optimization", "Google Analytics", "Content Strategy", "Social Media Marketing", "Copywriting", "Email Campaigns", "Growth Hacking", "Brand Strategy"],
          finance: ["Financial Analysis", "Financial Modeling", "Excel VBA", "Risk Assessment", "Accounting Standards", "SQL", "Reporting", "Budgeting"],
          sales: ["CRM Systems", "Lead Generation", "Negotiation", "B2B Sales", "Sales Forecasting", "Account Management", "Public Speaking", "Strategic Partnerships"],
        };

        const key = Object.keys(fallbackSkills).find(k => jobTitle?.toLowerCase().includes(k)) || "developer";
        const suggestions = fallbackSkills[key].filter(s => !currentSkills?.includes(s));
        
        return res.json({ 
          success: true, 
          suggestions, 
          isDemo: true,
          notice: "Using preset skill suggestions (add GEMINI_API_KEY in Secrets for live AI generation)." 
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to suggest skills" });
    }
  });

  // Generate Cover Letter
  app.post("/api/ai/generate-cover-letter", async (req, res) => {
    try {
      const { personalInfo, jobTitle, company, jobDescription, resumeData } = req.body;

      try {
        const ai = getGeminiClient();
        const prompt = `Compose a polished, persuasive, and highly professional single-page cover letter (around 250-300 words).
        Candidate details:
        - Name: ${personalInfo?.fullName || "A Candidate"}
        - Current Job: ${personalInfo?.jobTitle || "Professional"}
        - Key skills: ${resumeData?.skills ? resumeData.skills.join(", ") : "Core competencies"}
        Target position:
        - Job Title: ${jobTitle || "the position"}
        - Company Name: ${company || "Prospective Employer"}
        - Job Description/Requirements: ${jobDescription || "Not provided"}

        Format the letter beautifully with proper business spacing, beginning with standard placeholders or a friendly professional greeting, followed by an impactful opening, a tailored middle paragraph matching the candidate's skills to the role, and a strong call-to-action closing. Do not write markdown tags or extra conversations; output only the letter content.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });

        const coverLetter = response.text?.trim() || "";
        return res.json({ success: true, coverLetter });
      } catch (geminiError: any) {
        console.warn("Using fallback cover letter generator. Reason:", geminiError.message);
        
        const candidateName = personalInfo?.fullName || "Alex Mercer";
        const position = jobTitle || "Specialist Role";
        const targetCompany = company || "Innovative Solutions Inc.";
        
        const fallbackCoverLetter = `Dear Hiring Team at ${targetCompany},

I am writing to express my enthusiastic interest in the ${position} position. With my extensive background in executing strategic projects and my core skills, I am confident in my ability to make an immediate, positive contribution to your organization.

In my recent roles, I have consistently focused on delivering measurable value, optimizing work practices, and fostering collaboration across diverse teams. Your company's commitment to innovation and high-quality solutions aligns perfectly with my professional philosophy and active drive to deliver excellence.

I would welcome the opportunity to discuss how my skill set and background match your current needs in more detail during an interview. Thank you for your time and consideration.

Sincerely,

${candidateName}`;

        return res.json({ 
          success: true, 
          coverLetter: fallbackCoverLetter, 
          isDemo: true,
          notice: "Using pre-designed template cover letter (add GEMINI_API_KEY in Secrets for live AI generation)." 
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to generate cover letter" });
    }
  });

  // Grammar Checker & Resume Polish
  app.post("/api/ai/check-grammar", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || text.trim() === "") {
        return res.json({ success: true, corrected: "" });
      }

      try {
        const ai = getGeminiClient();
        const prompt = `Review and rewrite the following resume bullet point or text to be completely free of grammatical errors, and rephrase it to use active verbs, high-impact phrasing, and strong professional corporate style:
        "${text}"
        Return ONLY a JSON object with two fields: "corrected" (the polished and improved bullet point) and "explanation" (a brief explanation of changes made). Example: {"corrected": "Spearheaded design...", "explanation": "Used active verb..."}. Do not use markdown backticks; return only pure JSON.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                corrected: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["corrected", "explanation"]
            }
          }
        });

        const resultJson = JSON.parse(response.text?.trim() || "{}");
        return res.json({ success: true, ...resultJson });
      } catch (geminiError: any) {
        console.warn("Using fallback grammar checker. Reason:", geminiError.message);
        
        let corrected = text;
        let explanation = "Adjusted phrasing to sound more professional and active.";
        
        if (text.toLowerCase().includes("responsible for")) {
          corrected = text.replace(/responsible for/gi, "Led the orchestration of").replace(/managing/gi, "and management of");
          explanation = "Replaced passive phrasing 'responsible for' with a powerful action-oriented verb: 'Led the orchestration of'.";
        } else if (text.toLowerCase().startsWith("i did") || text.toLowerCase().startsWith("i worked on")) {
          corrected = text.replace(/i did|i worked on/gi, "Spearheaded and executed the development of");
          explanation = "Converted personal pronouns to a strong professional active verb ('Spearheaded').";
        } else {
          corrected = "Spearheaded the development and execution of critical " + text.charAt(0).toLowerCase() + text.slice(1);
          explanation = "Enriched vocabulary with highly-rated action verbs to emphasize impact.";
        }

        return res.json({ 
          success: true, 
          corrected, 
          explanation,
          isDemo: true,
          notice: "Using local phrase optimizer (add GEMINI_API_KEY in Secrets for live AI generation)." 
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to check grammar" });
    }
  });

  // ATS Checker & Compatibility Score
  app.post("/api/ai/ats-check", async (req, res) => {
    try {
      const { resumeData, targetJob, jobDescription } = req.body;

      try {
        const ai = getGeminiClient();
        const prompt = `Perform a comprehensive ATS (Applicant Tracking System) scan and job compatibility check.
        Target Job Title: ${targetJob || "Professional Role"}
        Job Description: ${jobDescription || "Not provided"}
        Resume Data:
        - Job Title: ${resumeData?.personalInfo?.jobTitle || "Professional"}
        - Summary: ${resumeData?.summary || ""}
        - Skills: ${resumeData?.skills ? resumeData.skills.join(", ") : "None listed"}
        - Experience Titles: ${resumeData?.experience ? resumeData.experience.map((e: any) => e.position + " at " + e.company).join(", ") : "None listed"}

        Analyze the correlation, keywords matching, layout clarity, and compliance.
        Return a JSON object matching this schema:
        {
          "score": number (0 to 100),
          "matchingKeywords": string[],
          "missingKeywords": string[],
          "improvementTips": string[],
          "compatibilityReport": string (detailed description of compatibility)
        }
        Provide only the JSON output without markdown tags or wrappers.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.INTEGER },
                matchingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                improvementTips: { type: Type.ARRAY, items: { type: Type.STRING } },
                compatibilityReport: { type: Type.STRING }
              },
              required: ["score", "matchingKeywords", "missingKeywords", "improvementTips", "compatibilityReport"]
            }
          }
        });

        const atsResult = JSON.parse(response.text?.trim() || "{}");
        return res.json({ success: true, ...atsResult });
      } catch (geminiError: any) {
        console.warn("Using fallback ATS optimizer. Reason:", geminiError.message);
        
        // Let's create a robust offline ATS check algorithm!
        const skillsList = resumeData?.skills || [];
        const jobDescLower = (jobDescription || "").toLowerCase();
        const targetTitleLower = (targetJob || "").toLowerCase();
        
        const possibleKeywords = [
          "typescript", "react", "node.js", "javascript", "agile", "scrum", "cloud", "aws", 
          "ci/cd", "rest api", "testing", "database", "analytics", "seo", "leadership", 
          "project management", "ux", "ui", "figma", "git", "collaboration", "communication"
        ];

        const matched: string[] = [];
        const missing: string[] = [];
        
        possibleKeywords.forEach(kw => {
          const inResume = skillsList.some((s: string) => s.toLowerCase().includes(kw));
          const inJob = jobDescLower.includes(kw) || targetTitleLower.includes(kw);
          
          if (inJob) {
            if (inResume) {
              matched.push(kw.charAt(0).toUpperCase() + kw.slice(1));
            } else {
              missing.push(kw.charAt(0).toUpperCase() + kw.slice(1));
            }
          }
        });

        // Set baseline keywords if job description is too brief
        if (matched.length === 0 && missing.length === 0) {
          matched.push("Communication", "Teamwork");
          missing.push("Key Performance Indicators (KPIs)", "Process Optimization", "Strategy Alignment");
        }

        // Calculate a simulated score
        const baseScore = 65;
        const skillFactor = Math.min(20, skillsList.length * 2);
        const matchFactor = matched.length * 5;
        const finalScore = Math.min(98, Math.max(45, baseScore + skillFactor + matchFactor - (missing.length * 3)));

        const tips = [
          "Quantify achievements under your professional experience with metrics and percentages (e.g., 'increased efficiency by 25%').",
          "Incorporate missing industry-specific keywords like " + (missing[0] || "relevant technical core competencies") + " directly into your Experience and Skills section.",
          "Ensure your professional summary highlights your unique value proposition in the first sentence.",
          "Keep formatting clean and avoid nested tables or non-standard fonts to guarantee ATS parsing accuracy."
        ];

        return res.json({
          success: true,
          score: Math.round(finalScore),
          matchingKeywords: matched,
          missingKeywords: missing.slice(0, 5),
          improvementTips: tips,
          compatibilityReport: `Your resume shows moderate compatibility with the ${targetJob || "target"} role. By introducing several key performance-based metrics and aligning technical terminologies directly with the job posting requirements, your ATS score can be substantially increased.`,
          isDemo: true,
          notice: "Using local ATS compatibility model (add GEMINI_API_KEY in Secrets for live AI generation)."
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to scan resume" });
    }
  });


  // --- Express + Vite Server Configuration ---

  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve built static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ResumePro AI Server] running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
