// GROQ Queries for Sanity CMS content

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  tags,
  seoTitle,
  seoDescription
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  tags,
  body,
  seoTitle,
  seoDescription,
  ogImage
}`;

// Fetches all case studies for the listing page (card data only — no section content needed)
export const caseStudiesQuery = `*[_type == "caseStudy"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  clientName
}`;

// Fetches a single case study by slug — all fields needed by the detail page
export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  clientName,
  // Three named preview sections (plain text)
  overview,
  challenge,
  solution,
  // Resolve the PDF asset URL so the Download button can link directly
  pdfFile { asset->{ url } }
}`;

// Used by generateStaticParams() to pre-render all case study slug pages at build time
export const caseStudySlugsQuery = `*[_type == "caseStudy" && defined(slug.current)] {
  "slug": slug.current
}`;

export const allSlugsQuery = `*[_type in ["post", "page", "caseStudy"]] {
  _type,
  "slug": slug.current,
  _updatedAt
}`;
