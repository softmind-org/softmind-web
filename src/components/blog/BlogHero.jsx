import React from "react";
import Image from "next/image";

export default function BlogHero({ image, alt = "Blog post featured banner", title = "" }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80";
  const heroSrc = image || fallbackImage;

  return (
    <div className="w-full mb-10">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/10] max-h-[520px] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
        <Image
          src={heroSrc}
          alt={alt || title || "Featured image"}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
          className="object-cover transition-transform duration-700 hover:scale-102"
        />
      </div>
    </div>
  );
}
