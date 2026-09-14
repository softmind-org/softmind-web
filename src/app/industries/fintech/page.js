import { Hero } from "@/components/home/Hero";
import FinTechFutureReady from "@/components/industriesComponents/finTechComponents/finTechFutureReady";
import FinTechWhatWeDo from "@/components/industriesComponents/finTechComponents/finTechWhatWeDo";
import FinTechIntelligentTech from "@/components/industriesComponents/finTechComponents/finTechIntelligentTech";
import FinTechDeepExpertise from "@/components/industriesComponents/finTechComponents/finTechDeepExpertise";
import FinTechSecureScalable from "@/components/industriesComponents/finTechComponents/finTechSecureScalable";
import FinTechAIExpertise from "@/components/industriesComponents/finTechComponents/finTechAIExpertise";
import EngagementModels from "@/components/home/engagementModels";
import TestimonialSlider from "@/components/home/testimonialSlider";
import ReachUsOut from "@/components/home/reachUsOut";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "Fintech Software Development Company for Startups | Custom Financial Technology Solutions — Softmind Solutions",
  description:
    "Softmind Solutions builds custom fintech software for startups and financial technology companies in the USA and MENA — payment platforms, digital wallets, lending apps, neobanking, KYC/AML systems, and AI-powered financial tools. Offshore quality, startup-friendly pricing.",
};

const FinTech = () => {
  return (
    <main className="w-full flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <Hero
        title="Custom Fintech Software Development"
        typewriterPrefix="for "
        typewriterPhrases={["Startups", "Growing Fintech Companies"]}
        description={
          <div className="flex flex-col gap-6 items-center">
            <p className="max-w-[750px] mx-auto text-[15px] sm:text-[17px] md:text-[18px] leading-relaxed">
              Providing expert{" "}
              <strong>fintech software development for startups USA</strong> and
              MENA. As a trusted{" "}
              <strong>offshore fintech development company</strong>, we build
              custom fintech applications that are secure by architecture,
              compliant by design, and built to scale from the first sprint.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4 text-navy text-[13px] md:text-[14px] font-jakarta">
              <span className="flex items-center gap-2 font-bold bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 shadow-sm hover:border-green/40 hover:bg-green/5 transition-all cursor-default">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                Offshore fintech development company USA clients
              </span>
              <span className="flex items-center gap-2 font-bold bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 shadow-sm hover:border-[#004BC0]/40 hover:bg-[#004BC0]/5 transition-all cursor-default">
                <span className="w-2 h-2 rounded-full bg-[#004BC0] animate-pulse" />
                Senior engineers
              </span>
              <span className="flex items-center gap-2 font-bold bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 shadow-sm hover:border-green/40 hover:bg-green/5 transition-all cursor-default">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                Startup-grade speed
              </span>
            </div>
          </div>
        }
        primaryButtonText="Book a Free Discovery Call"
        primaryButtonLink="/contact-us"
        // secondaryButtonText="See Our Fintech Projects"
        // secondaryButtonLink="#solutions"
        showBottomText={false}
      />
      {/* {} */}
      <FinTechFutureReady />
      <div id="solutions" className="w-full">
        <FinTechWhatWeDo />
      </div>

      <FinTechIntelligentTech />
      <FinTechSecureScalable />
      <FinTechDeepExpertise />
      <FinTechAIExpertise />
      <EngagementModels />
      <TestimonialSlider />
      <ContactFormSection />
      <ReachUsOut />
    </main>
  );
};

export default FinTech;
