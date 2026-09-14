import { Hero } from "@/components/home/Hero";
import TestimonialSlider from "@/components/home/testimonialSlider";
import TechStack from "@/components/home/techStack";
import OurWork from "@/components/home/ourWork";
import FinalCta from "@/components/home/finalCta";

import PdWhyInvest from "@/components/servicesComponents/productDesignComponents/pdWhyInvest";
import PdDesignServices from "@/components/servicesComponents/productDesignComponents/pdDesignServices";
import PdDesignProcess from "@/components/servicesComponents/productDesignComponents/pdDesignProcess";
import PdChallenges from "@/components/servicesComponents/productDesignComponents/pdChallenges";
import PdWhyChooseUs from "@/components/servicesComponents/productDesignComponents/pdWhyChooseUs";
import PdIndustries from "@/components/servicesComponents/productDesignComponents/pdIndustries";
import PdEngagementModels from "@/components/servicesComponents/productDesignComponents/pdEngagementModels";
import PdFaq from "@/components/servicesComponents/productDesignComponents/pdFaq";
import EngagementModels from "@/components/home/engagementModels";
import PdTechStack from "@/components/servicesComponents/productDesignComponents/pdTechStack";
import PdCta from "@/components/servicesComponents/productDesignComponents/pdCta";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "Digital Product Design Services for Startups | UX/UI, Research & Design Systems — Softmind Solutions",
  description:
    "Softmind Solutions delivers digital product design services for startups and growing businesses in the USA and MENA — UX/UI design, user research and strategy, design systems, prototyping, and usability testing. Offshore quality, startup-friendly pricing.",
};

const ProductDesign = () => {
  return (
    <main className="w-full flex flex-col items-center overflow-hidden">
      <Hero
        title="Digital Product Design Services"
        typewriterPrefix=""
        typewriterPhrases={["Design Digital Products People Want to Use"]}
        description="From UX research and strategy to intuitive UI design and scalable design systems, Softmind helps businesses turn product ideas into engaging digital experiences."
        primaryButtonText="Design Your Product With Us"
        primaryButtonLink="/contact-us"
        secondaryButtonText={null}
        showBottomText={false}
      />

      <PdWhyInvest />
      <PdDesignServices />
      <PdDesignProcess />
      <PdChallenges />
      <PdWhyChooseUs />
      <PdTechStack />
      <PdIndustries />
      <PdEngagementModels />
      <TestimonialSlider />
      <ContactFormSection />
      <PdFaq />
      <PdCta />
    </main>
  );
};

export default ProductDesign;
