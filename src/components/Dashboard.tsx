import React, { useState, useRef } from "react";
import { Plus, Edit, Copy, Trash2, Download, Upload, FileJson, Search, Sparkles, Award, FileText, LayoutGrid, CheckCircle } from "lucide-react";
import { ResumeData, UserProfile } from "../types";

interface DashboardProps {
  resumes: ResumeData[];
  currentUser: UserProfile | null;
  onSelectResume: (resume: ResumeData) => void;
  onCreateNew: () => void;
  onDuplicate: (resumeId: string) => void;
  onDelete: (resumeId: string) => void;
  onImportJSON: (data: ResumeData) => void;
}

export default function Dashboard({
  resumes,
  currentUser,
  onSelectResume,
  onCreateNew,
  onDuplicate,
  onDelete,
  onImportJSON,
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.personalInfo.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Download resume data as JSON file
  const handleExportJSON = (resume: ResumeData, e: React.MouseEvent) => {
    e.stopPropagation();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.title.replace(/\s+/g, "_")}_resume_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Upload JSON file to import resume
  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personalInfo && parsed.designSettings) {
          // Re-generate a new ID to avoid collisions
          const imported: ResumeData = {
            ...parsed,
            id: "res_" + Math.random().toString(36).substr(2, 9),
            title: parsed.title + " (Imported)",
            updatedAt: new Date().toISOString().split("T")[0]
          };
          onImportJSON(imported);
        } else {
          alert("Invalid ResumePro AI backup file. Check file structure.");
        }
      } catch (err) {
        alert("Error parsing backup file. Ensure it is a valid JSON document.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-gray-900 dark:text-white flex items-center gap-2">
            <span>Welcome back, {currentUser?.fullName || "Professional"}</span>
            <span className="no-print animate-pulse text-purple-600">✨</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select, edit, or create professional ATS-friendly resume documents.
          </p>
        </div>

        {/* Create / Import button block */}
        <div className="flex flex-wrap gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4.5 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200 flex items-center space-x-2 bg-white dark:bg-gray-950 cursor-pointer shadow-sm"
            id="import-json-btn"
          >
            <Upload className="h-4 w-4 text-purple-500" />
            <span>Import JSON</span>
          </button>
          
          <button
            onClick={onCreateNew}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 flex items-center space-x-2 cursor-pointer"
            id="create-resume-btn"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Create Resume</span>
          </button>
        </div>
      </div>

      {/* Analytics / Stats Banner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Total Resumes</span>
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white block font-mono">{resumes.length}</span>
          </div>
          <div className="p-3.5 bg-blue-50 dark:bg-blue-950 text-blue-500 rounded-xl">
            <FileText className="h-6 w-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Average ATS Rating</span>
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white block font-mono">
              {resumes.length > 0 ? "92%" : "N/A"}
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-500 rounded-xl">
            <Award className="h-6 w-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Account Tier</span>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent block">
              {currentUser?.isPremium ? "Premium Pro" : "Free Starter"}
            </span>
          </div>
          <div className="p-3.5 bg-purple-50 dark:bg-purple-950 text-purple-500 rounded-xl">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Resume List Section */}
      <div className="space-y-6">
        {/* Search row */}
        <div className="flex items-center relative max-w-md w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
          <Search className="h-5 w-5 text-gray-400 absolute left-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resumes, jobs, or names..."
            className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl placeholder-gray-400"
          />
        </div>

        {filteredResumes.length === 0 ? (
          <div className="p-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-center space-y-4 bg-white/50 dark:bg-gray-900/40">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
              <LayoutGrid className="h-7 w-7" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {searchQuery ? "No search matches" : "No professional resumes yet"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {searchQuery ? "Try refining your keywords or search query." : "Launch your next career step by building your first premium, ATS-compliant resume."}
              </p>
            </div>
            {!searchQuery && (
              <button
                onClick={onCreateNew}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                Create Your First Resume
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => {
              // Calculate completion score
              const completedFields = [
                resume.personalInfo.fullName,
                resume.personalInfo.email,
                resume.summary,
                resume.education.length > 0,
                resume.experience.length > 0,
                resume.skills.length > 0,
              ].filter(Boolean).length;
              const completionPercent = Math.round((completedFields / 6) * 100);

              return (
                <div
                  key={resume.id}
                  onClick={() => onSelectResume(resume)}
                  className="group rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 hover:border-purple-300 dark:hover:border-purple-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer relative overflow-hidden"
                >
                  {/* Backdrop gradient trigger */}
                  <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-purple-500/5 group-hover:bg-purple-500/10 rounded-full blur-2xl transition-all duration-300"></div>

                  <div className="space-y-4">
                    {/* Header: Title & Meta */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-gray-900 dark:text-white font-poppins group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {resume.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                          Updated: {resume.updatedAt}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono">
                        {resume.designSettings.templateId}
                      </span>
                    </div>

                    {/* Resume info overview preview */}
                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-gray-400">
                      <p className="font-semibold text-slate-700 dark:text-gray-200">
                        👤 {resume.personalInfo.fullName || "Untitled Candidate"}
                      </p>
                      <p className="truncate">
                        💼 {resume.personalInfo.jobTitle || "No title specified"}
                      </p>
                      <p className="truncate">
                        🎓 {resume.education[0]?.school || "No school specified"}
                      </p>
                    </div>

                    {/* Completion bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <span>Profile Strength</span>
                        <span className="text-purple-600 dark:text-purple-400 font-mono">{completionPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          style={{ width: `${completionPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResume(resume);
                      }}
                      className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-1 text-xs font-semibold"
                      title="Edit Resume"
                    >
                      <Edit className="h-4.5 w-4.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(resume.id);
                      }}
                      className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-1 text-xs font-semibold"
                      title="Duplicate Resume"
                    >
                      <Copy className="h-4.5 w-4.5" />
                      <span className="hidden sm:inline">Duplicate</span>
                    </button>

                    <button
                      onClick={(e) => handleExportJSON(resume, e)}
                      className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-1 text-xs font-semibold"
                      title="Export backup"
                    >
                      <FileJson className="h-4.5 w-4.5" />
                      <span className="hidden sm:inline">JSON</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(resume.id);
                      }}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors flex items-center space-x-1 text-xs font-semibold"
                      title="Delete Resume"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
