import React from "react";
import { Hero } from "@/components/home/Hero";
import ServicesShowCase from "@/components/servicesComponents/mobileAppComponents/servicesShowCase";
import BusinessValue from "@/components/servicesComponents/mobileAppComponents/businessValue";
import DevelopmentProcess from "@/components/servicesComponents/mobileAppComponents/developmentProcess";
import Capabilities from "@/components/servicesComponents/mobileAppComponents/capabilities";
import TechStack from "@/components/servicesComponents/mobileAppComponents/techStack";
import WhyChooseSoftmind from "@/components/servicesComponents/mobileAppComponents/whyChooseSoftmind";
import IndustriesWeServe from "@/components/servicesComponents/mobileAppComponents/industriesWeServe";
import MobileFaqs from "@/components/servicesComponents/mobileAppComponents/mobileFaqs";
import FinalCta from "@/components/home/finalCta";
import TestimonialSlider from "@/components/home/testimonialSlider";
import CustomSoftwareCaseStudy from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareCaseStudy";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "Offshore Custom Mobile App Development Company for Startups | iOS & Android Apps — Softmind Solutions",
  description:
    "Softmind Solutions builds custom mobile apps for startups and growing businesses in the USA and MENA; native iOS, Android, and React Native cross-platform apps. Offshore quality, startup-friendly pricing, 10 to 14 week delivery.",
};

const MobileApp = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="Offshore Custom Mobile App"
        typewriterPrefix=""
        typewriterPhrases={["Development Company for Startups"]}
        description="Build high-performance mobile apps that engage users and accelerate business growth. Turn your app idea into a secure, scalable, and user-focused mobile experience."
        primaryButtonText="Let's Build Your Custom Mobile App"
        primaryButtonLink="/contact-us"
        secondaryButtonText={null}
        showBottomText={false}
      />

      <ServicesShowCase />
      <BusinessValue />
      <DevelopmentProcess />
      <Capabilities />
      <TechStack />
      <WhyChooseSoftmind />
      <IndustriesWeServe />
      {/* <CustomSoftwareCaseStudy /> */}
      <TestimonialSlider />
      <ContactFormSection />
      <MobileFaqs />
      <FinalCta />
    </main>
  );
};

export default MobileApp;
