"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const CountUp = ({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  text = null,
}) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && to !== undefined && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, from, to, duration, decimals, prefix, suffix]);

  if (text !== null) {
    return <span>{text}</span>;
  }

  return (
    <span ref={nodeRef}>
      {prefix}
      {from.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const statsData = [
  {
    to: 95,
    suffix: "%",
    label: "Client Satisfaction Rate",
  },
  {
    text: "Zero",
    label: "Detractors",
  },
  {
    to: 89.9,
    decimals: 1,
    label: "Net promoter Score",
  },
  {
    to: 6,
    prefix: "Avg. ",
    suffix: " years",
    label: "Client Relationship",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function StatsBanner() {
  return (
    <section className="relative w-full py-16 bg-gray-200 font-jakarta flex justify-center">
      <div className="relative w-full px-6 sm:px-12">
        {/* Banner Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative w-full bg-[#161616] rounded-2xl overflow-hidden py-10 px-8 sm:py-12 sm:px-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 shadow-2xl"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[-100px] w-[500px] h-[500px] bg-[#00235A] rounded-full blur-[150px] opacity-80 pointer-events-none" />

          {statsData.map((stat, index) => (
            <React.Fragment key={index}>
              {/* Stat Item */}
              <motion.div
                variants={itemVariants}
                className="relative z-10 flex flex-col items-center text-center w-full lg:w-1/4"
              >
                <span className="font-bold text-[36px] sm:text-[42px] leading-tight text-white mb-1">
                  <CountUp
                    to={stat.to}
                    text={stat.text}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </span>
                <span className="font-bold text-[14px] sm:text-[16px] leading-snug text-white tracking-wide">
                  {stat.label}
                </span>
              </motion.div>

              {/* Divider (Render for all except the last item) */}
              {index < statsData.length - 1 && (
                <>
                  <motion.div
                    variants={itemVariants}
                    className="hidden lg:block relative z-10 w-[2px] h-[80px] bg-white/20 rounded-full"
                  />
                  <motion.div
                    variants={itemVariants}
                    className="lg:hidden relative z-10 w-full h-[1px] bg-white/20 rounded-full"
                  />
                </>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
