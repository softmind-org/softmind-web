import { NextResponse } from "next/server";
import { supabase } from "@/backend/supabase/client";

// In-memory fallback cache if Supabase table is not yet set up
const fallbackReactions = {};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  // Default counts
  const defaultCounts = {
    like: 12,
    love: 8,
    insightful: 19,
    celebrate: 5,
    rocket: 15,
  };

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from("blog_reactions")
        .select("reaction_type, count")
        .eq("post_slug", slug);

      if (!error && data && data.length > 0) {
        const counts = { ...defaultCounts };
        data.forEach((item) => {
          if (item.reaction_type) {
            counts[item.reaction_type] = item.count;
          }
        });
        return NextResponse.json({ counts });
      }
    }
  } catch (err) {
    console.warn("Supabase reaction fetch warning:", err.message);
  }

  // Fallback to in-memory / default counts
  const postCounts = fallbackReactions[slug] || { ...defaultCounts };
  return NextResponse.json({ counts: postCounts });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, reactionType, delta } = body;

    if (!slug || !reactionType) {
      return NextResponse.json(
        { error: "Slug and reactionType are required" },
        { status: 400 }
      );
    }

    const step = delta === -1 ? -1 : 1;

    // Try Supabase RPC or upsert if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        // Attempt RPC if exists
        const { data: rpcData, error: rpcError } = await supabase.rpc(
          "increment_blog_reaction",
          {
            p_slug: slug,
            p_type: reactionType,
            p_delta: step,
          }
        );

        if (!rpcError && rpcData !== null) {
          return NextResponse.json({ success: true, count: rpcData });
        }

        // Otherwise try direct table update
        const { data: existing } = await supabase
          .from("blog_reactions")
          .select("count")
          .eq("post_slug", slug)
          .eq("reaction_type", reactionType)
          .single();

        const currentCount = existing?.count || (reactionType === "insightful" ? 19 : 10);
        const newCount = Math.max(0, currentCount + step);

        const { error: upsertError } = await supabase
          .from("blog_reactions")
          .upsert(
            {
              post_slug: slug,
              reaction_type: reactionType,
              count: newCount,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "post_slug,reaction_type" }
          );

        if (!upsertError) {
          return NextResponse.json({ success: true, count: newCount });
        }
      } catch (dbErr) {
        console.warn("Supabase reaction update warning:", dbErr.message);
      }
    }

    // In-memory fallback
    if (!fallbackReactions[slug]) {
      fallbackReactions[slug] = {
        like: 12,
        love: 8,
        insightful: 19,
        celebrate: 5,
        rocket: 15,
      };
    }

    fallbackReactions[slug][reactionType] = Math.max(
      0,
      (fallbackReactions[slug][reactionType] || 0) + step
    );

    return NextResponse.json({
      success: true,
      count: fallbackReactions[slug][reactionType],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update reaction" },
      { status: 500 }
    );
  }
}
