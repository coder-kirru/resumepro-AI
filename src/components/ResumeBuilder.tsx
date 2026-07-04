import React, { useState } from "react";
import { 
  Sparkles, Award, FileText, ArrowLeft, Plus, Trash2, Eye, Layout, Settings, FileDown, 
  HelpCircle, ChevronUp, ChevronDown, Check, Wand2, RefreshCw, Languages, Briefcase, 
  BookOpen, Code, FolderGit, Users, Heart, ShieldCheck, Mail, ArrowUp, ArrowDown, UserCheck 
} from "lucide-react";
import { ResumeData, Education, Experience, Project, Certification, Language, Reference, DesignSettings } from "../types";
import ResumeTemplates from "./ResumeTemplates";

interface ResumeBuilderProps {
  initialData: ResumeData;
  isPremium: boolean;
  onBack: () => void;
  onSave: (data: ResumeData) => void;
}

export default function ResumeBuilder({
  initialData,
  isPremium,
  onBack,
  onSave,
}: ResumeBuilderProps) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [activeTab, setActiveTab] = useState<"edit" | "design" | "ai" | "ats">("edit");
  const [activeStep, setActiveStep] = useState<string>("personal");
  
  // Mobile preview toggle tab
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // AI & ATS Loading States
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiCoverLetter, setAiCoverLetter] = useState("");
  const [aiNotice, setAiNotice] = useState("");
  const [grammarNotice, setGrammarNotice] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [targetJobTitle, setTargetJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  
  // ATS Result State
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsReport, setAtsReport] = useState<string>("");
  const [atsMatching, setAtsMatching] = useState<string[]>([]);
  const [atsMissing, setAtsMissing] = useState<string[]>([]);
  const [atsTips, setAtsTips] = useState<string[]>([]);

  // Local input states for adding skills/hobbies
  const [skillInput, setSkillInput] = useState("");
  const [hobbyInput, setHobbyInput] = useState("");

  const updateData = (updated: Partial<ResumeData>) => {
    const next = { ...data, ...updated, updatedAt: new Date().toISOString().split("T")[0] };
    setData(next);
    onSave(next);
  };

  const updatePersonalInfo = (field: string, val: string) => {
    updateData({
      personalInfo: {
        ...data.personalInfo,
        [field]: val
      }
    });
  };

  // Profile Image Base64 convert
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updatePersonalInfo("profileImage", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Section Ordering Re-arrangement Handlers
  const moveSection = (index: number, direction: "up" | "down") => {
    const nextOrder = [...data.sectionOrder];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= nextOrder.length) return;

    const temp = nextOrder[index];
    nextOrder[index] = nextOrder[targetIdx];
    nextOrder[targetIdx] = temp;
    updateData({ sectionOrder: nextOrder });
  };

  // Educational record list handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: "edu_" + Math.random().toString(36).substr(2, 9),
      school: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    updateData({ education: [...data.education, newEdu] });
  };

  const updateEducationItem = (id: string, field: keyof Education, val: string) => {
    updateData({
      education: data.education.map(e => e.id === id ? { ...e, [field]: val } : e)
    });
  };

  const removeEducationItem = (id: string) => {
    updateData({ education: data.education.filter(e => e.id !== id) });
  };

  // Experience record handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: "exp_" + Math.random().toString(36).substr(2, 9),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    updateData({ experience: [...data.experience, newExp] });
  };

  const updateExperienceItem = (id: string, field: keyof Experience, val: any) => {
    updateData({
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: val } : e)
    });
  };

  const removeExperienceItem = (id: string) => {
    updateData({ experience: data.experience.filter(e => e.id !== id) });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: Project = {
      id: "proj_" + Math.random().toString(36).substr(2, 9),
      title: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      url: ""
    };
    updateData({ projects: [...data.projects, newProj] });
  };

  const updateProjectItem = (id: string, field: keyof Project, val: string) => {
    updateData({
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: val } : p)
    });
  };

  const removeProjectItem = (id: string) => {
    updateData({ projects: data.projects.filter(p => p.id !== id) });
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert: Certification = {
      id: "cert_" + Math.random().toString(36).substr(2, 9),
      name: "",
      issuer: "",
      date: "",
      url: ""
    };
    updateData({ certifications: [...data.certifications, newCert] });
  };

  const updateCertificationItem = (id: string, field: keyof Certification, val: string) => {
    updateData({
      certifications: data.certifications.map(c => c.id === id ? { ...c, [field]: val } : c)
    });
  };

  const removeCertificationItem = (id: string) => {
    updateData({ certifications: data.certifications.filter(c => c.id !== id) });
  };

  // Languages handlers
  const addLanguage = () => {
    const newLang: Language = {
      id: "lang_" + Math.random().toString(36).substr(2, 9),
      name: "",
      level: "Professional"
    };
    updateData({ languages: [...data.languages, newLang] });
  };

  const updateLanguageItem = (id: string, field: keyof Language, val: string) => {
    updateData({
      languages: data.languages.map(l => l.id === id ? { ...l, [field]: val } : l)
    });
  };

  const removeLanguageItem = (id: string) => {
    updateData({ languages: data.languages.filter(l => l.id !== id) });
  };

  // References handlers
  const addReference = () => {
    const newRef: Reference = {
      id: "ref_" + Math.random().toString(36).substr(2, 9),
      name: "",
      role: "",
      company: "",
      contact: ""
    };
    updateData({ references: [...data.references, newRef] });
  };

  const updateReferenceItem = (id: string, field: keyof Reference, val: string) => {
    updateData({
      references: data.references.map(r => r.id === id ? { ...r, [field]: val } : r)
    });
  };

  const removeReferenceItem = (id: string) => {
    updateData({ references: data.references.filter(r => r.id !== id) });
  };

  // Add Skill Tag
  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!skillInput.trim()) return;
    if (data.skills.includes(skillInput.trim())) {
      setSkillInput("");
      return;
    }
    updateData({ skills: [...data.skills, skillInput.trim()] });
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateData({ skills: data.skills.filter(s => s !== skillToRemove) });
  };

  // Add Hobby Tag
  const handleAddHobby = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!hobbyInput.trim()) return;
    if (data.hobbies.includes(hobbyInput.trim())) {
      setHobbyInput("");
      return;
    }
    updateData({ hobbies: [...data.hobbies, hobbyInput.trim()] });
    setHobbyInput("");
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    updateData({ hobbies: data.hobbies.filter(h => h !== hobbyToRemove) });
  };

  // --- AI BACKEND SERVICES CALLS ---

  // 1. AI Summary Generate
  const triggerAiSummary = async () => {
    setIsAiLoading(true);
    setAiNotice("");
    try {
      const response = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: data.personalInfo.jobTitle || "Professional Developer",
          skills: data.skills,
          experienceSummary: data.experience.map(e => `${e.position} at ${e.company}`).join(", ")
        })
      });
      const resData = await response.json();
      if (resData.success) {
        updateData({ summary: resData.summary });
        if (resData.notice) {
          setAiNotice(resData.notice);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // 2. AI Skill Suggestions trigger
  const triggerSkillSuggestions = async () => {
    setIsAiLoading(true);
    setAiNotice("");
    try {
      const response = await fetch("/api/ai/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: data.personalInfo.jobTitle || "Software Engineer",
          currentSkills: data.skills
        })
      });
      const resData = await response.json();
      if (resData.success && resData.suggestions) {
        setSuggestedSkills(resData.suggestions);
        if (resData.notice) {
          setAiNotice(resData.notice);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // 3. AI Cover Letter Generator trigger
  const triggerCoverLetter = async () => {
    setIsAiLoading(true);
    setAiNotice("");
    try {
      const response = await fetch("/api/ai/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalInfo: data.personalInfo,
          jobTitle: targetJobTitle || data.personalInfo.jobTitle || "Target Role",
          company: "Prospective Hiring Company",
          jobDescription: jobDescription,
          resumeData: data
        })
      });
      const resData = await response.json();
      if (resData.success) {
        setAiCoverLetter(resData.coverLetter);
        if (resData.notice) {
          setAiNotice(resData.notice);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // 4. Grammar checker & bullet optimizer for professional summary
  const triggerGrammarCheck = async () => {
    if (!data.summary) return;
    setIsAiLoading(true);
    setGrammarNotice("");
    try {
      const response = await fetch("/api/ai/check-grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: data.summary })
      });
      const resData = await response.json();
      if (resData.success && resData.corrected) {
        updateData({ summary: resData.corrected });
        setGrammarNotice(`Polished successfully! ${resData.explanation || ""}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // 5. ATS Scanner & Rating trigger
  const triggerAtsScan = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/ats-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData: data,
          targetJob: targetJobTitle || data.personalInfo.jobTitle || "Developer",
          jobDescription: jobDescription
        })
      });
      const resData = await response.json();
      if (resData.success) {
        setAtsScore(resData.score);
        setAtsReport(resData.compatibilityReport);
        setAtsMatching(resData.matchingKeywords || []);
        setAtsMissing(resData.missingKeywords || []);
        setAtsTips(resData.improvementTips || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Standard browser high-fidelity Print Trigger
  const handlePrint = () => {
    window.print();
  };

  // Templates options config
  const templateOptions = [
    { id: "modern", name: "Modern Accent", desc: "Sleek look with profile image support", isPremium: true },
    { id: "professional", name: "Professional Centered", desc: "Bold centered title layout", isPremium: false },
    { id: "executive", name: "Executive Elegant", desc: "Classic double-ruled serif structure", isPremium: true },
    { id: "minimal", name: "Minimalist Grid", desc: "Clean sans-serif design for maximum content density", isPremium: false },
    { id: "creative", name: "Creative Sidebar", desc: "Splits contacts and highlights in sidebar column", isPremium: true },
    { id: "ats-classic", name: "ATS Classic Strict", desc: "Optimized primarily for robot parser scanners", isPremium: false },
    { id: "elegant", name: "Elegant Gold", desc: "Premium aesthetic with gold side-ribbon", isPremium: true },
    { id: "corporate", name: "Corporate Blue", desc: "Formal deep blue structured layout", isPremium: false },
  ];

  const fontOptions = [
    { value: "sans", label: "Inter (Corporate)" },
    { value: "poppins", label: "Poppins (Modern)" },
    { value: "montserrat", label: "Montserrat (Design)" },
    { value: "playfair", label: "Playfair (Executive Serif)" },
    { value: "serif", label: "Georgia (Traditional)" },
    { value: "mono", label: "JetBrains Mono (Technical)" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Upper Quick Control Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-4 sm:px-6 lg:px-8 sticky top-16 z-40 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
            id="builder-back-btn"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <input
              type="text"
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              className="text-lg font-bold bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500 px-1 rounded font-poppins"
            />
            <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-mono">Auto-saved to workspace</span>
          </div>
        </div>

        {/* Action button triggers */}
        <div className="flex items-center space-x-3">
          {/* Mobile Preview Toggle Tab */}
          <button
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex md:hidden items-center space-x-1"
          >
            <Eye className="h-4 w-4 text-purple-600" />
            <span>{showMobilePreview ? "Show Editor" : "Show Preview"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 transition-all duration-200 flex items-center space-x-1.5 cursor-pointer hover:-translate-y-0.5"
            id="print-download-btn"
          >
            <FileDown className="h-4 w-4" />
            <span>Download & Print PDF</span>
          </button>
        </div>
      </div>

      {/* Main Double-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Dynamic Editor Panel (Wizard + Sections) */}
        <div className={`lg:col-span-6 space-y-6 ${showMobilePreview ? "hidden md:block" : "block"}`}>
          
          {/* Internal Tool Tab Row (Edit, Design, AI Assistant, ATS compatibility) */}
          <div className="flex bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm gap-1">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${activeTab === "edit" ? "bg-purple-600 text-white shadow-md shadow-purple-500/25" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <FileText className="h-4 w-4" />
              <span>Resume Form</span>
            </button>
            <button
              onClick={() => setActiveTab("design")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${activeTab === "design" ? "bg-purple-600 text-white shadow-md shadow-purple-500/25" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <Layout className="h-4 w-4" />
              <span>Design / Spacing</span>
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${activeTab === "ai" ? "bg-purple-600 text-white shadow-md shadow-purple-500/25" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>AI Writing</span>
            </button>
            <button
              onClick={() => setActiveTab("ats")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${activeTab === "ats" ? "bg-purple-600 text-white shadow-md shadow-purple-500/25" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>ATS Scan</span>
            </button>
          </div>

          {/* TAB CONTENT: 1. EDIT RESUME FORM */}
          {activeTab === "edit" && (
            <div className="space-y-6">
              
              {/* Vertical wizard step selector */}
              <div className="flex overflow-x-auto pb-2 gap-1.5 border-b border-gray-100 dark:border-gray-800/80 scrollbar-none">
                {[
                  { id: "personal", label: "Contact", icon: <Users className="h-3.5 w-3.5" /> },
                  { id: "experience", label: "Experience", icon: <Briefcase className="h-3.5 w-3.5" /> },
                  { id: "education", label: "Education", icon: <BookOpen className="h-3.5 w-3.5" /> },
                  { id: "skills", label: "Skills", icon: <Code className="h-3.5 w-3.5" /> },
                  { id: "projects", label: "Projects", icon: <FolderGit className="h-3.5 w-3.5" /> },
                  { id: "languages", label: "Extra", icon: <Languages className="h-3.5 w-3.5" /> },
                ].map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1 transition-all ${activeStep === step.id ? "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900"}`}
                  >
                    {step.icon}
                    <span>{step.label}</span>
                  </button>
                ))}
              </div>

              {/* STEP: PERSONAL INFORMATION */}
              {activeStep === "personal" && (
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-5">
                  <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Contact & Personal Details</h3>
                  
                  {/* Photo upload bar */}
                  <div className="flex items-center space-x-4 bg-slate-50 dark:bg-gray-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="h-14 w-14 rounded-xl bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center relative border border-gray-200 dark:border-gray-700">
                      {data.personalInfo.profileImage ? (
                        <img src={data.personalInfo.profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-xs font-bold uppercase">Pic</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Avatar Profile Picture</label>
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100 dark:file:bg-purple-950/40 dark:file:text-purple-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Core input grid fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Full Name</label>
                      <input
                        type="text"
                        value={data.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                        placeholder="Sarah Connor"
                        className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Target Job Title</label>
                      <input
                        type="text"
                        value={data.personalInfo.jobTitle}
                        onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                        placeholder="Senior AI Engineer"
                        className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Email Address</label>
                      <input
                        type="email"
                        value={data.personalInfo.email}
                        onChange={(e) => updatePersonalInfo("email", e.target.value)}
                        placeholder="sarah@cyberdyne.io"
                        className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Phone Number</label>
                      <input
                        type="text"
                        value={data.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Address / Location</label>
                      <input
                        type="text"
                        value={data.personalInfo.address}
                        onChange={(e) => updatePersonalInfo("address", e.target.value)}
                        placeholder="Los Angeles, California"
                        className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                      />
                    </div>

                    {/* Social networks inputs */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">LinkedIn Username</label>
                      <input
                        type="text"
                        value={data.personalInfo.linkedin || ""}
                        onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/sarah"
                        className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">GitHub Profile</label>
                      <input
                        type="text"
                        value={data.personalInfo.github || ""}
                        onChange={(e) => updatePersonalInfo("github", e.target.value)}
                        placeholder="github.com/sarah-c"
                        className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Summary segment directly combined */}
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Professional Bio / Summary</label>
                      <button
                        type="button"
                        onClick={triggerAiSummary}
                        disabled={isAiLoading}
                        className="text-xs text-purple-600 hover:text-purple-500 font-bold flex items-center space-x-1 hover:underline cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="h-3.5 w-3.5 animate-spin" />
                        <span>{isAiLoading ? "Writing..." : "AI Generate Bio"}</span>
                      </button>
                    </div>
                    <textarea
                      value={data.summary}
                      onChange={(e) => updateData({ summary: e.target.value })}
                      rows={5}
                      placeholder="Write your professional bio overview, or tap AI Generate above to draft a premium compliant summary instantly..."
                      className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl px-3.5 py-3 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 leading-relaxed font-sans"
                    ></textarea>
                    
                    {aiNotice && <p className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-900/50">{aiNotice}</p>}

                    {data.summary && (
                      <div className="flex justify-between items-center text-[10px] pt-1">
                        <button
                          type="button"
                          onClick={triggerGrammarCheck}
                          disabled={isAiLoading}
                          className="text-purple-600 hover:underline font-semibold flex items-center space-x-0.5"
                        >
                          <Wand2 className="h-3 w-3" />
                          <span>AI Polish Summary</span>
                        </button>
                        <span className="text-gray-400 font-mono">{data.summary.length} characters</span>
                      </div>
                    )}
                    
                    {grammarNotice && <p className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 p-2 rounded-xl">{grammarNotice}</p>}
                  </div>

                </div>
              )}

              {/* STEP: EXPERIENCE */}
              {activeStep === "experience" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Work Experience History</h3>
                    <button
                      onClick={addExperience}
                      className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Work</span>
                    </button>
                  </div>

                  {data.experience.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl bg-white/40">
                      <p className="text-xs text-gray-500">No work experience listed yet. Add items to showcase career timeline.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {data.experience.map((exp, idx) => (
                        <div key={exp.id} className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 shadow-sm relative space-y-4">
                          <button
                            onClick={() => removeExperienceItem(exp.id)}
                            className="absolute right-4 top-4 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Remove role"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono">Experience Position #{idx + 1}</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">Company Name</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperienceItem(exp.id, "company", e.target.value)}
                                placeholder="Cyberdyne Systems"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">Job Title / Role</label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateExperienceItem(exp.id, "position", e.target.value)}
                                placeholder="Senior Architect"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">Start Date</label>
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => updateExperienceItem(exp.id, "startDate", e.target.value)}
                                placeholder="May 2024"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">End Date</label>
                              <input
                                type="text"
                                value={exp.endDate}
                                disabled={exp.current}
                                onChange={(e) => updateExperienceItem(exp.id, "endDate", e.target.value)}
                                placeholder="Present"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                              />
                            </div>

                            <div className="space-y-1 sm:col-span-2 flex items-center space-x-2 pt-1">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperienceItem(exp.id, "current", e.target.checked)}
                                className="rounded text-purple-600 focus:ring-purple-500"
                                id={`current-role-${exp.id}`}
                              />
                              <label htmlFor={`current-role-${exp.id}`} className="text-xs text-slate-600 dark:text-gray-300 font-medium cursor-pointer">I currently work here</label>
                            </div>

                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-[11px] font-semibold text-gray-500">Description of Achievements (ATS bullet points)</label>
                              <textarea
                                value={exp.description}
                                onChange={(e) => updateExperienceItem(exp.id, "description", e.target.value)}
                                rows={4}
                                placeholder="• Orchestrated development of AI defense protocols, increasing system latency efficiency by 42%.
• Managed cross-functional group of 12 engineers using agile scrum sprints..."
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500 leading-relaxed font-mono"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP: EDUCATION */}
              {activeStep === "education" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Academic Qualifications</h3>
                    <button
                      onClick={addEducation}
                      className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Education</span>
                    </button>
                  </div>

                  {data.education.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl bg-white/40">
                      <p className="text-xs text-gray-500">No schools listed. Add qualifications to display academic background.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {data.education.map((edu, idx) => (
                        <div key={edu.id} className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 shadow-sm relative space-y-4">
                          <button
                            onClick={() => removeEducationItem(edu.id)}
                            className="absolute right-4 top-4 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Remove school"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono">Academic Record #{idx + 1}</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">School / University</label>
                              <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => updateEducationItem(edu.id, "school", e.target.value)}
                                placeholder="University of California, Berkeley"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">Degree (e.g. B.S., M.S.)</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducationItem(edu.id, "degree", e.target.value)}
                                placeholder="Bachelor of Science"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">Major / Field of Study</label>
                              <input
                                type="text"
                                value={edu.major}
                                onChange={(e) => updateEducationItem(edu.id, "major", e.target.value)}
                                placeholder="Computer Science & Cybernetics"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500">Start Year</label>
                                <input
                                  type="text"
                                  value={edu.startDate}
                                  onChange={(e) => updateEducationItem(edu.id, "startDate", e.target.value)}
                                  placeholder="2020"
                                  className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500">End Year</label>
                                <input
                                  type="text"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducationItem(edu.id, "endDate", e.target.value)}
                                  placeholder="2024"
                                  className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-[11px] font-semibold text-gray-500">Extra Details / GPA / Honors</label>
                              <input
                                type="text"
                                value={edu.description}
                                onChange={(e) => updateEducationItem(edu.id, "description", e.target.value)}
                                placeholder="Graduated with Magna Cum Laude honors. GPA 3.92/4.0."
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP: SKILLS TAG LIST */}
              {activeStep === "skills" && (
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Core Skills & Competencies</h3>
                    <button
                      onClick={triggerSkillSuggestions}
                      disabled={isAiLoading}
                      className="text-xs text-purple-600 hover:text-purple-500 font-bold flex items-center space-x-1"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{isAiLoading ? "Analyzing..." : "Suggest AI Skills"}</span>
                    </button>
                  </div>

                  {/* Add Tag row */}
                  <form onSubmit={handleAddSkill} className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add tech skill (e.g., TypeScript)"
                      className="flex-1 bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
                    >
                      Add Tag
                    </button>
                  </form>

                  {/* Skill suggestions block */}
                  {suggestedSkills.length > 0 && (
                    <div className="space-y-2 bg-purple-50/50 dark:bg-purple-950/25 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Recommended for your job title:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestedSkills.map((sk) => (
                          <button
                            key={sk}
                            type="button"
                            onClick={() => {
                              if (!data.skills.includes(sk)) {
                                updateData({ skills: [...data.skills, sk] });
                              }
                              setSuggestedSkills(suggestedSkills.filter(s => s !== sk));
                            }}
                            className="text-[10px] bg-white dark:bg-gray-950 hover:bg-purple-100 dark:hover:bg-purple-900 border border-gray-200 dark:border-gray-800 rounded-lg px-2.5 py-1 text-slate-700 dark:text-purple-300 font-semibold flex items-center space-x-1 transition-all"
                          >
                            <span>+ {sk}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active list */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Active competencies list ({data.skills.length})</span>
                    {data.skills.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No tags listed. Add high-value keyword terms above.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {data.skills.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-full text-xs text-slate-700 dark:text-gray-200 font-semibold"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(tag)}
                              className="text-gray-400 hover:text-red-500 rounded-full hover:bg-slate-200 dark:hover:bg-gray-700 p-0.5 text-[9px] font-bold"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP: PROJECTS */}
              {activeStep === "projects" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Notable Projects</h3>
                    <button
                      onClick={addProject}
                      className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {data.projects.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl bg-white/40">
                      <p className="text-xs text-gray-500">No project highlights. Add works to demonstrate application skills.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {data.projects.map((proj, idx) => (
                        <div key={proj.id} className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 shadow-sm relative space-y-4">
                          <button
                            onClick={() => removeProjectItem(proj.id)}
                            className="absolute right-4 top-4 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Remove project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono">Project Highlight #{idx + 1}</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">Project Title</label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => updateProjectItem(proj.id, "title", e.target.value)}
                                placeholder="Terminator Neural Core"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">My Specific Role</label>
                              <input
                                type="text"
                                value={proj.role}
                                onChange={(e) => updateProjectItem(proj.id, "role", e.target.value)}
                                placeholder="Lead Systems Architect"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-gray-500">Project URL / Link</label>
                              <input
                                type="text"
                                value={proj.url}
                                onChange={(e) => updateProjectItem(proj.id, "url", e.target.value)}
                                placeholder="https://github.com/cyberdyne/core"
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500">Start Date</label>
                                <input
                                  type="text"
                                  value={proj.startDate}
                                  onChange={(e) => updateProjectItem(proj.id, "startDate", e.target.value)}
                                  placeholder="Jan 2024"
                                  className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-semibold text-gray-500">End Date</label>
                                <input
                                  type="text"
                                  value={proj.endDate}
                                  onChange={(e) => updateProjectItem(proj.id, "endDate", e.target.value)}
                                  placeholder="Mar 2024"
                                  className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-[11px] font-semibold text-gray-500">Brief Description of Deliverables</label>
                              <textarea
                                value={proj.description}
                                onChange={(e) => updateProjectItem(proj.id, "description", e.target.value)}
                                rows={3}
                                placeholder="Developed system memory structures supporting real-time speech synthesis."
                                className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none leading-relaxed"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP: LANGUAGES & EXTRA */}
              {activeStep === "languages" && (
                <div className="space-y-6">
                  {/* Languages Block */}
                  <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white">Multilingual Fluency</h3>
                      <button
                        onClick={addLanguage}
                        className="text-xs text-purple-600 hover:text-purple-500 font-bold flex items-center space-x-0.5"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Language</span>
                      </button>
                    </div>

                    {data.languages.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No extra languages listed.</p>
                    ) : (
                      <div className="space-y-3">
                        {data.languages.map((lang) => (
                          <div key={lang.id} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={lang.name}
                              onChange={(e) => updateLanguageItem(lang.id, "name", e.target.value)}
                              placeholder="Spanish"
                              className="flex-1 bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-1.5 text-xs"
                            />
                            <select
                              value={lang.level}
                              onChange={(e) => updateLanguageItem(lang.id, "level", e.target.value)}
                              className="bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300"
                            >
                              <option value="Native">Native Speaker</option>
                              <option value="Fluent">Fully Fluent</option>
                              <option value="Professional">Professional Level</option>
                              <option value="Conversational">Conversational</option>
                            </select>
                            <button
                              onClick={() => removeLanguageItem(lang.id)}
                              className="text-red-400 hover:text-red-600 p-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Certifications Block */}
                  <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white">Professional Certifications</h3>
                      <button
                        onClick={addCertification}
                        className="text-xs text-purple-600 hover:text-purple-500 font-bold flex items-center space-x-0.5"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Certification</span>
                      </button>
                    </div>

                    {data.certifications.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No certifications listed yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {data.certifications.map((cert) => (
                          <div key={cert.id} className="p-4 bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl relative space-y-3">
                            <button
                              onClick={() => removeCertificationItem(cert.id)}
                              className="absolute right-3 top-3 text-red-400 hover:text-red-600 text-xs"
                            >
                              ✕
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCertificationItem(cert.id, "name", e.target.value)}
                                placeholder="AWS Solutions Architect"
                                className="col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-1 text-xs"
                              />
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCertificationItem(cert.id, "issuer", e.target.value)}
                                placeholder="Amazon Web Services"
                                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-1 text-xs"
                              />
                              <input
                                type="text"
                                value={cert.date}
                                onChange={(e) => updateCertificationItem(cert.id, "date", e.target.value)}
                                placeholder="Issued Oct 2025"
                                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-1 text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT: 2. DESIGN & SPACING */}
          {activeTab === "design" && (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white flex items-center gap-1">
                  <Layout className="h-4.5 w-4.5 text-purple-600" />
                  <span>Select Template Style ({templateOptions.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {templateOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        updateData({
                          designSettings: {
                            ...data.designSettings,
                            templateId: opt.id as any
                          }
                        });
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between h-24 transition-all ${data.designSettings.templateId === opt.id ? "border-purple-600 bg-purple-50/40 dark:bg-purple-950/20 shadow-sm" : "border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-900 bg-white dark:bg-gray-950"}`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-100 block">{opt.name}</span>
                        <span className="text-[10px] text-gray-400 leading-snug block">{opt.desc}</span>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[9px] font-bold text-purple-500 uppercase font-mono">{opt.isPremium ? "★ PRO DESIGN" : "STANDARD"}</span>
                        {data.designSettings.templateId === opt.id && <Check className="h-4 w-4 text-purple-600" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Sort ordering editor */}
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-5">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Drag & Drop Section Sort Order</h4>
                <div className="space-y-2">
                  {data.sectionOrder.map((sec, index) => (
                    <div key={sec} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-gray-950 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-semibold">
                      <span className="capitalize text-slate-700 dark:text-gray-300">{sec.replace("_", " ")} Section</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-gray-800 disabled:opacity-40 text-slate-500"
                          title="Move Up"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveSection(index, "down")}
                          disabled={index === data.sectionOrder.length - 1}
                          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-gray-800 disabled:opacity-40 text-slate-500"
                          title="Move Down"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typo configurations */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Typography Font Family</label>
                  <select
                    value={data.designSettings.font}
                    onChange={(e) => updateData({
                      designSettings: {
                        ...data.designSettings,
                        font: e.target.value as any
                      }
                    })}
                    className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-gray-300"
                  >
                    {fontOptions.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500">Layout Spacing Density</label>
                  <select
                    value={data.designSettings.spacing}
                    onChange={(e) => updateData({
                      designSettings: {
                        ...data.designSettings,
                        spacing: e.target.value as any
                      }
                    })}
                    className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-gray-300"
                  >
                    <option value="compact">Compact Print Packing</option>
                    <option value="normal">Standard Normal Spacing</option>
                    <option value="loose">Elegant Spacious Margins</option>
                  </select>
                </div>
              </div>

              {/* Color accents picking options */}
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-5">
                <label className="text-xs font-semibold text-gray-500 block">Theme Color Accents</label>
                <div className="flex gap-2">
                  {[
                    { primary: "#2563EB", secondary: "#7C3AED", name: "Royal Purple" },
                    { primary: "#7C3AED", secondary: "#06B6D4", name: "Cosmic Neon" },
                    { primary: "#06B6D4", secondary: "#0F766E", name: "Ocean Breeze" },
                    { primary: "#0F766E", secondary: "#B45309", name: "Corporate Emerald" },
                    { primary: "#B45309", secondary: "#B91C1C", name: "Amber Gold" },
                    { primary: "#111827", secondary: "#4B5563", name: "Stealth Graphite" },
                  ].map((colorScheme, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateData({
                        designSettings: {
                          ...data.designSettings,
                          primaryColor: colorScheme.primary,
                          secondaryColor: colorScheme.secondary
                        }
                      })}
                      className="h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 relative"
                      style={{
                        backgroundColor: colorScheme.primary,
                        borderColor: data.designSettings.primaryColor === colorScheme.primary ? "#FFF" : "transparent"
                      }}
                      title={colorScheme.name}
                    >
                      {data.designSettings.primaryColor === colorScheme.primary && (
                        <span className="h-2.5 w-2.5 bg-white rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB CONTENT: 3. AI COVER LETTER & ADVANCED TOOLS */}
          {activeTab === "ai" && (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-purple-600 animate-pulse" />
                  <span>AI Cover Letter Composer</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Instantly draft a personalized, highly persuasive cover letter tailored directly to a target job description.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Target Position Title</label>
                  <input
                    type="text"
                    value={targetJobTitle}
                    onChange={(e) => setTargetJobTitle(e.target.value)}
                    placeholder="Senior React Developer"
                    className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Target Job Description (Optional)</label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    placeholder="Paste job posting or core technical requirements to align skills..."
                    className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-purple-500 outline-none leading-relaxed"
                  ></textarea>
                </div>

                <button
                  onClick={triggerCoverLetter}
                  disabled={isAiLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4 animate-bounce" />
                  <span>{isAiLoading ? "Processing Gemini AI Draft..." : "Compose AI Cover Letter"}</span>
                </button>
              </div>

              {aiCoverLetter && (
                <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono">Generated Draft Letter</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiCoverLetter);
                        alert("Cover letter copied successfully to clipboard!");
                      }}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Copy Draft Text
                    </button>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-gray-950 border border-slate-100 dark:border-slate-900 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-serif max-h-96 overflow-y-auto">
                    {aiCoverLetter}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT: 4. ATS SCAN & SCORE RATER */}
          {activeTab === "ats" && (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              
              <div className="space-y-2 text-center py-4 bg-slate-50 dark:bg-gray-950 rounded-2xl border border-slate-100 dark:border-slate-900/60">
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block font-mono">Real-time Recruiter Parsing Simulator</span>
                <h3 className="text-xl font-black text-gray-900 dark:text-white font-poppins">ATS Compatibility Scan</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Identify spelling issues, detect missing core job-specific terms, and obtain actionable optimization tips.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase block">Target Job Title</label>
                  <input
                    type="text"
                    value={targetJobTitle || data.personalInfo.jobTitle}
                    onChange={(e) => setTargetJobTitle(e.target.value)}
                    placeholder="e.g. Senior Product Manager"
                    className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase block">Paste Target Job Ad Description</label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    placeholder="Insert requirements listed in the job description to calculate exact match ratings..."
                    className="w-full bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl px-3.5 py-2.5 text-xs outline-none leading-relaxed"
                  ></textarea>
                </div>

                <button
                  onClick={triggerAtsScan}
                  disabled={isAiLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1"
                >
                  <Check className="h-4 w-4" />
                  <span>{isAiLoading ? "Scanning Document Structure..." : "Run ATS Scan Audit"}</span>
                </button>
              </div>

              {/* ATS Scan Results */}
              {atsScore !== null && (
                <div className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Overall Rating Match</span>
                      <span className="text-2xl font-black text-gray-900 dark:text-white block font-mono">{atsScore}%</span>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                      {atsScore >= 80 ? "EXCELLENT" : atsScore >= 60 ? "MODERATE" : "IMPROVE"}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-950 p-4 rounded-xl border border-slate-100 dark:border-slate-900 leading-relaxed font-sans">
                    {atsReport}
                  </p>

                  {/* Matching & Missing keywords */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">✓ Found Keywords</span>
                      <div className="flex flex-wrap gap-1">
                        {atsMatching.map((kw, i) => (
                          <span key={i} className="text-[9px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30 font-medium">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">✕ Missing Keywords</span>
                      <div className="flex flex-wrap gap-1">
                        {atsMissing.map((kw, i) => (
                          <span key={i} className="text-[9px] bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/20 font-medium">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-800 dark:text-gray-100 block">Critical Action Items:</span>
                    <ul className="space-y-2.5">
                      {atsTips.map((tip, idx) => (
                        <li key={idx} className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex items-start space-x-2">
                          <span className="h-4.5 w-4.5 rounded bg-purple-50 dark:bg-purple-950/45 text-purple-600 dark:text-purple-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Interactive High-Fidelity A4 Resume Preview sheet */}
        <div className={`lg:col-span-6 space-y-4 ${showMobilePreview ? "block" : "hidden md:block"}`}>
          <div className="text-center font-semibold text-xs text-slate-400 uppercase tracking-widest no-print">
            ✨ Interactive Dynamic Preview (Scale 1:1)
          </div>

          <div className="rounded-2xl shadow-xl shadow-slate-900/5 bg-white dark:bg-gray-900 border border-slate-200/50 dark:border-gray-800/80 overflow-hidden relative" id="resume-preview-sheet">
            {/* Dynamic Template rendering display wrapper */}
            <ResumeTemplates data={data} />
          </div>
        </div>

      </div>

    </div>
  );
}
