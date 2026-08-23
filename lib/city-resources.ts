export type CityResource = { name: string; url: string; description: string };

export const cityResources: Record<string, CityResource[]> = {
  brooklyn: [
    { name: "SUNY Downstate Health Sciences University", url: "https://downstate.edu/", description: "Campus and healthcare information for SUNY Downstate staff and students near Clarkson Avenue." },
    { name: "MTA New York City Transit", url: "https://new.mta.info/", description: "Plan subway, bus, and accessible-transit trips across Brooklyn." },
    { name: "The Brooklyn Hospital Center", url: "https://tbh.org/", description: "Hospital information for patients, visitors, and shift workers in Downtown Brooklyn." },
    { name: "NYC Housing Authority", url: "https://nyc.gov/nycha", description: "Housing information and resident services for NYCHA communities across the borough." },
  ],
  houston: [
    { name: "University of Houston", url: "https://www.uh.edu/", description: "Campus resources for UH students, including those living off-campus near the University District." },
    { name: "Houston METRO", url: "https://www.ridemetro.org/", description: "METRO bus and light-rail routes throughout Houston." },
    { name: "City of Houston", url: "https://www.houstontx.gov/", description: "Official city services, neighborhood information, and resident resources." },
    { name: "Houston Housing Authority", url: "https://www.housingforhouston.com/", description: "Housing programs and resident resources from the Houston Housing Authority." },
  ],
  bronx: [
    { name: "Fordham University", url: "https://www.fordham.edu/", description: "Campus resources for Fordham students near Rose Hill and surrounding neighborhoods." },
    { name: "BronxCare Health System", url: "https://bronxcare.org/", description: "Healthcare information for BronxCare patients, visitors, and shift workers." },
    { name: "CUNY Bronx Community College", url: "https://bcc.cuny.edu/", description: "Campus information for BCC students commuting across the borough." },
    { name: "NYC Housing Authority", url: "https://nyc.gov/nycha", description: "Housing information and resident services for NYCHA developments throughout the Bronx." },
  ],
  queens: [
    { name: "Queens College, CUNY", url: "https://www.qc.cuny.edu/", description: "Campus resources for Queens College students in Flushing and Kew Gardens Hills." },
    { name: "MTA New York City Transit", url: "https://mta.info/", description: "MTA subway and bus service information across Queens." },
    { name: "NYC Health + Hospitals / Elmhurst", url: "https://www.nychealthandhospitals.org/elmhurst/", description: "Hospital information for Elmhurst patients, visitors, and healthcare workers." },
    { name: "NYC Housing Authority", url: "https://www.nyc.gov/site/nycha/index.page", description: "Housing information and resident services for NYCHA communities across Queens." },
  ],
  philadelphia: [
    { name: "Temple University", url: "https://www.temple.edu/", description: "Campus resources for Temple students living in and around North Philadelphia." },
    { name: "SEPTA", url: "https://www.septa.org/", description: "Plan bus, subway, trolley, and regional-rail trips across Philadelphia." },
    { name: "Temple University Hospital", url: "https://templehealth.org/", description: "Healthcare information for Temple Health patients, visitors, and staff." },
    { name: "Philadelphia Housing Authority", url: "https://www.pha.phila.gov/", description: "Housing programs and resident resources from the Philadelphia Housing Authority." },
  ],
  "san-francisco": [
    { name: "UCSF Health", url: "https://ucsfhealth.org/", description: "Healthcare information for UCSF Health patients, visitors, and employees." },
    { name: "SFMTA / Muni", url: "https://www.sfmta.com/", description: "Muni bus, rail, and accessible-transit information across San Francisco." },
    { name: "San Francisco Housing Authority", url: "https://sfha.org/", description: "Housing programs and resident services from the San Francisco Housing Authority." },
    { name: "City and County of San Francisco", url: "https://sf.gov/", description: "Official city services, neighborhood information, and resident resources." },
  ],
  tampa: [
    { name: "University of South Florida", url: "https://www.usf.edu/", description: "Campus resources for USF students living near Fowler Avenue and across Tampa." },
    { name: "Hillsborough Transit Authority", url: "https://www.gohart.org/", description: "HART bus route, schedule, fare, and accessibility information." },
    { name: "Tampa General Hospital", url: "https://tgh.org/", description: "Hospital information for Tampa General patients, visitors, and shift workers." },
    { name: "Tampa Housing Authority", url: "https://www.tampaha.org/", description: "Housing programs and resident services from the Tampa Housing Authority." },
  ],
  newark: [
    { name: "Rutgers University–Newark", url: "https://newark.rutgers.edu/", description: "Campus resources for Rutgers–Newark students in Downtown and the Ironbound." },
    { name: "NJ TRANSIT", url: "https://www.njtransit.com/", description: "Bus, rail, light-rail, and accessibility information for Newark-area trips." },
    { name: "Newark Housing Authority", url: "https://www.newarkha.org/", description: "Housing programs and resident services from the Newark Housing Authority." },
    { name: "City of Newark", url: "https://newarknj.gov/", description: "Official city services, neighborhood information, and resident resources." },
  ],
  jacksonville: [
    { name: "Jacksonville Transportation Authority", url: "https://www.jtafla.com/", description: "JTA bus, mobility, fare, and trip-planning information across Jacksonville." },
    { name: "City of Jacksonville", url: "https://jacksonville.gov/", description: "Official city services, neighborhood information, and resident resources." },
    { name: "Jacksonville Housing Authority", url: "https://www.jaxha.org/", description: "Housing programs and resident services from the Jacksonville Housing Authority." },
    { name: "UF Health Jacksonville", url: "https://med.jax.ufl.edu/", description: "Healthcare and academic information for UF Health Jacksonville staff and visitors." },
  ],
  phoenix: [
    { name: "Arizona State University", url: "https://www.asu.edu/", description: "Campus resources for ASU students living off-campus across the Valley." },
    { name: "Valley Metro", url: "https://www.valleymetro.org/", description: "Light-rail and bus routes, fares, schedules, and trip planning." },
    { name: "City of Phoenix", url: "https://phoenix.gov/", description: "Official city services, neighborhood information, and resident resources." },
    { name: "Housing Authority of Maricopa County", url: "https://maricopahousing.org/", description: "Affordable-housing programs and resident resources across Maricopa County." },
  ],
  "long-beach": [
    { name: "Long Beach City College", url: "https://lbcc.edu/", description: "Campus resources for LBCC students living in surrounding neighborhoods." },
    { name: "Long Beach Transit", url: "https://ridelbt.com/", description: "Bus routes, schedules, fares, and trip-planning information across Long Beach." },
    { name: "City of Long Beach", url: "https://longbeach.gov/", description: "Official city services, neighborhood information, and resident resources." },
    { name: "Community Hospital Long Beach", url: "https://communityhospitallb.org/", description: "Hospital information for Community Hospital Long Beach staff and visitors." },
  ],
  milwaukee: [
    { name: "Marquette University", url: "https://www.marquette.edu/", description: "Campus resources for Marquette students living on and near campus." },
    { name: "Milwaukee County Transit System", url: "https://www.ridemcts.com/", description: "MCTS bus routes, schedules, fares, and trip-planning information." },
    { name: "Housing Authority of the City of Milwaukee", url: "https://www.hacm.org/", description: "Housing programs and resident services from HACM." },
    { name: "City of Milwaukee", url: "https://city.milwaukee.gov/", description: "Official city services, neighborhood information, and resident resources." },
  ],
  "staten-island": [
    { name: "CUNY College of Staten Island", url: "https://www.csi.cuny.edu/", description: "Campus resources for CSI students living across Staten Island and the North Shore." },
    { name: "MTA New York City Transit", url: "https://new.mta.info/", description: "Staten Island Railway and MTA bus schedules, fares, and service updates." },
    { name: "NYC Housing Authority", url: "https://nyc.gov/nycha", description: "Housing information and resident services for NYCHA developments on Staten Island." },
    { name: "Staten Island Borough President's Office", url: "https://statenislandusa.com/", description: "Borough services, programs, events, and community information." },
  ],
  "jersey-city": [
    { name: "New Jersey City University", url: "https://njcu.edu/", description: "Campus resources for NJCU students in West Bergen, the Heights, and nearby neighborhoods." },
    { name: "NJ TRANSIT", url: "https://www.njtransit.com/", description: "NJ TRANSIT and Hudson–Bergen Light Rail schedules, fares, and service information." },
    { name: "Jersey City Housing Authority", url: "https://www.jerseycityha.org/", description: "Housing programs and resident services from the Jersey City Housing Authority." },
    { name: "City of Jersey City", url: "https://www.jerseycitynj.gov/", description: "Official city services, neighborhood information, and resident resources." },
  ],
  "las-vegas": [
    { name: "UNLV", url: "https://unlv.edu/", description: "Campus resources for UNLV students living near campus and throughout the valley." },
    { name: "RTC of Southern Nevada", url: "https://rtcsnv.com/", description: "RTC bus routes, fares, schedules, and trip planning across the Las Vegas Valley." },
    { name: "Southern Nevada Regional Housing Authority", url: "https://www.snvrha.org/", description: "Affordable-housing programs and resident services across Southern Nevada." },
    { name: "City of Las Vegas", url: "https://lasvegasnevada.gov/", description: "Official city services, neighborhood information, and resident resources." },
  ],
};
