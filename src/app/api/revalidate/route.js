import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const secret = req.headers.get("x-sanity-secret") || req.nextUrl.searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const slug = body?.slug?.current || body?.slug;

    // Revalidate blog paths and tags
    revalidatePath("/blog");
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
    revalidatePath("/");

    return NextResponse.json({ revalidated: true, now: Date.now(), slug });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}
