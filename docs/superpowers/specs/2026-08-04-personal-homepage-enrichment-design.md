# Personal Homepage Enrichment Design

## Goal

Turn the current single-card identity page into a restrained, single-page academic homepage for Rongxuan Deng. The page should present him primarily as an early-stage reinforcement learning researcher while using one real-robot project as concrete evidence of engineering ability.

The result should feel young but serious, academic but not old-fashioned, and complete without pretending that there is more material than currently exists.

## Current State

The site is a dependency-free GitHub Pages homepage implemented in one `index.html` file with embedded CSS. It currently shows only:

- `Rongxuan Deng`
- `fdeng.andrew.cmu`
- `Reinforcement Learning`

The existing page is responsive and readable, but its centered card provides no hierarchy beyond identity and gives visitors no evidence of research or engineering work.

## Approved Direction

Use a restrained academic visual style with a one-page profile structure:

1. identity and research interests
2. two selected works
3. short background and education context
4. research interests
5. public contact and profile links

The design should remain content-first. It should not become a dense portfolio, dashboard, personal blog, or full CV site.

## Audience and Positioning

The primary audience is research-oriented visitors such as faculty, graduate students, lab members, and technically inclined peers.

The intended first impression is:

> A Carnegie Mellon mathematics student who is beginning serious reinforcement learning research and can carry an idea through to a real system.

Research is the primary identity. Engineering is supporting evidence, not a competing identity.

## Architecture

Keep the existing static architecture:

- one `index.html` file with semantic HTML and embedded CSS
- no framework, package manager, client-side JavaScript, analytics, or build step
- one optimized local image asset for the SO-ARM101 project
- one Node.js verification script using built-in modules
- direct compatibility with GitHub Pages

The page contains no application state or dynamic data flow. Navigation links point to page sections or external profiles. External work metadata is written as reviewed static content so the homepage remains stable if GitHub or OpenReview is temporarily unavailable.

## Page Structure

### Header and Navigation

Use a quiet header rather than a floating card.

- Left: `Rongxuan Deng`
- Right: `Work`, `About`, and `GitHub ↗`
- `Work` and `About` link to page sections.
- GitHub links to `https://github.com/Llark2008`.

On narrow screens, keep the name and GitHub link visible. The in-page links may be omitted to prevent crowding because the page is short and remains readable without a mobile menu.

### Hero

The hero establishes current identity without overstating credentials.

- Eyebrow: `Mathematics · Reinforcement Learning`
- Main statement: `Learning how agents make decisions.`
- Introductory copy:

  > I’m a first-year Mathematics student at Carnegie Mellon University, planning an additional major in Artificial Intelligence. I’m interested in reinforcement learning, decision making, and embodied intelligence.

A required but visually quiet aside lists:

- Studying at CMU
- Building with SO-ARM101
- Exploring reliable RL

This aside must remain visually secondary to the main introduction. It is part of the approved desktop and mobile information hierarchy rather than an optional enhancement.

### Selected Work

Display exactly two equal-priority entries on desktop and stack them on mobile.

#### Workshop Paper

- Label: `Workshop paper · 2026`
- Title: `Split-Half Critic Updates Improve Short-Horizon SAC AUC on Three MuJoCo Tasks`
- Venue: `RLC 2026 Workshop on Reinforcement Learning Beyond Rewards (RLBRew)`
- Status: `Accepted · non-archival`
- Link: `https://openreview.net/forum?id=hyAXXpwWZD`
- Optional topic labels: `SAC`, `MuJoCo`

The non-archival status must be visible rather than hidden in a tooltip or omitted.

#### Independent Robot Project

- Label: `Independent project · 2026`
- Title: `SO-ARM101 LeRobot Baselines`
- Link: `https://github.com/Llark2008/so-arm101-lerobot-baselines`
- Supporting image: `assets/so-arm101-workspace.jpg`, an optimized local copy of `https://raw.githubusercontent.com/Llark2008/so-arm101-lerobot-baselines/main/media/workspace_setup.jpg`, with useful alternative text
- Summary:

  > A real-robot imitation-learning pipeline spanning calibration, teleoperation, dataset collection, ACT training, deployment, and repeated evaluation.

- Result statement:

  > In the documented 20-trial evaluations, the narrow 20-demonstration baseline achieved 7/20 successes, while the broader 50-demonstration setup achieved 20/20 under its varied-pose evaluation protocol.

The project must be described as a reproduction-first baseline study, not a new algorithm. The result must not be presented as a separate out-of-distribution benchmark or as proof of general robustness.

Resize the local JPEG to no more than `1200px` on its longest edge and target a file size below `300KB`. Preserve the original aspect ratio and avoid visibly degrading the robot and workspace details.

### About and Interests

Use a compact two-column section on desktop and one column on mobile.

About copy:

> At CMU, I’m building a mathematical foundation while exploring how learning algorithms behave in both simulation and physical systems.

Interest list:

- Reinforcement learning
- Decision making
- Embodied intelligence
- Robot learning

