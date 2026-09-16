"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaArrowRight } from "react-icons/fa";
import { FaAws, FaMeta } from "react-icons/fa6";
import { BsAnthropic } from "react-icons/bs";
// import { SiCisco, SiOracle } from "react-icons/si";
import { SiCisco } from "react-icons/si";
import { GrOracle } from "react-icons/gr";

import { MsLogo } from "../../../public/images";
import Link from "next/link";

const AUTO_PLAY_INTERVAL = 6000;
const NAVBAR_OFFSET = 82;

const SLIDES = [
  {
    id: 1,
    image: "/images/hero-slide-1-v2.jpg",
    badge: "Product Engineering",
    heading: "You Have an Idea.",
    subheading: "We Have the Right\nPeople to Build It.",
    tags: ["Custom Software", "AI Integration", "Agile Teams"],
  },
  {
    id: 2,
    image: "/images/hero-slide-2-v2.jpg",
    badge: "Digital Infrastructure",
    heading: "We Don't Just Build Software.",
    subheading:
      "We Build the Infrastructure\nYour Business Cannot Grow Without.",
    tags: ["Cloud Architecture", "Scalable Systems", "DevOps"],
  },
  {
    id: 3,
    image: "/images/hero-slide-3-v2.jpg",
    badge: "Competitive Advantage",
    heading: "Your Competitors Have a Product.",
    subheading: "We Make Yours\nthe One That Wins.",
    tags: ["Product Strategy", "UX Excellence", "Market Leadership"],
  },
];

const TECH_LOGOS = [
  { name: "Google", icon: <FcGoogle size={28} /> },
  {
    name: "Microsoft",
    icon: (
      <Image
        src={MsLogo}
        alt="Microsoft"
        width={24}
        height={24}
        className="object-contain"
      />
    ),
  },
  { name: "Meta", icon: <FaMeta size={28} color="#0369E5" /> },
  { name: "Anthropic", icon: <BsAnthropic size={24} color="#ffffff" /> },
  { name: "Cisco", icon: <SiCisco size={36} color="#049FD8" /> },
];

function SlideBackgrounds({ slides, currentSlide }) {
  return (
    <>
      {slides.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.image}
              alt={`Hero slide ${idx + 1}: ${slide.heading}`}
              fill
              priority={idx === 0}
              className={`object-cover object-center ${isActive ? "animate-hs-img-enter" : ""}`}
              sizes="100vw"
            />
            {/* Left-heavy dark gradient so left-aligned text stays readable */}
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.65)_45%,rgba(0,0,0,0.20)_100%)]" />
            {/* Bottom fade to blend into the logo bar */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,transparent_100%)]" />
          </div>
        );
      })}
    </>
  );
}

