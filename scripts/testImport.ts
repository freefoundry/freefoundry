import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { fetchRSS } from "../importers/rssImporter";
import { saveRawOpportunity } from "../importers/saveRawOpportunity";

async function run() {
  const items = await fetchRSS("https://opportunitydesk.org/feed");

  for (const item of items.slice(0, 10)) {
    await saveRawOpportunity(item);
  }

  console.log("Saved RSS opportunities");
}

run();