import { Hero } from "@/components/home/Hero";
import MissionVision from "@/components/aboutUsComponents/missionVision";
import WhoWeAre from "@/components/aboutUsComponents/whoWeAre";
import CoreValues from "@/components/aboutUsComponents/coreValues";
import StatsBanner from "@/components/aboutUsComponents/statsBanner";
import AboutIndustries from "@/components/aboutUsComponents/aboutIndustries";
import OurLeadership from "@/components/aboutUsComponents/ourLeadership";
export const metadata = {
  title: "About Us | SoftMind Solutions",
  description: "Get in touch with SoftMind Solutions for your next project.",
};

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col">
      <Hero
        title="Building Scalable"
        typewriterPrefix=""
        typewriterPhrases={["Solutions With Trust"]}
        description="SoftMind Solutions is a leading custom software development company engineering high-performance web apps, mobile solutions, AI platforms, and SaaS products for startups and enterprises worldwide"
        primaryButtonText="Start a Project"
        primaryButtonLink="/contact-us"
        secondaryButtonText=""
        secondaryButtonLink=""
        showBottomText={false}
      />
      <MissionVision />
      <WhoWeAre />
      <CoreValues />
      <AboutIndustries />
      <StatsBanner />
      <OurLeadership />
    </div>
  );
}
