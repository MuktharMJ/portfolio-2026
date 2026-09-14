import type { Project } from "./types";

/** Existing, source-backed project narratives, screenshots, and destinations. */
export const projects: Project[] = [
  {
    slug: "codeverse",
    index: "01",
    name: "CODEVERSE",
    tagline: "An interactive 3D universe for exploring the software ecosystem.",
    concept:
      "Technologies as stars/nodes in an explorable universe; relationships form connections users can search, inspect and expand.",
    stack: [
      {
        category: "CORE",
        items: ["Next.js", "TypeScript", "React", "R3F", "Three.js"],
      },
      {
        category: "DATA",
        items: ["PostgreSQL", "Neon", "GitHub API", "npm Registry API"],
      },
      { category: "OPS", items: ["Vercel", "Playwright"] },
    ],
    status: "SHIPPED — PRODUCTION DEPLOYMENT",
    caseStudy: {
      sections: [
        {
          kind: "concept",
          label: "CONTEXT / CONCEPT",
          title: "A universe made of *software*.",
          body: [
            "CODEVERSE is an interactive 3D universe for exploring the software ecosystem. Technologies are represented as stars and nodes; the relationships between them form connections you can search, inspect and expand.",
            "Instead of reading about a dependency graph, you move through it. Search for a technology, inspect it up close, and follow its connections outward — every link carries its relationship type and provenance, and the graph expands dynamically as you explore.",
          ],
        },
        {
          kind: "capabilities",
          label: "WHAT WAS BUILT",
          title: "Built as a *system*, not a demo.",
          capabilities: [
            "Interactive 3D software universe",
            "Technology nodes",
            "Relationships between technologies",
            "Search",
            "Technology inspection",
            "Connected technology exploration",
            "Real GitHub metadata",
            "Real npm registry metadata",
            "Dependency exploration",
            "Relationship types and provenance",
            "Dynamic graph expansion",
            "Popularity and activity information",
            "PostgreSQL-backed catalog",
            "Persistent metadata snapshots",
            "API / server layer",
            "Caching",
            "Error and fallback states",
            "Responsive design",
            "Accessibility",
            "Performance optimization",
            "Production deployment",
            "Automated testing",
          ],
        },
        {
          kind: "engineering",
          label: "TECHNICAL ARCHITECTURE",
          title: "The *engineering* behind the universe.",
          body: [
            "The application layer is Next.js, TypeScript, React and Tailwind CSS; the universe itself is rendered with React Three Fiber and Three.js.",
            "A PostgreSQL-backed catalog — hosted on Neon — stores the technology graph, with persistent metadata snapshots so node and relationship data survives beyond a single session. An API/server layer sits between the graph and the 3D client, adding caching along with designed error and fallback states.",
            "Live GitHub and npm Registry APIs supply real repository and package metadata — popularity and activity included — while the graph expands dynamically as connected technologies are explored.",
          ],
          specs: [
            { label: "RENDERING", text: "React Three Fiber · Three.js" },
            {
              label: "APP LAYER",
              text: "Next.js · TypeScript · React · Tailwind CSS",
            },
            {
              label: "CATALOG",
              text: "PostgreSQL on Neon — graph + metadata snapshots",
            },
            { label: "LIVE DATA", text: "GitHub API · npm Registry API" },
            { label: "DELIVERY", text: "Vercel — production deployment" },
            { label: "TESTING", text: "Playwright automated testing" },
          ],
        },
        {
          kind: "outcome",
          label: "THE RESULT",
          title: "Ambition, *shipped*.",
          body: [
            "Built, tested and deployed: CODEVERSE runs in production on Vercel, covered by Playwright automated tests, with error and fallback states designed in from the start.",
            "It is the portfolio's flagship demonstration of technical ambition — an immersive experience that treats the software ecosystem itself as the subject.",
          ],
        },
      ],
    },
    links: { live: "https://code-verse-chi.vercel.app/", source: undefined },
    media: [
      {
        src: "/shots/codeverse.png",
        alt: "CODEVERSE — interactive 3D software universe interface",
      },
    ],
  },
  {
    slug: "zenugo-ai",
    index: "02",
    name: "Zenugo AI",
    tagline: "AI-powered health and wellness platform.",
    concept:
      "AI-powered personalized conversations with JWT auth, persistent history, and OpenRouter integration on a Node/Express + MongoDB backend.",
    stack: [
      { category: "FRONTEND", items: ["React", "Vite"] },
      {
        category: "BACKEND",
        items: ["Node.js", "Express.js", "MongoDB Atlas", "JWT", "OpenRouter"],
      },
      { category: "OPS", items: ["Vercel", "Render"] },
    ],
    status: "SHIPPED — PRODUCTION DEPLOYMENT",
    caseStudy: {
      sections: [
        {
          kind: "concept",
          label: "CONTEXT / CONCEPT",
          title: "Wellness, in *conversation*.",
          body: [
            "Zenugo AI is an AI-powered health and wellness platform built around personalized conversation. Users talk; the AI responds in context — and the conversation history persists.",
            "Every part of the stack exists to serve that experience: secure sign-in, persistent history, and an AI integration that stays out of the way of the product.",
          ],
        },
        {
          kind: "capabilities",
          label: "WHAT WAS BUILT",
          title: "A product, end to *end*.",
          capabilities: [
            "AI-powered personalized conversations",
            "Secure JWT authentication",
            "Persistent conversation history",
            "OpenRouter AI integration",
            "MongoDB persistence",
            "Responsive desktop and mobile interface",
            "Production deployment",
          ],
        },
        {
          kind: "engineering",
          label: "TECHNICAL ARCHITECTURE",
          title: "Under the *surface*.",
          body: [
            "A React + Vite client talks to a Node.js and Express.js backend. MongoDB Atlas holds users and conversation history behind JWT-authenticated sessions.",
            "AI conversations run through the OpenRouter API integration. The interface is responsive across desktop and mobile, and the platform is deployed to production across Vercel and Render.",
          ],
          specs: [
            { label: "CLIENT", text: "React · Vite" },
            { label: "API", text: "Node.js · Express.js" },
            {
              label: "DATA",
              text: "MongoDB Atlas — users + conversation history",
            },
            { label: "AUTH", text: "JWT authentication" },
            { label: "AI", text: "OpenRouter API integration" },
            { label: "DELIVERY", text: "Vercel · Render" },
          ],
        },
        {
          kind: "outcome",
          label: "THE RESULT",
          title: "Shipped, and *listening*.",
          body: [
            "Zenugo AI is deployed to production with authentication, persistence and AI integration working as one product flow.",
            "It demonstrates the full arc of AI application development: full-stack engineering, auth, data persistence and a conversational product experience.",
          ],
        },
      ],
    },
    links: { live: "https://zenugo-ai.vercel.app/", source: undefined },
    media: [
      {
        src: "/shots/zenugoai.png",
        alt: "Zenugo AI — AI-powered health and wellness conversation interface",
      },
    ],
  },
  {
    slug: "schedura",
    index: "03",
    name: "Schedura",
    tagline: "Modern event management platform / SaaS product.",
    concept:
      "Event creation, publishing, attendee registration with QR-code tickets, check-in, dashboards and analytics — a real-world SaaS workflow.",
    stack: [
      {
        category: "FRONTEND",
        items: ["React 19", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "BACKEND",
        items: [
          "Node.js",
          "Express",
          "MongoDB Atlas",
          "JWT",
          "Cloudinary",
          "QR Code",
        ],
      },
    ],
    status: undefined,
    caseStudy: {
      sections: [
        {
          kind: "concept",
          label: "CONTEXT / CONCEPT",
          title: "Events, run like *systems*.",
          body: [
            "Schedura is a modern event-management platform — a SaaS product covering the real workflow: create and publish events, register attendees, generate QR-code tickets, check people in, and read the results on organizer dashboards.",
            "The design intent is operational: role-based access for organizers, structured data behind every event, and interfaces that make check-in day feel controlled rather than chaotic.",
          ],
        },
        {
          kind: "capabilities",
          label: "WHAT WAS BUILT",
          title: "The full event *pipeline*.",
          capabilities: [
            "Event creation and management",
            "Event publishing",
            "Authentication",
            "Role-based access",
            "Attendee registration",
            "QR-code ticket generation",
            "Event check-in",
            "Organizer dashboards",
            "Event analytics",
            "Attendee management",
            "REST APIs",
            "Reusable components",
            "Responsive interfaces",
          ],
        },
        {
          kind: "engineering",
          label: "TECHNICAL ARCHITECTURE",
          title: "Architecture for a *real workflow*.",
          body: [
            "The client is React 19 with TypeScript and Tailwind CSS, assembled from reusable components. A Node.js and Express backend exposes REST APIs over MongoDB Atlas, with JWT handling authentication and role-based access.",
            "Tickets are generated as QR codes for check-in, Cloudinary is part of the stack, and dashboards with analytics give organizers a structured view of every event.",
          ],
          specs: [
            { label: "CLIENT", text: "React 19 · TypeScript · Tailwind CSS" },
            { label: "API", text: "Node.js · Express — REST APIs" },
            { label: "DATA", text: "MongoDB Atlas" },
            { label: "AUTH", text: "JWT · role-based access" },
            { label: "TICKETS", text: "QR-code generation · check-in" },
            { label: "ALSO IN STACK", text: "Cloudinary" },
          ],
        },
        {
          kind: "outcome",
          label: "THE RESULT",
          title: "A SaaS, not a *sample*.",
          body: [
            "Schedura is built as a real-world workflow system: full-stack TypeScript, authentication and authorization, data management and product design working together end to end.",
          ],
        },
      ],
    },
    // Not deployed — no Live Demo link is shown (nothing fabricated).
    links: { live: undefined, source: undefined },
    media: [
      {
        src: "/shots/schedura.png",
        alt: "Schedura — event management dashboard with QR-code check-in",
      },
    ],
  },
  {
    slug: "gearpilot",
    index: "04",
    name: "GearPilot",
    tagline: "Laptop recommendation platform for the Indian market.",
    concept:
      "Recommendations, advanced filtering, search and comparison — a product-discovery experience built in TypeScript.",
    stack: [{ category: "FRONTEND", items: ["React", "TypeScript", "Vite"] }],
    status: undefined,
    caseStudy: {
      sections: [
        {
          kind: "concept",
          label: "CONTEXT / CONCEPT",
          title: "Choosing a laptop, without the *noise*.",
          body: [
            "GearPilot is a laptop-recommendation platform focused on the Indian market. It turns a crowded spec-sheet market into a guided discovery experience: recommendations, advanced filtering, search and side-by-side comparison.",
            "The focus is information architecture — helping someone move from too many options to a confident shortlist.",
          ],
        },
        {
          kind: "capabilities",
          label: "WHAT WAS BUILT",
          title: "Discovery, *instrumented*.",
          capabilities: [
            "Laptop recommendations",
            "Advanced filtering",
            "Search",
            "Laptop comparison",
            "Product discovery experience",
            "Responsive interface",
          ],
        },
        {
          kind: "engineering",
          label: "TECHNICAL ARCHITECTURE",
          title: "Lean stack, sharp *focus*.",
          body: [
            "GearPilot is built with React, TypeScript and Vite — a deliberately lean, frontend-focused stack. TypeScript is used across the build.",
            "The interface is fully responsive, and the experience is the product: recommendation, filtering, search and comparison working as one discovery flow.",
          ],
          specs: [
            { label: "STACK", text: "React · TypeScript · Vite" },
            { label: "FOCUS", text: "Frontend · search/filter UX" },
          ],
        },
        {
          kind: "outcome",
          label: "THE RESULT",
          title: "A compass for a *crowded market*.",
          body: [
            "GearPilot demonstrates frontend development in service of the user: search and filter UX, product comparison and a responsive interface — all in TypeScript.",
          ],
        },
      ],
    },
    links: { live: "https://gearpilot-v1.vercel.app/", source: undefined },
    media: [
      {
        src: "/shots/gearpilot.png",
        alt: "GearPilot — laptop recommendation and comparison interface",
      },
    ],
  },
];
