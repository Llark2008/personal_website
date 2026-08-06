# About AI Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the homepage About section so artificial intelligence is the intended direction and mathematics is its foundation, without overstating the planned AI additional major.

**Architecture:** Keep the existing dependency-free single-page architecture. Extend the Node.js content contract first, then make the smallest matching HTML copy change and visually confirm that the longer heading remains readable at the established desktop and mobile widths.

**Tech Stack:** Static HTML/CSS, Node.js built-ins, Git, in-app browser QA

## Global Constraints

- The About heading must be exactly `Mathematical foundations for intelligent systems.`
- The About body must be exactly `At CMU, I’m building a strong mathematical foundation for work in artificial intelligence, with a focus on how learning agents make decisions in simulated and physical systems.`
- The superseded `Mathematics first, AI alongside it.` heading must be absent.
- The Hero must continue to describe the AI additional major as planned, not completed or formally declared.
- No JavaScript, framework, build step, or external dependency may be added.
- Existing desktop and mobile layouts must remain free of overflow, overlap, and clipping.

---

### Task 1: Reframe the About section around AI

**Files:**
- Modify: `scripts/verify-homepage.mjs`
- Modify: `index.html:439-448`

**Interfaces:**
- Consumes: the static `index.html` file read by `scripts/verify-homepage.mjs`
- Produces: three new homepage contract checks and the approved About heading/body copy

- [ ] **Step 1: Write the failing content checks**

Insert these checks after `work and about anchors exist` in `scripts/verify-homepage.mjs`:

```js
  {
    name: "About heading frames mathematics as a foundation for intelligent systems",
    test: () =>
      html.includes("Mathematical foundations for intelligent systems."),
  },
  {
    name: "About copy frames mathematics as preparation for AI work",
    test: () =>
      html.includes(
        "At CMU, I’m building a strong mathematical foundation for work in artificial intelligence, with a focus on how learning agents make decisions in simulated and physical systems.",
      ),
  },
  {
    name: "superseded About priority hierarchy is absent",
    test: () => !html.includes("Mathematics first, AI alongside it."),
  },
```

- [ ] **Step 2: Run the verifier to confirm the expected failure**

Run: `node scripts/verify-homepage.mjs`

Expected: FAIL only for the three new About checks because `index.html` still contains the superseded heading and body.

- [ ] **Step 3: Apply the minimal About copy change**

Replace the existing About heading and paragraph in `index.html` with:

```html
          <h2 id="about-title" class="about-title">
            Mathematical foundations for intelligent systems.
          </h2>
          <p class="about-copy">
            At CMU, I’m building a strong mathematical foundation for work in
            artificial intelligence, with a focus on how learning agents make
            decisions in simulated and physical systems.
          </p>
```

- [ ] **Step 4: Run automated verification**

Run: `node scripts/verify-homepage.mjs && git diff --check`

Expected: `Homepage verification passed (22 checks).` and exit status `0`, with no whitespace errors.

- [ ] **Step 5: Verify the existing layout at desktop and mobile widths**

Open or reload `index.html` in the in-app browser and inspect at approximately `1280 × 720`, `390 × 844`, and `320 × 720`.

Expected at all three widths:

- the approved About heading and paragraph are visible
- the heading wraps naturally without isolated or clipped text
- the About/Interests columns retain the existing desktop and mobile behavior
- the page has no horizontal overflow, overlap, or clipping

- [ ] **Step 6: Commit and update the existing Draft PR**

```bash
git add scripts/verify-homepage.mjs index.html
git commit -m "refine About AI positioning"
git push
```

Expected: the branch `codex/homepage-enrichment` tracks the pushed commit and Draft PR `#2` remains open against `main`.
