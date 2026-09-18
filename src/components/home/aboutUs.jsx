"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, motion } from "framer-motion";

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.round(v);
          }
        },
      });

      return () => controls.stop();
    }
  }, [value, inView]);

  return <span ref={ref}>0</span>;
}

export default function AboutUs() {
  const stats = [
    {
      number: "60",
      label: "Engineer and consultants",
    },
    {
      number: "300",
      label: "Satisfied Clients",
    },
    {
      number: "100",
      label: "Projects successfully delivered",
    },
    {
      number: "14",
      label: "Years of Experience",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 text-dark overflow-hidden font-jakarta">
      {/* Subtle Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#eff6ff]/60 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#f0fdf4]/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 xl:gap-24">
          {/* Left Side: Text Content */}
          <motion.div
            className="w-full lg:w-[55%] flex flex-col items-center lg:items-start justify-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 bg-[#f9fafb]/80 px-5 py-2.5 rounded-full border border-[#f3f4f6] shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(104.04deg,#00235A_8.33%,#004BC0_93.33%)] animate-pulse" />
              <span className="text-green text-sm md:text-base font-bold tracking-wider uppercase">
                About Us
              </span>
            </motion.div>

            {/* Title Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[40px] lg:leading-[1.2] font-extrabold tracking-tight text-dark text-center lg:text-left"
            >
              Your Offshore <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green">
                Software Partner{" "}
              </span>
              <br className="hidden sm:block" />
              for Scalable Growth
            </motion.h2>

            {/* Body copy */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-[15px] sm:text-base md:text-[17px] text-gray font-medium leading-[1.7] text-center lg:text-left max-w-[658px]"
            >
              <p>
                <strong className="text-dark">Softmind</strong> is an offshore
                software development company helping startups, SaaS companies,
                and growing engineering teams build scalable digital products
                faster.
              </p>
              <p>
                Since 2023, we have provided{" "}
                <strong className="text-dark">
                  Custom Software Development, Mobile App Development, AI
                  Solutions, Cloud Applications, Staff Augmentation,
                </strong>{" "}
                and dedicated remote developers for businesses across the{" "}
                <strong className="text-dark">US, Europe</strong> and{" "}
                <strong className="text-dark">MENA</strong> region.
              </p>
              <p>
                With <strong className="text-dark">Softmind</strong>, your code
                and IP stay <strong className="text-dark">100% yours</strong>{" "}
                while our team stays focused on your roadmap, deadlines, and
                business growth.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side: Stats Grid */}
          <motion.div
            className="w-full lg:w-[45%] relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background Grid Pattern for Stats section */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] rounded-3xl" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 relative z-10 py-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col items-center sm:items-start text-center sm:text-left p-6 sm:p-8 rounded-3xl bg-white border border-[#f3f4f6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eff6ff]/0 to-[#eff6ff]/0 group-hover:from-[#eff6ff]/50 group-hover:to-transparent transition-colors duration-500 rounded-3xl z-0" />

                  <div className="relative z-10 w-full flex flex-col items-center sm:items-start">
                    <div className="flex items-center justify-center sm:justify-start text-4xl sm:text-[46px] font-extrabold tracking-tight text-dark mb-2 sm:mb-3 select-none">
                      <AnimatedNumber value={parseInt(stat.number, 10)} />
                      <span className="text-green ml-1 font-semibold">+</span>
                    </div>

                    <span className="text-sm sm:text-[15px] text-gray font-medium leading-relaxed max-w-[180px] inline-block">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
