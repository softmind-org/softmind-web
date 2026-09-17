import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { chunkText } from "@/lib/rag/chunker";
import { generateEmbedding } from "@/lib/rag/embeddings";

export async function POST(req) {
  try {
    const adminSecret = process.env.ADMIN_UPLOAD_SECRET;
    const reqSecret = req.headers.get("x-admin-secret") || req.nextUrl.searchParams.get("secret");

    if (adminSecret && reqSecret !== adminSecret) {
      return NextResponse.json({ message: "Unauthorized admin upload" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "No valid file uploaded" }, { status: 400 });
    }

    const filename = file.name || `doc-${Date.now()}.pdf`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const supabase = getSupabaseAdmin();

    // 1. Upload original file to Supabase Storage bucket 'knowledge-base'
    const storagePath = `uploads/${Date.now()}_${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: storageErr } = await supabase.storage
      .from("knowledge-base")
      .upload(storagePath, buffer, {
        contentType: file.type || "application/pdf",
        upsert: true,
      });

    if (storageErr) {
      console.warn("Storage upload warning (proceeding with text extraction):", storageErr.message);
    }

    // 2. Extract plain text content
    let extractedText = "";
    if (file.type === "application/pdf" || filename.toLowerCase().endsWith(".pdf")) {
      try {
        let PDFParse = null;
        try {
          const pdfModule = await import("pdf-parse/node");
          PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse || pdfModule.default;
        } catch (mErr) {
          const pdfModule = await import("pdf-parse");
          PDFParse = pdfModule.PDFParse || pdfModule.default;
        }

        if (PDFParse) {
          const parser = new PDFParse(buffer);
          const parsed = await parser.getText();
          extractedText = typeof parsed === "string" ? parsed : parsed?.text || "";
        } else {
          extractedText = buffer.toString("utf-8");
        }
      } catch (pdfErr) {
        console.error("PDF Parsing Error:", pdfErr);
        extractedText = buffer.toString("utf-8");
      }
    } else {
      extractedText = buffer.toString("utf-8");
    }

    if (!extractedText.trim()) {
      return NextResponse.json({ message: "Could not extract readable text from document" }, { status: 400 });
    }

    const sourceId = `uploaded_${storagePath}`;

    // 3. Upsert document in Supabase `documents` table
    const { data: docRecord, error: docErr } = await supabase
      .from("documents")
      .upsert(
        {
          source_type: "uploaded_file",
          source_id: sourceId,
          title: filename,
          raw_content: extractedText,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "source_id" }
      )
      .select()
      .single();

    if (docErr) {
      throw new Error(`Supabase document record creation failed: ${docErr.message}`);
    }

    // 4. Delete existing chunks if any
    await supabase.from("document_chunks").delete().eq("document_id", docRecord.id);

    // 5. Chunk text & generate vector embeddings
    const textChunks = chunkText(extractedText, 2000, 400);
    const insertedChunks = [];

    for (let i = 0; i < textChunks.length; i++) {
      const chunkContent = textChunks[i];
      let embedding = null;
      try {
        embedding = await generateEmbedding(chunkContent);
      } catch (embErr) {
        console.error(`Embedding generation failed for chunk ${i}:`, embErr.message);
      }

      insertedChunks.push({
        document_id: docRecord.id,
        content: chunkContent,
        embedding,
        metadata: {
          source_type: "uploaded_file",
          filename,
          storage_path: storagePath,
          chunk_index: i,
          total_chunks: textChunks.length,
        },
      });
    }

    if (insertedChunks.length > 0) {
      const { error: chunkErr } = await supabase.from("document_chunks").insert(insertedChunks);
      if (chunkErr) {
        console.error("Failed to insert document chunks:", chunkErr);
      }
    }

    return NextResponse.json({
      success: true,
      filename,
      storage_path: storagePath,
      chunks_created: textChunks.length,
    });
  } catch (err) {
    console.error("RAG File Upload Error:", err);
    return NextResponse.json({ message: "Upload failed", error: err.message }, { status: 500 });
  }
}
