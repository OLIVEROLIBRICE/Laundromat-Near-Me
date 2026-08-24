import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the pasted-text source path as the first argument.");

const text = await readFile(sourcePath, "utf8");
const details = text.slice(text.indexOf("Listing Details") + "Listing Details".length);
const blocks = details.split(/\n(?=\d+\. )/).filter((block) => /^\d+\. /m.test(block));

const readField = (block, label) => block.match(new RegExp(`^${label}: (.+)$`, "m"))?.[1]?.trim() ?? "";
const yes = (value) => value === "Yes";

const records = blocks.map((block) => {
  const header = block.match(/^(\d+)\. (.+)$/m);
  if (!header) return null;
  const ratingLine = readField(block, "Rating");
  const coordinates = readField(block, "Coordinates").split(",").map((value) => Number(value.trim()));
  const featurePairs = Object.fromEntries(readField(block, "Features").split("; ").map((pair) => {
    const separator = pair.lastIndexOf(": ");
    return [pair.slice(0, separator), pair.slice(separator + 2)];
  }));
  const website = readField(block, "Website");
  const phone = readField(block, "Phone");
  const verificationLine = readField(block, "Verification");
  const description = block.match(/^Verification: .+\n([^\n]+(?:\n(?!Back to index)[^\n]+)*)/m)?.[1]?.replace(/\n/g, " ").trim() ?? "";

  return {
    id: Number(header[1]),
    name: header[2].trim(),
    address: readField(block, "Address"),
    phone: phone === "Not listed" ? null : phone,
    website: website === "Not listed" ? null : website,
    rating: Number(ratingLine.match(/^([\d.]+) \/ 5/)?.[1] ?? "0"),
    reviewCount: Number(ratingLine.match(/\((\d+) reviews\)/)?.[1] ?? "0"),
    services: readField(block, "Services").split(", ").filter(Boolean),
    paymentMethods: readField(block, "Payment methods").split(", ").filter(Boolean),
    pricing: readField(block, "Pricing"),
    is24Hours: yes(featurePairs["Open 24 hours"]),
    hasWifi: yes(featurePairs["Wi-Fi"]),
    hasParking: yes(featurePairs["Parking"]),
    acceptsCards: yes(featurePairs["Card payments"]),
    lat: coordinates[0] || null,
    lng: coordinates[1] || null,
    verified: verificationLine.toLowerCase() === "verified",
    description,
  };
}).filter(Boolean);

if (records.length !== 35) throw new Error(`Expected 35 Staten Island listings, found ${records.length}.`);
const outOfArea = records.filter((record) => !/Staten Island, NY \d{5}$/.test(record.address));
if (outOfArea.length) throw new Error(`Found out-of-area records: ${outOfArea.map((record) => record.address).join("; ")}`);

const outputDirectory = resolve("data");
await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, "staten-island-listings.json"), `${JSON.stringify(records, null, 2)}\n`);
console.log(`Imported ${records.length} Staten Island listings.`);
