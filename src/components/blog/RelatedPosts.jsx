import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

export default function RelatedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full my-16 font-jakarta" aria-label="Related articles">
      <div className="flex items-center justify-between gap-4 mb-8 pb-3 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span className="text-xs font-bold text-green uppercase tracking-widest">
              Just Published
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-1">
            Related Insights & Articles
          </h2>
        </div>

        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-green transition-colors"
        >
          View all insights
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post, idx) => (
          <article
            key={post.slug || idx}
            className="group flex flex-col bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <Link
              href={`/blog/${post.slug}`}
              className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 block"
            >
              <Image
                src={
                  post.image ||
                  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
                }
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {post.category && (
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-navy text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {post.category}
                </span>
              )}
            </Link>

            {/* Content Details */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-2.5">
                  <span>{post.date || "Recent"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {post.readTime || "5 min read"}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block group">
                  <h3 className="font-bold text-navy text-base leading-snug group-hover:text-green transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                {post.excerpt && (
                  <p className="text-xs text-gray-600 font-medium line-clamp-2 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy group-hover:text-green transition-colors"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
