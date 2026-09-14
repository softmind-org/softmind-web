import { Hero } from "@/components/home/Hero";
import AiSaasTrust from "@/components/servicesComponents/aiSaasComponents/aiSaasTrust";
import AiSaasWorkflow from "@/components/servicesComponents/aiSaasComponents/aiSaasWorkflow";
import ServicesShowCase from "@/components/servicesComponents/aiSaasComponents/servicesShowCase";
import AiSaasOutcomes from "@/components/servicesComponents/aiSaasComponents/aiSaasOutcomes";
import DevelopmetProcess from "@/components/servicesComponents/aiSaasComponents/developmetProcess";
import AiSaasArchitecture from "@/components/servicesComponents/aiSaasComponents/aiSaasArchitecture";
import AiSaasCaseStudy from "@/components/servicesComponents/aiSaasComponents/aiSaasCaseStudy";
import EngagementModels from "@/components/home/engagementModels";
import WhyChooseSoftmind from "@/components/servicesComponents/aiSaasComponents/whyChooseSoftmind";
import AiSaasTechStack from "@/components/servicesComponents/aiSaasComponents/aiSaasTechStack";
import ContactFormSection from "@/components/home/contactFormSection";
import AiSaasFaqs from "@/components/servicesComponents/aiSaasComponents/aiSaasFaqs";
import TestimonialSlider from "@/components/home/testimonialSlider";

export const metadata = {
  title:
    "Custom AI SaaS Development Services | Build Intelligent SaaS Products",
  description:
    "Build secure, scalable AI SaaS products with SoftMind. From strategy and MVP development to AI integration, modernization, and ongoing support.",
};

const AISaas = () => {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero
        title="Custom AI SaaS Development Services"
        typewriterPrefix=""
        typewriterPhrases={["Built for Growth"]}
        description="Turn your SaaS idea into an intelligent, scalable, and market-ready product. Whether you are launching a new SaaS platform or adding AI capabilities to an existing product, our team can help you build secure, reliable, and future-ready software around your business model."
        primaryButtonText="Start Your AI SaaS Project"
        primaryButtonLink="/contact"
        secondaryButtonText={null}
        showBottomText={false}
      />
      <AiSaasTrust />
      <AiSaasWorkflow />
      <ServicesShowCase />
      <AiSaasOutcomes />
      <DevelopmetProcess />
      <AiSaasArchitecture />
      {/* <AiSaasCaseStudy /> */}
      <EngagementModels />
      <TestimonialSlider />
      <WhyChooseSoftmind />
      <AiSaasTechStack />
      <ContactFormSection />
      <AiSaasFaqs />
    </main>
  );
};

export default AISaas;
