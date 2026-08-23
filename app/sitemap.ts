import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { cities } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";
import { popularCities } from "@/lib/popular-cities";
export default function sitemap():MetadataRoute.Sitemap{const now=new Date();const shortSlugs=new Set(popularCities.map(c=>c.slug));return [{url:SITE_URL,lastModified:now,changeFrequency:"weekly",priority:1},...popularCities.map(c=>({url:`${SITE_URL}/${c.slug}`,lastModified:now,changeFrequency:"weekly" as const,priority:.9})),...cities.filter(c=>!shortSlugs.has(c.slug)).map(c=>({url:`${SITE_URL}/laundromats/${c.stateSlug}/${c.slug}`,lastModified:now,changeFrequency:"weekly" as const,priority:.8})),{url:`${SITE_URL}/blog`,lastModified:now,changeFrequency:"monthly",priority:.6},...articles.map(a=>({url:`${SITE_URL}/blog/${a.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.6})),...['about','contact'].map(p=>({url:`${SITE_URL}/${p}`,lastModified:now,changeFrequency:"yearly" as const,priority:.4}))]}
