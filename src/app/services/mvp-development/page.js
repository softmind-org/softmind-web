import { Hero } from "@/components/home/Hero";
import MvpBuildSmarter from "@/components/servicesComponents/mvpComponents/mvpBuildSmarter";
import MvpDevelopmentProcess from "@/components/servicesComponents/mvpComponents/mvpDevelopmentProcess";
import MvpServices from "@/components/servicesComponents/mvpComponents/mvpServices";
import MvpForStartups from "@/components/servicesComponents/mvpComponents/MvpForStartups";
import MvpBuildValue from "@/components/servicesComponents/mvpComponents/MvpBuildValue";
import MvpWhyChoose from "@/components/servicesComponents/mvpComponents/MvpWhyChoose";
import MvpCaseStudy from "@/components/servicesComponents/mvpComponents/MvpCaseStudy";
import MvpTestimonials from "@/components/servicesComponents/mvpComponents/MvpTestimonials";
import MvpIndustries from "@/components/servicesComponents/mvpComponents/MvpIndustries";
import MvpTechnology from "@/components/servicesComponents/mvpComponents/MvpTechnology";
import MvpSuccessful from "@/components/servicesComponents/mvpComponents/MvpSuccessful";
import MvpCta from "@/components/servicesComponents/mvpComponents/MvpCta";
import MvpFaq from "@/components/servicesComponents/mvpComponents/MvpFaq";
import React from "react";

const MVP = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="MVP Development Services Company"
        typewriterPrefix=""
        typewriterPhrases={["Turn Your Product Idea Into a Market-Ready MVP"]}
        description={`Validate your idea, reduce development risks, and launch faster with Softmind's MVP development services. With Softmind, you move from "I have an idea" to "I have a product people want."`}
        primaryButtonText="Let's Build Your Web Application"
        primaryButtonLink="/contact"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <MvpForStartups />
      <MvpBuildSmarter />
      <MvpBuildValue />
      <MvpServices />
      <MvpWhyChoose />
      <MvpDevelopmentProcess />
      {/* <MvpCaseStudy /> */}
      <MvpTestimonials />
      <MvpIndustries />
      <MvpTechnology />
      <MvpSuccessful />
      <MvpCta />
      <MvpFaq />
    </main>
  );
};

export default MVP;
