export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://laundrymatnearme.com";
export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
export const metaDescription = (text: string) => {
  let clean = text.replace(/\s+/g, " ").trim();
  if (clean.length < 150) clean = `${clean} Check details before you go.`;
  if (clean.length <= 160) return clean;
  let result = `${clean.slice(0, 156).replace(/\s+\S*$/, "")}…`;
  if (result.length < 150) result = `${result.slice(0, -1)} today.`;
  return result;
};
