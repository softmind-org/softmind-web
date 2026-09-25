import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/backend/supabase/admin";

// In-memory fallback cache to store real counts if database is temporarily unreachable
const fallbackReactions = new Map();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  // Real initial counts starting at 0
  const realCounts = {
    not_useful: 0,
    okay: 0,
    helpful: 0,
    very_helpful: 0,
  };

  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_reactions")
        .select("reaction_type, count")
        .eq("post_slug", slug);

      if (!error && data) {
        data.forEach((item) => {
          if (item.reaction_type && realCounts.hasOwnProperty(item.reaction_type)) {
            realCounts[item.reaction_type] = Number(item.count) || 0;
          }
        });
        return NextResponse.json({ counts: realCounts });
      }
    }
  } catch (err) {
    console.warn("Supabase reaction fetch warning:", err.message);
  }

  // Fallback to in-memory real counts
  const postCounts = fallbackReactions[slug] || realCounts;
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

    const allowedReactionTypes = ["not_useful", "okay", "helpful", "very_helpful"];
    if (!allowedReactionTypes.includes(reactionType)) {
      return NextResponse.json({ error: "Invalid reactionType" }, { status: 400 });
    }

    const step = delta === -1 ? -1 : 1;

    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        // Fetch existing count for this specific post and reaction type
        const { data: existing, error: selectError } = await supabase
          .from("blog_reactions")
          .select("id, count")
          .eq("post_slug", slug)
          .eq("reaction_type", reactionType)
          .maybeSingle();

        const currentCount = existing ? Number(existing.count) || 0 : 0;
        const newCount = Math.max(0, currentCount + step);

        if (existing?.id) {
          // Update existing row
          const { error: updateError } = await supabase
            .from("blog_reactions")
            .update({
              count: newCount,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id);

          if (!updateError) {
            return NextResponse.json({ success: true, count: newCount });
          }
        } else {
          // Insert new row
          const { error: insertError } = await supabase
            .from("blog_reactions")
            .insert({
              post_slug: slug,
              reaction_type: reactionType,
              count: newCount,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (!insertError) {
            return NextResponse.json({ success: true, count: newCount });
          }
        }
      }
    } catch (dbErr) {
      console.warn("Supabase reaction update warning:", dbErr.message);
    }

    // In-memory fallback
    let fallbackForSlug = fallbackReactions.get(slug);
    if (!fallbackForSlug) {
      fallbackForSlug = {
        not_useful: 0,
        okay: 0,
        helpful: 0,
        very_helpful: 0,
      };
      fallbackReactions.set(slug, fallbackForSlug);
    }

    fallbackForSlug[reactionType] = Math.max(
      0,
      (fallbackForSlug[reactionType] || 0) + step
    );

    return NextResponse.json({
      success: true,
      count: fallbackForSlug[reactionType],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update reaction" },
      { status: 500 }
    );
  }
}
