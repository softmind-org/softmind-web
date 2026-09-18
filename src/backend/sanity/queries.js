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

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  clientName,
  industry,
  excerpt,
  coverImage,
  publishedAt,
  seoTitle,
  seoDescription
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  clientName,
  industry,
  excerpt,
  coverImage,
  publishedAt,
  body,
  seoTitle,
  seoDescription,
  ogImage
}`;

export const allSlugsQuery = `*[_type in ["post", "page", "caseStudy"]] {
  _type,
  "slug": slug.current,
  _updatedAt
}`;
