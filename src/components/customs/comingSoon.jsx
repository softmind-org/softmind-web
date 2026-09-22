"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function ComingSoon() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 font-jakarta">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#00235A_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-navy rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-green rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center"
        >
          {/* Status Badge */}
          <span className="animate-pulse lg:mb-6 mb-4 inline-flex items-center gap-2 rounded-full bg-green/10 px-3.5 py-1 text-sm font-semibold text-green ring-1 ring-inset ring-green/20">
            <span className="h-2 w-2 rounded-full bg-green" />
            In Progress
          </span>

          <h1 className="text-[54px] sm:text-[76px] lg:text-[96px] font-sans font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-navy via-green to-navy drop-shadow-sm">
            Coming Soon
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="lg:mt-8 mt-5 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
            Under Development
          </h2>
          <p className="mx-auto lg:mt-4 mt-3 max-w-[375px] text-base lg:text-lg text-grey">
            We are working hard to bring you this page. It will be available
            very soon.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:my-10 my-7 h-px w-24 bg-gradient-to-r from-transparent via-navy/20 to-transparent hidden sm:block"
        />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex w-full flex-col items-center justify-center gap-3 md:gap-4 sm:flex-row mt-4 sm:mt-0"
        >
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-navy/20 transition-all hover:-translate-y-0.5 hover:bg-navy/90 hover:shadow-lg sm:w-auto"
          >
            <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-navy/20 hover:bg-gray-50 sm:w-auto cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </motion.div>
      </div>
    </main>
  );
}
