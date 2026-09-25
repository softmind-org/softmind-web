import React from "react";
import {
  safeSanityFetch,
  urlFor,
  portableTextToPlainText,
} from "@/backend/sanity/client";
import { postBySlugQuery, postsQuery } from "@/backend/sanity/queries";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import BlogHeader from "@/components/blog/BlogHeader";
import AuthorMeta from "@/components/blog/AuthorMeta";
import BlogHero from "@/components/blog/BlogHero";
import TableOfContents from "@/components/blog/TableOfContents";
import ArticleBody, { slugify } from "@/components/blog/ArticleBody";
import ReactionBar from "@/components/blog/ReactionBar";
import BlogSidebar from "@/components/blog/BlogSidebar";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogFooterCta from "@/components/blog/BlogFooterCta";

const fallbackBlogPosts = {
  "top-edtech-technology-partners-2026": {
    title: "Top 10 Education Technology Partners in 2026",
    category: "Insights / EdTech",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    date: "September 21, 2026",
    readTime: "19-20 Min Read",
    author: "SoftMind Editorial Team",
    excerpt:
      "Explore the definitive ranking and engineering criteria for selecting top educational technology software partners, LMS developers, and AI-native learning platform teams in 2026.",
  },
  "blog-detail": {
    title: "The Future of AI in Modern Businesses: Engineering Agentic Systems",
    category: "Insights / AI SaaS",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    date: "September 21, 2026",
    readTime: "15-18 Min Read",
    author: "SoftMind Editorial Team",
    excerpt:
      "Artificial Intelligence is no longer just predictive — it has become agentic and autonomous. Learn how forward-thinking enterprises are integrating AI workflows into production.",
  },
  "reshaping-real-estate": {
    title: "How Technology is Reshaping Real Estate & PropTech in 2026",
    category: "Insights / PropTech",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    date: "September 18, 2026",
    readTime: "12-14 Min Read",
    author: "SoftMind Editorial Team",
    excerpt:
      "From smart property management to digital tenant experiences, discover how modern cloud platforms are driving efficiency in real estate.",
  },
};

const defaultTocItems = [
  {
    id: "what-counts-as-an-edtech-technology-partner",
    title: "What Counts As An EdTech Technology Partner",
  },
  {
    id: "how-we-scored-these-education-technology-partners",
    title: "How We Scored These Education Technology Partners",
  },
  {
    id: "the-10-best-edtech-partners-in-2026",
    title: "The 10 Best EdTech Partners In 2026",
    subItems: [
      {
        id: "1-softmind-solutions-ai-native-edtech-engineering",
        title: "SoftMind Solutions — AI-Native EdTech & Cloud Platforms",
      },
      {
        id: "2-enterprise-scale-cloud-architectures",
        title: "Enterprise Scale Cloud & Open edX Integrations",
      },
    ],
  },
  {
    id: "which-edtech-partner-fits-what-you-are-building",
    title: "Which EdTech Partner Fits What You Are Building",
  },
  {
    id: "how-to-evaluate-an-edtech-partner-that-is-not-on-this-list",
    title: "How To Evaluate An EdTech Partner That Is Not On This List",
  },
  {
    id: "talk-to-us-about-your-build",
    title: "Talk To Us About Your Build",
  },
];

