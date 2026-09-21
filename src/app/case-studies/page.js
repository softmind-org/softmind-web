import ContactForm from "@/components/contactUsComponents/ContactForm";
import ContactFormSection from "@/components/home/contactFormSection";
import { Hero } from "@/components/home/Hero";
import OurWork from "@/components/home/ourWork";

export const metadata = {
  title: "Case Studies | SoftMind Solutions",
  description: "Get in touch with SoftMind Solutions for your next project.",
};

const CaseStudies = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="We Build Solutions That Move"
        typewriterPrefix=""
        typewriterPhrases={["Businesses Forward"]}
        description="From complex ideas to market-ready products, see how we solve real business challenges with technology that delivers measurable value."
        primaryButtonText="Start a Project"
        primaryButtonLink="/contact-us"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <OurWork />
      <ContactFormSection />
    </main>
  );
};

export default CaseStudies;
