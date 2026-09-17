export const page = {
  name: "page",
  title: "Site Page",
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
      name: "body",
      title: "Page Content",
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
      subtitle: "slug.current",
    },
  },
};
