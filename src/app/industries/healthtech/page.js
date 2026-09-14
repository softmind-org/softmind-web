import { Hero } from "@/components/home/Hero";
import HealthTechSolutions from "@/components/industriesComponents/healthTechComponents/healtTechSolutions";
import HealthTechExpertise from "@/components/industriesComponents/healthTechComponents/healthTechExpertise";
import HealthTechProjects from "@/components/industriesComponents/healthTechComponents/healthTechProjects";
import EngagementModels from "@/components/home/engagementModels";
import HealthTechBenefits from "@/components/industriesComponents/healthTechComponents/healthTechBenefits";
import HealthTechCTA from "@/components/industriesComponents/healthTechComponents/healthTechCTA";
import HealthWhoWeServe from "@/components/industriesComponents/healthTechComponents/healthWhoWeServe";
import HealthTestimonial from "@/components/industriesComponents/healthTechComponents/healthTestimonial";
import TestimonialSlider from "@/components/home/testimonialSlider";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "Healthcare and Fitness Software Development Company | Custom Healthcare Software Solutions",
  description:
    "We develop custom HealthTech and fitness applications, telemedicine platforms, EHR/EMR systems, patient portals, AI healthcare solutions, and remote patient monitoring software for startups, hospitals, and digital health companies across the USA and MENA.",
};

const HealthTech = () => {
  return (
    <main className="w-full flex flex-col items-center overflow-x-hidden">
      <Hero
        title="Custom Healthcare and Fitness"
        typewriterPrefix=""
        typewriterPhrases={["Software Development Services"]}
        description="We don't just build healthcare and fitness software, we build intelligent healthcare and fitness solutions that improve outcomes, automate workflows, and drive better patient experiences."
        primaryButtonText="Start a Project"
        primaryButtonLink="/contact-us"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <HealthTechSolutions />
      <HealthWhoWeServe />
      <HealthTechExpertise />
      {/* <HealthTechProjects /> */}
      <EngagementModels />
      <HealthTechBenefits />
      <TestimonialSlider />
      <ContactFormSection />
      <HealthTechCTA />
    </main>
  );
};

export default HealthTech;
