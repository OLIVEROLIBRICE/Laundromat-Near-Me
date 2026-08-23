import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const cityRows = [
  ["New York City","New York","NY",40.7128,-74.006],["Los Angeles","California","CA",34.0522,-118.2437],["Chicago","Illinois","IL",41.8781,-87.6298],["Houston","Texas","TX",29.7604,-95.3698],["Phoenix","Arizona","AZ",33.4484,-112.074],["Philadelphia","Pennsylvania","PA",39.9526,-75.1652],["San Antonio","Texas","TX",29.4241,-98.4936],["San Diego","California","CA",32.7157,-117.1611],["Dallas","Texas","TX",32.7767,-96.797],["Jacksonville","Florida","FL",30.3322,-81.6557],["Austin","Texas","TX",30.2672,-97.7431],["Fort Worth","Texas","TX",32.7555,-97.3308],["San Jose","California","CA",37.3382,-121.8863],["Columbus","Ohio","OH",39.9612,-82.9988],["Charlotte","North Carolina","NC",35.2271,-80.8431],["Indianapolis","Indiana","IN",39.7684,-86.1581],["San Francisco","California","CA",37.7749,-122.4194],["Seattle","Washington","WA",47.6062,-122.3321],["Denver","Colorado","CO",39.7392,-104.9903],["Washington","District of Columbia","DC",38.9072,-77.0369],["Nashville","Tennessee","TN",36.1627,-86.7816],["Oklahoma City","Oklahoma","OK",35.4676,-97.5164],["El Paso","Texas","TX",31.7619,-106.485],["Boston","Massachusetts","MA",42.3601,-71.0589],["Portland","Oregon","OR",45.5152,-122.6784]
];
const names=["Fresh Fold Laundry","Spin City Wash","Bright Bubble Laundromat","Clean Slate Laundry","Neighborhood Suds"];
const slugify=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const hours=JSON.stringify({Monday:"6:00 AM – 10:00 PM",Tuesday:"6:00 AM – 10:00 PM",Wednesday:"6:00 AM – 10:00 PM",Thursday:"6:00 AM – 10:00 PM",Friday:"6:00 AM – 10:00 PM",Saturday:"6:00 AM – 10:00 PM",Sunday:"7:00 AM – 9:00 PM"});

function q(value){return `'${String(value).replaceAll("'","''")}'`;}
function main(){
  const db=resolve("prisma/dev.db");
  execFileSync("sqlite3",[db],{input:readFileSync(resolve("prisma/schema.sql"),"utf8")});
  const sql=["BEGIN;"];
  let stateId=0,cityId=0,listingId=0;
  const stateIds=new Map();
  for(const [cityName,stateName,abbr,lat,lng] of cityRows){
    if(!stateIds.has(stateName)){stateId++;stateIds.set(stateName,stateId);sql.push(`INSERT INTO states(id,name,slug,listing_count) VALUES(${stateId},${q(stateName)},${q(slugify(stateName))},0);`)}
    const sid=stateIds.get(stateName);cityId++;sql.push(`INSERT INTO cities(id,state_id,name,slug,listing_count,lat,lng,description) VALUES(${cityId},${sid},${q(cityName)},${q(slugify(cityName))},5,${lat},${lng},${q(`Local laundry guide for ${cityName}.`)});`);
    for(let i=0;i<5;i++){listingId++;const name=`${names[i]}${i===0?` ${cityName.split(" ")[0]}`:""}`;sql.push(`INSERT INTO laundromats(id,city_id,state_id,name,slug,address,phone,website,lat,lng,hours,amenities,payment_methods,price_range_min,price_range_max,description,rating,review_count,is_24_hours,is_self_service,has_wifi,has_parking,is_claimed) VALUES(${listingId},${cityId},${sid},${q(name)},${q(`${slugify(name)}-${slugify(cityName)}-${abbr.toLowerCase()}`)},${q(`${118+i*137} Main Street, ${cityName}, ${abbr}`)},${q(`(555) 555-${1200+i}`)},'https://example.com',${lat+(i-2)*.008},${lng+(2-i)*.006},${q(hours)},${q(JSON.stringify(["Free Wi-Fi","Parking","Folding tables"]))},${q(JSON.stringify(["Coins","Credit cards"]))},${3+i*.25},${6+i*.5},${q(`${name} serves ${cityName} with convenient machines and clearly posted services.`)},${4.2+(i%4)*.2},${47+i*31},${i===2?1:0},1,1,1,${i<2?1:0});`)}
  }
  sql.push("UPDATE states SET listing_count=(SELECT COUNT(*) FROM laundromats WHERE laundromats.state_id=states.id);","COMMIT;");
  execFileSync("sqlite3",[db],{input:sql.join("\n")});
  console.log("Seeded 25 cities and 125 laundromats.");
}
main();
