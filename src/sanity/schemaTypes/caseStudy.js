export const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "clientName",
      title: "Client Name",
      type: "string",
    },
    {
      name: "industry",
      title: "Industry",
      type: "string",
    },
    {
      name: "excerpt",
      title: "Summary / Excerpt",
      type: "text",
      rows: 3,
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "body",
      title: "Full Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    },
    // Downloadable PDF — uploaded per case study; powers the "Download Case Study" button
    {
      name: "pdfFile",
      title: "Downloadable PDF",
      type: "file",
      options: {
        // Restrict the Sanity Studio file picker to PDF files only
        accept: "application/pdf",
      },
      description:
        "Upload the complete case study PDF. The Download button on the detail page will appear only when this file is present.",
    },
    // Technical SEO fields
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
    },
    {
      name: "ogImage",
      title: "Social Share Image (OG Image)",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "clientName",
      media: "coverImage",
    },
  },
};
