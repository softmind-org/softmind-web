import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
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

// GROQ Queries
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  tags,
  seoTitle,
  seoDescription
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  tags,
  body,
  seoTitle,
  seoDescription,
  ogImage
}`;

export const allSlugsQuery = `*[_type in ["post", "page"]] {
  _type,
  "slug": slug.current,
  _updatedAt
}`;
