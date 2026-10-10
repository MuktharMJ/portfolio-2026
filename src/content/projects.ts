import type { Project } from "./types";

/** Implementation evidence and version boundaries: docs/internship-audit.md. */
export const projects: Project[] = [
  {
    "slug": "codeverse",
    "index": "01",
    "name": "CODEVERSE",
    "category": "Interactive 3D · Full-stack engineering",
    "tagline": "Interactive 3D atlas of the software ecosystem.",
    "concept": "Explore 17 curated technologies and 29 sourced relationships through a searchable, navigable universe.",
    "proof": "Next.js · TypeScript · Three.js · PostgreSQL",
    "stack": [
      {
        "category": "INTERFACE",
        "items": [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Three.js",
          "React Three Fiber",
          "Tailwind CSS 4"
        ]
      },
      {
        "category": "DATA & QUALITY",
        "items": [
          "PostgreSQL",
          "Postgres.js",
          "GitHub API",
          "npm Registry API",
          "Playwright"
        ]
      }
    ],
    "links": {
      "live": "https://code-verse-chi.vercel.app",
      "source": "https://github.com/MuktharMJ/CodeVerse"
    },
    "media": [
      {
        "src": "/shots/codeverse.png",
        "alt": "CODEVERSE atlas with category constellations, search and orbit controls"
      }
    ],
    "caseStudy": {
      "sections": [
        {
          "kind": "concept",
          "label": "PRODUCT & OWNERSHIP",
          "title": "Making a complex ecosystem *explorable*.",
          "body": [
            "I built a 3D interface for discovering how software technologies connect: orbit, zoom and pan through category constellations, search for a technology, then inspect its relationships and metadata.",
            "React Three Fiber works alongside a conventional HTML interface. Ranked search, shareable selection URLs and browser-history support make discovery usable beyond the canvas."
          ]
        },
        {
          "kind": "engineering",
          "label": "DATA YOU CAN EXPLAIN",
          "title": "Three kinds of information. *Clear boundaries*.",
          "body": [
            "The graph separates editorial knowledge from live provider data and computed suggestions."
          ],
          "specs": [
            {
              "label": "CURATED",
              "text": "17 technologies and 29 explicit relationships, each with a type, provenance and explanation."
            },
            {
              "label": "LIVE",
              "text": "GitHub repository statistics and npm metadata. Activity is classified from actual timestamps, with archived and unknown states."
            },
            {
              "label": "DETERMINISTIC",
              "text": "Recommendations use shared connections and explain their reasons. Lazy npm-manifest exploration distinguishes dependencies from peer dependencies."
            }
          ]
        },
        {
          "kind": "engineering",
          "label": "DECISIONS & TRADE-OFFS",
          "title": "An immersive client. A *defensive server*.",
          "body": [
            "Next.js server-side providers validate responses, enforce timeouts and cache results. PostgreSQL stores the catalog and durable metadata snapshots through parameterized Postgres.js queries.",
            "Snapshots keep provider failures useful, but may be stale; the interface distinguishes freshness and rate-limit conditions. GitHub credentials remain server-only, with hardened response headers.",
            "Keyboard navigation, an HTML directory and WebGL fallback retain access to the catalog when the 3D view is unavailable. Reduced-motion preferences disable unnecessary movement."
          ]
        },
        {
          "kind": "outcome",
          "label": "DOCUMENTED VERIFICATION",
          "title": "Designed to be *checked*.",
          "body": [
            "The project documentation records 155 passing Playwright, intelligence and activity tests, successful typecheck, lint and production build, and zero npm-audit vulnerabilities at that verification point.",
            "The repository includes the test suites and implementation for review. Its README records the scope of that verification checkpoint."
          ]
        }
      ]
    }
  },
  {
    "slug": "zenugo-ai",
    "index": "02",
    "name": "Zenugo AI",
    "category": "Conversational AI · Full-stack product",
    "tagline": "AI-powered health and wellness conversations.",
    "concept": "A React client, Express API and persistent history bring the conversation together across desktop and mobile.",
    "proof": "React · REST APIs · OpenRouter · MongoDB Atlas",
    "stack": [
      {
        "category": "FRONTEND",
        "items": [
          "React",
          "Vite"
        ]
      },
      {
        "category": "BACKEND",
        "items": [
          "Node.js",
          "Express.js",
          "MongoDB Atlas",
          "OpenRouter API"
        ]
      },
      {
        "category": "DELIVERY",
        "items": [
          "Vercel",
          "Render"
        ]
      }
    ],
    "links": {
      "live": "https://zenugo-ai.vercel.app",
      "source": "https://github.com/MuktharMJ/zenugo-ai"
    },
    "media": [
      {
        "src": "/shots/zenugoai.png",
        "alt": "Zenugo AI health and wellness application"
      }
    ],
    "caseStudy": {
      "sections": [
        {
          "kind": "concept",
          "label": "PRODUCT & OWNERSHIP",
          "title": "A conversation that *continues*.",
          "body": [
            "I built the client and backend for a conversational health and wellness application, including authentication, chat interactions and persistent conversation history.",
            "The product is a wellness conversation interface; it does not establish medical accuracy or clinical validation."
          ]
        },
        {
          "kind": "engineering",
          "label": "CLIENT → API → PROVIDER → DATABASE",
          "title": "Each layer has a *job*.",
          "body": [
            "The React/Vite frontend calls Express REST endpoints. The backend integrates OpenRouter for AI responses and MongoDB Atlas for users, conversations and messages.",
            "React state and authentication context coordinate the client. Conversation history persists in MongoDB, supporting revisiting, renaming and deleting chats.",
            "The frontend is deployed on Vercel and the backend on Render. Separating the API keeps provider integration outside the browser, while adding network and provider availability dependencies."
          ]
        }
      ]
    }
  },
  {
    "slug": "schedura",
    "index": "03",
    "name": "Schedura",
    "category": "Event workflows · Full-stack engineering",
    "tagline": "Event management for organizers and attendees.",
    "concept": "Creation, publishing, registration and QR check-in, with role-aware interfaces and explicit server-state management.",
    "proof": "React · React Query · Firebase Auth · MongoDB",
    "stack": [
      {
        "category": "CLIENT",
        "items": [
          "React",
          "JavaScript",
          "Tailwind CSS",
          "TanStack React Query"
        ]
      },
      {
        "category": "API & DATA",
        "items": [
          "Node.js",
          "Express.js",
          "MongoDB",
          "Mongoose"
        ]
      },
      {
        "category": "SERVICES",
        "items": [
          "Firebase Authentication",
          "Cloudinary"
        ]
      }
    ],
    "links": {},
    "media": [
      {
        "src": "/shots/schedura.png",
        "alt": "Schedura event interface from an earlier iteration",
        "caption": "Earlier interface iteration; engineering notes describe the current local implementation."
      }
    ],
    "caseStudy": {
      "sections": [
        {
          "kind": "concept",
          "label": "PRODUCT & OWNERSHIP",
          "title": "One event. Two *workflows*.",
          "body": [
            "I built organizer and attendee flows for event creation, publishing, registration, QR-code tickets and check-in, with dashboards and attendee management.",
            "The current implementation uses React with JavaScript, MongoDB and Firebase authentication. Reusable interface components support both organizer and attendee journeys."
          ]
        },
        {
          "kind": "engineering",
          "label": "SERVER STATE & AUTHORIZATION",
          "title": "State with a *lifecycle*.",
          "body": [
            "TanStack React Query is implemented through QueryClientProvider, useQuery, useMutation and cache invalidation. Discovery, dashboards, tickets and reviews use server-state queries.",
            "Queries use a five-minute stale window and avoid retrying client errors. Mutations invalidate cached data so saved events and event details refresh after changes.",
            "Firebase Google sign-in supplies an ID token verified by Firebase Admin. The API checks roles and resource ownership; hiding an organizer control is not authorization."
          ],
          "specs": [
            {
              "label": "DATA",
              "text": "MongoDB/Mongoose stores records. Transactions support capacity-safe registration and cancellation."
            },
            {
              "label": "UX STATES",
              "text": "Loading, empty and API-error states are explicit. Labelled editorial preview events cannot accept registrations."
            },
            {
              "label": "SCOPE",
              "text": "QR tickets, check-in and Cloudinary media are implemented. Displayed INR prices do not imply payment processing."
            }
          ]
        },
        {
          "kind": "outcome",
          "label": "VERIFICATION & AVAILABILITY",
          "title": "The workflow is the *evidence*.",
          "body": [
            "The project includes Playwright flow and accessibility tests. Firebase emulation and a temporary MongoDB replica set let integration tests exercise authentication and transactional workflows without production data.",
            "Schedura is currently a local project, with no live deployment or publicly accessible source repository."
          ]
        }
      ]
    },
    "status": "LOCAL PROJECT · NOT DEPLOYED"
  },
  {
    "slug": "devmap",
    "index": "04",
    "name": "DevMap",
    "category": "Developer tools · Local-first analysis",
    "tagline": "Local developer project intelligence.",
    "concept": "Understand unfamiliar repositories through file exploration, detected technologies and source-grounded architecture context.",
    "proof": "React · TypeScript · Deterministic analysis",
    "stack": [
      {
        "category": "CLIENT",
        "items": [
          "React",
          "TypeScript",
          "Vite"
        ]
      },
      {
        "category": "APPROACH",
        "items": [
          "Browser-local analysis",
          "Playwright",
          "Optional Ollama"
        ]
      }
    ],
    "links": {
      "source": "https://github.com/MuktharMJ/devmap"
    },
    "media": [
      {
        "src": "/shots/devmap.png",
        "alt": "DevMap overview analyzing the labelled Orbit demonstration project",
        "width": 1440,
        "height": 1462,
        "caption": "The included Orbit demo fixture, analyzed by the same pipeline as imported projects."
      }
    ],
    "caseStudy": {
      "sections": [
        {
          "kind": "concept",
          "label": "PRODUCT & OWNERSHIP",
          "title": "Find a way into *unfamiliar code*.",
          "body": [
            "I built DevMap to turn repository structure into a useful starting point: technology detection, a source-file inventory, file previews and an architecture-oriented overview.",
            "A clearly labelled Orbit demo makes the workflow explorable before importing a local folder. It is demonstration data, not an external client project."
          ]
        },
        {
          "kind": "engineering",
          "label": "LOCAL-FIRST ARCHITECTURE",
          "title": "Useful before an *AI call*.",
          "body": [
            "Core analysis runs deterministically in the browser, without an account, backend or external AI provider. Imported code is read rather than executed; the workspace stays in memory.",
            "The architecture map follows resolved relative imports and separates detected facts, inferred context and unknowns. It describes static structure, not runtime behavior or security assurance.",
            "Optional Ollama integration uses a local loopback endpoint. Generated explanations remain distinct from deterministic analysis; the product remains useful when the provider is absent."
          ],
          "specs": [
            {
              "label": "FRONTEND",
              "text": "TypeScript models connect the analyzer to file exploration, a pannable SVG map and a mobile list presentation."
            },
            {
              "label": "BOUNDARIES",
              "text": "File and text limits bound browser work. Ignored directories and known secret files are excluded; this is not a comprehensive secret scanner."
            },
            {
              "label": "TRADE-OFF",
              "text": "Local analysis avoids a server upload, but refreshing resets the imported workspace."
            }
          ]
        },
        {
          "kind": "outcome",
          "label": "VERIFICATION",
          "title": "Inspect the *reasoning*.",
          "body": [
            "Analyzer tests cover deterministic results, while Playwright and accessibility checks exercise the browser interface. The repository includes the implementation, tests and real application screenshots."
          ]
        }
      ]
    }
  },
  {
    "slug": "gearpilot",
    "index": "05",
    "name": "GearPilot",
    "category": "Product discovery · Frontend engineering",
    "tagline": "A clearer shortlist for Indian laptop buyers.",
    "concept": "Quiz-driven discovery, budget and use-case filters, side-by-side comparison and saved favorites.",
    "proof": "React · TypeScript · Custom state hooks",
    "stack": [
      {
        "category": "FRONTEND",
        "items": [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS"
        ]
      },
      {
        "category": "DATA & STATE",
        "items": [
          "Curated local catalog",
          "React hooks",
          "localStorage"
        ]
      }
    ],
    "links": {
      "live": "https://gearpilot-v1.vercel.app",
      "source": "https://github.com/MuktharMJ/GearPilot"
    },
    "media": [
      {
        "src": "/shots/gearpilot.png",
        "alt": "GearPilot laptop discovery and comparison interface"
      }
    ],
    "caseStudy": {
      "sections": [
        {
          "kind": "concept",
          "label": "PRODUCT & OWNERSHIP",
          "title": "From specifications to a *shortlist*.",
          "body": [
            "I built a laptop discovery interface for the Indian market: a guided quiz, INR pricing, budget and use-case filtering, comparison and retailer-oriented buy links."
          ]
        },
        {
          "kind": "engineering",
          "label": "STATE & PRODUCT LOGIC",
          "title": "Small hooks. *Clear responsibilities*.",
          "body": [
            "The current public version is a React/TypeScript frontend. Custom hooks separate filtering, comparison state and localStorage-backed favorites; typed catalog data feeds the interface.",
            "Filtering combines use case, price and text search. A scoring utility supports recommendations, while the comparison view makes trade-offs visible across selected laptops."
          ],
          "specs": [
            {
              "label": "STATE",
              "text": "React hooks manage interface state; localStorage persists favorites."
            },
            {
              "label": "TRADE-OFF",
              "text": "A local catalog keeps browsing independent of an API, but prices and specifications require manual updates."
            },
            {
              "label": "VERSION BOUNDARY",
              "text": "The current version uses local catalog data. An Express/MongoDB backend remains on the project roadmap."
            }
          ]
        }
      ]
    }
  },
  {
    "slug": "machinetrack",
    "index": "06",
    "name": "MachineTrack",
    "category": "Collaborative sprint · Flutter frontend",
    "tagline": "Real-time machine inspection and breakdown reporting.",
    "concept": "My contribution to an Alliance University–Kalvium team sprint: the Flutter interface, navigation and Firebase/Firestore integration.",
    "proof": "Flutter · Dart · Firestore · Pull-request collaboration",
    "stack": [
      {
        "category": "MOBILE",
        "items": [
          "Flutter",
          "Dart"
        ]
      },
      {
        "category": "SERVICES & WORKFLOW",
        "items": [
          "Firebase",
          "Cloud Firestore",
          "Git",
          "GitHub Actions"
        ]
      }
    ],
    "links": {
      "source": "https://github.com/kalviumcommunity/Mukthar_MachineTrack_Kalvium-Community"
    },
    "media": [],
    "caseStudy": {
      "sections": [
        {
          "kind": "concept",
          "label": "TEAM PROJECT / MY ROLE",
          "title": "Owning the *mobile interface*.",
          "body": [
            "MachineTrack addresses machine inspection and breakdown logging in manufacturing environments. This was collaborative work in the Alliance University–Kalvium program, not a solo application.",
            "My role was frontend/Flutter, with backend-related integration contributions: application foundation, navigation, reusable widgets, and screens for authentication, home, machines, records and profile."
          ]
        },
        {
          "kind": "engineering",
          "label": "CONTRIBUTIONS & TRADE-OFFS",
          "title": "Connect the screen to the *service*.",
          "body": [
            "I contributed machine models and Firebase/Firestore service integration, alongside search, filtering, loading and empty states, and record detail views.",
            "Separating models, services and widgets helped the interface accommodate an evolving backend. Firestore streams enable live updates, while asynchronous loading and error states remain the interface's responsibility.",
            "I worked through Git branches and pull requests alongside teammates responsible for backend features, and contributed automated tests and CI workflows. The linked pull requests make my implementation scope visible."
          ]
        },
        {
          "kind": "outcome",
          "label": "REVIEW THE CONTRIBUTIONS",
          "title": "Work you can *trace*.",
          "body": [
            "Public pull requests make individual scope reviewable, from the UI foundation to machine data integration."
          ],
          "references": [
            {
              "label": "Frontend foundation · PR #1",
              "href": "https://github.com/kalviumcommunity/Mukthar_MachineTrack_Kalvium-Community/pull/1"
            },
            {
              "label": "Machine model and service · PR #12",
              "href": "https://github.com/kalviumcommunity/Mukthar_MachineTrack_Kalvium-Community/pull/12"
            },
            {
              "label": "Firestore integration · PR #16",
              "href": "https://github.com/kalviumcommunity/Mukthar_MachineTrack_Kalvium-Community/pull/16"
            }
          ]
        }
      ]
    }
  }
];
