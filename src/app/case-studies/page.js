import ContactFormSection from "@/components/home/contactFormSection";
import { Hero } from "@/components/home/Hero";
import OurWork from "@/components/home/ourWork";
import { safeSanityFetch } from "@/backend/sanity/client";
import { caseStudiesQuery } from "@/backend/sanity/queries";

export const metadata = {
  title: "Case Studies | SoftMind Solutions",
  description:
    "Explore how SoftMind Solutions solves real business challenges — from AI SaaS to FinTech, PropTech, and HealthTech products that deliver measurable value.",
};

/**
 * Case Studies listing page (async Server Component).
 *
 * Fetches all case studies from Sanity and passes them to <OurWork> so that
 * each portfolio card renders as a clickable link to /case-studies/[slug].
 * Falls back to OurWork's own static demo items when Sanity is unavailable —
 * the page never breaks even without a live Sanity connection.
 */
const CaseStudies = async () => {
  // Fetch published case studies from Sanity (safe — returns null on failure)
  let sanityStudies = null;
  try {
    const raw = await safeSanityFetch(caseStudiesQuery);
    if (Array.isArray(raw) && raw.length > 0) {
      // Map Sanity documents to the shape OurWork expects for slug-based linking
      sanityStudies = raw.map((cs) => ({
        id: cs._id,
        title: cs.title,
        slug: cs.slug, // slug.current — already projected as a string in the query
        clientName: cs.clientName,
        industry: cs.industry,
        excerpt: cs.excerpt,
      }));
    }
  } catch (err) {
    console.warn("Case Studies page: Sanity fetch warning:", err.message);
  }

  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="We Build Solutions That Move"
        typewriterPrefix=""
        typewriterPhrases={["Businesses Forward"]}
        description="From complex ideas to market-ready products, see how we solve real business challenges with technology that delivers measurable value."
        primaryButtonText="Start a Project"
        primaryButtonLink="/contact-us"
        secondaryButtonText={null}
        showBottomText={false}
      />
      {/*
       * Pass caseStudies only when Sanity returned data.
       * OurWork handles null gracefully by showing its static demo items.
       */}
      <OurWork caseStudies={sanityStudies} />
      <ContactFormSection />
    </main>
  );
};

export default CaseStudies;

