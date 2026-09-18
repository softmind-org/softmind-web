import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/backend/supabase/admin";
import { generateEmbedding, generateChatStream } from "@/backend/rag/embeddings";

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ message: "Message string is required." }, { status: 400 });
    }

    const supabase = getSupabaseClient();

    // 1. Generate query embedding
    let queryVector = null;
    try {
      queryVector = await generateEmbedding(message);
    } catch (err) {
      console.error("Query embedding failed:", err.message);
    }

    // 2. Vector search in Supabase
    let matchedChunks = [];
    if (queryVector && Array.isArray(queryVector)) {
      const { data: matches, error: matchErr } = await supabase.rpc("match_document_chunks", {
        query_embedding: queryVector,
        match_threshold: 0.15,
        match_count: 5,
      });

      if (matchErr) {
        console.error("Vector search RPC error:", matchErr.message);
      } else if (matches) {
        matchedChunks = matches;
      }
    }

    // 3. Extract unique source metadata for UI attribution
    const sources = Array.from(
      new Map(
        matchedChunks.map((item) => {
          const meta = item.metadata || {};
          const title = meta.title || meta.filename || "Knowledge Base";
          const url = meta.url || null;
          return [title, { title, url, sourceType: meta.source_type || "uploaded_file" }];
        })
      ).values()
    );

    // 4. Construct RAG Prompt
    let contextText = "";
    if (matchedChunks.length > 0) {
      contextText = matchedChunks
        .map((chunk, idx) => `[Source ${idx + 1}: ${chunk.metadata?.title || "Document"}]\n${chunk.content}`)
        .join("\n\n");
    } else {
      contextText = "No specific documentation chunks retrieved.";
    }

    const systemPrompt = `You are SoftMind Solutions' AI Assistant. SoftMind Solutions is an expert AI SaaS and Custom Software Development Company.
Answer the user's question accurately, concisely, and professionally using the retrieved knowledge context below.

CONTEXT FROM SOFTMIND KNOWLEDGE BASE:
${contextText}

If the question cannot be answered from the context alone, provide a polite, helpful response drawing on general AI/software expertise while inviting the user to contact SoftMind Solutions at /contact for tailored inquiries. Always maintain a helpful, warm, and professional tone.`;

    // 5. Call Gemini API Stream
    const rawStream = await generateChatStream(systemPrompt, history);

    // Header encoding sources
    const sourcesHeader = encodeURIComponent(JSON.stringify(sources));

    return new Response(rawStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Sources": sourcesHeader,
      },
    });
  } catch (err) {
    console.error("Chat API Route Error:", err);
    return NextResponse.json({ message: "Internal server error", error: err.message }, { status: 500 });
  }
}
