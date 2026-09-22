/**
 * caseStudy — Sanity document schema
 *
 * Fields (in Studio order):
 *   1. title       – document title; drives the auto-slug
 *   2. slug        – URL-safe identifier, auto-generated from title
 *   3. clientName  – name of the client / company
 *   4. overview    – Section 1 preview (2–4 sentences of plain text)
 *   5. challenge   – Section 2 preview (2–4 sentences of plain text)
 *   6. solution    – Section 3 preview (2–4 sentences of plain text)
 *   7. pdfFile     – complete case study as a downloadable PDF
 *
 * Adding a new document from Studio with these fields filled in + published
 * is all that is needed to produce a live /case-studies/[slug] page with
 * the three preview sections and the PDF Download button — zero code changes.
 */
export const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    // ── Identity ─────────────────────────────────────────────────────────
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
        // Auto-populated from the title field; click "Generate" in Studio
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

    // ── Three Preview Sections (plain text — no rich text needed) ─────────
    {
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 4,
      description: "Section 1 — 2–4 sentences describing the project context.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 4,
      description: "Section 2 — 2–4 sentences describing the problem/challenge.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
      description: "Section 3 — 2–4 sentences describing the solution delivered.",
      validation: (Rule) => Rule.required(),
    },

    // ── Downloadable PDF ──────────────────────────────────────────────────
    {
      name: "pdfFile",
      title: "Downloadable PDF",
      type: "file",
      options: {
        // Restricts the Studio file picker to PDF files only
        accept: "application/pdf",
      },
      description:
        "Upload the complete case study PDF. The Download button on the detail page appears only when this file is present.",
    },
  ],

  // Studio list preview: show title + client name
  preview: {
    select: {
      title: "title",
      subtitle: "clientName",
    },
  },
};

