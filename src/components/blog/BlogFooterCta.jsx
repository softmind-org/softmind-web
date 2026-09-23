import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Sparkles, MessageSquare } from "lucide-react";

export default function BlogFooterCta() {
  return (
    <section
      id="talk-to-us-about-your-build"
      className="scroll-mt-28 w-full my-12 rounded-3xl overflow-hidden relative font-jakarta bg-gradient-to-br from-[#00235A] via-[#00173D] to-[#000F29] p-8 md:p-12 text-white border border-white/10 shadow-xl"
    >
      {/* Decorative background glow & accent lines */}
      <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-green/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#0070E0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-green/50 to-transparent" />

      <div className="relative z-10 max-w-[700px]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs mb-4">
          <Sparkles className="w-4 h-4 text-green" />
          <span className="text-xs font-bold text-green uppercase tracking-wider">
            Ready To Build?
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
          Talk To Us About Your Build
        </h2>

        <p className="text-sm md:text-base text-gray-300 font-normal leading-relaxed mb-8">
          Whether you need dedicated senior engineers to scale your LMS platform, custom AI/LLM integrations, or an enterprise cloud migration, SoftMind Solutions is ready to partner with you.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2.5 bg-green hover:bg-[#0aad76] text-navy font-bold text-sm sm:text-[15px] px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(12,191,131,0.4)] hover:scale-102"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Free 30-Min Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-[15px] px-6 py-3.5 rounded-full transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Engineering Team</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
