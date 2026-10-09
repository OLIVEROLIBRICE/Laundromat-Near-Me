import { directoryCities, type DirectoryCity, type DirectoryListing } from "@/lib/directory-listings";

export const MIN_CITY_SERVICE_LISTINGS = 3;
export const MIN_NATIONAL_SERVICE_LISTINGS = 10;
export const MIN_NATIONAL_SERVICE_CITIES = 3;

const cardPaymentValues = new Set(["Credit Card", "Credit Cards", "Debit Card", "Debit Cards", "Card Payment"]);
const mobilePaymentValues = new Set(["Mobile Payment", "Mobile App"]);

export const serviceListingFilters = {
  "24-hour": (listing: DirectoryListing) => listing.is24Hours,
  "wash-and-fold": (listing: DirectoryListing) => listing.services.includes("Wash & Fold"),
  "coin-laundry": (listing: DirectoryListing) => listing.services.includes("Coin-Operated"),
  "self-service": (listing: DirectoryListing) => listing.services.includes("Self-Service"),
  "large-washers": (listing: DirectoryListing) => listing.services.includes("Large Capacity"),
  "card-payment": (listing: DirectoryListing) => listing.acceptsCards === true || listing.paymentMethods.some((method) => cardPaymentValues.has(method)),
  "mobile-payment": (listing: DirectoryListing) => listing.paymentMethods.some((method) => mobilePaymentValues.has(method)),
} as const;

export type CityServiceKey = keyof typeof serviceListingFilters;

export type CityServiceDefinition = {
  key: CityServiceKey;
  localSlug: string;
  nationalPath: string;
  targetKeyword: string;
  cityHeadingPrefix: string;
  listingLabel: string;
  structuredBasis: string;
  relatedKeys: CityServiceKey[];
};

export const cityServiceDefinitions: CityServiceDefinition[] = [
  {
    key: "24-hour",
    localSlug: "24-hour-laundromats",
    nationalPath: "/24-hour-laundromats-near-me/",
    targetKeyword: "24 Hour Laundromats Near Me",
    cityHeadingPrefix: "24 Hour Laundromats in",
    listingLabel: "24-hour laundromats",
    structuredBasis: "identified in the directory as operating 24 hours",
    relatedKeys: ["self-service", "card-payment", "mobile-payment"],
  },
  {
    key: "wash-and-fold",
    localSlug: "wash-and-fold",
    nationalPath: "/wash-and-fold-near-me/",
    targetKeyword: "Wash and Fold Near Me",
    cityHeadingPrefix: "Wash and Fold in",
    listingLabel: "wash-and-fold locations",
    structuredBasis: "explicitly tagged Wash & Fold in the structured service data",
    relatedKeys: ["self-service", "card-payment", "24-hour"],
  },
  {
    key: "coin-laundry",
    localSlug: "coin-laundry",
    nationalPath: "/coin-laundry-near-me/",
    targetKeyword: "Coin Laundry Near Me",
    cityHeadingPrefix: "Coin Laundry in",
    listingLabel: "coin-operated laundromats",
    structuredBasis: "explicitly tagged Coin-Operated in the structured service data",
    relatedKeys: ["self-service", "card-payment", "24-hour"],
  },
  {
    key: "self-service",
    localSlug: "self-service-laundromats",
    nationalPath: "/self-service-laundromats-near-me/",
    targetKeyword: "Self-Service Laundromats Near Me",
    cityHeadingPrefix: "Self-Service Laundromats in",
    listingLabel: "self-service laundromats",
    structuredBasis: "explicitly tagged Self-Service in the structured service data",
    relatedKeys: ["coin-laundry", "card-payment", "24-hour"],
  },
  {
    key: "large-washers",
    localSlug: "large-washers",
    nationalPath: "/laundromats-with-large-washers-near-me/",
    targetKeyword: "Laundromats With Large Washers Near Me",
    cityHeadingPrefix: "Laundromats With Large Washers in",
    listingLabel: "large-capacity laundromats",
    structuredBasis: "explicitly tagged Large Capacity in the structured service data",
    relatedKeys: ["self-service", "card-payment", "wash-and-fold"],
  },
  {
    key: "card-payment",
    localSlug: "card-payment-laundromats",
    nationalPath: "/laundromats-that-take-cards-near-me/",
    targetKeyword: "Laundromats That Take Cards Near Me",
    cityHeadingPrefix: "Laundromats That Take Cards in",
    listingLabel: "card-payment laundromats",
    structuredBasis: "identified by explicit structured card-payment data",
    relatedKeys: ["mobile-payment", "self-service", "24-hour"],
  },
  {
    key: "mobile-payment",
    localSlug: "mobile-payment-laundromats",
    nationalPath: "/laundromats-with-mobile-payment-near-me/",
    targetKeyword: "Laundromats With Mobile Payment Near Me",
    cityHeadingPrefix: "Laundromats With Mobile Payment in",
    listingLabel: "mobile-payment laundromats",
    structuredBasis: "explicitly tagged Mobile Payment or Mobile App in the structured payment data",
    relatedKeys: ["card-payment", "self-service", "24-hour"],
  },
];

