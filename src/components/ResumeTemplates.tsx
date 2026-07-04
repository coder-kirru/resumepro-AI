import React from "react";
import { ResumeData, PersonalInfo, Education, Experience, Project, Certification, Language, Reference } from "../types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Award, Sparkles, BookOpen, Briefcase, Code, FolderGit, Languages, Heart, Users } from "lucide-react";

interface ResumeTemplatesProps {
  data: ResumeData;
}

export default function ResumeTemplates({ data }: ResumeTemplatesProps) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, languages, hobbies, references, sectionOrder, designSettings } = data;
  const { font, primaryColor, secondaryColor, spacing, templateId, showProfileImage } = designSettings;

  // Spacing configurations
  const spacingClasses = {
    compact: {
      section: "space-y-3 py-2",
      item: "space-y-1 py-1",
      heading: "text-sm pb-1 mb-2",
      text: "text-[11px]",
      title: "text-lg font-bold",
      subtitle: "text-xs font-semibold",
    },
    normal: {
      section: "space-y-5 py-3",
      item: "space-y-1.5 py-1.5",
      heading: "text-base pb-1.5 mb-3",
      text: "text-xs",
      title: "text-xl font-bold",
      subtitle: "text-sm font-semibold",
    },
    loose: {
      section: "space-y-7 py-4.5",
      item: "space-y-2 py-2",
      heading: "text-lg pb-2 mb-4",
      text: "text-sm",
      title: "text-2xl font-bold",
      subtitle: "text-base font-semibold",
    },
  }[spacing] || {
    section: "space-y-5 py-3",
    item: "space-y-1.5 py-1.5",
    heading: "text-base pb-1.5 mb-3",
    text: "text-xs",
    title: "text-xl font-bold",
    subtitle: "text-sm font-semibold",
  };

  // Font family mappings
  const fontClass = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
    poppins: "font-poppins",
    playfair: "font-playfair",
    montserrat: "font-montserrat",
  }[font] || "font-sans";

  // Safe image string formatting
  const profileImgSrc = personalInfo.profileImage || "";

  // Dynamic Styles
  const primaryStyle = { color: primaryColor };
  const bgPrimaryStyle = { backgroundColor: primaryColor };
  const borderPrimaryStyle = { borderColor: primaryColor };
  const secondaryStyle = { color: secondaryColor };

  // Subsections renders
  const renderSummary = () => {
    if (!summary) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <Sparkles className="h-4 w-4 shrink-0 no-print" />
          <span>Professional Summary</span>
        </h3>
        <p className={`${spacingClasses.text} leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line`}>
          {summary}
        </p>
      </div>
    );
  };

  const renderExperience = () => {
    if (!experience || experience.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <Briefcase className="h-4 w-4 shrink-0 no-print" />
          <span>Work Experience</span>
        </h3>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className={spacingClasses.item}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className={`${spacingClasses.subtitle} text-slate-800 dark:text-slate-100 font-bold`}>
                  {exp.position}
                </span>
                <span className="text-[10px] font-mono text-slate-500 shrink-0 font-medium bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                  {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-gray-400 font-medium">
                <span style={secondaryStyle}>{exp.company}</span>
                <span className="italic">{exp.location}</span>
              </div>
              {exp.description && (
                <p className={`${spacingClasses.text} text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line pl-2 border-l-2 border-slate-200 dark:border-slate-800`}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <BookOpen className="h-4 w-4 shrink-0 no-print" />
          <span>Education</span>
        </h3>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className={spacingClasses.item}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className={`${spacingClasses.subtitle} text-slate-800 dark:text-slate-100 font-bold`}>
                  {edu.degree} in {edu.major}
                </span>
                <span className="text-[10px] font-mono text-slate-500 shrink-0 font-medium bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-gray-400 font-medium">
                <span style={secondaryStyle}>{edu.school}</span>
              </div>
              {edu.description && (
                <p className={`${spacingClasses.text} text-slate-600 dark:text-slate-400 leading-relaxed pl-2 border-l-2 border-slate-200 dark:border-slate-800`}>
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <Code className="h-4 w-4 shrink-0 no-print" />
          <span>Core Competencies</span>
        </h3>
        <div className="flex flex-wrap gap-2 pt-1.5">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <FolderGit className="h-4 w-4 shrink-0 no-print" />
          <span>Key Projects</span>
        </h3>
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className={spacingClasses.item}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className={`${spacingClasses.subtitle} text-slate-800 dark:text-slate-100 font-bold`}>
                  {proj.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500 shrink-0 font-medium bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                  {proj.startDate} — {proj.endDate}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-gray-400 font-medium">
                <span style={secondaryStyle}>{proj.role}</span>
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center space-x-1">
                    <Globe className="h-3 w-3 inline" />
                    <span>Project Link</span>
                  </a>
                )}
              </div>
              {proj.description && (
                <p className={`${spacingClasses.text} text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line pl-2 border-l-2 border-slate-200 dark:border-slate-800`}>
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCertifications = () => {
    if (!certifications || certifications.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <Award className="h-4 w-4 shrink-0 no-print" />
          <span>Certifications</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-2 border border-slate-100 dark:border-slate-800 rounded-lg">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                {cert.name}
              </span>
              <span className="text-[10px] text-slate-500 block">{cert.issuer} | {cert.date}</span>
              {cert.url && (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-500 hover:underline">
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLanguages = () => {
    if (!languages || languages.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <Languages className="h-4 w-4 shrink-0 no-print" />
          <span>Languages</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {languages.map((lang) => (
            <div key={lang.id} className="text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-100 block">{lang.name}</span>
              <span className="text-[10px] text-slate-500 block font-mono">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHobbies = () => {
    if (!hobbies || hobbies.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <Heart className="h-4 w-4 shrink-0 no-print" />
          <span>Interests & Hobbies</span>
        </h3>
        <p className={`${spacingClasses.text} text-slate-700 dark:text-slate-300 italic`}>
          {hobbies.join(", ")}
        </p>
      </div>
    );
  };

  const renderReferences = () => {
    if (!references || references.length === 0) return null;
    return (
      <div className={spacingClasses.section}>
        <h3 className={`${spacingClasses.heading} font-bold border-b tracking-wide flex items-center gap-1.5 uppercase`} style={{ ...primaryStyle, ...borderPrimaryStyle }}>
          <Users className="h-4 w-4 shrink-0 no-print" />
          <span>Professional References</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {references.map((ref) => (
            <div key={ref.id} className="text-xs space-y-0.5">
              <span className="font-bold text-slate-800 dark:text-slate-100 block">{ref.name}</span>
              <span className="text-slate-600 dark:text-slate-400 block font-medium">{ref.role} at {ref.company}</span>
              <span className="text-[10px] text-slate-500 font-mono block">{ref.contact}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Sections Dispatch Map
  const dispatchSection = (sectionId: string) => {
    switch (sectionId) {
      case "summary":
        return renderSummary();
      case "experience":
        return renderExperience();
      case "education":
        return renderEducation();
      case "skills":
        return renderSkills();
      case "projects":
        return renderProjects();
      case "certifications":
        return renderCertifications();
      case "languages":
        return renderLanguages();
      case "hobbies":
        return renderHobbies();
      case "references":
        return renderReferences();
      default:
        return null;
    }
  };

  // Contacts grid render helper for top headers
  const renderContactIcons = (compact: boolean = false) => {
    return (
      <div className={`flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-gray-400 ${compact ? "justify-center" : "justify-start"}`}>
        {personalInfo.email && (
          <span className="flex items-center space-x-1">
            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{personalInfo.email}</span>
          </span>
        )}
        {personalInfo.phone && (
          <span className="flex items-center space-x-1">
            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{personalInfo.phone}</span>
          </span>
        )}
        {personalInfo.address && (
          <span className="flex items-center space-x-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{personalInfo.address}</span>
          </span>
        )}
        {personalInfo.website && (
          <span className="flex items-center space-x-1">
            <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500">{personalInfo.website}</a>
          </span>
        )}
        {personalInfo.linkedin && (
          <span className="flex items-center space-x-1">
            <Linkedin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{personalInfo.linkedin}</span>
          </span>
        )}
        {personalInfo.github && (
          <span className="flex items-center space-x-1">
            <Github className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{personalInfo.github}</span>
          </span>
        )}
        {personalInfo.twitter && (
          <span className="flex items-center space-x-1">
            <Twitter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{personalInfo.twitter}</span>
          </span>
        )}
      </div>
    );
  };

  // RENDER DYNAMIC TEMPLATE BY ID
  const renderTemplateStructure = () => {
    switch (templateId) {
      
      // 1. MODERN (Header split, profile picture offset, double primary accents)
      case "modern":
        return (
          <div className="p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 dark:border-slate-800 pb-6 gap-4">
              <div className="space-y-2">
                <h1 className={`${spacingClasses.title} font-extrabold tracking-tight text-slate-900 dark:text-white uppercase`} style={primaryStyle}>
                  {personalInfo.fullName || "Your Full Name"}
                </h1>
                <p className="text-sm font-semibold tracking-wide uppercase" style={secondaryStyle}>
                  {personalInfo.jobTitle || "Professional Title"}
                </p>
                {renderContactIcons(false)}
              </div>
              {showProfileImage && profileImgSrc && (
                <img
                  src={profileImgSrc}
                  alt={personalInfo.fullName}
                  className="h-20 w-20 rounded-2xl object-cover shadow-md border-2 border-slate-100 dark:border-slate-800 shrink-0"
                />
              )}
            </div>
            <div className="space-y-4">
              {sectionOrder.map((secId) => (
                <div key={secId}>{dispatchSection(secId)}</div>
              ))}
            </div>
          </div>
        );

      // 2. PROFESSIONAL (Symmetrical layouts, distinct shaded top title banner)
      case "professional":
        return (
          <div className="p-8 sm:p-10 space-y-6">
            <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800 flex flex-col items-center text-center gap-4">
              {showProfileImage && profileImgSrc && (
                <img
                  src={profileImgSrc}
                  alt={personalInfo.fullName}
                  className="h-24 w-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-950"
                />
              )}
              <div className="space-y-1.5">
                <h1 className={`${spacingClasses.title} font-extrabold tracking-tight text-slate-900 dark:text-white`} style={primaryStyle}>
                  {personalInfo.fullName || "Your Full Name"}
                </h1>
                <p className="text-sm font-bold uppercase tracking-wider" style={secondaryStyle}>
                  {personalInfo.jobTitle || "Professional Title"}
                </p>
              </div>
              {renderContactIcons(true)}
            </div>
            <div className="space-y-5">
              {sectionOrder.map((secId) => (
                <div key={secId}>{dispatchSection(secId)}</div>
              ))}
            </div>
          </div>
        );

      // 3. EXECUTIVE (Prestigious classic centered layout, subtle elegant serif header)
      case "executive":
        return (
          <div className="p-8 sm:p-12 space-y-6 font-playfair">
            <div className="text-center space-y-3 pb-6 border-b-2 border-double border-slate-300 dark:border-slate-700">
              <h1 className="text-3xl font-bold tracking-wide text-slate-900 dark:text-white uppercase" style={primaryStyle}>
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              <p className="text-sm italic font-medium tracking-widest uppercase text-slate-600 dark:text-slate-300">
                {personalInfo.jobTitle || "Professional Title"}
              </p>
              <div className="pt-2">
                {renderContactIcons(true)}
              </div>
            </div>
            <div className="space-y-5 font-sans">
              {sectionOrder.map((secId) => (
                <div key={secId}>{dispatchSection(secId)}</div>
              ))}
            </div>
          </div>
        );

      // 4. MINIMAL (Clean sans-serif, high negative space, thin separators, no-nonsense)
      case "minimal":
        return (
          <div className="p-8 sm:p-10 space-y-5 font-sans">
            <div className="flex justify-between items-start">
              <div>
                <h1 className={`${spacingClasses.title} font-bold text-slate-950 dark:text-white tracking-tight`}>
                  {personalInfo.fullName || "Your Full Name"}
                </h1>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                  {personalInfo.jobTitle || "Professional Title"}
                </p>
                <div className="mt-3">
                  {renderContactIcons(false)}
                </div>
              </div>
              {showProfileImage && profileImgSrc && (
                <img
                  src={profileImgSrc}
                  alt={personalInfo.fullName}
                  className="h-16 w-16 rounded-lg object-cover shadow-sm grayscale"
                />
              )}
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {sectionOrder.map((secId) => (
                <div key={secId}>{dispatchSection(secId)}</div>
              ))}
            </div>
          </div>
        );

      // 5. CREATIVE (Playful sidebar, colored badges, energetic typography headers)
      case "creative":
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
            {/* Left Sidebar */}
            <div className="md:col-span-4 bg-slate-900 dark:bg-gray-950 text-white p-6 sm:p-8 space-y-6 flex flex-col justify-start border-r border-slate-800">
              <div className="space-y-4 text-center">
                {showProfileImage && profileImgSrc ? (
                  <img
                    src={profileImgSrc}
                    alt={personalInfo.fullName}
                    className="h-28 w-28 rounded-3xl object-cover mx-auto shadow-xl border-4 border-purple-500/20"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg">
                    {personalInfo.fullName?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <h1 className="text-lg font-extrabold tracking-tight uppercase" style={secondaryStyle}>
                    {personalInfo.fullName || "Your Name"}
                  </h1>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    {personalInfo.jobTitle || "Professional"}
                  </p>
                </div>
              </div>

              {/* Sidebar Contacts info */}
              <div className="space-y-3.5 text-xs text-slate-300 pt-6 border-t border-slate-800">
                {personalInfo.email && <p className="truncate">✉ {personalInfo.email}</p>}
                {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
                {personalInfo.address && <p>📍 {personalInfo.address}</p>}
                {personalInfo.website && <p className="text-blue-400 truncate">🌐 {personalInfo.website}</p>}
              </div>

              {/* Sidebar highlights for Skills & Languages */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                {skills && skills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">My Superpowers</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s, i) => (
                        <span key={i} className="text-[10px] bg-slate-800/80 text-purple-300 px-2 py-0.5 rounded border border-slate-700/50">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right main area */}
            <div className="md:col-span-8 p-6 sm:p-8 space-y-6 bg-white dark:bg-gray-900">
              {sectionOrder
                .filter((id) => id !== "skills") // already rendered in sidebar!
                .map((secId) => (
                  <div key={secId}>{dispatchSection(secId)}</div>
                ))}
            </div>
          </div>
        );

      // 6. ATS CLASSIC (High-parsing clean layout, no icons/decoration, perfectly formatted for robots)
      case "ats-classic":
        return (
          <div className="p-8 sm:p-10 space-y-4 font-serif text-black dark:text-white">
            <div className="text-center space-y-1.5 pb-2 border-b border-black dark:border-white">
              <h1 className="text-2xl font-bold uppercase tracking-wide">
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              <p className="text-xs font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
                {personalInfo.jobTitle || "Professional Title"}
              </p>
              <div className="text-xs flex flex-wrap justify-center gap-x-3 gap-y-1">
                <span>{personalInfo.email}</span>
                {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                {personalInfo.address && <span>| {personalInfo.address}</span>}
                {personalInfo.website && <span>| {personalInfo.website}</span>}
                {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
              </div>
            </div>
            <div className="space-y-4 font-serif">
              {sectionOrder.map((secId) => (
                <div key={secId}>{dispatchSection(secId)}</div>
              ))}
            </div>
          </div>
        );

      // 7. ELEGANT (Golden color theme accents, serif font, left accent colored border block)
      case "elegant":
        return (
          <div className="p-8 sm:p-12 space-y-6 font-playfair relative border-l-8 border-amber-600/60">
            <div className="space-y-2 pb-6 border-b border-slate-200 dark:border-slate-800">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white" style={primaryStyle}>
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                {personalInfo.jobTitle || "Professional Title"}
              </p>
              <div className="pt-2 font-sans">
                {renderContactIcons(false)}
              </div>
            </div>
            <div className="space-y-5 font-sans">
              {sectionOrder.map((secId) => (
                <div key={secId}>{dispatchSection(secId)}</div>
              ))}
            </div>
          </div>
        );

      // 8. CORPORATE (Deep blue colors, rigid columns, professional summary centered, table layouts for dates)
      case "corporate":
        return (
          <div className="p-8 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-200 dark:border-slate-800 items-center">
              <div className="md:col-span-2 space-y-2">
                <h1 className={`${spacingClasses.title} font-black text-slate-900 dark:text-white tracking-tight uppercase`} style={{ color: "#2563EB" }}>
                  {personalInfo.fullName || "Your Full Name"}
                </h1>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {personalInfo.jobTitle || "Professional Title"}
                </p>
                {renderContactIcons(false)}
              </div>
              <div className="md:col-span-1 flex justify-start md:justify-end">
                {showProfileImage && profileImgSrc ? (
                  <img
                    src={profileImgSrc}
                    alt={personalInfo.fullName}
                    className="h-20 w-20 rounded-xl object-cover shadow-md border-2 border-blue-500/15"
                  />
                ) : (
                  <div className="h-20 w-20 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    CORP
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-5">
              {sectionOrder.map((secId) => (
                <div key={secId}>{dispatchSection(secId)}</div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`print-area bg-white dark:bg-gray-900 text-slate-800 dark:text-gray-100 transition-colors ${fontClass}`} id="resume-templates-wrapper">
      {renderTemplateStructure()}
    </div>
  );
}
