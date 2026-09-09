import type { SkillGroup } from "./types";

/** Capability groups — verbatim from the brief §16. No logo walls. */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "Dart", "SQL", "HTML5", "CSS3"],
  },
  {
    id: "frontend-ui",
    title: "Frontend & UI",
    skills: [
      "React", "Next.js", "Vite", "Tailwind CSS", "Three.js", "React Three Fiber", "Flutter",
      "Responsive Design", "Mobile UI Development", "Accessibility", "Component-Based Architecture",
      "UI/UX Design", "Figma", "Prototyping", "Design Systems",
    ],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    skills: [
      "Node.js", "Express.js", "REST APIs", "API Design", "API Integration", "Server-Side APIs",
      "JWT Authentication", "Authentication & Authorization", "API Validation", "Error Handling", "Caching",
    ],
  },
  {
    id: "databases-data",
    title: "Databases & Data",
    skills: [
      "PostgreSQL", "MongoDB", "MongoDB Atlas", "Firebase", "Redis", "Mongoose", "Neon",
      "Database Design", "Database Migrations", "Database Seeding",
    ],
  },
  {
    id: "ai-llm",
    title: "AI / LLM",
    skills: [
      "OpenRouter", "Google AI Studio", "Gemini API", "Ollama", "Local LLM Hosting", "LLM Integration",
      "AI Application Development", "Prompt Engineering", "Codex", "Claude Code", "OpenCode",
      "Freebuff", "GLM 5.3 Flash",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud / DevOps",
    skills: [
      "Vercel", "Render", "Docker", "GitHub Actions", "CI/CD", "Cloudinary", "Environment & Secret Management",
    ],
  },
  {
    id: "testing-engineering",
    title: "Testing & Engineering",
    skills: [
      "Playwright", "ESLint / Linting", "TypeScript Type Checking", "Automated Testing",
      "Performance Optimization", "Production Deployment",
    ],
  },
  {
    id: "cs-se",
    title: "CS / Software Engineering",
    skills: [
      "Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Debugging",
      "Software Architecture", "Dependency Management", "Git / Version Control", "Problem Solving",
    ],
  },
  {
    id: "design",
    title: "Design",
    skills: ["Figma", "UI/UX Design", "Prototyping", "Design Systems"],
  },
];