export type EligibleCityService = {
  city: DirectoryCity;
  service: CityServiceDefinition;
  listings: DirectoryListing[];
  path: string;
  localPhrase: string;
};

export function getCityServicePath(city: DirectoryCity, service: CityServiceDefinition) {
  return `${city.canonicalPath}/${service.localSlug}/`;
}

export function getNationalServiceEligibility(key: CityServiceKey) {
  const filter = serviceListingFilters[key];
  const cityCounts = directoryCities.map((city) => ({
    city: city.slug,
    count: city.listings.map((listing) => ({
      ...listing,
      cityName: city.name,
      citySlug: city.slug,
      state: city.state,
      stateAbbr: city.stateAbbr,
      cityPath: city.canonicalPath,
    })).filter(filter).length,
  })).filter((city) => city.count > 0);
  const listingCount = cityCounts.reduce((total, city) => total + city.count, 0);
  const hasEligibleCity = cityCounts.some((city) => city.count >= MIN_CITY_SERVICE_LISTINGS);

  return {
    indexable: listingCount >= MIN_NATIONAL_SERVICE_LISTINGS
      && cityCounts.length >= MIN_NATIONAL_SERVICE_CITIES
      && hasEligibleCity,
    listingCount,
    cityCount: cityCounts.length,
    hasEligibleCity,
  };
}

export function getEligibleCityServices(): EligibleCityService[] {
  return directoryCities.flatMap((city) => cityServiceDefinitions.flatMap((service) => {
    const filter = serviceListingFilters[service.key];
    const listings = city.listings
      .map((listing) => ({ ...listing, cityName: city.name, citySlug: city.slug, state: city.state, stateAbbr: city.stateAbbr, cityPath: city.canonicalPath }))
      .filter(filter)
      .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount || a.name.localeCompare(b.name));
    if (listings.length < MIN_CITY_SERVICE_LISTINGS) return [];
    return [{
      city,
      service,
      listings,
      path: getCityServicePath(city, service),
      localPhrase: `${service.cityHeadingPrefix} ${city.name}, ${city.stateAbbr}`,
    }];
  }));
}

export function getEligibleCityService(citySlug: string, localServiceSlug: string) {
  return getEligibleCityServices().find((entry) => entry.city.slug === citySlug && entry.service.localSlug === localServiceSlug);
}

export function getEligibleServicesForCity(citySlug: string) {
  return getEligibleCityServices().filter((entry) => entry.city.slug === citySlug);
}

export function getRelatedCityServices(entry: EligibleCityService) {
  const eligible = getEligibleServicesForCity(entry.city.slug);
  return entry.service.relatedKeys
    .map((key) => eligible.find((candidate) => candidate.service.key === key))
    .filter((candidate): candidate is EligibleCityService => Boolean(candidate))
    .slice(0, 3);
}
