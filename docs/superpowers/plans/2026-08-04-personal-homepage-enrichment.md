# Personal Homepage Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current identity card with a responsive, honest single-page academic homepage that presents Rongxuan Deng's workshop paper and SO-ARM101 project.

**Architecture:** Preserve the dependency-free GitHub Pages architecture: one semantic `index.html` file with embedded CSS, one optimized local JPEG asset, and one Node.js built-in verification script. The page has no runtime state, JavaScript, framework, package manifest, or external data fetching.

**Tech Stack:** HTML5, CSS, Node.js built-ins, macOS `sips` for the one-time image optimization, GitHub Pages.

---

## Source Documents

- Approved design: `docs/superpowers/specs/2026-08-04-personal-homepage-enrichment-design.md`
- Project source: `https://github.com/Llark2008/so-arm101-lerobot-baselines`
- Paper source: `https://openreview.net/forum?id=hyAXXpwWZD`

Run all commands from `/Users/Freddy/personal_website/personal_website` on the existing `codex/personal-homepage` branch. Preserve the unrelated untracked `.DS_Store` and `.superpowers/` paths.

## File Structure

- Modify `scripts/verify-homepage.mjs`: verify content, links, semantic structure, accessibility basics, and the local image asset.
- Create `assets/so-arm101-workspace.jpg`: optimized local project image, longest edge at most 1200px and file size below 300KB.
- Modify `index.html`: complete semantic single-page homepage and embedded responsive visual system.

Do not add a package manifest, CSS file, JavaScript file, framework, analytics, contact form, theme switcher, or additional page.

### Task 1: Expand the Homepage Contract

**Required skill:** `@superpowers:test-driven-development`

**Files:**
- Modify: `scripts/verify-homepage.mjs:1-51`
- Test: `scripts/verify-homepage.mjs`

- [ ] **Step 1: Replace the current verification script with the expanded failing contract**

Use this complete script:

```js
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const homepagePath = resolve("index.html");
const projectImagePath = resolve("assets/so-arm101-workspace.jpg");

let html;

try {
  html = readFileSync(homepagePath, "utf8");
} catch {
  console.error(`Missing homepage file: ${homepagePath}`);
  process.exit(1);
}

const countMatches = (pattern) => html.match(pattern)?.length ?? 0;

const checks = [
  {
    name: "name is present",
    test: () => html.includes("Rongxuan Deng"),
  },
  {
    name: "complete public email is present",
    test: () => html.includes("fdeng@andrew.cmu.edu"),
  },
  {
    name: "public email has a mailto link",
    test: () => html.includes('href="mailto:fdeng@andrew.cmu.edu"'),
  },
  {
    name: "incomplete legacy contact is absent",
    test: () => !html.includes("fdeng.andrew.cmu"),
  },
  {
    name: "exactly one h1 exists",
    test: () => countMatches(/<h1\b/gi) === 1,
  },
  {
    name: "semantic page regions exist",
    test: () =>
      /<header\b/i.test(html) &&
      /<nav\b/i.test(html) &&
      /<main\b/i.test(html) &&
      /<footer\b/i.test(html),
  },
  {
    name: "two selected work articles exist",
    test: () => countMatches(/<article\b/gi) === 2,
  },
  {
    name: "work and about anchors exist",
    test: () => html.includes('id="work"') && html.includes('id="about"'),
  },
  {
    name: "GitHub profile link exists",
    test: () => html.includes('href="https://github.com/Llark2008"'),
  },
  {
    name: "robot project link exists",
    test: () =>
      html.includes(
        'href="https://github.com/Llark2008/so-arm101-lerobot-baselines"',
      ),
  },
  {
    name: "OpenReview link exists",
    test: () =>
      html.includes(
        'href="https://openreview.net/forum?id=hyAXXpwWZD"',
      ),
  },
  {
    name: "paper is visibly non-archival",
    test: () => /non-archival/i.test(html),
  },
  {
    name: "robot evaluation counts are present",
    test: () => html.includes("7/20") && html.includes("20/20"),
  },
  {
    name: "robot image has the expected source and alt text",
    test: () =>
      /<img\s+[^>]*src="assets\/so-arm101-workspace\.jpg"[^>]*alt="[^"]+"/i.test(
        html,
      ),
  },
  {
    name: "local robot image exists",
    test: () => existsSync(projectImagePath),
  },
  {
    name: "local robot image is below 300KB",
    test: () =>
      existsSync(projectImagePath) && statSync(projectImagePath).size < 300_000,
  },
  {
    name: "title metadata exists",
    test: () => /<title>[^<]+<\/title>/i.test(html),
  },
  {
    name: "description metadata exists",
    test: () => /<meta\s+name="description"\s+content="[^"]+"/i.test(html),
  },
  {
    name: "viewport metadata exists",
    test: () =>
      /<meta\s+name="viewport"\s+content="[^"]*width=device-width[^"]*"/i.test(
        html,
      ),
  },
];

const failures = checks.filter((check) => !check.test());

if (failures.length > 0) {
  console.error("Homepage verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log(`Homepage verification passed (${checks.length} checks).`);
```

