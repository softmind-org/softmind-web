import { safeSanityFetch } from "@/backend/sanity/client";
import { allSlugsQuery } from "@/backend/sanity/queries";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.softmindsol.com";

  // Core & static routes
  const staticRoutes = [
    { route: "", priority: 1.0, changefreq: "weekly" },
    { route: "/about-us", priority: 0.8, changefreq: "monthly" },
    { route: "/contact-us", priority: 0.8, changefreq: "monthly" },
    { route: "/case-studies", priority: 0.7, changefreq: "monthly" },
    { route: "/blog", priority: 0.8, changefreq: "weekly" },

    // Services
    { route: "/services/ai-saas-development", priority: 0.9, changefreq: "monthly" },
    { route: "/services/custom-software-development", priority: 0.9, changefreq: "monthly" },
    { route: "/services/dedicated-development-teams", priority: 0.9, changefreq: "monthly" },
    { route: "/services/mobile-app-development", priority: 0.9, changefreq: "monthly" },
    { route: "/services/mvp-development", priority: 0.9, changefreq: "monthly" },
    { route: "/services/product-design", priority: 0.9, changefreq: "monthly" },
    { route: "/services/product-development", priority: 0.9, changefreq: "monthly" },
    { route: "/services/software-testing", priority: 0.9, changefreq: "monthly" },
    { route: "/services/staff-augmentation", priority: 0.9, changefreq: "monthly" },
    { route: "/services/web-app-development", priority: 0.9, changefreq: "monthly" },

    // Industries
    { route: "/industries/ecommerce", priority: 0.8, changefreq: "monthly" },
    { route: "/industries/edtech", priority: 0.8, changefreq: "monthly" },
    { route: "/industries/fintech", priority: 0.8, changefreq: "monthly" },
    { route: "/industries/healthtech", priority: 0.8, changefreq: "monthly" },
    { route: "/industries/proptech", priority: 0.8, changefreq: "monthly" },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: item.changefreq,
    priority: item.priority,
  }));

  // Dynamic Sanity routes (posts and pages)
  let sanityRoutes = [];
  try {
    const sanitySlugs = await safeSanityFetch(allSlugsQuery);
    if (Array.isArray(sanitySlugs)) {
      sanityRoutes = sanitySlugs.map((item) => {
        // Route each document type to its canonical URL prefix
        const path =
          item._type === "post"
            ? `/blog/${item.slug}`
            : item._type === "caseStudy"
              ? `/case-studies/${item.slug}`
              : `/${item.slug}`;
        return {
          url: `${baseUrl}${path}`,
          lastModified: item._updatedAt || new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });
    }
  } catch (err) {
    console.warn("Sitemap: Sanity fetch failed (falling back to static routes):", err.message);
  }

  return [...staticRoutes, ...sanityRoutes];
}

