# Portfolio redesign — September 2026

The new visual direction uses warm paper, dark ink, a vermilion accent, Inter, and Instrument Serif. Product screenshots lead an asymmetric work gallery. About is an editorial introduction, with education and the résumé together; capabilities are a six-category index of the 28 requested technologies. The same design system carries through all four case studies.

Lab, Interests, the 3D hero, their unused components/data, the old font family, and the unused Three.js/React Three Fiber/Framer Motion dependencies were removed. Existing project narratives, statuses, stacks, screenshots, and URLs were compared programmatically with Git and are unchanged.

The public résumé has a redacted contact header with email, GitHub, and LinkedIn. The phone number and personal location line were removed from the downloadable copy. The original source document in `docs/` remains private and unchanged. No address is published by the website.

## Verification

- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- Homepage and all four case studies return HTTP 200; unknown projects return the designed 404.
- Headless Chrome checks at 320, 390, 768, 1024, and 1440 pixels found no horizontal overflow on any page.
- Desktop/mobile screenshots were visually reviewed. All project images load successfully.
- Axe 4.10.3 reports zero violations on all five pages for WCAG 2 A/AA, WCAG 2.1 AA, and best-practice rules. This is an automated check, not an accessibility certification.
- Mobile menu Tab containment, Escape, focus restoration, all five section destinations, project navigation, return-to-work, and keyboard skip link pass.
- Email copying and the exact email, GitHub, and LinkedIn destinations pass. The résumé endpoint serves a valid PDF.
- Reduced motion disables entrance/reveal animations and smooth scrolling. Content remains readable with JavaScript disabled.
- Source and production output scans found no phone number, telephone URL, Lab placeholders, or former visual identity references.
- CODEVERSE, Zenugo AI, GearPilot, and GitHub returned HTTP 200. Schedura has no supplied live URL, so no live link is rendered. LinkedIn returned HTTP 999 to automated requests; the exact user-supplied destination is retained, but its remote profile response could not be verified.

No new application dependencies were added. The site retains Next.js/TypeScript, local fonts, responsive Next Image delivery, and small client components for navigation, copy feedback, and progressive scroll reveals.

## Focused theme and gallery refinement

Light retains the paper palette. Dark uses warm charcoal, ivory type, terracotta accents, sage editorial sections, and individually tuned project media backgrounds. The 44px keyboard-accessible sun/moon control appears in the header and mobile menu. Manual choices persist across routes, reloads, and tabs; otherwise system preference is followed, with light as the fallback. An inline initializer applies the preference before normal-page hydration; a client fallback also covers Next's error-page recovery. Blocked browser storage still permits an in-session choice. Color transitions run only on manual changes and respect reduced motion.

The work gallery now presents CODEVERSE as a lead feature with its caption alongside, Zenugo AI and Schedura as an unequal pair, and GearPilot as a smaller thumbnail-led entry. Mobile preserves that hierarchy. All four existing PNGs were verified as 1920×1080 and byte-identical to their source copies in `docs/`. Originals remain unaltered; responsive image delivery uses quality 90, preserved aspect ratios, smaller case-study media bounds, and no hover scaling or artificial sharpening.

Both themes were visually reviewed across the homepage, all four case studies, and mobile navigation. Chrome checks at 320, 390, 768, 1024, and 1440px found no horizontal overflow in either theme. Axe scans reported zero violations on all five pages in both themes, including mobile scans. Keyboard toggling, manual/system preference precedence, cross-tab updates, route/reload persistence, reduced motion, storage failures, pre-hydration dark mode, and both themed 404 states were checked. Mobile anchors now close the dialog and release its scroll lock before navigation. Typecheck, lint, production build, and whitespace checks pass. Source and production scans still contain no phone number or telephone links.