- [ ] **Step 2: Run the verifier and confirm the new contract fails**

Run:

```bash
node scripts/verify-homepage.mjs
```

Expected: exit code `1`. The output must include failures for the complete public email, semantic regions, selected-work articles, external links, evaluation counts, and local robot image. If it passes, the test was not updated correctly.

- [ ] **Step 3: Inspect the test-only diff**

Run:

```bash
git diff --check
git diff -- scripts/verify-homepage.mjs
```

Expected: no whitespace errors and only the deliberate verifier expansion.

- [ ] **Step 4: Commit the failing contract**

```bash
git add scripts/verify-homepage.mjs
git commit -m "test: define enriched homepage contract"
```

### Task 2: Add the Optimized Robot Image

**Files:**
- Create: `assets/so-arm101-workspace.jpg`
- Test: `scripts/verify-homepage.mjs`

- [ ] **Step 1: Download the exact approved source image**

```bash
mkdir -p assets
curl -L --fail "https://raw.githubusercontent.com/Llark2008/so-arm101-lerobot-baselines/main/media/workspace_setup.jpg" -o assets/so-arm101-workspace-source.jpg
```

Expected: `assets/so-arm101-workspace-source.jpg` exists and is a readable JPEG.

- [ ] **Step 2: Create the optimized local JPEG**

```bash
sips -Z 1200 -s format jpeg -s formatOptions 72 assets/so-arm101-workspace-source.jpg --out assets/so-arm101-workspace.jpg
```

Expected: `assets/so-arm101-workspace.jpg` exists, preserves the original aspect ratio, and has no dimension above 1200px.

- [ ] **Step 3: Remove only the explicit temporary source copy**

```bash
rm assets/so-arm101-workspace-source.jpg
```

Expected: the temporary source is gone and the optimized target remains.

- [ ] **Step 4: Verify dimensions and file size**

```bash
sips -g pixelWidth -g pixelHeight assets/so-arm101-workspace.jpg
stat -f "%z bytes" assets/so-arm101-workspace.jpg
```

Expected: neither dimension exceeds `1200`; file size is less than `300000 bytes`. If it is larger, rerun Step 2 with `formatOptions 65`, then repeat this step.

- [ ] **Step 5: Re-run the verifier and confirm only HTML-related failures remain**

```bash
node scripts/verify-homepage.mjs
```

Expected: exit code `1`; `local robot image exists` and `local robot image is below 300KB` are no longer listed as failures.

- [ ] **Step 6: Commit the asset**

```bash
git add assets/so-arm101-workspace.jpg
git commit -m "feat: add optimized robot project image"
```

### Task 3: Build the Semantic Single-Page Homepage

**Required skill:** `@superpowers:test-driven-development`

**Files:**
- Modify: `index.html:1-104`
- Test: `scripts/verify-homepage.mjs`