/** Left-aligned text block: badge → heading → subheading → tags → CTA buttons. */
function SlideContent({ slide, onDiscoveryCall, onViewWork }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl w-full">
      {/* ── Top Blue Bar text ── */}
      <div className="flex items-center gap-2 sm:gap-3 bg-[#283143] backdrop-blur-sm pr-4 sm:pr-6 py-2 sm:py-3 border-l-4 border-[#0369E5]/80 w-fit mb-2 animate-hs-badge shadow-lg">
        <span className="text-white/90 text-sm font-semibold tracking-wide pl-3 sm:pl-4">
          AI enabled Product Engineering and Digital Solution Partner
        </span>
      </div>

      {/* ── Category badge ── */}
      <div className="animate-hs-badge">
        <span className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/30 text-white/80 text-[10px] sm:text-xs font-bold tracking-[1.5px] sm:tracking-[3px] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0CBF83]" />
          {slide.badge}
        </span>
      </div>

      {slide.logo && (
        <div className="animate-hs-heading -mt-2 sm:-mt-1">{slide.logo}</div>
      )}

      {/* ── Main heading ── */}
      <h1 className="text-white font-extrabold leading-[1.1] tracking-tight">
        {/* Line 1 — plain white */}
        <span className="animate-hs-heading block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
          {slide.heading}
        </span>

        {/* Line 2 — white-to-green gradient */}
        <span className="animate-hs-subheading block mt-2 sm:mt-4 text-[15px] sm:text-base lg:text-xl tracking-wide font-medium text-white/90 max-w-2xl">
          {slide.subheading}
        </span>
      </h1>

      {/* ── Keyword tags ── */}
      {slide.tags && slide.tags.length > 0 && (
        <div className="animate-hs-tags flex flex-wrap gap-1.5 sm:gap-2 opacity-0">
          {slide.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white border border-white/45 bg-white/15 backdrop-blur-sm tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── CTA buttons ── */}
      <div className="animate-hs-cta flex flex-wrap gap-3 sm:gap-4 mt-1 sm:mt-2 opacity-0">
        <Link href="/contact-us">
          <button
            onClick={onDiscoveryCall}
            className="group flex items-center gap-3 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(12,191,131,0.4)] bg-[linear-gradient(135deg,#0CBF83_0%,#004BC0_100%)] w-fit"
          >
            Book a Discovery Call
            <FaArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Link>

        {/* <button
          onClick={onViewWork}
          className="flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wide cursor-pointer text-white/80 border border-white/25 bg-white/10 backdrop-blur-sm hover:bg-white/12 hover:border-white/50 hover:text-white transition-all duration-300 sm:w-auto"
        >
          View Our Work
        </button> */}
      </div>
    </div>
  );
}

/**
 * Vertical slide counter panel shown on the right side (desktop only).
 * Displays: ↑ | current# | progress bar | total# | ↓
 */
function VerticalCounter({
  currentSlide,
  totalSlides,
  direction,
  onPrev,
  onNext,
}) {
  const currentLabel = String(currentSlide + 1).padStart(2, "0");
  const totalLabel = String(totalSlides).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 select-none shrink-0">
      {/* ↑ Prev */}
      <SliderArrowButton
        onClick={onPrev}
        direction="up"
        ariaLabel="Previous slide"
      />

      {/* Number + progress track + total */}
      <div className="flex flex-col items-center gap-2">
        <div
          key={currentSlide}
          className={`animate-hs-counter text-white font-bold tabular-nums text-[clamp(1.1rem,1.5vw,1.5rem)] ${direction === "next" ? "animate-num-enter-next" : "animate-num-enter-prev"}`}
        >
          {currentLabel}
        </div>

        <div className="relative w-[2px] bg-white/15 rounded-full overflow-hidden h-[60px] sm:h-[80px]">
          <div
            key={`${currentSlide}-prog`}
            className="animate-hs-prog-fill absolute top-0 left-0 w-full rounded-full bg-[#0CBF83]"
          />
        </div>

        <div className="text-white font-medium tabular-nums text-[0.75rem] sm:text-[0.85rem]">
          {totalLabel}
        </div>
      </div>

      {/* ↓ Next */}
      <SliderArrowButton
        onClick={onNext}
        direction="down"
        ariaLabel="Next slide"
      />
    </div>
  );
}

/** Small circular arrow button used in VerticalCounter and for mobile nav. */
function SliderArrowButton({ onClick, direction, ariaLabel }) {
  const path = direction === "up" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7";
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
    >
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </button>
  );
}

/** Mobile-only horizontal dot indicators at the bottom. */
function MobileDots({ slides, currentSlide, goToSlide }) {
  return (
    <div className="flex lg:hidden justify-center gap-2 pb-4">
      {slides.map((_, idx) => (
        <button
          key={idx}
          onClick={() => goToSlide(idx, idx > currentSlide ? "next" : "prev")}
          aria-label={`Go to slide ${idx + 1}`}
          className={`rounded-full transition-all duration-300 h-2 ${idx === currentSlide ? "w-6 bg-[#0CBF83]" : "w-2 bg-white/30"}`}
        />
      ))}
    </div>
  );
}

