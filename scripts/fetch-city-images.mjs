import { mkdir, writeFile } from "node:fs/promises";

const cities = [
  ["brooklyn", "Brooklyn"],
  ["houston", "Houston"],
  ["bronx", "The_Bronx"],
  ["queens", "Queens"],
  ["philadelphia", "Philadelphia"],
  ["san-francisco", "San_Francisco"],
  ["tampa", "Tampa,_Florida"],
  ["newark", "Newark,_New_Jersey"],
  ["jacksonville", "Jacksonville,_Florida"],
  ["phoenix", "Phoenix,_Arizona"],
  ["long-beach", "Long_Beach,_California"],
  ["milwaukee", "Milwaukee"],
  ["staten-island", "Staten_Island"],
  ["jersey-city", "Jersey_City,_New_Jersey"],
  ["las-vegas", "Las_Vegas"],
];

await mkdir(new URL("../public/cities/", import.meta.url), { recursive: true });

for (const [filename, page] of cities) {
  const summary = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${page}`, {
    headers: { "User-Agent": "LaundromatNearMeSite/1.0 (local website build)" },
  });
  if (!summary.ok) throw new Error(`${page}: ${summary.status}`);
  const data = await summary.json();
  const source = data.thumbnail?.source ?? data.originalimage?.source;
  if (!source) throw new Error(`${page}: no city image found`);
  let image;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    image = await fetch(source, { headers: { "User-Agent": "LaundromatNearMeSite/1.0" } });
    if (image.ok) break;
    await new Promise((resolve) => setTimeout(resolve, 1200 * (attempt + 1)));
  }
  if (!image?.ok) throw new Error(`${page} image: ${image?.status}`);
  await writeFile(new URL(`../public/cities/${filename}.jpg`, import.meta.url), Buffer.from(await image.arrayBuffer()));
  console.log(`${filename}.jpg <- ${source}`);
  await new Promise((resolve) => setTimeout(resolve, 650));
}
