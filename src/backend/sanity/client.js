import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const rawApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
export const apiVersion =
  rawApiVersion && (/^\d{4}-\d{2}-\d{2}$/.test(rawApiVersion) || rawApiVersion === "1")
    ? rawApiVersion
    : "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  ...(process.env.SANITY_API_TOKEN ? { token: process.env.SANITY_API_TOKEN } : {}),
});

// Image helper
const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source) {
  if (!source || !source.asset || projectId === "placeholder") return null;
  try {
    return builder.image(source);
  } catch (err) {
    return null;
  }
}

// Safe Sanity Fetch wrapper
export async function safeSanityFetch(query, params = {}) {
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    projectId === "placeholder"
  ) {
    return null;
  }
  try {
    return await sanityClient.fetch(query, params);
  } catch (err) {
    console.warn("Sanity fetch warning:", err.message);
    return null;
  }
}

// Helper to convert Portable Text / blocks array into plain text for RAG chunking & excerpts
export function portableTextToPlainText(blocks = []) {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child) => child.text).join("");
    })
    .filter(Boolean)
    .join("\n\n");
}
