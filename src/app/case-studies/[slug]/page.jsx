import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { safeSanityFetch } from "@/backend/sanity/client";
import {
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
} from "@/backend/sanity/queries";

// ---------------------------------------------------------------------------
// generateStaticParams — pre-renders all known case study slugs at build time.
// Matches the ISR pattern used by app/blog/[slug]/page.js.
// When Sanity is unavailable (e.g., missing env vars) it returns [] safely,
// and pages are rendered on-demand instead.
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  try {
    const slugs = await safeSanityFetch(caseStudySlugsQuery);
    if (!Array.isArray(slugs)) return [];
    return slugs.map((item) => ({ slug: item.slug }));
  } catch (err) {
    console.warn("generateStaticParams (caseStudy) warning:", err.message);
    return [];
  }
}

// ---------------------------------------------------------------------------
// generateMetadata — page-level SEO from the case study title.
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  let caseStudy = null;
  try {
    caseStudy = await safeSanityFetch(caseStudyBySlugQuery, { slug });
  } catch (err) {
    console.warn("generateMetadata (caseStudy) warning:", err.message);
  }
  const title = caseStudy?.title || "Case Study | SoftMind Solutions";
  const description =
    caseStudy?.overview ||
    "Explore how SoftMind Solutions solves real business challenges with technology.";
  const url = `https://softmindsol.com/case-studies/${slug}`;
  return {
    title: `${title} | SoftMind Solutions`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

// ---------------------------------------------------------------------------
// SectionCard — renders one of the three named preview sections.
//
// @param {string} label   - Section heading shown in the brand accent colour
// @param {string} content - Plain-text body of the section
// ---------------------------------------------------------------------------
function SectionCard({ label, content }) {
  return (
    <div className="flex flex-col gap-3 p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
      {/* Accent label matching the site's green brand token */}
      <p className="text-xs font-bold uppercase tracking-[2px] text-green">
        {label}
      </p>
      <p className="text-[17px] leading-[1.8] text-gray-700">{content}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CaseStudyDetail — server component for /case-studies/[slug]
// ---------------------------------------------------------------------------
export default async function CaseStudyDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  // Fetch the case study document from Sanity
  let caseStudy = null;
  try {
    caseStudy = await safeSanityFetch(caseStudyBySlugQuery, { slug });
  } catch (err) {
    console.warn("CaseStudyDetail fetch warning:", err.message);
  }

  // Trigger the Next.js 404 page for any slug without a matching Sanity document
  if (!caseStudy) notFound();

  const { title, clientName, overview, challenge, solution, pdfFile } =
    caseStudy;

  // PDF CDN URL — available only when the editor has uploaded a file in Studio
  const pdfUrl = pdfFile?.asset?.url ?? null;

  return (
    <main className="w-full flex flex-col bg-white text-[#161616] font-jakarta">
      {/* ── Top Banner ──────────────────────────────────────────────────── */}
      <section className="w-full px-4 md:px-8 pt-12 pb-16 max-w-[1000px] mx-auto">
        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Case Studies
          </Link>
        </div>

        {/* Title card */}
        <div className="bg-[#F4F4F5] rounded-[20px] p-8 md:p-12 flex flex-col items-center text-center shadow-md">
          {clientName && (
            <span className="text-xs font-medium text-gray-500 px-3 py-1 rounded-full bg-white border border-gray-200 mb-5">
              {clientName}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold max-w-[700px] leading-tight text-navy">
            {title}
          </h1>
        </div>
      </section>

      {/* ── Three Preview Sections ───────────────────────────────────────── */}
      <section className="w-full bg-[#F9FAFB] py-16 px-4 md:px-8">
        <div className="max-w-[900px] mx-auto flex flex-col gap-6">
          {/*
           * Each SectionCard maps directly to one of the three named plain-text
           * fields in the caseStudy Sanity schema.
           * Adding/editing content from Studio immediately updates this page —
           * no code changes are ever required.
           */}
          {overview && (
            <SectionCard label="Overview" content={overview} />
          )}
          {challenge && (
            <SectionCard label="Challenge" content={challenge} />
          )}
          {solution && (
            <SectionCard label="Solution" content={solution} />
          )}

          {/* ── PDF Download CTA ────────────────────────────────────────── */}
          {/*
           * Rendered ONLY when pdfFile.asset.url is non-null in Sanity.
           * If the editor has not uploaded a PDF, this block is completely
           * absent from the DOM — no broken links, no placeholder buttons.
           *
           * target="_blank" + download attribute triggers a browser download.
           */}
          {pdfUrl && (
            <div className="mt-8 flex flex-col items-center text-center gap-4 py-12 px-6 rounded-2xl bg-[#161616] text-white shadow-xl">
              <p className="text-sm font-bold uppercase tracking-widest text-green">
                Full Case Study
              </p>
              <h2 className="text-2xl md:text-3xl font-bold max-w-[520px] leading-snug">
                Want the complete picture?
              </h2>
              <p className="text-white/70 max-w-[420px] text-base">
                Download the full case study PDF for detailed insights,
                metrics, and technical approach.
              </p>
              <a
                id="download-case-study-pdf"
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 rounded-[6px] bg-green hover:bg-[#0aa672] text-white font-semibold text-base transition-colors active:scale-95 shadow-[inset_0px_-3px_4px_rgba(255,255,255,0.14),_inset_0px_4px_6px_rgba(0,0,0,0.25)]"
              >
                <Download className="w-5 h-5" />
                Download Case Study
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}