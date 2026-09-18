/**
 * Backend Module — Barrel Exports
 *
 * Centralizes server-side business logic:
 *   - RAG pipeline (chunking, embeddings, LLM streaming)
 *   - Sanity CMS client, helpers & GROQ queries
 *   - Supabase clients (anonymous + admin)
 */

// RAG
export { chunkText } from "./rag/chunker";
export { generateEmbedding, generateChatStream } from "./rag/embeddings";

// Sanity
export {
  sanityClient,
  projectId,
  dataset,
  apiVersion,
  urlFor,
  safeSanityFetch,
  portableTextToPlainText,
} from "./sanity/client";
export {
  postsQuery,
  postBySlugQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  allSlugsQuery,
} from "./sanity/queries";

// Supabase
export { supabase } from "./supabase/client";
export { getSupabaseClient, getSupabaseAdmin } from "./supabase/admin";
