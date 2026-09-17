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
