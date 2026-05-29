import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homepagePath = resolve("index.html");

let html;

try {
  html = readFileSync(homepagePath, "utf8");
} catch {
  console.error(`Missing homepage file: ${homepagePath}`);
  process.exit(1);
}

const checks = [
  {
    name: "name is present",
    test: () => html.includes("Rongxuan Deng"),
  },
  {
    name: "contact is present",
    test: () => html.includes("fdeng.andrew.cmu"),
  },
  {
    name: "research area is present",
    test: () => html.includes("Reinforcement Learning"),
  },
  {
    name: "title metadata exists",
    test: () => /<title>[^<]+<\/title>/i.test(html),
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

console.log("Homepage verification passed.");