// Helper to extract TOC items dynamically from Sanity body blocks
function extractTocFromSanityBody(body) {
  if (!body || !Array.isArray(body)) return null;

  const items = [];
  let currentParent = null;

  body.forEach((block) => {
    if (
      block._type === "block" &&
      (block.style === "h2" || block.style === "h3")
    ) {
      const text = (block.children || [])
        .map((c) => c.text)
        .join("")
        .trim();
      if (!text) return;

      const id = slugify(text);

      if (block.style === "h2") {
        currentParent = { id, title: text, subItems: [] };
        items.push(currentParent);
      } else if (block.style === "h3") {
        const subItem = { id, title: text };
        if (currentParent) {
          currentParent.subItems.push(subItem);
        } else {
          items.push(subItem);
        }
      }
    }
  });

  if (items.length > 0) {
    items.push({
      id: "talk-to-us-about-your-build",
      title: "Talk To Us About Your Build",
    });
    return items;
  }

  return null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "top-edtech-technology-partners-2026";

  let sanityPost = null;
  try {
    sanityPost = await safeSanityFetch(postBySlugQuery, { slug });
  } catch (err) {
    console.warn("Sanity generateMetadata warning:", err.message);
  }

  const fallback =
    fallbackBlogPosts[slug] ||
    fallbackBlogPosts["top-edtech-technology-partners-2026"] ||
    fallbackBlogPosts["blog-detail"];

  const title =
    sanityPost?.seoTitle ||
    sanityPost?.title ||
    fallback?.title ||
    "Insights | SoftMind Solutions";
  const description =
    sanityPost?.seoDescription ||
    sanityPost?.excerpt ||
    fallback?.excerpt ||
    "Read expert perspectives and engineering analysis.";
  const image = sanityPost?.ogImage
    ? urlFor(sanityPost.ogImage)?.url()
    : sanityPost?.coverImage
      ? urlFor(sanityPost.coverImage)?.url()
      : fallback?.image;
  // Always ship an og:image — without one, social scrapers pick an arbitrary
  // image off the page (partner logos and the like).
  const ogImage = image || "https://softmindsol.com/og-image.png";
  const url = `https://softmindsol.com/blog/${slug}`;

  return {
    title: `${title} | SoftMind Solutions`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "SoftMind Solutions",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "top-edtech-technology-partners-2026";

  let sanityPost = null;
  let allSanityPosts = [];
  try {
    const [fetchedPost, fetchedAll] = await Promise.all([
      safeSanityFetch(postBySlugQuery, { slug }),
      safeSanityFetch(postsQuery),
    ]);
    sanityPost = fetchedPost;
    if (Array.isArray(fetchedAll)) {
      allSanityPosts = fetchedAll;
    }
  } catch (err) {
    console.warn("Sanity fetch warning:", err.message);
  }

  const fallback =
    fallbackBlogPosts[slug] ||
    fallbackBlogPosts["top-edtech-technology-partners-2026"] ||
    fallbackBlogPosts["blog-detail"];

  const title = sanityPost?.title || fallback.title;
  const image = sanityPost?.coverImage
    ? urlFor(sanityPost.coverImage)?.url()
    : fallback.image;
  const date = sanityPost?.publishedAt
    ? new Date(sanityPost.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : fallback.date;
  const author = "SoftMind Editorial Team";
  const readTime = fallback.readTime || "19-20 Min Read";
  const category = fallback.category || "Insights / Blogs";

  const plainTextContent = sanityPost?.body
    ? portableTextToPlainText(sanityPost.body)
    : fallback.excerpt || "";

  // Dynamic TOC or fallback
  const tocItems =
    extractTocFromSanityBody(sanityPost?.body) || defaultTocItems;

  // Format related posts
  const relatedPosts = allSanityPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      image: urlFor(p.coverImage)?.url(),
      date: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Recent",
      readTime: "8 min read",
      excerpt: p.excerpt,
      category: p.tags?.[0] || "Insights",
    }));

  const finalRelatedPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : [
          {
            title: "How Technology is Reshaping Real Estate & PropTech in 2026",
            slug: "reshaping-real-estate",
            image:
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
            date: "September 18, 2026",
            readTime: "12 min read",
            excerpt:
              "From smart property management to digital tenant experiences.",
            category: "PropTech",
          },
          {
            title:
              "The Future of AI in Modern Businesses: Engineering Agentic Systems",
            slug: "blog-detail",
            image:
              "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
            date: "September 12, 2026",
            readTime: "15 min read",
            excerpt:
              "How forward-thinking enterprises are integrating AI workflows.",
            category: "AI SaaS",
          },
          {
            title: "Top 10 Education Technology Partners in 2026",
            slug: "top-edtech-technology-partners-2026",
            image:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
            date: "September 21, 2026",
            readTime: "20 min read",
            excerpt:
              "A comprehensive analysis of leading software engineering partners.",
            category: "EdTech",
          },
        ].filter((p) => p.slug !== slug);

  const currentUrl = `https://softmindsol.com/blog/${slug}`;

  return (
    <main className="w-full bg-white text-navy font-jakarta selection:bg-green">
      <ArticleJsonLd
        post={{
          title,
          excerpt: sanityPost?.excerpt || fallback.excerpt,
          coverImage: image,
          publishedAt: sanityPost?.publishedAt || new Date().toISOString(),
          author,
        }}
        url={currentUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://softmindsol.com" },
          { name: "Blogs", url: "https://softmindsol.com/blog" },
          { name: title, url: currentUrl },
        ]}
      />

      {/* Main Container */}
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start justify-between">
          {/* ── LEFT COLUMN: Sticky Table of Contents & Summarize with AI ── */}
          <TableOfContents
            items={tocItems}
            fullContent={`${title}\n\n${plainTextContent}`}
          />

          {/* ── CENTER COLUMN: Header, Hero, Body, Reactions, Related Posts ── */}
          <div className="flex-1 min-w-0 max-w-210 w-full">
            {/* Header meta block */}
            <BlogHeader title={title} category={category} />

            {/* Author row */}
            <AuthorMeta
              author={author}
              publishedDate={date}
              readTime={readTime}
            />

            {/* Hero image */}
            <BlogHero image={image} title={title} />

            {/* Article body content */}
            <ArticleBody
              body={sanityPost?.body}
              plainTextFallback={plainTextContent}
            />

            {/* Reaction Section */}
            <ReactionBar slug={slug} />

            {/* Talk To Us / Footer CTA */}
            {/* <BlogFooterCta /> */}

            {/* Related Posts Section */}
            <RelatedPosts posts={finalRelatedPosts} />
          </div>

          {/* ── RIGHT COLUMN: Solutions / Services Tabs & Newsletter ── */}
          <BlogSidebar />
        </div>
      </div>
    </main>
  );
}
