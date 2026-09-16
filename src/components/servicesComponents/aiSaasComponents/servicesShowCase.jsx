"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Code,
  Rocket,
  PenTool,
  BrainCircuit,
  Sparkles,
  Cpu,
  RefreshCw,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import Image from "next/image";
import { SoftMindSolLogo } from "../../../../public/images";

const tabsData = [
  {
    title: "Custom AI SaaS Product Development",
    icon: Code,
    description:
      "Build secure, scalable SaaS platforms with modern architecture, intuitive user experiences, and AI-powered functionality tailored to your business.",
    images: [
      "https://picsum.photos/id/1/800/400",
      "https://picsum.photos/id/2/800/400",
      "https://picsum.photos/id/3/800/400",
    ],
  },
  {
    title: "AI SaaS MVP Development",
    icon: Rocket,
    description:
      "Launch a market-ready MVP with essential features to validate your idea, gather user feedback, and accelerate product-market fit.",
    images: [
      "https://picsum.photos/id/4/800/400",
      "https://picsum.photos/id/5/800/400",
      "https://picsum.photos/id/6/800/400",
    ],
  },
  {
    title: "SaaS UI/UX Design",
    icon: PenTool,
    description:
      "Design intuitive user experiences that simplify complex workflows, improve usability, and increase product adoption.",
    images: [
      "https://picsum.photos/id/7/800/400",
      "https://picsum.photos/id/8/800/400",
      "https://picsum.photos/id/9/800/400",
    ],
  },
  {
    title: "AI Feature Development & Integration",
    icon: BrainCircuit,
    description:
      "Enhance your SaaS platform with AI capabilities such as automation, predictive analytics, intelligent search, and personalized user experiences.",
    images: [
      "https://picsum.photos/id/10/800/400",
      "https://picsum.photos/id/11/800/400",
      "https://picsum.photos/id/12/800/400",
    ],
  },
  {
    title: "Generative AI SaaS Development",
    icon: Sparkles,
    description:
      "Develop AI-powered SaaS products with intelligent assistants, content generation, document processing, and conversational experiences powered by modern LLMs.",
    images: [
      "https://picsum.photos/id/13/800/400",
      "https://picsum.photos/id/14/800/400",
      "https://picsum.photos/id/15/800/400",
    ],
  },
  {
    title: "SaaS API Development & Integration",
    icon: Cpu,
    description:
      "Connect your SaaS platform with third-party applications, payment gateways, CRMs, ERPs, communication tools, and cloud services for seamless workflows.",
    images: [
      "https://picsum.photos/id/16/800/400",
      "https://picsum.photos/id/17/800/400",
      "https://picsum.photos/id/18/800/400",
    ],
  },
  {
    title: "SaaS Migration & Modernization",
    icon: RefreshCw,
    description:
      "Modernize legacy applications with cloud-native architecture, improved security, enhanced performance, and AI-powered capabilities.",
    images: [
      "https://picsum.photos/id/19/800/400",
      "https://picsum.photos/id/20/800/400",
      "https://picsum.photos/id/21/800/400",
    ],
  },
  {
    title: "SaaS Optimization Services",
    icon: TrendingUp,
    description:
      "Optimize application performance, user experience, cloud infrastructure, and AI functionality to maximize product efficiency and scalability.",
    images: [
      "https://picsum.photos/id/22/800/400",
      "https://picsum.photos/id/23/800/400",
      "https://picsum.photos/id/24/800/400",
    ],
  },
  {
    title: "AI SaaS Support & Maintenance",
    icon: Wrench,
    description:
      "Keep your SaaS platform secure, reliable, and continuously evolving with proactive monitoring, performance optimization, and ongoing AI enhancements.",
    images: [
      "https://picsum.photos/id/25/800/400",
      "https://picsum.photos/id/26/800/400",
      "https://picsum.photos/id/27/800/400",
    ],
  },
];

