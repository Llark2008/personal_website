# Personal Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal static personal homepage for Rongxuan Deng that works on GitHub Pages.

**Architecture:** Create one static `index.html` file with embedded CSS and no external dependencies. Add a small Node.js verification script that checks required content and HTML metadata.

**Tech Stack:** HTML, CSS, Node.js built-ins for verification.

---

## File Structure

- `index.html`: Static personal homepage with embedded CSS.
- `scripts/verify-homepage.mjs`: Local verification script for required page content and metadata.
- `docs/superpowers/specs/2026-05-29-personal-homepage-design.md`: Approved design notes.

### Task 1: Homepage Verification

**Files:**
- Create: `scripts/verify-homepage.mjs`
- Create: `index.html`

- [ ] **Step 1: Write the failing verification script**

Create a Node.js script that reads `index.html` and checks for:

- `Rongxuan Deng`
- `fdeng.andrew.cmu`
- `Reinforcement Learning`
- `<title>`
- viewport metadata

- [ ] **Step 2: Run verification to confirm it fails**

Run: `node scripts/verify-homepage.mjs`

Expected: FAIL because `index.html` does not exist yet.

- [ ] **Step 3: Create the minimal homepage**

Create `index.html` with a centered single-screen identity card, responsive CSS, and basic metadata.

- [ ] **Step 4: Run verification to confirm it passes**

Run: `node scripts/verify-homepage.mjs`

Expected: PASS with all checks satisfied.

- [ ] **Step 5: Inspect git diff**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors and only the intended files changed.
