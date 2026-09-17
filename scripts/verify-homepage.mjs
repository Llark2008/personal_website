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
const normalizedText = html.replace(/\s+/g, " ").trim();
const newPaperArticle =
  html.match(
    /<article\b[^>]*aria-labelledby="interaction-cache-title"[^>]*>[\s\S]*?<\/article>/i,
  )?.[0] ?? "";
const normalizedNewPaperArticle = newPaperArticle.replace(/\s+/g, " ").trim();

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
    name: "three selected work articles exist",
    test: () => countMatches(/<article\b/gi) === 3,
  },
  {
    name: "selected work items appear in the intended order",
    test: () => {
      const newPaperIndex = html.indexOf(
        'aria-labelledby="interaction-cache-title"',
      );
      const sacPaperIndex = html.indexOf(
        "Split-Half Critic Updates Improve Short-Horizon SAC AUC",
      );
      const robotProjectIndex = html.indexOf("SO-ARM101 LeRobot Baselines");

      return (
        newPaperIndex > -1 &&
        newPaperIndex < sacPaperIndex &&
        sacPaperIndex < robotProjectIndex
      );
    },
  },
  {
    name: "new paper title and acceptance venue are present",
    test: () =>
      normalizedNewPaperArticle.includes(
        "Exact Interaction Caching for Multi-Robot Assignment Refinement",
      ) &&
      normalizedNewPaperArticle.includes(
        "IROS 2026 Workshop on Multi-Agent Systems: Beyond the Warehouse (MAS-BW26)",
      ),
  },
  {
    name: "new paper presentation format and results are present",
    test: () =>
      normalizedNewPaperArticle.includes("poster and lightning talk") &&
      normalizedNewPaperArticle.includes("1,920 prespecified VMAS worlds") &&
      normalizedNewPaperArticle.includes("30.76–49.57%"),
  },
  {
    name: "new paper kind and tags are present",
    test: () =>
      normalizedNewPaperArticle.includes(
        "Workshop extended abstract · 2026",
      ) &&
      normalizedNewPaperArticle.includes("Multi-robot systems") &&
      normalizedNewPaperArticle.includes("Planning") &&
      normalizedNewPaperArticle.includes("Accepted"),
  },
  {
    name: "new paper card has no external-link placeholder",
    test: () =>
      newPaperArticle.length > 0 &&
      !/<(?:a|button)\b/i.test(newPaperArticle) &&
      !/\b(?:coming soon|forthcoming|tbd|placeholder)\b/i.test(
        normalizedNewPaperArticle,
      ),
  },
  {
    name: "selected work summary reflects two papers and one project",
    test: () => normalizedText.includes("Two papers · one real-system project"),
  },
  {
    name: "work and about anchors exist",
    test: () => html.includes('id="work"') && html.includes('id="about"'),
  },
  {
    name: "About heading frames mathematics as a foundation for intelligent systems",
    test: () =>
      normalizedText.includes(
        "Mathematical foundations for intelligent systems.",
      ),
  },
  {
    name: "About copy frames mathematics as preparation for AI work",
    test: () =>
      normalizedText.includes(
        "At CMU, I’m building a strong mathematical foundation for work in artificial intelligence, with a focus on how learning agents make decisions in simulated and physical systems.",
      ),
  },
  {
    name: "superseded About priority hierarchy is absent",
    test: () =>
      !normalizedText.includes("Mathematics first, AI alongside it."),
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
