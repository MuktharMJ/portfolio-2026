import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
  },
  {
    id: "frontend-ui",
    title: "Frontend & UI",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "Three.js", "Figma"],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "API Design"],
  },
  {
    id: "databases-data",
    title: "Databases & Data",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    id: "ai-llm",
    title: "AI / LLM",
    skills: ["OpenRouter", "Gemini", "Ollama"],
  },
  {
    id: "cloud-devops",
    title: "Cloud / DevOps",
    skills: ["Vercel", "Render", "Docker", "GitHub Actions", "Cloudinary"],
  },
];
