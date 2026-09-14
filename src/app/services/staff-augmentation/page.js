import { Hero } from "@/components/home/Hero";
import SaTalentYouNeed from "@/components/servicesComponents/staffAugmenComponents/saTalentYouNeed";
import SaServices from "@/components/servicesComponents/staffAugmenComponents/saServices";
import SaBuildTeam from "@/components/servicesComponents/staffAugmenComponents/saBuildTeam";
import SaWhyChoose from "@/components/servicesComponents/staffAugmenComponents/saWhyChoose";
import SaOffshoreTalent from "@/components/servicesComponents/staffAugmenComponents/saOffshoreTalent";
import SaComparison from "@/components/servicesComponents/staffAugmenComponents/saComparison";
import SaIndustries from "@/components/servicesComponents/staffAugmenComponents/saIndustries";
import SaBusinessImpact from "@/components/servicesComponents/staffAugmenComponents/saBusinessImpact";
import SaCta from "@/components/servicesComponents/staffAugmenComponents/saCta";
import SaFaq from "@/components/servicesComponents/staffAugmenComponents/saFaq";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "IT Staff Augmentation Services for Startups | Hire Offshore Developers — Softmind Solutions",
  description:
    "Softmind Solutions provides IT staff augmentation services for startups and growing businesses in the USA and MENA — hire vetted offshore developers, designers, QA engineers, and DevOps professionals. Scale fast without the overhead of full-time hiring.",
};

const StaffAugmentation = () => {
  return (
    <main className="w-full flex flex-col items-center overflow-hidden">
      <Hero
        title="Offshore Staff Augmentation Services"
        typewriterPrefix=""
        typewriterPhrases={["Extend Your Team with the Right Offshore Talent"]}
        description="Scale your technology team without the time, cost, and complexity of traditional hiring."
        primaryButtonText="Hire Today"
        primaryButtonLink="/contact-us"
        secondaryButtonText={null}
        showBottomText={false}
      />

      <SaTalentYouNeed />
      <SaServices />
      <SaBuildTeam />
      <SaWhyChoose />
      <SaOffshoreTalent />
      <SaComparison />
      <SaIndustries />
      <SaBusinessImpact />
      <ContactFormSection />
      {/* <SaCta /> */}
      <SaFaq />
    </main>
  );
};

export default StaffAugmentation;
