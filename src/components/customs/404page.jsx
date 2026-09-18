"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 font-jakarta">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] -z-10 rounded-full bg-navy/5 blur-3xl" />
      <div className="absolute top-0 right-0 h-[400px] w-[400px] -translate-y-1/3 translate-x-1/3 -z-10 rounded-full bg-green/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/3 -translate-x-1/3 -z-10 rounded-full bg-blue-200 blur-3xl" />

      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center"
        >
          {/* Subtle error label */}
          <span className="animate-pulse lg:mb-6 mb-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-[15px] font-semibold text-red-600 ring-1 ring-inset ring-red-600/10">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            Error
          </span>

          <h1 className="text-[84px] sm:text-[100px] font-sans font-black leading-none tracking-tighter text-navy drop-shadow-sm lg:text-[150px]">
            4
            <span className="bg-gradient-to-tr from-green to-emerald-400 bg-clip-text text-transparent">
              0
            </span>
            4
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="lg:mt-8 mt-5 text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Oops! Page not found
          </h2>
          <p className="mx-auto lg:mt-4 mt-3 max-w-lg text-base lg:text-lg text-grey">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:my-10 my-7 h-px w-24 bg-gradient-to-r from-transparent via-navy/20 to-transparent  hidden sm:block"
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
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-navy/20 hover:bg-gray-50 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </motion.div>
      </div>
    </main>
  );
}
