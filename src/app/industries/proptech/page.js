import { Hero } from "@/components/home/Hero";
import HowWeWorkProp from "@/components/industriesComponents/propTechComponents/howWeWorkProp";
import PropTechProjects from "@/components/industriesComponents/propTechComponents/propTechProjects";
import PropTechSolutions from "@/components/industriesComponents/propTechComponents/propTechSolutions";
import WhySoftMind from "@/components/industriesComponents/propTechComponents/whySoftMind";
import PropTechServices from "@/components/industriesComponents/propTechComponents/propTechServices";
import PropTechExpertise from "@/components/industriesComponents/propTechComponents/propTechExpertise";
import PropTechCaseStudy from "@/components/industriesComponents/propTechComponents/propTechCaseStudy";
import PropTechTestimonial from "@/components/industriesComponents/propTechComponents/propTechTestimonial";
import WhyPartner from "@/components/industriesComponents/propTechComponents/whyPartner";
import PropTechFaq from "@/components/industriesComponents/propTechComponents/propTechFaq";
import EngagementModels from "@/components/home/engagementModels";
import ReachUsOut from "@/components/home/reachUsOut";
import FinalCta from "@/components/home/finalCta";
import TestimonialSlider from "@/components/home/testimonialSlider";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "PropTech Software Development Company for Startups | Real Estate Tech Solutions — Softmind Solutions",
  description:
    "Softmind Solutions builds custom PropTech software for real estate startups and property tech companies in the USA and MENA — property management platforms, real estate marketplaces, listing portals, tenant apps, and AI-powered property tools. Offshore quality, startup-friendly pricing.",
};

const PropTech = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="PropTech Software Development"
        typewriterPrefix=""
        typewriterPhrases={["Services for Startups"]}
        description="Turn complex real estate processes into simple, scalable digital experiences. We build PropTech products that help businesses automate operations, connect users, unlock property data, and bring new ideas to market faster."
        primaryButtonText="Book a Free Discovery Call"
        primaryButtonLink="/contact"
        // secondaryButtonText="View Our PropTech Projects"
        // secondaryButtonLink="#"
        showBottomText={false}
      />
      <PropTechSolutions />
      <PropTechServices />
      <PropTechExpertise />
      <WhySoftMind />
      <HowWeWorkProp />
      {/* <PropTechProjects /> */}
      {/* <PropTechCaseStudy /> */}
      <EngagementModels />
      <WhyPartner />
      <TestimonialSlider />
      <ContactFormSection />
      <PropTechFaq />
      <FinalCta />
    </main>
  );
};

export default PropTech;
