import { safeSanityFetch, allSlugsQuery } from "@/lib/sanity/client";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://softmindsol.com";

  // Static site routes
  const staticRoutes = [
    "",
    "/about-us",
    "/contact-us",
    "/blog",
    "/services",
    "/case-studies",
    "/industries",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Sanity routes (posts and pages)
  let sanityRoutes = [];
  try {
    const sanitySlugs = await safeSanityFetch(allSlugsQuery);
    if (Array.isArray(sanitySlugs)) {
      sanityRoutes = sanitySlugs.map((item) => {
        const path = item._type === "post" ? `/blog/${item.slug}` : `/${item.slug}`;
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