// Custom Navigation component to control Carousel via useCarousel hook
const CustomCarouselControls = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="flex h-9 w-9 items-center justify-center rounded-md bg-green text-white shadow-[inset_0px_-3px_4px_rgba(255,255,255,0.14),inset_0px_4px_6px_rgba(0,0,0,0.25)] transition-opacity disabled:opacity-50 hover:opacity-90"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="flex h-9 w-9 items-center justify-center rounded-md bg-green text-white shadow-[inset_0px_-3px_4px_rgba(255,255,255,0.14),inset_0px_4px_6px_rgba(0,0,0,0.25)] transition-opacity disabled:opacity-50 hover:opacity-90"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const ServicesShowCase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabsData[activeIndex];

  return (
    <section className="relative bg-white font-jakarta">
      {/* Background glow */}
      <div className="bg-[#161616] relative py-24">
        {/* <div className="absolute left-1/2 top-24 h-[490px] w-[490px] -translate-x-1/2 -translate-y-[187px] rounded-full bg-navy blur-[212.4px] hidden xl:block" /> */}
        <div className="absolute select-none pointer-events-none">
          <Image
            src={SoftMindSolLogo}
            alt="SoftMindSol Logo"
            className="object-cover max-h-[726px]"
          />
        </div>

        <div className="relative w-full mx-auto px-6 lg:px-12">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-16 text-center">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-navy to-blue-600" />
              <h3 className="lg:text-[22px] font-bold tracking-[1px] text-green">
                Custom AI SaaS Development Services
              </h3>
            </div>
            <h2 className="text-[32px] md:text-[46px] font-bold leading-tight tracking-[1px] text-white capitalize">
              End-to-End AI SaaS Development Services
            </h2>
            <p className="text-[16px] md:text-[18px] font-medium leading-[24px] tracking-[1px] text-white/90 max-w-[800px]">
              From product strategy to AI implementation and long-term support,
              we help you build intelligent, scalable SaaS products that drive
              measurable business growth.
            </p>
          </div>
          {/* Main Content: Sidebar + Right Panel */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-24">
            {/* Left Sidebar Tabs */}
            <div className="flex-shrink-0 w-full lg:w-[450px]">
              <div className="rounded-xl bg-white/5 border border-white/5 p-6 flex flex-col gap-2">
                {tabsData.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-start gap-4 rounded-full px-5 py-3 transition-all duration-300 ${
                        isActive
                          ? "bg-green/20 text-white opacity-100"
                          : "text-white opacity-40 hover:opacity-100"
                      }`}
                    >
                      <Icon className="h-6 w-6 flex" />
                      <span className="text-[14px] whitespace-nowrap font-semibold tracking-[1px]">
                        {tab.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Right Content Panel */}
            <div className="flex-1 w-full lg:w-auto overflow-hidden">
              {/* Force Carousel to re-mount when activeIndex changes so it starts from slide 0 */}
              <Carousel
                key={activeIndex}
                className="w-full flex flex-col gap-6"
                opts={{ loop: true }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-[28px] md:text-[36px] font-bold capitalize tracking-[1px] text-white">
                    {activeTab.title}
                  </h2>
                  <div className="hidden sm:block shrink-0">
                    <CustomCarouselControls />
                  </div>
                </div>
                <p className="text-[16px] font-medium leading-[20px] tracking-[1px] text-white">
                  {activeTab.description}
                </p>
                {/* Carousel Container */}
                <div className="relative mt-2 w-full shadow-[0px_4px_30px_rgba(12,191,131,0.2)] rounded-xl overflow-hidden">
                  <CarouselContent>
                    {activeTab.images.map((imgSrc, imgIdx) => (
                      <CarouselItem key={imgIdx}>
                        <div className="h-[408px] w-full">
                          <img
                            src={imgSrc}
                            alt={`${activeTab.title} image ${imgIdx + 1}`}
                            className="h-full w-full object-cover rounded-xl"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {/* Mobile controls positioned at bottom */}
                  <div className="absolute bottom-4 right-4 z-10 sm:hidden">
                    <CustomCarouselControls />
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowCase;
