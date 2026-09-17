-- Enable the pgvector extension to work with embedding vectors
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table to track source content (Sanity posts, pages, uploaded files)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type TEXT NOT NULL CHECK (source_type IN ('sanity_post', 'sanity_page', 'uploaded_file')),
    source_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    raw_content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create document_chunks table to store individual text chunks and vector embeddings
CREATE TABLE IF NOT EXISTS public.document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding VECTOR(768),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create HNSW Vector Index for efficient similarity search
CREATE INDEX IF NOT EXISTS document_chunks_embedding_hnsw_idx 
ON public.document_chunks 
USING hnsw (embedding vector_cosine_ops);

-- Create RPC function for similarity search matching
CREATE OR REPLACE FUNCTION match_document_chunks(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.25,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  content TEXT,
  metadata JSONB,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.document_id,
    dc.content,
    dc.metadata,
    (1 - (dc.embedding <=> query_embedding))::float AS similarity
  FROM public.document_chunks dc
  WHERE (1 - (dc.embedding <=> query_embedding)) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Enable Row Level Security (RLS)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access for RAG retrieval
DROP POLICY IF EXISTS "Allow public read access on documents" ON public.documents;
CREATE POLICY "Allow public read access on documents" ON public.documents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on document_chunks" ON public.document_chunks;
CREATE POLICY "Allow public read access on document_chunks" ON public.document_chunks FOR SELECT USING (true);
