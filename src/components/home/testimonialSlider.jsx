"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";

export default function TestimonialSlider() {
  const baseTestimonials = [
    {
      name: "Ayesha Raza",
      role: "Founder, PeaceFlow",
      initials: "AR",
      rating: 5,
      date: "Jan 13, 2026 - Apr 22, 2026",
      shortFeedback:
        "We've had an excellent experience working with Softmind Solutions. From the very beginning, their communication has been clear, proactive...",
      fullFeedback: [
        "\"We've had an excellent experience working with Softmind Solutions. From the very beginning, their communication has been clear, proactive, and highly professional, which made the entire collaboration smooth and efficient.",
        "What really stands out is their work ethic and mindset. The team is dedicated, works hard, and consistently delivers high-quality results. They don't just execute tasks — they actively think along, approach challenges with a solution-oriented mindset, and always look for the best way forward instead of focusing on problems.",
        "It genuinely feels like working with a reliable long-term partner rather than just a development team. We're extremely satisfied with the collaboration so far and look forward to continuing to work together on many future projects.",
        'Highly recommended."',
      ],
    },
    {
      name: "Alejandro Silva",
      role: "CTO, TechVision",
      initials: "AS",
      rating: 5,
      date: "Sep 02, 2026 - Nov 15, 2026",
      shortFeedback:
        "Working with them was an absolute breeze. Their technical capability and proactive communication resolved key performance blockers early...",
      fullFeedback: [
        '"Softmind Solutions made working with them an absolute breeze. Their technical capability and proactive communication resolved key performance blockers early in our production timeline.',
        'The dedicated product manager maintained perfect alignment with our key milestones. Excellent delivery standards! Highly recommended for complex SaaS builds."',
      ],
    },
    {
      name: "Marcus Vance",
      role: "Product Manager, Innovate",
      initials: "MV",
      rating: 5,
      date: "Oct 12, 2026 - Present",
      shortFeedback:
        "Highly professional team that goes above and beyond to ensure execution meets strategic objectives. Their responsiveness is outstanding...",
      fullFeedback: [
        '"Softmind Solutions is a highly professional team that goes above and beyond to ensure execution meets strategic objectives.',
        'Their responsiveness is outstanding, and their ability to scale resource allocation flexibly made a huge difference to our go-to-market speed."',
      ],
    },
  ];

  // Duplicate to ensure smooth 4-item infinite looping
  const testimonials = [
    ...baseTestimonials,
    ...baseTestimonials,
    ...baseTestimonials,
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect();
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);
    return () => clearInterval(autoplay);
  }, [emblaApi, isPaused]);

  const highlightSoftmind = (text) => {
    if (!text) return text;
    const parts = text.split(/(Softmind Solutions\.?)/g);
    return parts.map((part, idx) =>
      part.startsWith("Softmind Solutions") ? (
        <strong key={idx} className="text-green font-bold">
          {part}
        </strong>
      ) : (
        part
      ),
    );
  };

  const renderCardStars = (rating) => {
    return (
      <div className="flex items-center gap-1 sm:gap-1.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={i < rating ? "#0CBF83" : "#334155"}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };

  const renderModalStars = (rating) => {
    return (
      <div className="flex items-center gap-1 sm:gap-1.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={i < rating ? "#F59E0B" : "#334155"}
            className="w-4 h-4 md:w-5 md:h-5 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="relative w-full bg-[#070E13] py-16 md:py-20 lg:py-24 overflow-hidden font-sans flex justify-center items-center">
      <div className="w-full px-4 sm:px-6 md:px-10 max-w-[1600px] flex flex-col items-center">
        {/* Header Label & Title */}
        <div className="flex flex-col items-center gap-3.5 text-center mb-12 md:mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[linear-gradient(104.04deg,#00235A_8.33%,#004BC0_93.33%)]" />
            <span className="text-[#0CBF83] text-lg sm:text-[22px] font-bold tracking-[1px] leading-snug sm:leading-[28px]">
              Testimonial
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] lg:leading-[58px] font-bold tracking-[1px] capitalize text-white">
            What Our Client Says{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0CBF83] to-[#004BC0]">
              About Us
            </span>
          </h2>
        </div>

        {/* Embla Carousel Container */}
        <div
          className="overflow-hidden w-full"
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex -ml-4 md:-ml-6 cursor-grab active:cursor-grabbing">
            {testimonials.map((testimonial, idx) => (
              <div
                className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-4 md:pl-6 flex"
                key={idx}
              >
                {/* Card */}
                <div className="bg-[#0D1815] border border-[#132A22] rounded-2xl p-5 md:p-6 w-full h-full shadow-2xl relative flex flex-col transition-all duration-300 hover:border-[#0CBF83]/30 hover:shadow-[0_0_20px_rgba(12,191,131,0.15)] group select-none">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-3 mb-4 md:mb-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0CBF83] flex items-center justify-center text-[#070D12] font-bold text-base md:text-lg tracking-wider shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm md:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-[#64748B] text-[11px] sm:text-xs mt-0.5">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="mb-4 md:mb-5">
                    {renderCardStars(testimonial.rating)}
                  </div>

                  {/* Short Feedback */}
                  <p className="text-gray-300 leading-relaxed mb-5 md:mb-6 font-medium text-[13px] sm:text-[14px] flex-grow select-text">
                    {highlightSoftmind(testimonial.shortFeedback)}
                  </p>

                  {/* Modal Trigger & Content */}
                  <Dialog>
                    <DialogTrigger className="text-green font-bold text-[13px] sm:text-[14px] hover:text-[#10e69d] transition-colors focus:outline-none cursor-pointer hover:underline self-start text-left mt-auto">
                      Click to view full review
                    </DialogTrigger>

                    <DialogContent
                      className="bg-[#0A131F] text-white border-0 px-7 py-4 w-[95vw] sm:w-[90vw] sm:max-w-[850px] max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl md:rounded-[32px] shadow-[0_0_40px_rgba(0,120,255,0.2),_0_0_40px_rgba(0,229,255,0.2)] md:shadow-[0_0_60px_rgba(0,120,255,0.25),_0_0_60px_rgba(0,229,255,0.25)] font-sans antialiased"
                      style={{
                        backgroundImage:
                          "linear-gradient(#0A131F, #0A131F), linear-gradient(135deg, rgba(0,75,192,1), rgba(0,229,255,1))",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        border: "2px solid transparent",
                      }}
                    >
                      <DialogTitle className="sr-only">
                        Full Review from {testimonial.name}
                      </DialogTitle>

                      <div className="flex flex-col relative z-10 w-full pt-2">
                        {/* Header: Client Name at the very top */}
                        <h2 className="text-green text-xl md:text-[22px] font-medium mb-3 tracking-wide select-text">
                          {testimonial.name}
                        </h2>

                        {/* Rating, Date, Share */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-300 text-[13px] md:text-[15px] mb-8 font-medium select-text">
                          {renderModalStars(testimonial.rating)}
                          <span className="font-bold text-white -ml-1">
                            {testimonial.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-100">|</span>
                          <span>{testimonial.date}</span>
                        </div>

                        {/* Full Review Content */}
                        <div className="text-white/85 font-light italic text-[14.5px] sm:text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8] space-y-4 md:space-y-5 tracking-wide select-text">
                          {testimonial.fullFeedback.map((para, i) => (
                            <p key={i}>{highlightSoftmind(para)}</p>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10 md:mt-12">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#1A2E35] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#0CBF83] hover:bg-[#0CBF83]/10 transition-all bg-transparent focus:outline-none shrink-0"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  selectedIndex === idx
                    ? "w-5 h-1.5 sm:w-6 sm:h-2 bg-[#0CBF83]"
                    : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#334155] hover:bg-[#475569]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#1A2E35] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#0CBF83] hover:bg-[#0CBF83]/10 transition-all bg-transparent focus:outline-none shrink-0"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
