"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const stepsData = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We understand your business, users, market, challenges, and objectives to define a clear mobile product strategy.",
    image: "https://picsum.photos/seed/discovery/600/400",
  },
  {
    step: "02",
    title: "Product Planning",
    description:
      "We translate requirements into a prioritized roadmap, technical architecture, feature set, and development plan.",
    image: "https://picsum.photos/seed/planning/600/400",
  },
  {
    step: "03",
    title: "UI/UX Design",
    description:
      "We create intuitive user journeys and interfaces that balance usability, brand identity, accessibility, and business goals.",
    image: "https://picsum.photos/seed/design/600/400",
  },
  {
    step: "04",
    title: "Mobile App Development",
    description:
      "Our engineers build your application using modern development frameworks and scalable architecture tailored to your requirements.",
    image: "https://picsum.photos/seed/development/600/400",
  },
  {
    step: "05",
    title: "Testing & Quality Assurance",
    description:
      "We conduct functional, performance, security, usability, and device compatibility testing to ensure a reliable product.",
    image: "https://picsum.photos/seed/testing/600/400",
  },
  {
    step: "06",
    title: "Deployment",
    description:
      "We prepare and deploy your application across the required platforms while ensuring it meets relevant app store requirements.",
    image: "https://picsum.photos/seed/deployment/600/400",
  },
  {
    step: "07",
    title: "Optimization & Support",
    description:
      "After launch, we monitor performance, resolve issues, introduce improvements, and evolve the application as your business grows.",
    image: "https://picsum.photos/seed/support/600/400",
  },
];

const StepItem = ({ step, index, activeStep, setActiveStep }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveStep(index);
    }
  }, [isInView, index, setActiveStep]);

  const isActive = activeStep === index;

  return (
    <div
      ref={ref}
      className={`py-[10vh] min-h-[50vh] flex flex-col justify-center transition-all duration-700 ease-out ${isActive ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-8"}`}
    >
      <div className="inline-flex items-center gap-4 mb-6">
        <span
          className={`h-[2px] transition-all duration-700 ${isActive ? "w-12 bg-green" : "w-6 bg-gray-300"}`}
        ></span>
        <span
          className={`font-bold tracking-widest uppercase text-sm transition-colors duration-700 ${isActive ? "text-green" : "text-gray-400"}`}
        >
          Step {step.step}
        </span>
      </div>
      <h3
        className={`text-[32px] lg:text-[42px] font-extrabold mb-6 leading-tight transition-colors duration-700 ${isActive ? "text-navy" : "text-gray-400"}`}
      >
        {step.title}
      </h3>
      <p className="text-lg text-gray-500 leading-relaxed max-w-[450px]">
        {step.description}
      </p>
    </div>
  );
};

const DevelopmentProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-white w-full font-jakarta relative">
      <div className="pt-24 pb-12 md:py-32 px-6 lg:px-12 w-full mx-auto text-center relative z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8FAFC] border border-gray-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-navy to-green" />
            <span className="text-navy text-[13px] font-bold tracking-widest uppercase">
              Our Process
            </span>
          </div>
          <h2 className="text-[36px] sm:text-[46px] lg:text-[50px] font-extrabold text-navy tracking-tight max-w-[800px] leading-tight">
            Our Mobile App{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-blue-600">
              Development Process
            </span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-500 font-medium leading-relaxed max-w-[700px] mt-4">
            A structured approach from idea to launch
          </p>
        </div>
      </div>

      <div className="w-full mx-auto relative z-10">
        <div className="hidden md:flex items-start w-full px-6 lg:px-12">
          <div className="w-1/2 pr-12 lg:pr-24 pb-[30vh] pt-[5vh]">
            {stepsData.map((step, index) => (
              <StepItem
                key={index}
                step={step}
                index={index}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            ))}
          </div>

          <div className="w-1/2 sticky top-32 h-[calc(100vh-8rem)] flex flex-col justify-start pl-8 pt-4">
            <div className="relative w-full aspect-[4/3] max-h-[70vh] rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,35,90,0.12)] border border-gray-100 bg-white">
              <AnimatePresence>
                <motion.img
                  key={activeStep}
                  src={stepsData[activeStep].image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-navy via-navy/50 to-transparent pointer-events-none opacity-90" />

              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[24px] shadow-2xl">
                <motion.h4
                  key={`title-${activeStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-[22px] font-bold mb-1"
                >
                  {stepsData[activeStep].title}
                </motion.h4>
                <motion.span
                  key={`step-${activeStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80 font-medium text-[15px]"
                >
                  Step {stepsData[activeStep].step} of 0{stepsData.length}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col gap-12 px-6 pb-24">
          {stepsData.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg relative">
                <img src={step.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full">
                  <span className="text-white font-bold text-sm tracking-widest uppercase">
                    Step {step.step}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <h3 className="text-[26px] font-extrabold text-navy mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[16px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcess;
