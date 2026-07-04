export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  profileImage?: string; // base64 string
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  url: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Language {
  id: string;
  name: string;
  level: "Native" | "Fluent" | "Professional" | "Conversational" | string;
}

export interface Reference {
  id: string;
  name: string;
  role: string;
  company: string;
  contact: string;
}

export interface DesignSettings {
  font: "sans" | "serif" | "mono" | "poppins" | "playfair" | "montserrat";
  primaryColor: string;
  secondaryColor: string;
  spacing: "compact" | "normal" | "loose";
  templateId: "modern" | "professional" | "executive" | "minimal" | "creative" | "ats-classic" | "elegant" | "corporate";
  showProfileImage: boolean;
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  hobbies: string[];
  references: Reference[];
  sectionOrder: string[]; // e.g. ["summary", "experience", "education", "skills", "projects", "certifications", "languages", "hobbies", "references"]
  designSettings: DesignSettings;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: "admin" | "user";
  isPremium: boolean;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalResumes: number;
  premiumSubscriptions: number;
  aiQueriesCount: number;
  conversionRate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
