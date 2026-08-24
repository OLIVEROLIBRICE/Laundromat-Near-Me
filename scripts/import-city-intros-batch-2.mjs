import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the pasted-text source path as the first argument.");

const states = {
  CA: "California",
  CO: "Colorado",
  GA: "Georgia",
  IL: "Illinois",
  MA: "Massachusetts",
  MD: "Maryland",
  MI: "Michigan",
  MN: "Minnesota",
  NY: "New York",
  OR: "Oregon",
  TN: "Tennessee",
  TX: "Texas",
  WA: "Washington",
};

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const text = await readFile(sourcePath, "utf8");
const sections = [...text.matchAll(/^## (.+), ([A-Z]{2})\n\nLaundromats in .+\n\n([\s\S]*?)(?=\n\n## |$)/gm)];

const records = Object.fromEntries(sections.map((match) => {
  const [, name, abbr, intro] = match;
  if (!states[abbr]) throw new Error(`Unknown state abbreviation: ${abbr}`);
  return [slugify(name), { name, state: states[abbr], abbr, intro: intro.trim().replace(/\n+/g, " ") }];
}));

if (Object.keys(records).length !== 15) throw new Error(`Expected 15 city intros, found ${Object.keys(records).length}.`);
const invalidLengths = Object.entries(records).filter(([, record]) => {
  const words = record.intro.split(/\s+/).length;
  return words < 150 || words > 200;
});
if (invalidLengths.length) throw new Error(`Intro word counts outside 150–200 words: ${invalidLengths.map(([slug, record]) => `${slug} (${record.intro.split(/\s+/).length})`).join(", ")}`);

const outputDirectory = resolve("data");
await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, "city-editorial-intros-batch-2.json"), `${JSON.stringify(records, null, 2)}\n`);
console.log(`Imported ${Object.keys(records).length} city editorial intros.`);
