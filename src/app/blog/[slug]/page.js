import React from "react";
import Link from "next/link";
import { ArrowLeft, LinkIcon, Mail } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import SummarizeButton from "@/components/blogsComponents/summarizeButton";
import { safeSanityFetch, postBySlugQuery, urlFor, portableTextToPlainText } from "@/lib/sanity/client";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const fallbackBlogPosts = {
  "blog-detail": {
    title: "The Future of AI in Modern Businesses",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    date: "June 6, 2026",
    readTime: "15 min read",
    author: "Written by User name",
    content: "Artificial Intelligence (AI) is no longer a futuristic concept — it has become a true driver of innovation and business growth. Organizations across the globe are integrating AI into their core operations to improve decision-making, enhance customer experiences, and unlock new opportunities.",
  },
  "reshaping-real-estate": {
    title: "How Technology is Reshaping Real Estate",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    date: "June 8, 2026",
    readTime: "12 min read",
    author: "Written by User name",
    content: "From smart property management to digital tenant experiences, technology is driving unprecedented efficiency in real estate operations.",
  },
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "blog-detail";
  
  let sanityPost = null;
  try {
    sanityPost = await safeSanityFetch(postBySlugQuery, { slug });
  } catch (err) {
    console.warn("Sanity generateMetadata warning:", err.message);
  }

  const title = sanityPost?.seoTitle || sanityPost?.title || fallbackBlogPosts[slug]?.title || "Blog Post | SoftMind Solutions";
  const description = sanityPost?.seoDescription || sanityPost?.excerpt || "Read expert perspectives and practical tips on AI and software development.";
  const image = sanityPost?.ogImage ? urlFor(sanityPost.ogImage)?.url() : sanityPost?.coverImage ? urlFor(sanityPost.coverImage)?.url() : fallbackBlogPosts[slug]?.image;
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
      type: "article",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function BlogDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "blog-detail";

  let sanityPost = null;
  try {
    sanityPost = await safeSanityFetch(postBySlugQuery, { slug });
  } catch (err) {
    console.warn("Sanity post fetch warning:", err.message);
  }

  const fallback = fallbackBlogPosts[slug] || fallbackBlogPosts["blog-detail"];

  const title = sanityPost?.title || fallback.title;
  const image = sanityPost?.coverImage ? urlFor(sanityPost.coverImage)?.url() : fallback.image;
  const date = sanityPost?.publishedAt ? new Date(sanityPost.publishedAt).toLocaleDateString() : fallback.date;
  const author = "SoftMind Solutions";
  const readTime = "10 min read";

  const plainTextContent = sanityPost?.body
    ? portableTextToPlainText(sanityPost.body)
    : fallback.content;

  const currentUrl = `https://softmindsol.com/blog/${slug}`;

  return (
    <main className="w-full flex flex-col bg-white text-[#161616] font-jakarta">
      <ArticleJsonLd post={{ title, excerpt: sanityPost?.excerpt, coverImage: image, publishedAt: sanityPost?.publishedAt, author }} url={currentUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://softmindsol.com" },
          { name: "Blog", url: "https://softmindsol.com/blog" },
          { name: title, url: currentUrl },
        ]}
      />

      {/* Top Banner Section */}
      <section className="w-full relative px-4 md:px-8 pt-12 pb-20 max-w-[1400px] mx-auto">
        <div className="w-full mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden mb-[-60px] z-0 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title Box */}
        <div className="relative z-10 w-[95%] md:w-[85%] mx-auto bg-[#F4F4F5] rounded-[20px] p-8 md:p-12 shadow-md flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 max-w-[800px] leading-tight text-navy">
            {title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center border-2 border-white shadow-sm">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-[15px]">{author}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 text-gray-500 font-medium">
              <span>{date}</span> <span className="mx-2">•</span>{" "}
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full bg-[#F9FAFB] py-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12">
          {/* Sticky Social Sidebar */}
          <aside className="w-full lg:w-[80px] shrink-0">
            <div className="sticky top-32 flex lg:flex-col gap-4 items-center justify-center lg:justify-start">
              <a
                href="#"
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0B63BD] hover:text-white hover:border-[#0B63BD] transition-all duration-300 shadow-sm"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0862F7] hover:text-white hover:border-[#0862F7] transition-all duration-300 shadow-sm"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm"
              >
                <Mail className="w-5 h-5" />
              </a>
              <button className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#F67503] hover:text-white hover:border-[#F67503] transition-all duration-300 shadow-sm">
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>
          </aside>

          {/* Article Content */}
          <article className="flex-1 max-w-[850px] text-[17px] leading-[1.8] text-gray-700 font-medium">
            <div className="mb-8">
              <SummarizeButton 
                content={`${title}\n\n${plainTextContent}`} 
                theme="light" 
              />
            </div>
            
            <div className="space-y-6">
              {plainTextContent.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