- [ ] **Step 1: Replace `index.html` with the complete approved document**

Use the following file exactly as the implementation baseline:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta
      name="description"
      content="Rongxuan Deng is a Carnegie Mellon mathematics student interested in reinforcement learning, decision making, and embodied intelligence."
    >
    <title>Rongxuan Deng — Reinforcement Learning</title>
    <style>
      :root {
        color-scheme: light;
        --background: #fafbf9;
        --surface: #f0f4f1;
        --text: #18211e;
        --muted: #68716d;
        --line: #d7ddd9;
        --accent: #1d6658;
        --accent-soft: #e7f0ec;
        --content-width: 940px;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        min-height: 100vh;
        margin: 0;
        background: var(--background);
        color: var(--text);
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
      }

      a {
        color: inherit;
        text-decoration-color: color-mix(in srgb, var(--accent) 55%, transparent);
        text-decoration-thickness: 1px;
        text-underline-offset: 4px;
      }

      a:hover {
        color: var(--accent);
        text-decoration-color: currentColor;
      }

      a:focus-visible {
        border-radius: 2px;
        outline: 3px solid color-mix(in srgb, var(--accent) 32%, transparent);
        outline-offset: 4px;
      }

      .shell {
        width: min(calc(100% - 48px), var(--content-width));
        margin-inline: auto;
      }

      .site-header {
        border-bottom: 1px solid var(--line);
      }

      .site-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 76px;
        gap: 24px;
      }

      .site-name {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 1.12rem;
      }

      .nav-links,
      .footer-links,
      .metadata {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 18px;
      }

      .nav-links {
        color: var(--muted);
        font-size: 0.84rem;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.6fr) minmax(210px, 0.65fr);
        gap: 64px;
        padding-block: 88px 72px;
      }

      .eyebrow,
      .section-label,
      .work-kind {
        margin: 0;
        color: var(--accent);
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.13em;
        text-transform: uppercase;
      }

      h1,
      h2,
      h3,
      .statement {
        font-family: Georgia, "Times New Roman", serif;
        font-weight: 500;
      }

      h1 {
        margin: 15px 0 5px;
        font-size: clamp(3rem, 8vw, 5.5rem);
        line-height: 0.95;
        letter-spacing: -0.045em;
      }

      .statement {
        margin: 18px 0 20px;
        font-size: clamp(1.65rem, 3.2vw, 2.35rem);
        line-height: 1.12;
        letter-spacing: -0.025em;
      }

      .intro,
      .work-summary,
      .about-copy {
        color: var(--muted);
        line-height: 1.72;
      }

      .intro {
        max-width: 41rem;
        margin: 0;
        font-size: 1rem;
      }

      .current {
        align-self: end;
        border-left: 1px solid var(--line);
        padding: 6px 0 6px 24px;
        color: var(--muted);
        font-size: 0.86rem;
        line-height: 1.8;
      }

      .current strong {
        display: block;
        margin-bottom: 4px;
        color: var(--text);
      }

      .section-heading {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 24px;
        border-top: 1px solid var(--line);
        padding-block: 30px 19px;
      }

      .section-note {
        margin: 0;
        color: var(--muted);
        font-size: 0.78rem;
      }

      .work-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
        padding-bottom: 78px;
      }

      .work-item {
        min-width: 0;
        border-top: 2px solid var(--text);
        padding-top: 18px;
      }

      .work-visual,
      .work-image {
        width: 100%;
        height: 220px;
        margin-bottom: 22px;
      }

      .work-visual {
        display: grid;
        place-items: center;
        padding: 28px;
        border: 1px solid var(--line);
        background: var(--surface);
      }

      .work-visual p {
        max-width: 17em;
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 1.45rem;
        line-height: 1.25;
        text-align: center;
      }

      .work-image {
        display: block;
        background: var(--surface);
        object-fit: cover;
        filter: saturate(0.72) contrast(0.96);
      }

      .work-item h3 {
        margin: 10px 0 12px;
        font-size: clamp(1.55rem, 2.8vw, 2.15rem);
        line-height: 1.18;
        letter-spacing: -0.025em;
      }

      .work-summary {
        margin: 0;
        font-size: 0.93rem;
      }

      .metadata {
        margin-top: 18px;
        gap: 8px;
      }

      .metadata span,
      .metadata a {
        background: var(--accent-soft);
        color: var(--accent);
        padding: 6px 9px;
        font-size: 0.76rem;
        font-weight: 650;
      }

      .about {
        display: grid;
        grid-template-columns: 1.35fr 0.65fr;
        gap: 72px;
        border-top: 1px solid var(--line);
        padding-block: 46px 64px;
      }

      .about-title {
        margin: 10px 0 14px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 1.8rem;
        font-weight: 500;
      }

      .about-copy,
      .interest-list {
        margin: 0;
        font-size: 0.93rem;
      }

      .interest-list {
        padding: 10px 0 0;
        color: var(--muted);
        line-height: 1.9;
        list-style: none;
      }

      .site-footer {
        border-top: 1px solid var(--line);
      }

      .footer-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        min-height: 92px;
        color: var(--muted);
        font-size: 0.82rem;
      }

      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
      }

      @media (max-width: 700px) {
        .shell {
          width: min(calc(100% - 32px), var(--content-width));
        }

        .site-nav {
          min-height: 68px;
        }

        .nav-section-link {
          display: none;
        }

        .hero,
        .work-grid,
        .about {
          grid-template-columns: 1fr;
        }

        .hero {
          gap: 36px;
          padding-block: 62px 54px;
        }

        .current {
          border-left: 0;
          border-top: 1px solid var(--line);
          padding: 18px 0 0;
        }

        .work-grid {
          gap: 48px;
          padding-bottom: 62px;
        }

        .work-visual,
        .work-image {
          height: 200px;
        }

        .about {
          gap: 34px;
          padding-block: 40px 52px;
        }

        .footer-inner {
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
          padding-block: 24px;
        }
      }
    </style>
  </head>
  <body>
    <header class="site-header">
      <nav class="site-nav shell" aria-label="Primary navigation">
        <a class="site-name" href="#top">Rongxuan Deng</a>
        <div class="nav-links">
          <a class="nav-section-link" href="#work">Work</a>
          <a class="nav-section-link" href="#about">About</a>
          <a href="https://github.com/Llark2008">GitHub ↗</a>
        </div>
      </nav>
    </header>

    <main id="top">
      <section class="hero shell" aria-labelledby="page-title">
        <div>
          <p class="eyebrow">Mathematics · Reinforcement Learning</p>
          <h1 id="page-title">Rongxuan Deng</h1>
          <p class="statement">Learning how agents make decisions.</p>
          <p class="intro">
            I’m a first-year Mathematics student at Carnegie Mellon University,
            planning an additional major in Artificial Intelligence. I’m
            interested in reinforcement learning, decision making, and embodied
            intelligence.
          </p>
        </div>
        <aside class="current" aria-label="Current focus">
          <strong>Currently</strong>
          Studying at CMU<br>
          Building with SO-ARM101<br>
          Exploring reliable RL
        </aside>
      </section>

      <section id="work" class="shell" aria-labelledby="work-title">
        <div class="section-heading">
          <h2 id="work-title" class="section-label">Selected work</h2>
          <p class="section-note">One paper · one real-system project</p>
        </div>

        <div class="work-grid">
          <article class="work-item">
            <div class="work-visual" aria-hidden="true">
              <p>Split-Half Critic Updates Improve Short-Horizon SAC AUC</p>
            </div>
            <p class="work-kind">Workshop paper · 2026</p>
            <h3>
              Split-Half Critic Updates Improve Short-Horizon SAC AUC on Three
              MuJoCo Tasks
            </h3>
            <p class="work-summary">
              Accepted at the RLC 2026 Workshop on Reinforcement Learning Beyond
              Rewards (RLBRew). Non-archival.
            </p>
            <div class="metadata">
              <a href="https://openreview.net/forum?id=hyAXXpwWZD">OpenReview ↗</a>
              <span>SAC</span>
              <span>MuJoCo</span>
            </div>
          </article>

          <article class="work-item">
            <img
              class="work-image"
              src="assets/so-arm101-workspace.jpg"
              alt="SO-ARM101 robot arms and camera arranged on a tabletop workspace"
            >
            <p class="work-kind">Independent project · 2026</p>
            <h3>SO-ARM101 LeRobot Baselines</h3>
            <p class="work-summary">
              A reproduction-first real-robot imitation-learning pipeline spanning
              calibration, teleoperation, dataset collection, ACT training,
              deployment, and repeated evaluation. In the documented 20-trial
              evaluations, the narrow 20-demonstration baseline achieved 7/20
              successes, while the broader 50-demonstration setup achieved 20/20
              under its varied-pose evaluation protocol.
            </p>
            <div class="metadata">
              <a href="https://github.com/Llark2008/so-arm101-lerobot-baselines">GitHub ↗</a>
              <span>ACT</span>
              <span>Real robot</span>
            </div>
          </article>
        </div>
      </section>

      <section id="about" class="about shell" aria-labelledby="about-title">
        <div>
          <p class="section-label">About</p>
          <h2 id="about-title" class="about-title">
            Mathematics first, AI alongside it.
          </h2>
          <p class="about-copy">
            At CMU, I’m building a mathematical foundation while exploring how
            learning algorithms behave in both simulation and physical systems.
          </p>
        </div>
        <div>
          <p class="section-label">Interests</p>
          <ul class="interest-list">
            <li>Reinforcement learning</li>
            <li>Decision making</li>
            <li>Embodied intelligence</li>
            <li>Robot learning</li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner shell">
        <div class="footer-links">
          <a href="mailto:fdeng@andrew.cmu.edu">fdeng@andrew.cmu.edu</a>
          <a href="https://github.com/Llark2008">GitHub</a>
          <a href="https://openreview.net/forum?id=hyAXXpwWZD">OpenReview</a>
        </div>
        <span>Rongxuan Deng · 2026</span>
      </div>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: Run the expanded verifier**

