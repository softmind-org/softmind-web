"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { SoftMindSolutionLogo } from "../../../public/images";

export default function OurWork() {
  const [activeCategory, setActiveCategory] = useState("Health Care");
  const [currentPage, setCurrentPage] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const categories = [
    "Health Care",
    "FinTech",
    "PropTech",
    "EdTech",
    "Ai Services",
  ];
  const carouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);

  // Carousel slide controller
  const slideNext = () => {
    if (currentPage === 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(0);
    }
  };

  const slidePrev = () => {
    if (currentPage === 1) {
      setCurrentPage(0);
    } else {
      setCurrentPage(1);
    }
  };

  // Mobile scroll event handler
  const handleMobileScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      setActiveMobileIndex(index);
    }
  };

  // Scroll to a mobile slide index
  const scrollToMobileItem = (index) => {
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollTo({
        left: index * mobileCarouselRef.current.clientWidth,
        behavior: "smooth",
      });
      setActiveMobileIndex(index);
    }
  };

  // Handle active category updates (reset mobile state too)
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(cat === "Health Care" ? 0 : 1);
    setActiveMobileIndex(0);
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollLeft = 0;
    }
  };

  // Portfolio items data
  const page1Items = [
    {
      id: "vitria-ai",
      title: "Vitria AI",
      fontClass: "font-sans",
      renderMockup: () => (
        <div className="relative w-full h-full bg-gradient-to-b from-[#ECEFF1] to-[#CFD8DC] flex flex-col justify-between items-center overflow-hidden p-6 select-none">
          {/* Rocky mountain stylized shapes */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[30%] bg-[#374151] opacity-70"
            style={{
              clipPath: "polygon(0 100%, 20% 40%, 45% 75%, 70% 30%, 100% 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[22%] bg-[#1F2937]"
            style={{
              clipPath:
                "polygon(0 100%, 15% 60%, 40% 80%, 65% 50%, 85% 75%, 100% 100%)",
            }}
          />

          {/* Phone mock */}
          <div className="w-[145px] h-[255px] bg-white rounded-[24px] border-[3.5px] border-[#475569] shadow-xl relative z-10 p-2 flex flex-col gap-1.5 overflow-hidden">
            <div className="flex justify-between items-center text-[7px] text-slate-400 px-1">
              <span>9:41</span>
              <div className="w-10 h-2 bg-black rounded-full" />
              <span>📶</span>
            </div>
            <span className="text-[7.5px] font-bold text-slate-700 block mt-1">
              Good Morning, Mubarak
            </span>
            <div className="w-16 h-16 rounded-full border-[6px] border-emerald-400 border-t-slate-100 flex items-center justify-center mx-auto relative my-2">
              <span className="text-[8.5px] font-extrabold text-slate-800">
                0/1000
              </span>
            </div>
            <div className="mt-auto bg-[#0F172A] rounded-xl p-1.5 text-white flex flex-col gap-0.5">
              <span className="text-[7px] font-bold">Premium</span>
              <span className="text-[5.5px] text-slate-400">
                Get unlimited access to premium features
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "built-right",
      title: "Built Right",
      fontClass: "font-sans",
      renderMockup: () => (
        <div className="relative w-full h-full bg-white flex p-5 select-none overflow-hidden">
          {/* Left Column Text details */}
          <div className="w-1/2 flex flex-col justify-between z-10 text-slate-800 pr-1">
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <span className="text-blue-600 font-extrabold text-xs">🏠</span>
                <span className="text-blue-900 font-black text-[9px] tracking-wide">
                  BUILTRIGHT
                </span>
              </div>
              <h4 className="text-[10px] font-bold text-slate-800 mb-0.5">
                About Mobile App
              </h4>
              <p className="text-[6px] text-slate-400 leading-tight">
                BuiltRight is your all-in-one property app, blending search,
                insights...
              </p>
            </div>
            <div className="flex flex-wrap gap-1 my-1">
              {["App Guideline", "Branding", "UI/UX Design", "App Design"].map(
                (p) => (
                  <span
                    key={p}
                    className="text-[5.5px] px-1 py-0.5 rounded-full border border-slate-200 text-slate-500 whitespace-nowrap"
                  >
                    {p}
                  </span>
                ),
              )}
            </div>
            <div>
              <span className="text-[6px] font-bold text-slate-400 block mb-1">
                Tools Used
              </span>
              <div className="flex gap-1">
                <span className="text-[5px] bg-slate-950 text-white px-1 py-0.5 rounded flex items-center gap-0.5">
                  🎨 Figma
                </span>
                <span className="text-[5px] bg-slate-950 text-white px-1 py-0.5 rounded flex items-center gap-0.5">
                  ⚛️ React
                </span>
              </div>
            </div>
          </div>
          {/* Right Column mockup screen */}
          <div className="w-1/2 relative flex justify-end items-end">
            <div className="w-[125px] h-[240px] bg-[#1E3A8A] rounded-[22px] border-[3.5px] border-slate-900 shadow-lg p-3 flex flex-col justify-center items-center text-white relative z-10 transform rotate-[-4deg] translate-y-3">
              <span className="text-[9px] font-black tracking-wide">
                BUILTRIGHT
              </span>
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 bg-slate-900/5 rounded-full blur-xl" />
          </div>
        </div>
      ),
    },
    {
      id: "opti-stack",
      title: "Opti stack",
      fontClass: "font-sans",
      renderMockup: () => (
        <div className="relative w-full h-full bg-[#38BDF8] flex flex-col justify-center items-center select-none overflow-hidden p-6">
          <div className="absolute inset-0 opacity-10 flex justify-around">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-[1.5px] h-full bg-white border-dashed border-l"
              />
            ))}
          </div>
          <div className="absolute left-6 top-1/2 -translate-y-12 bg-white/20 backdrop-blur-md p-1.5 rounded-lg shadow-md border border-white/20 text-xs">
            💊
          </div>
          <div className="absolute right-6 top-1/2 translate-y-4 bg-white/20 backdrop-blur-md p-1.5 rounded-lg shadow-md border border-white/20 text-xs">
            😊
          </div>
          <div className="absolute left-6 top-8 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-[5px] text-white">
            ⚙️ Optimizing Health
          </div>
          <div className="absolute right-6 top-12 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-[5px] text-white">
            🧠 AI Assistance
          </div>
          <div className="w-[135px] h-[245px] bg-white rounded-[22px] border-[3.5px] border-slate-900 shadow-xl p-2 flex flex-col gap-2 overflow-hidden relative z-10 text-slate-800">
            <span className="text-[7.5px] font-bold">SuppTrackr</span>
            <div className="bg-slate-50 rounded-lg p-1 flex flex-col gap-1 items-center">
              <span className="text-[6px] text-slate-400">Wellness Score</span>
              <div className="w-9 h-9 rounded-full border-[4px] border-emerald-400 flex items-center justify-center text-[8px] font-bold">
                72
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "real-chain",
      title: "Real Chain",
      fontClass: "font-sans",
      renderMockup: () => (
        <div className="relative w-full h-full bg-[#09090B] flex flex-col justify-center items-center select-none overflow-hidden p-6">
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span className="text-white/[0.03] font-black text-5xl tracking-widest">
              REALCHAIN
            </span>
          </div>
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-600/10 rounded-full blur-2xl" />
          <div className="w-[135px] h-[250px] bg-black rounded-[22px] border-[3.5px] border-zinc-800 shadow-xl relative z-10 p-2 overflow-hidden text-white flex flex-col justify-between">
            <div>
              <span className="text-[7.5px] font-extrabold text-purple-400">
                REALCHAIN
              </span>
              <h4 className="text-[9.5px] font-black leading-tight mt-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Invest in Real Estate, Reinvented with Blockchain
              </h4>
            </div>
            <div className="h-20 bg-gradient-to-t from-purple-950/50 to-transparent rounded-lg flex items-center justify-center border border-purple-900/30">
              <span className="text-xl">🏙️</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tijori",
      title: "Tijori",
      fontClass: "font-sans",
      renderMockup: () => (
        <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-center items-center select-none overflow-hidden p-6">
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="absolute left-6 top-6 flex items-center gap-1">
            <span className="text-[8px]">📈</span>
            <span className="text-slate-800 font-extrabold text-[8px]">
              tijori <span className="text-emerald-500">robo investing</span>
            </span>
          </div>
          <div className="relative w-full h-[210px] flex justify-center items-center">
            <div className="w-[110px] h-[190px] bg-white rounded-[18px] border-[3px] border-slate-800 shadow p-1.5 flex flex-col gap-1 text-slate-800 absolute transform translate-x-10 -translate-y-2 rotate-[6deg] z-10">
              <span className="text-[7px] font-bold text-slate-400">
                Dashboard
              </span>
              <span className="text-[9px] font-black text-emerald-600">
                Rs. 10,000
              </span>
              <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded flex items-end p-1">
                <div className="w-full h-full border-b border-emerald-400 flex items-end justify-between">
                  <div className="w-1.5 h-1/3 bg-emerald-100" />
                  <div className="w-1.5 h-1/2 bg-emerald-200" />
                  <div className="w-1.5 h-2/3 bg-emerald-300" />
                </div>
              </div>
            </div>
            <div className="w-[115px] h-[200px] bg-white rounded-[18px] border-[3.5px] border-slate-900 shadow-xl p-2 flex flex-col gap-1 text-slate-800 absolute transform -translate-x-6 translate-y-2 rotate-[-4deg] z-20">
              <span className="text-[8px] font-black text-slate-800">
                tijori
              </span>
              <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-lg p-1.5 flex items-center gap-1">
                <span className="text-[10px]">🤖</span>
                <span className="text-[6.5px] font-bold text-emerald-800 leading-tight">
                  Smart auto investment tools
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "vayanah",
      title: "Vayanah",
      fontClass: "font-sans",
      renderMockup: () => (
        <div className="relative w-full h-full bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] flex flex-col justify-center items-center select-none overflow-hidden p-6">
          <div className="absolute top-8 left-1/4 w-20 h-6 bg-white/40 rounded-full blur-md" />
          <div className="absolute top-16 right-1/4 w-24 h-8 bg-white/50 rounded-full blur-md" />
          <div className="relative w-full h-[210px] flex justify-center items-center">
            <div className="absolute bottom-2 left-1/2 -translate-x-14 w-14 h-6 bg-[#38BDF8]/40 border-t border-white/30 rounded-full shadow" />
            <div className="absolute bottom-1 left-1/2 translate-x-2 w-16 h-6 bg-[#0284C7]/40 border-t border-white/30 rounded-full shadow" />
            <div className="w-[105px] h-[190px] bg-white rounded-[16px] border-[3px] border-slate-800 shadow-xl p-1.5 flex flex-col gap-1 text-slate-800 absolute left-1/2 -translate-x-16 bottom-5 transform rotate-[-4deg] z-20">
              <span className="text-[6px] text-slate-400 block">
                Consultants
              </span>
              <div className="border border-slate-100 rounded p-1 flex items-center gap-1 mt-1 bg-slate-50">
                <span className="text-[9px]">👩‍⚕️</span>
                <div className="flex flex-col">
                  <span className="text-[5.5px] font-bold leading-tight">
                    Dr. Fatima
                  </span>
                  <span className="text-[4.5px] text-slate-400">
                    General Doctor
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[110px] h-[200px] bg-white rounded-[16px] border-[3.5px] border-slate-900 shadow-xl p-1.5 flex flex-col gap-1 text-slate-800 absolute left-1/2 -translate-x-2 bottom-3 transform rotate-[4deg] z-10">
              <span className="text-[6.5px] text-slate-400">Available Now</span>
              <div className="border border-slate-100 rounded p-1 flex items-center gap-1 mt-1 bg-slate-50">
                <span className="text-[9px]">👨‍⚕️</span>
                <div className="flex flex-col">
                  <span className="text-[5.5px] font-bold leading-tight">
                    Dr. Alijan
                  </span>
                  <span className="text-[4.5px] text-slate-400">Therapist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const page2Items = page1Items
    .map((item) => ({
      ...item,
      id: `${item.id}-p2`,
      title: `${item.title} II`,
    }))
    .reverse();

  const activePageItems = currentPage === 0 ? page1Items : page2Items;

  return (
    <section className="relative w-full bg-[#161616] text-white py-16 md:py-24 overflow-hidden font-jakarta">
      {/* Central Blue radial background glow (Ellipse 25 equivalent) */}
      <div
        className="absolute top-[-187px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full pointer-events-none opacity-40 blur-[130px]"
        style={{ backgroundColor: "navy" }}
      />

      <div className="absolute select-none pointer-events-none">
        <Image
          src={SoftMindSolutionLogo}
          alt="SoftMindSol Logo"
          className="object-cover max-h-[726px] opacity-20"
        />
      </div>

      <div className="relative mx-auto px-6 md:px-12">
        {/* Top Header Layout */}
        <div className="flex flex-col items-center justify-center gap-8 mb-[47px] text-center ">
          {/* Label and Section Title */}
          <div className="flex flex-col items-center justify-center gap-3.5 max-w-[631px] mx-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[linear-gradient(104.04deg,#00235A_8.33%,#004BC0_93.33%)]" />
              <span className="text-green text-[22px] font-bold tracking-[1px] leading-[28px]">
                Our Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] lg:leading-[58px] font-bold tracking-[1px] text-white capitalize">
              14+ Years Exp But{" "}
              <span className="bg-gradient-to-r from-green via-blue-500 to-blue-700 bg-clip-text text-transparent">
                Countless Innovations
              </span>
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mt-1">
              Real projects. Real challenges. Real outcomes. Explore how
              Softmind helps businesses simplify complexity, improve
              experiences, and build products that are ready to scale.
            </p>
          </div>

          {/* Action Row: Categories and Carousel Nav Controls */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 self-stretch justify-center md:justify-between">
            {/* Category Filter Tabs with dynamic green indicator underneath */}
            <div className="relative border-b border-white/10 w-full md:w-[468px]">
              <div className="flex justify-center md:justify-center gap-6 overflow-y-hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mb-[1.7px]">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-sm tracking-[1px] pb-2 whitespace-nowrap transition-all duration-300 relative ${
                        isActive
                          ? "text-white font-bold"
                          : "text-white/60 font-medium hover:text-white cursor-pointer"
                      }`}
                    >
                      {cat}
                      {isActive && (
                        <span className="absolute bottom-[0.5px] left-0 right-0 h-[2px] bg-green rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Nav buttons with Figma Box Shadow parameters */}
            <div className="hidden md:flex gap-[12px] shrink-0 self-end sm:self-auto">
              <button
                onClick={slidePrev}
                className="w-9 h-9 bg-green hover:bg-[#0aa672] text-white rounded-[4px] flex items-center justify-center transition-colors active:scale-95 shadow-[inset_0px_-3px_4px_rgba(255,255,255,0.14),_inset_0px_4px_6px_rgba(0,0,0,0.25)]"
                aria-label="Previous Slide"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={slideNext}
                className="w-9 h-9 bg-green hover:bg-[#0aa672] text-white rounded-[4px] flex items-center justify-center transition-colors active:scale-95 shadow-[inset_0px_-3px_4px_rgba(255,255,255,0.14),_inset_0px_4px_6px_rgba(0,0,0,0.25)]"
                aria-label="Next Slide"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop and Tablet/Mobile responsive sliding viewport */}
        <div
          ref={carouselRef}
          className="hidden md:block overflow-hidden w-full relative"
        >
          {/* Transition wrapper */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {/* Page 1 slide container */}
            <div className="w-full shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[23px] gap-y-[29px] w-full">
                {page1Items.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    {/* Visual Card (Matching Aspect Ratio 414px * 373px) */}
                    <div className="w-full aspect-[414/373] rounded-xl overflow-hidden relative border border-white/[0.04] mb-[20px] shadow-lg">
                      {item.renderMockup()}
                    </div>
                    {/* Visual Label (Identical weight and sizes) */}
                    <h3
                      className={`${item.fontClass} text-[22px] leading-[29px] font-bold tracking-[1px] text-white`}
                    >
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Page 2 slide container */}
            <div className="w-full shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[23px] gap-y-[29px] w-full">
                {page2Items.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <div className="w-full aspect-[414/373] rounded-xl overflow-hidden relative border border-white/[0.04] mb-[20px] shadow-lg">
                      {item.renderMockup()}
                    </div>
                    <h3
                      className={`${item.fontClass} text-[22px] leading-[29px] font-bold tracking-[1px] text-white`}
                    >
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Viewport: Touch Carousel with snap scrolling and pagination dots below */}
        <div className="block md:hidden w-full relative">
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full gap-5"
          >
            {activePageItems.map((item) => (
              <div key={item.id} className="w-full shrink-0 snap-center">
                {/* Visual Card (Matching Aspect Ratio 414px * 373px) with rounded-3xl corners */}
                <div className="w-full aspect-[414/373] rounded-3xl overflow-hidden relative border border-white/[0.04] shadow-lg">
                  {item.renderMockup()}
                </div>
              </div>
            ))}
          </div>

          {/* Active Card Title & Pagination Dots Footer */}
          <div className="flex justify-between items-center mt-6 px-1">
            <h3
              className={`${activePageItems[activeMobileIndex]?.fontClass || "font-sans"} text-[22px] leading-[29px] font-bold tracking-[1px] text-white`}
            >
              {activePageItems[activeMobileIndex]?.title}
            </h3>
            <div className="flex gap-[6px] items-center">
              {activePageItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToMobileItem(idx)}
                  className={`w-[9px] h-[9px] rounded-full transition-all duration-300 ${
                    activeMobileIndex === idx
                      ? "bg-green scale-110"
                      : "bg-[#2E2E2E]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
