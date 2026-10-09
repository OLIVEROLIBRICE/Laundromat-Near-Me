import type { CityListing } from "@/components/laundromat-card";
import atlantaListings from "@/data/atlanta-listings.json";
import baltimoreListings from "@/data/baltimore-listings.json";
import bostonListings from "@/data/boston-listings.json";
import bronxListings from "@/data/bronx-listings.json";
import brooklynListings from "@/data/brooklyn-listings.json";
import chicagoListings from "@/data/chicago-listings.json";
import dallasListings from "@/data/dallas-listings.json";
import denverListings from "@/data/denver-listings.json";
import detroitListings from "@/data/detroit-listings.json";
import houstonListings from "@/data/houston-listings.json";
import jacksonvilleListings from "@/data/jacksonville-listings.json";
import jerseyCityListings from "@/data/jersey-city-listings.json";
import lasVegasListings from "@/data/las-vegas-listings.json";
import longBeachListings from "@/data/long-beach-listings.json";
import losAngelesListings from "@/data/los-angeles-listings.json";
import manhattanListings from "@/data/manhattan-listings.json";
import memphisListings from "@/data/memphis-listings.json";
import milwaukeeListings from "@/data/milwaukee-listings.json";
import minneapolisListings from "@/data/minneapolis-listings.json";
import newarkListings from "@/data/newark-listings.json";
import philadelphiaListings from "@/data/philadelphia-listings.json";
import phoenixListings from "@/data/phoenix-listings.json";
import portlandListings from "@/data/portland-listings.json";
import queensListings from "@/data/queens-listings.json";
import sanAntonioListings from "@/data/san-antonio-listings.json";
import sanDiegoListings from "@/data/san-diego-listings.json";
import sanFranciscoListings from "@/data/san-francisco-listings.json";
import seattleListings from "@/data/seattle-listings.json";
import statenIslandListings from "@/data/staten-island-listings.json";
import tampaListings from "@/data/tampa-listings.json";

export type DirectoryCity = {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  canonicalPath: string;
  listings: CityListing[];
};

export type DirectoryListing = CityListing & {
  cityName: string;
  citySlug: string;
  state: string;
  stateAbbr: string;
  cityPath: string;
};

export type DirectoryCityGroup = Omit<DirectoryCity, "listings"> & {
  listings: DirectoryListing[];
};