```bash
node scripts/verify-homepage.mjs
```

Expected: exit code `0` and `Homepage verification passed (19 checks).`

- [ ] **Step 3: Validate the diff and confirm no unrelated path is staged**

```bash
git diff --check
git diff -- index.html
git status --short
```

Expected: no whitespace errors; `index.html` is the only new implementation change. `.DS_Store` and `.superpowers/` remain untracked and untouched.

- [ ] **Step 4: Commit the semantic homepage**

```bash
git add index.html
git commit -m "feat: build academic single-page homepage"
```

### Task 4: Verify Responsive, Accessible, and Degraded States

**Required skills:** `@browser:control-in-app-browser`, `@superpowers:verification-before-completion`

**Files:**
- Modify if required by evidence: `index.html`
- Modify if required by evidence: `scripts/verify-homepage.mjs`
- Test: `scripts/verify-homepage.mjs`

- [ ] **Step 1: Run automated verification from a clean command invocation**

```bash
node scripts/verify-homepage.mjs
```

Expected: exit code `0` and `Homepage verification passed (19 checks).`

- [ ] **Step 2: Start a local static server**

```bash
python3 -m http.server 4173
```

Expected: homepage is available at `http://127.0.0.1:4173/`. Keep this process running only for the browser checks below.

- [ ] **Step 3: Inspect the desktop page at 1280 × 720**

