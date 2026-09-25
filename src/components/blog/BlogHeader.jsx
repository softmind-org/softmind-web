import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function BlogHeader({ title, category = "Insights / Blogs" }) {
  return (
    <header className="w-full my-6">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs sm:text-sm text-dark font-medium mb-3"
      >
        <Link href="/" className="hover:text-green transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray" />
        <Link href="/blog" className="text-green transition-colors">
          {category}
        </Link>
      </nav>

      {/* Main H1 Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy font-jakarta leading-[1.2] tracking-tight">
        {title}
      </h1>
    </header>
  );
}
