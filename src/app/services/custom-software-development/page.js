import { Hero } from "@/components/home/Hero";
import CustomSoftwareServices from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareServices";
import CustomSoftwareSolutions from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareSolutions";
import CustomSoftwareExpertise from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareExpertise";
import CustomSoftwareProcess from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareProcess";
import CustomSoftwareWhyChoose from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareWhyChoose";
import CustomSoftwareWhyInvest from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareWhyInvest";
import CustomSoftwareCaseStudy from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareCaseStudy";
import CustomSoftwareTestimonials from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareTestimonials";
import CustomSoftwareIndustry from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareIndustry";
import CustomSoftwareFaq from "@/components/servicesComponents/customSoftwareComponents/CustomSoftwareFaq";
import ContactForm from "@/components/contactUsComponents/ContactForm";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "Offshore Custom Software Development Company for Startups | Softmind Solutions",
  description:
    "Softmind Solutions builds custom software for startups and growing businesses in the USA and MENA — web apps, mobile apps, SaaS platforms, API development, and AI-powered software. Senior engineers, offshore rates, startup-grade speed.",
};

const CustomSoftware = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="Custom Software Development Services"
        typewriterPrefix=""
        typewriterPhrases={[
          "Build Custom Software That Solves Real Business Problems",
        ]}
        description="Off-the-shelf software forces your business to adapt to its limitations. Custom software gives you the flexibility to automate operations, improve customer experiences, and scale without compromise."
        primaryButtonText="Talk to a Software Expert"
        primaryButtonLink="/contact"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <CustomSoftwareServices />
      <CustomSoftwareSolutions />
      <CustomSoftwareExpertise />
      <CustomSoftwareProcess />
      <CustomSoftwareWhyChoose />
      <CustomSoftwareWhyInvest />
      {/* <CustomSoftwareCaseStudy /> */}
      <CustomSoftwareTestimonials />
      <CustomSoftwareIndustry />
      <ContactFormSection />
      <CustomSoftwareFaq />
    </main>
  );
};

export default CustomSoftware;
