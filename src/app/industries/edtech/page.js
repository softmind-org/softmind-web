import React from "react";
import TrustSection from "@/components/industriesComponents/edTechComponents/edTrustSection";
import ServicesOverview from "@/components/industriesComponents/edTechComponents/edServicesOverview";
import AISection from "@/components/industriesComponents/edTechComponents/edAISection";
import EngagementModel from "@/components/industriesComponents/edTechComponents/edEngagementModel";
import ModernizationSection from "@/components/industriesComponents/edTechComponents/edModernizationSection";
import SuccessStories from "@/components/industriesComponents/edTechComponents/edSuccessStories";
import ClientTestimonials from "@/components/industriesComponents/edTechComponents/edClientTestimonials";
import DevelopmentProcess from "@/components/industriesComponents/edTechComponents/edDevelopmentProcess";
import FAQs from "@/components/industriesComponents/edTechComponents/edFAQs";
import FinalCTA from "@/components/industriesComponents/edTechComponents/edFinalCTA";
import { Hero } from "@/components/home/Hero";
import WhySoftMind from "@/components/industriesComponents/edTechComponents/edWhySoftMind";
import TestimonialSlider from "@/components/home/testimonialSlider";
import ContactFormSection from "@/components/home/contactFormSection";
import ClientLogos from "@/components/home/clientLogos";

export const metadata = {
  title:
    "EdTech Software Development Company for Startups | Custom eLearning & LMS Solutions — Softmind Solutions",
  description:
    "Softmind Solutions builds custom EdTech software for startups and digital learning companies in the USA and MENA including LMS platforms, eLearning apps, virtual classrooms, corporate training tools, and AI-powered learning experiences. Offshore quality, startup-friendly pricing.",
};

export default function EdTechPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      <Hero
        title="Build an EdTech Product"
        typewriterPrefix=""
        typewriterPhrases={["Learners Want to Use"]}
        description="Softmind Solutions provides EdTech software development for startups in the USA and MENA."
        primaryButtonText="Book Your Free Discovery Call"
        secondaryButtonText={null}
        bottomText={null}
      />
      {/* <TrustSection /> */}
      <ClientLogos />
      <ServicesOverview />
      <AISection />
      <WhySoftMind />
      <EngagementModel />
      <ModernizationSection />
      {/* <SuccessStories /> */}
      <TestimonialSlider />
      {/* <DevelopmentProcess /> */}
      <ContactFormSection />
      <FAQs />
      <FinalCTA />
    </div>
  );
}