Use `@browser:control-in-app-browser` to open `http://127.0.0.1:4173/`, set the viewport to `1280 × 720`, and verify:

- one `h1` and a logical heading order
- hero identity and the required current-focus aside are visible
- paper and project appear in two columns with equal visual priority
- `non-archival`, `7/20`, and `20/20` are visible without interaction
- the robot image is loaded and not distorted
- footer displays `fdeng@andrew.cmu.edu`
- no horizontal overflow
- browser console contains no errors

Expected: all checks pass. Save a screenshot for evidence if implementation work requires iteration.

- [ ] **Step 4: Inspect the primary mobile page at 390 × 844**

Using the same tab, set the viewport to `390 × 844`, reload, and verify:

- no horizontal overflow
- hero and current-focus aside stack
- paper appears before the robot project
- work items and About/Interests stack in one column
- in-page navigation links are hidden while GitHub remains visible
- text, links, and the image fit without overlap or clipping

Expected: all checks pass.

- [ ] **Step 5: Inspect the minimum supported width at 320 × 720**

Using the same tab, set the viewport to `320 × 720`, reload, and repeat the overflow, stacking, navigation, text-fitting, and image-fitting checks from Step 4.

Expected: no horizontal overflow, overlap, or clipping at the minimum supported width.

- [ ] **Step 6: Verify keyboard and link behavior**

