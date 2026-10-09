import fs from "node:fs";
import path from "node:path";

const sourceDirectory = process.argv[2] || "/Users/olivero/Documents/Laundromat Directory/laundromats";
const outputDirectory = path.resolve("data");

const cityFiles = [
  ["atlanta", "Atlanta", "GA"],
  ["baltimore", "Baltimore", "MD"],
  ["boston", "Boston", "MA"],
  ["dallas", "Dallas", "TX"],
  ["denver", "Denver", "CO"],
  ["detroit", "Detroit", "MI"],
  ["los-angeles", "Los Angeles", "CA"],
  ["manhattan", null, "NY"],
  ["memphis", "Memphis", "TN"],
  ["minneapolis", "Minneapolis", "MN"],
  ["portland", "Portland", "OR"],
  ["san-antonio", "San Antonio", "TX"],
  ["san-diego", "San Diego", "CA"],
  ["seattle", "Seattle", "WA"],
];

const requiredFiles = [...cityFiles.map(([slug]) => `${slug}.json`), "laundromat-export-summary.json"];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(sourceDirectory, file)));
if (missingFiles.length) {
  throw new Error(`Missing required files: ${missingFiles.join(", ")}`);
}

const normalize = (value) => String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
const requiredArrayFields = ["services", "paymentMethods", "amenities"];
const duplicateKeys = new Map();
const globalIds = new Set();
const globalSlugs = new Set();
const globalPlaceIds = new Set();
const rejected = [];
const skippedDuplicates = [];
const report = [];

function validateRecord(record, file) {
  if (!record || typeof record !== "object" || Array.isArray(record)) throw new Error(`${file}: record is not an object`);
  if (!String(record.id ?? "").trim()) throw new Error(`${file}: record is missing an ID`);
  if (!String(record.slug ?? "").trim()) throw new Error(`${file}: ${record.id} is missing a slug`);
  if (!String(record.name ?? "").trim()) throw new Error(`${file}: ${record.id} has a blank business name`);
  if (!String(record.city ?? "").trim() || !String(record.state ?? "").trim()) throw new Error(`${file}: ${record.id} is missing city/state`);
  if (!String(record.address ?? "").trim()) throw new Error(`${file}: ${record.id} is missing an address`);
  for (const field of requiredArrayFields) {
    if (!Array.isArray(record[field])) throw new Error(`${file}: ${record.id} has invalid ${field}`);
  }
  if (!record.hours || typeof record.hours !== "object" || Array.isArray(record.hours)) throw new Error(`${file}: ${record.id} has invalid hours`);
  if (!Number.isFinite(Number(record.rating)) || !Number.isFinite(Number(record.reviewCount))) throw new Error(`${file}: ${record.id} has invalid rating data`);
  if (record.latitude != null && !Number.isFinite(Number(record.latitude))) throw new Error(`${file}: ${record.id} has invalid latitude`);
  if (record.longitude != null && !Number.isFinite(Number(record.longitude))) throw new Error(`${file}: ${record.id} has invalid longitude`);
  if (record.pricing != null && (typeof record.pricing !== "object" || Array.isArray(record.pricing))) throw new Error(`${file}: ${record.id} has invalid pricing`);
}

function publicRecord(record) {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    address: record.address,
    city: record.city,
    state: record.state,
    zipCode: record.zipCode ?? null,
    phone: record.phone ?? null,
    website: record.website ?? null,
    hours: record.hours,
    rating: Number(record.rating),
    reviewCount: Number(record.reviewCount),
    services: record.services,
    paymentMethods: record.paymentMethods,
    amenities: record.amenities,
    pricing: record.pricing ?? {},
    description: record.description ?? "",
    imageUrl: record.imageUrl ?? null,
    customImageUrl: record.customImageUrl ?? null,
    googlePlaceId: record.googlePlaceId ?? null,
    latitude: record.latitude == null ? null : Number(record.latitude),
    longitude: record.longitude == null ? null : Number(record.longitude),
    is24Hours: record.is24Hours === true,
    hasWiFi: record.hasWiFi === true,
    hasParking: record.hasParking === true,
    acceptsCards: record.acceptsCards === true,
    hasMobilePay: record.hasMobilePay === true,
    hasVendingMachines: record.hasVendingMachines === true,
    hasAttendant: record.hasAttendant === true,
    hasRestroom: record.hasRestroom === true,
    isVerified: record.isVerified === true,
    verifiedAt: record.verifiedAt ?? null,
    claimedBy: record.claimedBy ?? null,
    verificationBadge: record.verificationBadge ?? null,
  };
}

for (const [slug, expectedCity, expectedState] of cityFiles) {
  const file = `${slug}.json`;
  const sourcePath = path.join(sourceDirectory, file);
  const records = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  if (!Array.isArray(records)) throw new Error(`${file}: expected a top-level array`);

  const accepted = [];
  let cityRejected = 0;
  let cityDuplicates = 0;

  for (const record of records) {
    validateRecord(record, file);

    if (slug === "manhattan" && record.city === "Manhattan" && record.state === "KS") {
      rejected.push({ id: record.id, name: record.name, city: record.city, state: record.state, reason: "Manhattan, Kansas is outside the intended New York City Manhattan dataset" });
      cityRejected += 1;
      continue;
    }

    if ((expectedCity && record.city !== expectedCity) || record.state !== expectedState) {
      rejected.push({ id: record.id, name: record.name, city: record.city, state: record.state, reason: `City/state mismatch in ${file}` });
      cityRejected += 1;
      continue;
    }

    if (globalIds.has(record.id)) throw new Error(`${file}: duplicate global ID ${record.id}`);
    if (globalSlugs.has(record.slug)) throw new Error(`${file}: duplicate global slug ${record.slug}`);
    if (record.googlePlaceId && globalPlaceIds.has(record.googlePlaceId)) throw new Error(`${file}: duplicate Google Place ID ${record.googlePlaceId}`);

    const addressKey = [normalize(record.address), normalize(record.city), normalize(record.state)].join("|");
    const duplicate = duplicateKeys.get(addressKey);
    if (duplicate) {
      skippedDuplicates.push({
        id: record.id,
        name: record.name,
        address: record.address,
        city: record.city,
        state: record.state,
        canonicalId: duplicate.id,
        canonicalName: duplicate.name,
        reason: "Normalized exact address and city/state duplicate",
      });
      cityDuplicates += 1;
      continue;
    }

    duplicateKeys.set(addressKey, record);
    globalIds.add(record.id);
    globalSlugs.add(record.slug);
    if (record.googlePlaceId) globalPlaceIds.add(record.googlePlaceId);
    accepted.push(publicRecord(record));
  }

  fs.writeFileSync(path.join(outputDirectory, `${slug}-listings.json`), `${JSON.stringify(accepted, null, 2)}\n`);
  report.push({ city: slug, sourceRecords: records.length, imported: accepted.length, duplicatesSkipped: cityDuplicates, rejected: cityRejected });
}

const summary = JSON.parse(fs.readFileSync(path.join(sourceDirectory, "laundromat-export-summary.json"), "utf8"));
const actualSourceCount = report.reduce((total, city) => total + city.sourceRecords, 0);
console.log(JSON.stringify({
  summaryCount: summary.totalListings,
  actualSourceCount,
  importedCount: report.reduce((total, city) => total + city.imported, 0),
  report,
  rejected,
  skippedDuplicates,
}, null, 2));
