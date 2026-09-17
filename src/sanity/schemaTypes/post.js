export const post = {
  name: "post",
  title: "Blog Post",
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
      name: "excerpt",
      title: "Excerpt",
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
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "body",
      title: "Body Content",
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
      description: "Custom title for search engines. Falls back to Title if empty.",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Custom description for meta tags. Falls back to Excerpt if empty.",
    },
    {
      name: "ogImage",
      title: "Social Share Image (OG Image)",
      type: "image",
      description: "Custom image for social media links. Falls back to Cover Image if empty.",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
  },
};
