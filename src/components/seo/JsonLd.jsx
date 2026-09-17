import React from "react";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SoftMind Solutions",
    url: "https://softmindsol.com",
    logo: "https://softmindsol.com/images/logo.png",
    description: "Expert AI SaaS development for startups and enterprises. Build secure, scalable AI applications faster.",
    sameAs: [
      "https://linkedin.com/company/softmind-solutions",
      "https://twitter.com/softmindsol",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ post, url }) {
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.seoDescription || post.title,
    image: post.coverImage || post.ogImage || "https://softmindsol.com/images/default-blog.jpg",
    datePublished: post.publishedAt || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "SoftMind Solutions Team",
    },
    publisher: {
      "@type": "Organization",
      name: "SoftMind Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://softmindsol.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items = [] }) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
