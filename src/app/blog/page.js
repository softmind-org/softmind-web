import OurBlogs from "@/components/blogsComponents/ourBlogs";
import FinalCta from "@/components/home/finalCta";
import { Hero } from "@/components/home/Hero";
import { safeSanityFetch, urlFor } from "@/backend/sanity/client";
import { postsQuery } from "@/backend/sanity/queries";

export const metadata = {
  title: "Insights & Industry Trends | SoftMind Solutions Blog",
  description:
    "Explore expert perspectives, practical tips, and the latest industry trends in AI SaaS, real estate, edtech, and custom software development.",
  openGraph: {
    title: "Insights & Industry Trends | SoftMind Solutions Blog",
    description:
      "Explore expert perspectives, practical tips, and the latest industry trends in AI SaaS and custom software development.",
    url: "https://softmindsol.com/blog",
    siteName: "SoftMind Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Industry Trends | SoftMind Solutions Blog",
    description: "Explore expert perspectives and AI industry trends.",
  },
};

export default async function Blogs() {
  let sanityPosts = [];
  try {
    const rawPosts = await safeSanityFetch(postsQuery);
    if (Array.isArray(rawPosts) && rawPosts.length > 0) {
      sanityPosts = rawPosts.map((post, idx) => ({
        id: post._id || idx + 1,
        title: post.title,
        description: post.excerpt || "Read more about this article...",
        image: urlFor(post.coverImage)?.url() || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
        time: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Recent",
        outcomes: "Outcomes",
        slug: post.slug,
      }));
    }
  } catch (err) {
    console.warn("Sanity posts fetch warning (using default posts fallback):", err.message);
  }

  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="Insights, Ideas &"
        typewriterPrefix=""
        typewriterPhrases={["Industry Trends"]}
        description="Stay updated with expert perspectives, practical tips, and the latest industry trends. Explore articles designed to help you learn, grow, and make informed decisions."
        primaryButtonText="Start a Project"
        primaryButtonLink="/contact"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <OurBlogs initialPosts={sanityPosts.length > 0 ? sanityPosts : null} />
      <FinalCta />
    </main>
  );
}
