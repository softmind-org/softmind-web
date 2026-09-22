import ContactFormSection from "@/components/home/contactFormSection";
import { Hero } from "@/components/home/Hero";
import OurWork from "@/components/home/ourWork";
import { safeSanityFetch } from "@/backend/sanity/client";
import { caseStudiesQuery } from "@/backend/sanity/queries";
import ComingSoon from "@/components/customs/comingSoon";

export const metadata = {
  title: "Case Studies | SoftMind Solutions",
  description:
    "Explore how SoftMind Solutions solves real business challenges — from AI SaaS to FinTech, PropTech, and HealthTech products that deliver measurable value.",
};

// const CaseStudies = async () => {
// let sanityStudies = null;
// try {
//   const raw = await safeSanityFetch(caseStudiesQuery);
//   if (Array.isArray(raw) && raw.length > 0) {
//     sanityStudies = raw.map((cs) => ({
//       id: cs._id,
//       title: cs.title,
//       slug: cs.slug,
//       clientName: cs.clientName,
//     }));
//   }
// } catch (err) {
//   console.warn("Case Studies page: Sanity fetch warning:", err.message);
// }

//   return (
//     <main className="w-full flex flex-col items-center">
//       <Hero
//         title="We Build Solutions That Move"
//         typewriterPrefix=""
//         typewriterPhrases={["Businesses Forward"]}
//         description="From complex ideas to market-ready products, see how we solve real business challenges with technology that delivers measurable value."
//         primaryButtonText="Start a Project"
//         primaryButtonLink="/contact-us"
//         secondaryButtonText={null}
//         showBottomText={false}
//       />
//       <OurWork caseStudies={sanityStudies} />
//       <ContactFormSection />
//     </main>
//   );
// };

// export default CaseStudies;

export default function CaseStudies() {
  return <ComingSoon />;
}
