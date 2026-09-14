import { Hero } from "@/components/home/Hero";
import DtIntro from "@/components/servicesComponents/dedicatedTeamComponents/DtIntro";
import DtTeamModels from "@/components/servicesComponents/dedicatedTeamComponents/DtTeamModels";
import DtProcess from "@/components/servicesComponents/dedicatedTeamComponents/DtProcess";
import DtControl from "@/components/servicesComponents/dedicatedTeamComponents/DtControl";
import DtWhyChoose from "@/components/servicesComponents/dedicatedTeamComponents/DtWhyChoose";
import DtTech from "@/components/servicesComponents/dedicatedTeamComponents/DtTech";
import DtStages from "@/components/servicesComponents/dedicatedTeamComponents/DtStages";
import DtCta from "@/components/servicesComponents/dedicatedTeamComponents/DtCta";
import TestimonialSlider from "@/components/home/testimonialSlider";
import ContactFormSection from "@/components/home/contactFormSection";
import DtFaq from "@/components/servicesComponents/dedicatedTeamComponents/DtFaq";

export const metadata = {
  title:
    "Managed Dedicated Development Team for Startups | Offshore Engineering Pod — Softmind Solutions",
  description:
    "Softmind Solutions provides managed dedicated development teams for startups and growing businesses in the USA and MENA — a fully managed offshore engineering pod that owns delivery, not just headcount. You set the direction, we build the product.",
};

const DedicatedTeams = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="Managed Dedicated Development Team"
        typewriterPrefix=""
        typewriterPhrases={["For Startups"]}
        description="Build Your Startup With the Right Team Behind You"
        primaryButtonText="Hire the Developers"
        primaryButtonLink="/contact-us"
        secondaryButtonText="Get a Complete Delivery Team"
        secondaryButtonLink="/contact-us"
        showBottomText={false}
      />
      <DtIntro />
      <DtTeamModels />
      <DtProcess />
      <DtControl />
      <DtWhyChoose />
      <DtTech />
      <DtStages />
      <DtCta />
      <TestimonialSlider />
      <ContactFormSection />
      <DtFaq />
    </main>
  );
};

export default DedicatedTeams;
