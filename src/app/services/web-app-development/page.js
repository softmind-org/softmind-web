import { Hero } from "@/components/home/Hero";
import React from "react";
import WebAppServices from "@/components/servicesComponents/webAppComponents/WebAppServices";
import WebAppWhyChoose from "@/components/servicesComponents/webAppComponents/WebAppWhyChoose";
import WebAppProcess from "@/components/servicesComponents/webAppComponents/WebAppProcess";
import WebAppIndustry from "@/components/servicesComponents/webAppComponents/WebAppIndustry";
import WebAppAi from "@/components/servicesComponents/webAppComponents/WebAppAi";
import WebAppTechStack from "@/components/servicesComponents/webAppComponents/WebAppTechStack";
import WebAppCta from "@/components/servicesComponents/webAppComponents/WebAppCta";
import WebAppCaseStudy from "@/components/servicesComponents/webAppComponents/WebAppCaseStudy";
import WebAppTestimonials from "@/components/servicesComponents/webAppComponents/WebAppTestimonials";
import WebAppFaq from "@/components/servicesComponents/webAppComponents/WebAppFaq";
import WebAppForm from "@/components/servicesComponents/webAppComponents/WebAppForm";
import TestimonialSlider from "@/components/home/testimonialSlider";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "Custom Web Application Development Company for Startups | SaaS, Portals & Dashboards — Softmind Solutions",
  description:
    "Softmind Solutions builds custom web applications for startups and growing businesses in the USA and MENA, SaaS platforms, customer portals, internal dashboards, B2B tools, and AI-powered web apps. Offshore quality, startup-friendly pricing.",
};

const WebApp = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="Custom Web App Development Services"
        typewriterPrefix=""
        typewriterPhrases={[
          "Build High-Performance Web Applications That Drive Business Growth",
        ]}
        description="Turn complex business requirements into secure, scalable, and user-friendly web applications built around your goals."
        primaryButtonText="Let’s Build Your Web Application"
        primaryButtonLink="/contact"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <WebAppServices />
      <WebAppWhyChoose />
      <WebAppProcess />
      <WebAppIndustry />
      <WebAppAi />
      <WebAppTechStack />
      {/* <WebAppCta /> */}
      {/* <WebAppCaseStudy /> */}
      <TestimonialSlider />
      <ContactFormSection />
      <WebAppFaq />
    </main>
  );
};

export default WebApp;