At the desktop viewport:

- press Tab through navigation, work links, and footer links
- verify a visible focus outline on every interactive element
- activate `Work` and `About` and confirm their section targets
- verify the email link resolves to `mailto:fdeng@andrew.cmu.edu`
- verify GitHub profile, project, and OpenReview URLs match the approved URLs

Expected: focus order follows document order, every focus state is visible, and every target is exact.

- [ ] **Step 7: Verify graceful image degradation**

Use a read-only browser evaluation or a temporary developer-tools override to set the project image source to an unavailable local path. Do not edit the committed file for this check.

Verify that:

- the alternative text identifies the SO-ARM101 workspace
- the article title, description, counts, and GitHub link remain readable
- the broken image does not cause horizontal overflow or obscure adjacent content

Expected: project meaning and layout remain usable without the image.

- [ ] **Step 8: Fix only evidence-backed issues and repeat the full checks**

If a check fails, update only the relevant `index.html` style/markup or verifier assertion. Then repeat Steps 1, 3, 4, 5, 6, and 7 until all pass. Do not add unrequested animation, JavaScript, new sections, or dependencies.

- [ ] **Step 9: Run final repository verification**

```bash
node scripts/verify-homepage.mjs
git diff --check
git status --short
```

Expected:

- verifier reports `19 checks` passed
- no whitespace errors
- only evidence-backed follow-up changes, if any, remain
- `.DS_Store` and `.superpowers/` remain untracked and untouched

- [ ] **Step 10: Commit any QA fixes**

If Step 8 changed tracked files:

```bash
git add index.html scripts/verify-homepage.mjs
git commit -m "fix: polish homepage responsive behavior"
```

If no tracked file changed, skip this commit.

### Task 5: Final Review and Branch Handoff

**Required skills:** `@superpowers:requesting-code-review`, `@superpowers:verification-before-completion`, `@superpowers:finishing-a-development-branch`

**Files:**
- Review: `index.html`
- Review: `scripts/verify-homepage.mjs`
- Review: `assets/so-arm101-workspace.jpg`

- [ ] **Step 1: Request an implementation review against the approved spec**

Use `@superpowers:requesting-code-review`. Provide the design spec, this plan, and the exact commit range created during execution. Ask the reviewer to focus on factual accuracy, accessibility, responsive behavior, and scope control.

Expected: no blocking review findings. Address blocking findings with focused changes and repeat Task 4 verification.

- [ ] **Step 2: Run the final verification commands after review**

```bash
node scripts/verify-homepage.mjs
git diff --check
git status --short
git log --oneline --decorate -6
```

Expected:

- verifier reports `Homepage verification passed (19 checks).`
- no whitespace errors
- all intended tracked changes are committed
- only the pre-existing `.DS_Store` and the brainstorming `.superpowers/` path remain untracked
- recent commits show the test, asset, homepage, and any evidence-backed QA fix commits

- [ ] **Step 3: Present integration options**

Use `@superpowers:finishing-a-development-branch` to present merge, pull-request, keep-branch, or cleanup choices. Do not push, merge, or open a pull request without the user's selected option.
