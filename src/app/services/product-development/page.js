import { Hero } from "@/components/home/Hero";
import PdServices from "@/components/servicesComponents/productDevelopmentComponents/PdServices";
import PdProcess from "@/components/servicesComponents/productDevelopmentComponents/PdProcess";
import PdEndToEnd from "@/components/servicesComponents/productDevelopmentComponents/PdEndToEnd";
import PdWhyChoose from "@/components/servicesComponents/productDevelopmentComponents/PdWhyChoose";
import PdForStages from "@/components/servicesComponents/productDevelopmentComponents/PdForStages";
import PdTestimonials from "@/components/servicesComponents/productDevelopmentComponents/PdTestimonials";
import PdCaseStudy from "@/components/servicesComponents/productDevelopmentComponents/PdCaseStudy";
import PdCta from "@/components/servicesComponents/productDevelopmentComponents/PdCta";
import PdFaq from "@/components/servicesComponents/productDevelopmentComponents/PdFaq";
import TestimonialSlider from "@/components/home/testimonialSlider";
import ContactFormSection from "@/components/home/contactFormSection";

export const metadata = {
  title:
    "Product Development Services | End-to-End Software Delivery — Softmind Solutions",
  description:
    "Softmind Solutions delivers end-to-end product development services for startups and growing businesses in the USA and MENA — from discovery and design to development, QA, and launch. Fixed price, dedicated team, or ongoing retainer. Offshore quality, startup-friendly pricing.",
};

const ProductDevelopment = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="Enterprise Product"
        typewriterPrefix=""
        typewriterPhrases={["Development Services"]}
        description="Turn Your Product Vision Into a Scalable Digital Solution"
        primaryButtonText="Have a product idea? Let's bring it to life."
        primaryButtonLink="/contact-us"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <PdServices />
      <PdProcess />
      <PdEndToEnd />
      <PdWhyChoose />
      <PdForStages />
      <TestimonialSlider />
      {/* <PdCaseStudy /> */}
      <ContactFormSection />
      <PdCta />
      <PdFaq />
    </main>
  );
};

export default ProductDevelopment;
