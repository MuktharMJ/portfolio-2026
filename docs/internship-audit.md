# Portfolio evidence audit — 10 October 2026

## Baseline and scope

The working tree was clean before edits. The site uses Next.js 15 App Router, React 19, TypeScript and Tailwind 4, local fonts, content-driven static case studies, CSS theme tokens, a pre-paint persisted/system theme, native-dialog mobile navigation and reduced-motion-aware reveals. These foundations were preserved. No runtime UI dependencies were added.

The gaps were four instead of six projects, missing source links, outdated implementation claims, no demonstrable React Query usage, weak ownership/decision narratives and no committed browser regression suite. The showcase now follows CODEVERSE, Zenugo AI, Schedura, DevMap, GearPilot, MachineTrack. MachineTrack uses an editorial contribution entry because the inspected repository and sprint presentation did not contain a suitable application screenshot.

## Evidence and version boundaries

| Project | Inspected evidence | Portfolio decision |
| --- | --- | --- |
| CODEVERSE | [Repository](https://github.com/MuktharMJ/CodeVerse), README, package manifest, catalog, provider services, URL-selection helpers and test files; matching local `../codeverse` checkout | Next.js 16 / React 19 / TypeScript / R3F / Three.js / Tailwind 4 / PostgreSQL / Postgres.js. Distinguish curated relationships, live provider metadata and deterministic recommendations. The 155-test and audit statements are explicitly a documented checkpoint, not rerun or current claims. Updated screenshot from `docs/preview.png`. |
| Zenugo AI | [Repository](https://github.com/MuktharMJ/zenugo-ai), manifests, chat controllers, frontend and backend trees | React/Vite → Express → OpenRouter and MongoDB Atlas. Authenticated conversation persistence; separate Vercel/Render deployments. No clinical-validation claim. |
| Schedura | Read-only local `~/schedura`: README, client/server manifests, `client/src/App.jsx`, event hooks/pages, auth provider and tests | Current checkout uses JavaScript, React Query, MongoDB/Mongoose and Firebase authentication. This contradicts the supplied résumé's TypeScript/PostgreSQL description. Configured GitHub remote `MuktharMJ/schedura` returns 404 publicly; README says not deployed. Omit inaccessible destinations. Existing screenshot explicitly identified as an earlier iteration. |
| DevMap | [Repository](https://github.com/MuktharMJ/devmap), analyzer, AI integration, components, tests and screenshots | Browser-local deterministic analysis with optional loopback Ollama. Distinguish static structure from runtime behavior and inferred text. Real `docs/screenshots/overview.png`; caption identifies the Orbit demo fixture. |
| GearPilot | [Repository](https://github.com/MuktharMJ/GearPilot), TypeScript hooks, catalog, scoring, comparison components and manifest | Public main is a frontend implementation with local data and localStorage favorites. README contains a merge conflict but code confirms the implementation; Express/MongoDB is roadmap content, not shipped evidence. Do not repeat the supplied older backend description. |
| MachineTrack | [Repository](https://github.com/kalviumcommunity/Mukthar_MachineTrack_Kalvium-Community), Flutter screens/models/services, sprint presentation and public PR authorship | Collaborative project. Mukthar-authored PRs #1, #12 and #16 directly support frontend foundation, models/service and Firestore integration. No assertion of solo ownership or unverified leadership/review activity. |

## Required-stack verification

Next.js, React, TypeScript and Tailwind are verified in CODEVERSE. Public package manifests were inspected across the user's available repositories; no React Query or Zustand dependency was found there. The current local Schedura checkout **does** implement `@tanstack/react-query`: provider, queries, mutations and invalidation in application code, including public events, tickets, dashboards and reviews. React Query is therefore included with explicit Schedura attribution. Zustand is omitted; the bounded search does not claim to cover inaccessible private repositories.

Schedura had existing uncommitted changes when inspected. No changes were made to that repository or any other project checkout.

## Résumé and privacy

Reviewed the supplied-current résumé found in Downloads (`Mukthar_MJ_SWE_Resume (1).pdf`, dated 10 October). Its project links confirm the exact repository destinations. Its Schedura and GearPilot descriptions conflict with inspected code. The public résumé was regenerated using the verified versions; the user's original PDF was not modified. `scripts/build-resume.mjs` produces `docs/resume.html` and `public/resume.pdf` using the shared project data and headless Chrome. No phone number, physical address, unsupported shipped-project count or invented leadership claim is included.

## Verification

- All three public live project origins and the deployed portfolio returned HTTP 200 at audit time. Five public source repositories were retrieved successfully. Schedura's configured remote returned HTTP 404; no public link is rendered.
- Email, GitHub and LinkedIn destinations exactly match the supplied information. No messages were sent and no form submissions or account changes were performed.
- Browser suite covers desktop and mobile, both themes, all six case studies, images, WCAG A/AA automated checks, no horizontal overflow, theme persistence, keyboard toggle, mobile navigation/focus restoration, ordered showcase and résumé response.
- Visual review includes project hierarchy, screenshot crops, typography, spacing and existing light/dark palette. Real screenshots preserve source aspect ratio; DevMap's gallery crop uses top alignment and the case study exposes its full image.
- Application test suites in the linked projects were not rerun by this portfolio audit. Automated accessibility checks do not replace assistive-technology user testing.

Run `npm run typecheck`, `npm run lint`, `npm run build`, then `npm run test:e2e`. Browser tests use installed Google Chrome; tests and résumé generation are development tooling only.

Final local result: typecheck, lint and production build pass. Playwright: **11 passed**, with the duplicate mobile invocation of the desktop viewport matrix intentionally skipped. All seven routes pass automated WCAG A/AA checks in light/dark on desktop/mobile. Additional 320px, 768px and 1024px checks pass. The 320px test caught and prompted a fix for the longer MachineTrack next-project link. The regenerated PDF has two pages, all six projects and no phone-number text matches. Screenshot captures use CSS-pixel scale to avoid large mobile-DPR capture artifacts.

Compatible dependency fixes were applied without a framework migration. The registry audit still reports seven transitive advisories (one moderate, six high) in the Next/PostCSS and ESLint globbing chains; its suggested forced fixes would change framework/toolchain major versions. No zero-vulnerability claim is made for this portfolio. A GitHub Actions workflow now runs lint, typecheck, production build and browser checks on pushes and pull requests; its remote execution is not claimed before the workflow is pushed.
