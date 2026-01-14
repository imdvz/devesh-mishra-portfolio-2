export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  metrics?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  experience: Experience[];
  skills: SkillCategory[];
  publications: {
    title: string;
    publisher: string;
    details: string;
  }[];
  education: Education[];
}