Do not add empty sections for awards, experience, coursework, publications beyond the one accepted workshop paper, or a downloadable CV until real content exists.

### Footer

Include:

- the existing public contact text `fdeng.andrew.cmu`
- GitHub profile link
- OpenReview paper link
- `Rongxuan Deng · 2026`

Preserve `fdeng.andrew.cmu` as plain text because the current repository does not establish it as a complete email address. Do not invent a domain or `mailto:` link. A valid public email can replace it in a later content update.

## Visual System

### Typography

- Use a system serif stack for the name, main statement, and work titles.
- Use the existing system sans-serif stack for navigation, body copy, metadata, and labels.
- Do not load external fonts.
- Maintain a clear type hierarchy without oversized landing-page typography.

### Color

- Warm gray-white background
- Near-black charcoal primary text
- Muted gray-green secondary text
- One low-saturation deep green accent
- Pale green may be used for small metadata labels

Color must not be the only way to identify links or work types.

### Layout

- Maximum content width: approximately `940px`
- Generous vertical whitespace
- Thin structural dividers instead of separate floating cards
- Square or lightly rounded media treatment
- No decorative gradients, glass effects, glowing borders, or dense icon rows

The SO-ARM101 image should appear once, with restrained saturation so it supports the academic tone rather than turning the page into a product advertisement.

## Interaction and Accessibility

- Use semantic `header`, `nav`, `main`, `section`, `article`, and `footer` elements.
- Use exactly one `h1` for the person's name or primary page identity, followed by a logical heading hierarchy.
- Give in-page sections stable IDs for navigation.
- Give the robot image useful alternative text.
- Keep keyboard focus styles visible.
- Make links recognizable through underlines, borders, or another non-color signal.
- Respect `prefers-reduced-motion`; preferably use no scripted or continuous animation at all.
- Do not open external links in new tabs unless there is a clear reason. If that behavior is added, include `rel="noopener noreferrer"`.

Hover and focus behavior should be limited to subtle underline or color changes. The page needs no scroll reveal, parallax, cursor effect, theme toggle, or mobile menu JavaScript.

## Responsive Behavior

Desktop target: approximately `1280 × 720`.

- Hero uses a main column plus a quiet status aside.
- Selected works appear in two columns.
- About and interests appear in two columns.

Mobile target: `390 × 844` and widths down to `320px`.

- Hero and status aside stack.
- Selected works stack in paper-first order.
- About and interests stack.
- Navigation is simplified without introducing a menu button.
- Text and media must not create horizontal overflow.

## Error and Degradation Behavior

- If the local project image fails to load, its alternative text must preserve the subject and the surrounding project description must remain complete.
- If an external link is unavailable, the static title, venue, status, project summary, and result remain readable.
- The page must remain usable with CSS partially unavailable because the semantic content order matches the visual reading order.
- No content should depend on JavaScript.

## Content Provenance and Accuracy

- Project scope, result counts, and limitations were reviewed against the repository README at `Llark2008/so-arm101-lerobot-baselines`.
- Paper title, acceptance, workshop name, and non-archival status were supplied and approved by the site owner. OpenReview presented a challenge page in the design environment, so implementation must use the exact owner-approved wording rather than infer additional metadata.
- The education statement must say the AI additional major is planned, not completed or formally declared.

## Verification

Extend `scripts/verify-homepage.mjs` using Node.js built-ins to check:

- the name and current contact text are present
- exactly one `h1` exists
- `header`, `nav`, `main`, two `article` elements, and `footer` exist
- `Work` and `About` section IDs exist
- the exact GitHub repository and OpenReview URLs exist
- the workshop paper is visibly labeled `non-archival`
- the project result includes both `7/20` and `20/20`
- the viewport and description metadata exist
- the robot image has non-empty alternative text

Manual verification should cover:

- desktop layout at `1280 × 720`
- mobile layout at `390 × 844`
- no horizontal overflow at either size
- readable focus states and keyboard navigation
- external links
- layout with the project image intentionally unavailable
- browser console contains no errors

## Expected File Changes

- Update `index.html` with the approved content, structure, and embedded styles.
- Update `scripts/verify-homepage.mjs` with the expanded checks.
- Add one optimized local image under `assets/`.
- Do not add a framework, package manifest, build configuration, or additional page.

## Non-Goals

- Blog or research-notes publishing system
- Full CV or résumé page
- Multiple publication entries without source material
- Project gallery beyond the one SO-ARM101 project
- Dark mode or theme switcher
- Analytics, contact form, or backend
- Automatic GitHub or OpenReview data fetching
- Elaborate animation

## Success Criteria

The design succeeds if a first-time visitor can understand within several seconds that Rongxuan Deng is:

1. a CMU mathematics student planning additional study in AI,
2. focused on reinforcement learning,
3. the author of one accepted non-archival workshop paper, and
4. capable of building and evaluating a real-robot learning pipeline.

The page should feel substantially richer than the current identity card while remaining honest, fast, readable, and easy to extend when new work appears.
