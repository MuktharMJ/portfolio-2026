import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Dart", "SQL", "HTML", "CSS"],
  },
  {
    id: "frontend-ui",
    title: "Frontend & Mobile",
    skills: ["React", "Next.js", "Tailwind CSS", "React Query", "Three.js / R3F", "Flutter"],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    skills: ["Node.js", "Express.js", "REST APIs", "API integration", "Authentication"],
  },
  {
    id: "databases-data",
    title: "Databases & Data",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Cloud Firestore"],
  },
  {
    id: "ai-llm",
    title: "AI / LLM",
    skills: ["OpenRouter", "Ollama"],
  },
  {
    id: "cloud-devops",
    title: "Cloud / DevOps",
    skills: ["Vercel", "Render", "GitHub Actions", "Cloudinary"],
  },
];
