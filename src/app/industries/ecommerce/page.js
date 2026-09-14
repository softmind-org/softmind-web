import React from "react";
import { Hero } from "@/components/home/Hero";
import EcomMarketMoment from "@/components/industriesComponents/ecommerceComponents/ecomMarketMoment";
import EcomServices from "@/components/industriesComponents/ecommerceComponents/ecomServices";
import EcomPlatforms from "@/components/industriesComponents/ecommerceComponents/ecomPlatforms";
import EcomSolutions from "@/components/industriesComponents/ecommerceComponents/ecomSolutions";
import EcomTechnology from "@/components/industriesComponents/ecommerceComponents/ecomTechnology";
import EcomWhySoftMind from "@/components/industriesComponents/ecommerceComponents/ecomWhySoftMind";
import EcomProcess from "@/components/industriesComponents/ecommerceComponents/ecomProcess";
import EcomOurWork from "@/components/industriesComponents/ecommerceComponents/ecomOurWork";
import EcomEngagementModels from "@/components/industriesComponents/ecommerceComponents/ecomEngagementModels";
import EcomContactForm from "@/components/industriesComponents/ecommerceComponents/ecomContactForm";
import EcomFaqs from "@/components/industriesComponents/ecommerceComponents/ecomFaqs";
import ContactFormSection from "@/components/home/contactFormSection";
import TestimonialSlider from "@/components/home/testimonialSlider";

export const metadata = {
  title:
    "Custom eCommerce web and mobile app Development for Startups | Online Store & Marketplace Development — Softmind Solutions",
  description:
    "Softmind Solutions builds custom eCommerce software for startups and growing online businesses in the USA and MENA online stores, multi-vendor marketplaces, headless commerce, B2B platforms, and AI-powered shopping experiences. Offshore quality, startup-friendly pricing.",
};

const Ecommerce = () => {
  return (
    <div className="w-full flex flex-col">
      <Hero
        title="Build an e-Commerce Platform"
        typewriterPrefix="That "
        typewriterPhrases={["Converts Today and Scales Tomorrow"]}
        description="Launch with confidence, create a smoother shopping experience, and grow without technology holding you back."
        primaryButtonText="Book Your Free Discovery Call"
        bottomText="Trusted by ambitious eCommerce startups and online businesses across the USA and MENA."
      />
      <EcomMarketMoment />
      <EcomServices />
      <EcomPlatforms />
      <EcomSolutions />
      <EcomTechnology />
      <EcomWhySoftMind />
      <EcomProcess />
      {/* <EcomOurWork /> */}
      <EcomEngagementModels />
      <ContactFormSection />
      <TestimonialSlider />
      <EcomFaqs />
    </div>
  );
};

export default Ecommerce;
