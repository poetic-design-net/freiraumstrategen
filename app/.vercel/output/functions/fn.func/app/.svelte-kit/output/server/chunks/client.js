import { createClient } from "@sanity/client";
const PUBLIC_SANITY_PROJECT_ID = "4gz7oym3";
const PUBLIC_SANITY_DATASET = "production";
const PUBLIC_SANITY_STUDIO_URL = "https://freiraum-studio.vercel.app/studio/";
function assertEnvVar(value, name) {
  if (value === void 0) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}
const dataset = assertEnvVar(PUBLIC_SANITY_DATASET, "PUBLIC_SANITY_DATASET");
const projectId = assertEnvVar(PUBLIC_SANITY_PROJECT_ID, "PUBLIC_SANITY_PROJECT_ID");
const apiVersion = "2024-03-15";
const studioUrl = PUBLIC_SANITY_STUDIO_URL;
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: "sksUPagry14vJfjOkbBr8QACt4HFNaQh5HBlGDjgBedIlc2yR1bW169QTZ6p2AfAGoRrduwVOPdbEbmCp3UGOfRy6ns6vgoXSwIVRers84zHoPto92b12DA1T9CIzFfXCFMi7DyCBVmzOsYc55exuauL4fD1wKErbHDPS7GpdDkU6GskBJng",
  apiHost: "https://api.sanity.io",
  stega: {
    studioUrl
  }
});
export {
  assertEnvVar as a,
  client as c
};
