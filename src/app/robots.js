export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://softmindsol.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/admin", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
