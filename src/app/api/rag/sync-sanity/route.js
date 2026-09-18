import { NextResponse } from "next/server";
import { sanityClient, portableTextToPlainText } from "@/backend/sanity/client";
import { getSupabaseAdmin } from "@/backend/supabase/admin";
import { chunkText } from "@/backend/rag/chunker";
import { generateEmbedding } from "@/backend/rag/embeddings";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.SANITY_REVALIDATE_SECRET || process.env.ADMIN_UPLOAD_SECRET;
    
    // Optional secret check if configured
    if (secret && authHeader !== `Bearer ${secret}` && req.headers.get("x-sanity-secret") !== secret) {
      const urlSecret = req.nextUrl.searchParams.get("secret");
      if (urlSecret !== secret) {
        return NextResponse.json({ message: "Unauthorized sync request" }, { status: 401 });
      }
    }

    const body = await req.json().catch(() => ({}));
    const supabase = getSupabaseAdmin();

    // Fetch documents to sync: specific ID/slug or all posts + pages
    let sanityDocs = [];

    if (body?._id) {
      const doc = await sanityClient.fetch(`*[_id == $id][0]`, { id: body._id });
      if (doc) sanityDocs = [doc];
    } else {
      sanityDocs = await sanityClient.fetch(
        `*[_type in ["post", "page"]] {
          _id,
          _type,
          title,
          "slug": slug.current,
          body,
          excerpt
        }`
      );
    }

    if (!sanityDocs.length) {
      return NextResponse.json({ message: "No Sanity documents found to sync" }, { status: 200 });
    }

    const syncedResults = [];

    for (const doc of sanityDocs) {
      const sourceType = doc._type === "post" ? "sanity_post" : "sanity_page";
      const sourceId = doc._id;
      const title = doc.title || "Untitled Document";
      const slug = doc.slug || "";
      const urlPath = doc._type === "post" ? `/blog/${slug}` : `/${slug}`;
      const plainTextBody = portableTextToPlainText(doc.body || []);
      const fullText = `${title}\n\n${doc.excerpt ? doc.excerpt + "\n\n" : ""}${plainTextBody}`;

      if (!fullText.trim()) continue;

      // 1. Upsert into Supabase `documents` table
      const { data: docRecord, error: docErr } = await supabase
        .from("documents")
        .upsert(
          {
            source_type: sourceType,
            source_id: sourceId,
            title,
            raw_content: fullText,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "source_id" }
        )
        .select()
        .single();

      if (docErr) {
        console.error(`Failed to upsert document ${sourceId}:`, docErr);
        continue;
      }

      // 2. Clear old document_chunks for this document_id
      await supabase.from("document_chunks").delete().eq("document_id", docRecord.id);

      // 3. Chunk text & generate embeddings
      const textChunks = chunkText(fullText, 2000, 400);
      const insertedChunks = [];

      for (let i = 0; i < textChunks.length; i++) {
        const chunkContent = textChunks[i];
        let embedding = null;
        try {
          embedding = await generateEmbedding(chunkContent);
        } catch (embErr) {
          console.error(`Embedding generation failed for chunk ${i} of ${title}:`, embErr.message);
        }

        insertedChunks.push({
          document_id: docRecord.id,
          content: chunkContent,
          embedding,
          metadata: {
            source_type: sourceType,
            source_id: sourceId,
            title,
            slug,
            url: urlPath,
            chunk_index: i,
            total_chunks: textChunks.length,
          },
        });
      }

      if (insertedChunks.length > 0) {
        const { error: chunkErr } = await supabase.from("document_chunks").insert(insertedChunks);
        if (chunkErr) {
          console.error(`Failed to insert chunks for ${title}:`, chunkErr);
        }
      }

      syncedResults.push({
        title,
        source_id: sourceId,
        chunks_count: textChunks.length,
      });
    }

    return NextResponse.json({
      success: true,
      synced_count: syncedResults.length,
      documents: syncedResults,
    });
  } catch (err) {
    console.error("Sanity RAG Sync Error:", err);
    return NextResponse.json({ message: "Sync failed", error: err.message }, { status: 500 });
  }
}