export const directoryCities: DirectoryCity[] = [
  { name: "Atlanta", slug: "atlanta", state: "Georgia", stateAbbr: "GA", canonicalPath: "/laundromats/georgia/atlanta", listings: atlantaListings },
  { name: "Baltimore", slug: "baltimore", state: "Maryland", stateAbbr: "MD", canonicalPath: "/laundromats/maryland/baltimore", listings: baltimoreListings },
  { name: "Boston", slug: "boston", state: "Massachusetts", stateAbbr: "MA", canonicalPath: "/laundromats/massachusetts/boston", listings: bostonListings },
  { name: "Bronx", slug: "bronx", state: "New York", stateAbbr: "NY", canonicalPath: "/bronx", listings: bronxListings },
  { name: "Brooklyn", slug: "brooklyn", state: "New York", stateAbbr: "NY", canonicalPath: "/brooklyn", listings: brooklynListings },
  { name: "Chicago", slug: "chicago", state: "Illinois", stateAbbr: "IL", canonicalPath: "/laundromats/illinois/chicago", listings: chicagoListings },
  { name: "Dallas", slug: "dallas", state: "Texas", stateAbbr: "TX", canonicalPath: "/laundromats/texas/dallas", listings: dallasListings },
  { name: "Denver", slug: "denver", state: "Colorado", stateAbbr: "CO", canonicalPath: "/laundromats/colorado/denver", listings: denverListings },
  { name: "Detroit", slug: "detroit", state: "Michigan", stateAbbr: "MI", canonicalPath: "/laundromats/michigan/detroit", listings: detroitListings },
  { name: "Houston", slug: "houston", state: "Texas", stateAbbr: "TX", canonicalPath: "/houston", listings: houstonListings },
  { name: "Jacksonville", slug: "jacksonville", state: "Florida", stateAbbr: "FL", canonicalPath: "/jacksonville", listings: jacksonvilleListings },
  { name: "Jersey City", slug: "jersey-city", state: "New Jersey", stateAbbr: "NJ", canonicalPath: "/jersey-city", listings: jerseyCityListings },
  { name: "Las Vegas", slug: "las-vegas", state: "Nevada", stateAbbr: "NV", canonicalPath: "/las-vegas", listings: lasVegasListings },
  { name: "Long Beach", slug: "long-beach", state: "California", stateAbbr: "CA", canonicalPath: "/long-beach", listings: longBeachListings },
  { name: "Los Angeles", slug: "los-angeles", state: "California", stateAbbr: "CA", canonicalPath: "/laundromats/california/los-angeles", listings: losAngelesListings },
  { name: "Manhattan", slug: "manhattan", state: "New York", stateAbbr: "NY", canonicalPath: "/laundromats/new-york/manhattan", listings: manhattanListings },
  { name: "Memphis", slug: "memphis", state: "Tennessee", stateAbbr: "TN", canonicalPath: "/laundromats/tennessee/memphis", listings: memphisListings },
  { name: "Milwaukee", slug: "milwaukee", state: "Wisconsin", stateAbbr: "WI", canonicalPath: "/milwaukee", listings: milwaukeeListings },
  { name: "Minneapolis", slug: "minneapolis", state: "Minnesota", stateAbbr: "MN", canonicalPath: "/laundromats/minnesota/minneapolis", listings: minneapolisListings },
  { name: "Newark", slug: "newark", state: "New Jersey", stateAbbr: "NJ", canonicalPath: "/newark", listings: newarkListings },
  { name: "Philadelphia", slug: "philadelphia", state: "Pennsylvania", stateAbbr: "PA", canonicalPath: "/philadelphia", listings: philadelphiaListings },
  { name: "Phoenix", slug: "phoenix", state: "Arizona", stateAbbr: "AZ", canonicalPath: "/phoenix", listings: phoenixListings },
  { name: "Portland", slug: "portland", state: "Oregon", stateAbbr: "OR", canonicalPath: "/laundromats/oregon/portland", listings: portlandListings },
  { name: "Queens", slug: "queens", state: "New York", stateAbbr: "NY", canonicalPath: "/queens", listings: queensListings },
  { name: "San Antonio", slug: "san-antonio", state: "Texas", stateAbbr: "TX", canonicalPath: "/laundromats/texas/san-antonio", listings: sanAntonioListings },
  { name: "San Diego", slug: "san-diego", state: "California", stateAbbr: "CA", canonicalPath: "/laundromats/california/san-diego", listings: sanDiegoListings },
  { name: "San Francisco", slug: "san-francisco", state: "California", stateAbbr: "CA", canonicalPath: "/san-francisco", listings: sanFranciscoListings },
  { name: "Seattle", slug: "seattle", state: "Washington", stateAbbr: "WA", canonicalPath: "/laundromats/washington/seattle", listings: seattleListings },
  { name: "Staten Island", slug: "staten-island", state: "New York", stateAbbr: "NY", canonicalPath: "/staten-island", listings: statenIslandListings },
  { name: "Tampa", slug: "tampa", state: "Florida", stateAbbr: "FL", canonicalPath: "/tampa", listings: tampaListings },
];

export function getDirectoryCity(slug: string) {
  return directoryCities.find((city) => city.slug === slug);
}

export const directoryListings: DirectoryListing[] = directoryCities.flatMap((city) => city.listings.map((listing) => ({
  ...listing,
  cityName: city.name,
  citySlug: city.slug,
  state: city.state,
  stateAbbr: city.stateAbbr,
  cityPath: city.canonicalPath,
})));

export function getDirectoryCityGroups(filter: (listing: DirectoryListing) => boolean): DirectoryCityGroup[] {
  return directoryCities
    .map((city) => ({
      name: city.name,
      slug: city.slug,
      state: city.state,
      stateAbbr: city.stateAbbr,
      canonicalPath: city.canonicalPath,
      listings: city.listings
        .map((listing) => ({
          ...listing,
          cityName: city.name,
          citySlug: city.slug,
          state: city.state,
          stateAbbr: city.stateAbbr,
          cityPath: city.canonicalPath,
        }))
        .filter(filter)
        .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount || a.name.localeCompare(b.name)),
    }))
    .filter((city) => city.listings.length > 0)
    .sort((a, b) => b.listings.length - a.listings.length || a.name.localeCompare(b.name));
}
