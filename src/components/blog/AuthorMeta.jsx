import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthorMeta({
  author = "SoftMind Editorial Team",
  authorRole = "AI & Technology Practice",
  authorImage = "/images/favicon.svg",
  publishedDate = "September 21, 2026",
  readTime = "19-20 Min Read",
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-b border-gray-200 font-jakarta">
      {/* Left: Author Avatar & Name & Date */}
      <div className="flex items-center gap-3.5">
        {/* Author Avatar */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 p-0.5 shrink-0 shadow-sm">
          {authorImage ? (
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src={authorImage}
                alt={author}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-navy flex items-center justify-center text-white font-bold text-lg">
              {author.charAt(0) || "S"}
            </div>
          )}
        </div>

        {/* Name and Published Date */}
        <div className="flex flex-col">
          <Link
            href="/about-us"
            className="font-bold text-[15px] sm:text-[16px] text-navy hover:text-green transition-colors underline-offset-2 hover:underline"
          >
            {author}
          </Link>
          <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-500 font-medium">
            <span>Posted on {publishedDate}</span>
          </div>
        </div>
      </div>

      {/* Right: Read Time & Google Preferred Badge */}
      <div className="flex items-center gap-4 text-xs sm:text-[13px]">
        {/* Reading Time */}
        <span className="font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          {readTime}
        </span>

        {/* Google Preferred Button / Badge */}
        {/* <a
          href="https://news.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700 font-medium shadow-xs"
          title="Follow on Google News"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span className="hidden xs:inline">Add as preferred on Google</span>
          <span className="xs:hidden">Google News</span>
        </a> */}
      </div>
    </div>
  );
}
