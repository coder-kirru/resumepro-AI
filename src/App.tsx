import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import FeaturesSection from "./components/FeaturesSection";
import Dashboard from "./components/Dashboard";
import ResumeBuilder from "./components/ResumeBuilder";
import AdminPanel from "./components/AdminPanel";
import AuthModal from "./components/AuthModal";
import { ResumeData, UserProfile } from "./types";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>("landing");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">("login");
  const [selectedResume, setSelectedResume] = useState<ResumeData | null>(null);

  // Sync Dark Mode class with root document body
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Initial Seed Resumes
  const [resumes, setResumes] = useState<ResumeData[]>([
    {
      id: "res_1",
      title: "Senior AI Engineer Resume",
      updatedAt: "2026-07-04",
      personalInfo: {
        fullName: "Alex Mercer",
        jobTitle: "Senior AI Engineer",
        email: "alex.mercer@ai-innovations.com",
        phone: "+1 (555) 019-2834",
        address: "San Francisco, California",
        website: "https://alexmercer.ai",
        linkedin: "linkedin.com/in/alex-mercer",
        github: "github.com/alexm-ai",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      },
      summary: "Results-driven Senior AI Engineer with 6+ years of experience leading cross-functional teams to engineer, deploy, and scale high-performance artificial intelligence systems. Proven track record of leveraging state-of-the-art transformer and reinforcement learning models to deliver exceptional enterprise value, reducing system latency by 35% and accelerating model convergence rates. Deeply committed to deploying ethical, transparent AI frameworks.",
      education: [
        {
          id: "edu_1",
          school: "Stanford University",
          degree: "Master of Science",
          major: "Computer Science (AI Specialization)",
          startDate: "2018",
          endDate: "2020",
          description: "Graduated with Honors. Specialized in Deep Learning, Natural Language Processing, and Autonomous Systems."
        }
      ],
      experience: [
        {
          id: "exp_1",
          company: "Cognitive Nexus Inc.",
          position: "Lead AI Engineer",
          location: "San Francisco, CA",
          startDate: "Jan 2023",
          endDate: "Present",
          current: true,
          description: "• Spearheaded orchestration and finetuning of transformer models for multi-turn conversational agents, expanding accuracy margins by 22%.\n• Built and managed CI/CD machine learning training pipelines using Docker, PyTorch, and AWS, speeding up cycle deployments by 40%.\n• Mentored a high-performing technical group of 8 junior machine learning specialists."
        },
        {
          id: "exp_2",
          company: "Neural Automation Lab",
          position: "AI Research Engineer",
          location: "Palo Alto, CA",
          startDate: "Jun 2020",
          endDate: "Dec 2022",
          current: false,
          description: "• Directed the design and deployment of real-time computer vision models for factory automation, saving $120,000 in manufacturing overhead quarterly.\n• Engineered robust predictive analytics algorithms utilizing time-series forecasting models."
        }
      ],
      skills: ["PyTorch", "TypeScript", "React", "Python", "Large Language Models", "System Architecture", "Docker", "AWS", "Finetuning", "Docker"],
      projects: [
        {
          id: "proj_1",
          title: "ApexLLM Orchestrator",
          role: "Lead Creator",
          startDate: "Mar 2024",
          endDate: "Jun 2024",
          description: "Created an open-source, low-latency framework for hosting and chaining Gemini API calls server-side, securing 4,500+ stars on GitHub.",
          url: "https://github.com/alexm-ai/apexllm"
        }
      ],
      certifications: [
        {
          id: "cert_1",
          name: "AWS Certified Machine Learning - Specialty",
          issuer: "Amazon Web Services",
          date: "Oct 2025",
          url: ""
        }
      ],
      languages: [
        { id: "lang_1", name: "English", level: "Native" },
        { id: "lang_2", name: "Spanish", level: "Fluent" }
      ],
      hobbies: ["Generative Art", "Sailing", "Marathon Running"],
      references: [
        {
          id: "ref_1",
          name: "Dr. Sarah Jenkins",
          role: "Director of Research",
          company: "Cognitive Nexus Inc.",
          contact: "s.jenkins@cognitive-nexus.com"
        }
      ],
      sectionOrder: ["summary", "experience", "education", "skills", "projects", "certifications", "languages", "hobbies", "references"],
      designSettings: {
        font: "poppins",
        primaryColor: "#7C3AED",
        secondaryColor: "#06B6D4",
        spacing: "normal",
        templateId: "modern",
        showProfileImage: true
      }
    },
    {
      id: "res_2",
      title: "Corporate Operations Manager",
      updatedAt: "2026-07-02",
      personalInfo: {
        fullName: "Sarah Connor",
        jobTitle: "Operations Manager",
        email: "sarah.connor@cyberdyne.com",
        phone: "+1 (555) 987-6543",
        address: "Los Angeles, California",
        website: "",
        linkedin: "linkedin.com/in/sarah-connor-ops",
        github: "",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
      },
      summary: "Dynamic and results-driven Operations Manager with 8+ years of expertise overseeing business scaling, streamlining supply chain networks, and optimizing logistics for technology-driven enterprises. Adept at driving change management, improving operational overhead margins by 18%, and guiding diverse departments under intense project pressure.",
      education: [
        {
          id: "edu_2",
          school: "University of Southern California",
          degree: "Bachelor of Science",
          major: "Business Administration",
          startDate: "2012",
          endDate: "2016",
          description: "Graduated Magna Cum Laude. Member of Beta Gamma Sigma Honor Society."
        }
      ],
      experience: [
        {
          id: "exp_3",
          company: "Cyberdyne Systems",
          position: "Operations Supervisor",
          location: "Los Angeles, CA",
          startDate: "Sep 2021",
          endDate: "Present",
          current: true,
          description: "• Formulated corporate logistics protocols, cutting production pipeline delivery errors by 25%.\n• Renegotiated global supplier vendor contracts, saving $85,000 annually in redundant overhead.\n• Implemented automated inventory control platforms to coordinate supply volumes dynamically."
        }
      ],
      skills: ["Strategic Planning", "Logistics", "Vendor Relations", "Budgeting", "KPI Analysis", "Change Management", "Team Leadership"],
      projects: [],
      certifications: [],
      languages: [
        { id: "lang_3", name: "English", level: "Native" }
      ],
      hobbies: ["Tactical Training", "Survival Gear Design", "Historical Artifact Preservation"],
      references: [],
      sectionOrder: ["summary", "experience", "education", "skills", "languages", "hobbies"],
      designSettings: {
        font: "sans",
        primaryColor: "#2563EB",
        secondaryColor: "#111827",
        spacing: "compact",
        templateId: "professional",
        showProfileImage: false
      }
    }
  ]);

  // Auth Event Success
  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    // On login, direct user to dashboard
    setCurrentTab("dashboard");
  };

  // Log out
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab("landing");
  };

  // Duplicate Resume
  const handleDuplicateResume = (resumeId: string) => {
    const original = resumes.find((r) => r.id === resumeId);
    if (!original) return;

    const duplicated: ResumeData = {
      ...original,
      id: "res_" + Math.random().toString(36).substr(2, 9),
      title: `${original.title} (Copy)`,
      updatedAt: new Date().toISOString().split("T")[0]
    };

    setResumes([...resumes, duplicated]);
  };

  // Delete Resume
  const handleDeleteResume = (resumeId: string) => {
    if (confirm("Are you sure you want to permanently delete this professional resume document?")) {
      setResumes(resumes.filter((r) => r.id !== resumeId));
      if (selectedResume?.id === resumeId) {
        setSelectedResume(null);
      }
    }
  };

  // Import JSON Backup resume
  const handleImportJSON = (imported: ResumeData) => {
    setResumes([...resumes, imported]);
    setSelectedResume(imported);
    setCurrentTab("builder");
  };

  // Trigger empty draft setup
  const handleCreateNewResume = () => {
    const newResume: ResumeData = {
      id: "res_" + Math.random().toString(36).substr(2, 9),
      title: "New Professional Resume",
      updatedAt: new Date().toISOString().split("T")[0],
      personalInfo: {
        fullName: currentUser?.fullName || "",
        jobTitle: "",
        email: currentUser?.email || "",
        phone: "",
        address: "",
        website: "",
      },
      summary: "",
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      hobbies: [],
      references: [],
      sectionOrder: ["summary", "experience", "education", "skills", "projects", "certifications", "languages", "hobbies", "references"],
      designSettings: {
        font: "sans",
        primaryColor: "#2563EB",
        secondaryColor: "#7C3AED",
        spacing: "normal",
        templateId: "modern",
        showProfileImage: true
      }
    };

    setResumes([...resumes, newResume]);
    setSelectedResume(newResume);
    setCurrentTab("builder");
  };

  // Save changes from builder
  const handleSaveResume = (updated: ResumeData) => {
    setResumes(resumes.map((r) => r.id === updated.id ? updated : r));
    setSelectedResume(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {/* Universal navigation layout */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        onOpenAuth={(view) => {
          setAuthModalView(view || "login");
          setAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        currentTab={currentTab}
        onChangeTab={(tab) => {
          if ((tab === "dashboard" || tab === "builder") && !currentUser) {
            // Force auth if trying to access dashboard/builder while logged out
            setAuthModalView("login");
            setAuthModalOpen(true);
            return;
          }
          setCurrentTab(tab);
        }}
      />

      {/* CORE PAGES SWITCH ROUTING */}
      
      {/* 1. LANDING PAGE */}
      {currentTab === "landing" && (
        <>
          <LandingPage
            currentUser={currentUser}
            onGetStarted={() => {
              if (currentUser) {
                setCurrentTab("dashboard");
              } else {
                setAuthModalView("register");
                setAuthModalOpen(true);
              }
            }}
            onOpenTemplates={() => {
              if (currentUser) {
                setCurrentTab("dashboard");
              } else {
                setAuthModalView("login");
                setAuthModalOpen(true);
              }
            }}
            onOpenAuth={(view) => {
              setAuthModalView(view || "login");
              setAuthModalOpen(true);
            }}
          />
          <FeaturesSection />
        </>
      )}

      {/* 2. USER DASHBOARD */}
      {currentTab === "dashboard" && currentUser && (
        <Dashboard
          resumes={resumes}
          currentUser={currentUser}
          onSelectResume={(resume) => {
            setSelectedResume(resume);
            setCurrentTab("builder");
          }}
          onCreateNew={handleCreateNewResume}
          onDuplicate={handleDuplicateResume}
          onDelete={handleDeleteResume}
          onImportJSON={handleImportJSON}
        />
      )}

      {/* 3. RESUME BUILDER WORKSPACE */}
      {currentTab === "builder" && selectedResume && (
        <ResumeBuilder
          initialData={selectedResume}
          isPremium={currentUser?.isPremium || false}
          onBack={() => {
            setSelectedResume(null);
            setCurrentTab("dashboard");
          }}
          onSave={handleSaveResume}
        />
      )}

      {/* 4. ADMINISTRATIVE WORKSPACE */}
      {currentTab === "admin" && currentUser?.role === "admin" && (
        <AdminPanel />
      )}

      {/* Auth Modal Overlay Dialog */}
      <AuthModal
        isOpen={authModalOpen}
        initialView={authModalView}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