/**
 * Left-edge vertical strip indicators (desktop).
 * Active slide = tall green bar; others = short dim bars.
 */
function LeftEdgeStrip({ slides, currentSlide, goToSlide }) {
  return (
    <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 flex-col gap-1 pl-3">
      {slides.map((_, idx) => (
        <button
          key={idx}
          onClick={() => goToSlide(idx, idx > currentSlide ? "next" : "prev")}
          aria-label={`Go to slide ${idx + 1}`}
          className={`rounded-full transition-all duration-500 w-[3px] ${idx === currentSlide ? "h-[48px] bg-[#0CBF83]" : "h-4 bg-white/20"}`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  // ── Navigation logic ──────────────────────────────────────────────────────

  const goToSlide = useCallback(
    (index, dir = "next") => {
      if (isAnimating || index === currentSlide) return;

      setDirection(dir);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 700);
    },
    [isAnimating, currentSlide],
  );

  const goToNext = useCallback(
    () => goToSlide((currentSlide + 1) % SLIDES.length, "next"),
    [currentSlide, goToSlide],
  );

  const goToPrev = useCallback(
    () => goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length, "prev"),
    [currentSlide, goToSlide],
  );

  // ── Auto-play ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setInterval(goToNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goToNext]);

  // ── Render ────────────────────────────────────────────────────────────────

  const activeSlide = SLIDES[currentSlide];

  return (
    <>
      <section
        className="relative w-full overflow-hidden font-jakarta bg-black mt-[-82px] h-full"
        aria-label="Hero slider"
      >
        {/* Layer 1 — Background images (z-0) */}
        <SlideBackgrounds slides={SLIDES} currentSlide={currentSlide} />

        {/* Layer 2 — Foreground content (z-10) */}
        <div className="relative z-10 flex flex-col justify-between min-h-[calc(100svh+82px)] pt-32 sm:pt-36 lg:pt-[82px] pb-4 lg:pb-0">
          {/* Main content row: text left, counter right */}
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between gap-4 sm:gap-8">
              <SlideContent
                key={
                  currentSlide
                } /* re-mounts on slide change to replay animations */
                slide={activeSlide}
                onDiscoveryCall={() => {}}
                onViewWork={() => {}}
              />
              <VerticalCounter
                currentSlide={currentSlide}
                totalSlides={SLIDES.length}
                direction={direction}
                onPrev={goToPrev}
                onNext={goToNext}
              />
            </div>
          </div>

          {/* Bottom bar: mobile dots + logo row */}
          <div className="w-full relative z-20">
            <MobileDots
              slides={SLIDES}
              currentSlide={currentSlide}
              goToSlide={goToSlide}
            />

            {/* Tech Partners Bar */}
            <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
              <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
                <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">
                  Certified and recognised by the world&apos;s leading
                  technology companies
                </span>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-12 transition-all duration-500 mt-3 lg:mt-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-base sm:text-xl">
                    <FcGoogle className="w-5 h-5 sm:w-7 sm:h-7" />
                    <span>Google</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-base sm:text-xl">
                    <FaMeta color="#0369E5" className="w-5 h-5 sm:w-7 sm:h-7" />
                    <span>Meta</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-base sm:text-xl">
                    <Image
                      src={MsLogo}
                      alt="Microsoft"
                      className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]"
                    />
                    <span>Microsoft</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-base sm:text-xl">
                    <BsAnthropic
                      color="#ffffff"
                      className="w-5 h-5 sm:w-7 sm:h-7"
                    />
                    <span>Anthropic</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-base sm:text-xl">
                    <SiCisco
                      color="#049fd9"
                      className="w-6 h-6 sm:w-[34px] sm:h-[34px]"
                    />
                    <span>Cisco</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3 — Absolute overlays (z-20) */}
        <LeftEdgeStrip
          slides={SLIDES}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
        />
      </section>
    </>
  );
}
