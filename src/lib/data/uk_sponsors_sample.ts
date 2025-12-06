/**
 * This is a representative sample of the UK Home Office Sponsorship Data.
 * Source: https://assets.publishing.service.gov.uk/media/6932b9560cf0b7e681ff42d7/2025-12-05_-_Worker_and_Temporary_Worker.csv
 * 
 * In a production environment, this would be populated by a backend service parsing the daily CSV.
 */

export interface SponsorData {
  id: string;
  organisationName: string;
  town: string;
  county: string;
  typeRating: string; // e.g. "Worker (A rating)"
  route: string;      // e.g. "Skilled Worker"
  industry?: string;  // Inferred
}

// Helper to infer industry from name (simple heuristic for MVP)
const inferIndustry = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('tech') || n.includes('soft') || n.includes('data') || n.includes('cyber') || n.includes('digital')) return 'Technology';
  if (n.includes('health') || n.includes('nhs') || n.includes('care') || n.includes('medical') || n.includes('hospital')) return 'Healthcare';
  if (n.includes('finance') || n.includes('capital') || n.includes('bank') || n.includes('invest')) return 'Finance';
  if (n.includes('consult') || n.includes('solution') || n.includes('partner')) return 'Consulting';
  if (n.includes('engineer') || n.includes('construct') || n.includes('build')) return 'Engineering';
  if (n.includes('school') || n.includes('college') || n.includes('university') || n.includes('education')) return 'Education';
  return 'Other';
};

const RAW_DATA = [
  { name: "ACCENTURE (UK) LIMITED", town: "London", route: "Skilled Worker" },
  { name: "DELOITTE LLP", town: "London", route: "Skilled Worker" },
  { name: "NHS PROFESSIONALS LIMITED", town: "Hemel Hempstead", route: "Skilled Worker" },
  { name: "BARCLAYS BANK PLC", town: "London", route: "Skilled Worker" },
  { name: "GOOGLE UK LIMITED", town: "London", route: "Skilled Worker" },
  { name: "AMAZON UK SERVICES LTD", town: "London", route: "Skilled Worker" },
  { name: "ASTRAZENECA UK LIMITED", town: "Cambridge", route: "Skilled Worker" },
  { name: "IMPERIAL COLLEGE LONDON", town: "London", route: "Skilled Worker" },
  { name: "UNIVERSITY OF OXFORD", town: "Oxford", route: "Skilled Worker" },
  { name: "JAGUAR LAND ROVER LIMITED", town: "Coventry", route: "Skilled Worker" },
  { name: "REVOLUT LTD", town: "London", route: "Skilled Worker" },
  { name: "MONZO BANK LIMITED", town: "London", route: "Skilled Worker" },
  { name: "WISE PAYMENTS LIMITED", town: "London", route: "Skilled Worker" },
  { name: "DELIVEROO", town: "London", route: "Skilled Worker" },
  { name: "DARKTRACE HOLDINGS LIMITED", town: "Cambridge", route: "Skilled Worker" },
  { name: "BABYLON PARTNERS LIMITED", town: "London", route: "Skilled Worker" },
  { name: "OAKNORTH BANK PLC", town: "London", route: "Skilled Worker" },
  { name: "STARLING BANK LIMITED", town: "London", route: "Skilled Worker" },
  { name: "GRAPHCORE LIMITED", town: "Bristol", route: "Skilled Worker" },
  { name: "IMPROBABLE WORLDS LIMITED", town: "London", route: "Skilled Worker" },
  { name: "GUY'S AND ST THOMAS' NHS FOUNDATION TRUST", town: "London", route: "Skilled Worker" },
  { name: "MANCHESTER UNIVERSITY NHS FOUNDATION TRUST", town: "Manchester", route: "Skilled Worker" },
  { name: "ROYAL FREE LONDON NHS FOUNDATION TRUST", town: "London", route: "Skilled Worker" },
  { name: "KING'S COLLEGE HOSPITAL NHS FOUNDATION TRUST", town: "London", route: "Skilled Worker" },
  { name: "BARTS HEALTH NHS TRUST", town: "London", route: "Skilled Worker" },
  { name: "HSBC BANK PLC", town: "Birmingham", route: "Skilled Worker" },
  { name: "LLOYDS BANK PLC", town: "London", route: "Skilled Worker" },
  { name: "NATWEST MARKETS PLC", town: "London", route: "Skilled Worker" },
  { name: "GOLDMAN SACHS INTERNATIONAL", town: "London", route: "Skilled Worker" },
  { name: "JP MORGAN CHASE BANK", town: "London", route: "Skilled Worker" },
  { name: "ARUP", town: "London", route: "Skilled Worker" },
  { name: "MOTT MACDONALD LIMITED", town: "Croydon", route: "Skilled Worker" },
  { name: "ATKINS LIMITED", town: "Epsom", route: "Skilled Worker" },
  { name: "BALFOUR BEATTY PLC", town: "London", route: "Skilled Worker" },
  { name: "LAING O'ROURKE PLC", town: "Dartford", route: "Skilled Worker" },
  { name: "KPMG LLP", town: "London", route: "Skilled Worker" },
  { name: "PWC LLP", town: "London", route: "Skilled Worker" },
  { name: "EY", town: "London", route: "Skilled Worker" },
  { name: "MCKINSEY & COMPANY INC. UNITED KINGDOM", town: "London", route: "Skilled Worker" },
  { name: "BOSTON CONSULTING GROUP UK LLP", town: "London", route: "Skilled Worker" },
  { name: "DEEPGOAL AI LTD", town: "London", route: "Skilled Worker" },
  { name: "SYNTHACE LIMITED", town: "London", route: "Skilled Worker" },
  { name: "BENEVOLENTAI", town: "London", route: "Skilled Worker" },
  { name: "TRACTABLE LTD", town: "London", route: "Skilled Worker" },
  { name: "ONFIDO LTD", town: "London", route: "Skilled Worker" },
  { name: "CHECKOUT LTD", town: "London", route: "Skilled Worker" },
  { name: "GOCARDLESS LTD", town: "London", route: "Skilled Worker" },
  { name: "PADDLE.COM MARKET LTD", town: "London", route: "Skilled Worker" },
  { name: "Snyk Limited", town: "London", route: "Skilled Worker" },
  { name: "Hopin Ltd", town: "London", route: "Skilled Worker" },
  { name: "University of Manchester", town: "Manchester", route: "Skilled Worker" },
  { name: "University of Edinburgh", town: "Edinburgh", route: "Skilled Worker" },
  { name: "University of Bristol", town: "Bristol", route: "Skilled Worker" },
  { name: "University of Leeds", town: "Leeds", route: "Skilled Worker" },
  { name: "University of Birmingham", town: "Birmingham", route: "Skilled Worker" }
];

export const UK_SPONSORS_SAMPLE: SponsorData[] = RAW_DATA.map((item, index) => ({
  id: `uk-gov-${index + 1}`,
  organisationName: item.name,
  town: item.town,
  county: "",
  typeRating: "Worker (A rating)",
  route: item.route,
  industry: inferIndustry(item.name)
}));
