import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { safeSanityFetch, urlFor } from "@/backend/sanity/client";
import {
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
} from "@/backend/sanity/queries";

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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  let caseStudy = null;
  try {
    caseStudy = await safeSanityFetch(caseStudyBySlugQuery, { slug });
  } catch (err) {
    console.warn("generateMetadata (caseStudy) warning:", err.message);
  }
  const title = caseStudy?.seoTitle || caseStudy?.title || "Case Study | SoftMind Solutions";
  const description = caseStudy?.seoDescription || caseStudy?.excerpt || "Explore how SoftMind Solutions solves real business challenges with technology.";
  const imageUrl = caseStudy?.ogImage ? urlFor(caseStudy.ogImage)?.url() : caseStudy?.coverImage ? urlFor(caseStudy.coverImage)?.url() : null;
  const url = `https://softmindsol.com/case-studies/${slug}`;
  return {
    title: `${title} | SoftMind Solutions`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: imageUrl ? [{ url: imageUrl }] : [] },
    twitter: { card: "summary_large_image", title, description, images: imageUrl ? [imageUrl] : [] },
  };
}

function renderBlock(block, idx) {
  if (block._type !== "block" || !block.children) return null;
  const text = block.children.map((child) => child.text).join("");
  const style = block.style || "normal";
  if (style === "h1") return <h1 key={idx} className="text-3xl md:text-4xl font-bold text-navy mt-8 mb-4 leading-tight">{text}</h1>;
  if (style === "h2") return <h2 key={idx} className="text-2xl md:text-3xl font-bold text-navy mt-8 mb-3 leading-tight">{text}</h2>;
  if (style === "h3") return <h3 key={idx} className="text-xl md:text-2xl font-semibold text-navy mt-6 mb-2">{text}</h3>;
  if (style === "blockquote") return <blockquote key={idx} className="border-l-4 border-green pl-5 italic text-gray-500 my-6 text-lg">{text}</blockquote>;
  return <p key={idx} className="text-[17px] leading-[1.8] text-gray-700 mb-5">{text}</p>;
}

export default async function CaseStudyDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  let caseStudy = null;
  try {
    caseStudy = await safeSanityFetch(caseStudyBySlugQuery, { slug });
  } catch (err) {
    console.warn("CaseStudyDetail fetch warning:", err.message);
  }
  if (!caseStudy) notFound();
  const { title, clientName, industry, excerpt, coverImage, publishedAt, body = [], pdfFile } = caseStudy;
  const heroImage = coverImage ? urlFor(coverImage)?.url() : null;
  const publishDate = publishedAt ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : null;
  const previewBlocks = body.slice(0, 3);
  const pdfUrl = pdfFile?.asset?.url ?? null;
  return (
    <main className="w-full flex flex-col bg-white text-[#161616] font-jakarta">
      <section className="w-full relative px-4 md:px-8 pt-12 pb-20 max-w-[1400px] mx-auto">
        <div className="w-full mb-6">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-gray-500 hover:text-green transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Case Studies
          </Link>
        </div>
        {heroImage && (
          <div className="w-full h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden mb-[-60px] z-0 shadow-lg">
            <img src={heroImage} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className={`relative z-10 w-[95%] md:w-[85%] mx-auto bg-[#F4F4F5] rounded-[20px] p-8 md:p-12 shadow-md flex flex-col items-center text-center ${heroImage ? "" : "mt-4"}`}>
          {(industry || clientName) && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {industry && <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-green/10 text-green border border-green/20">{industry}</span>}
              {clientName && <span className="text-xs font-medium text-gray-500 px-3 py-1 rounded-full bg-white border border-gray-200">{clientName}</span>}
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-8 max-w-[800px] leading-tight text-navy">{title}</h1>
          {publishDate && <p className="text-sm text-gray-500 font-medium">{publishDate}</p>}
        </div>
      </section>
      <section className="w-full bg-[#F9FAFB] py-16 px-4 md:px-8">
        <div className="max-w-[800px] mx-auto">
          {excerpt && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 font-medium border-l-4 border-green pl-5">{excerpt}</p>
          )}
          {previewBlocks.length > 0 ? (
            <div className="space-y-2">{previewBlocks.map((block, idx) => renderBlock(block, idx))}</div>
          ) : (
            <p className="text-gray-500 italic">Full case study content coming soon.</p>
          )}
          {pdfUrl && (
            <div className="mt-14 flex flex-col items-center text-center gap-4 py-12 px-6 rounded-2xl bg-[#161616] text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-green">Full Case Study</p>
              <h2 className="text-2xl md:text-3xl font-bold max-w-[520px] leading-snug">Want the complete picture?</h2>
              <p className="text-white/70 max-w-[420px] text-base">Download the full case study PDF for detailed insights, metrics, and technical approach.</p>
              <a id="download-case-study-pdf" href={pdfUrl} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 rounded-[6px] bg-green hover:bg-[#0aa672] text-white font-semibold text-base transition-colors active:scale-95 shadow-[inset_0px_-3px_4px_rgba(255,255,255,0.14),_inset_0px_4px_6px_rgba(0,0,0,0.25)]">
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