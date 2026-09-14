"use client";

import React, { useState } from "react";
import {
  AhmarBaig,
  BilalElAzimani,
  CeoBilal,
  FahadAnwar2,
  MariyumHR,
} from "../../../public/images";
import Image from "next/image";
import { FaLinkedin, FaLinkedinIn } from "react-icons/fa";

const leaders = [
  {
    role: "Founder & CEO",
    name: "Muhammad Bilal Bhatti",
    image: CeoBilal,
    linkedin: "https://www.linkedin.com/in/bilalbhatti139/",
  },
  {
    role: "Co-Founder",
    name: "Amna Akbar",
    image: MariyumHR,
    linkedin: "https://www.linkedin.com/in/amna-akbar-a07576348/",
  },
  {
    role: "Head of Technology & Solutions",
    name: "Fahad Anwar",
    image: FahadAnwar2,
    linkedin: "https://www.linkedin.com/in/fahad-anwar-2989661ab/",
  },
  {
    role: "Project Director",
    name: "Bilal El Azimani",
    image: BilalElAzimani,
    linkedin: "https://www.linkedin.com/in/bilal-el-azimani-238724176/",
  },
];

export default function OurLeadership() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for mobile swiping (optional but good for UX)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && currentIndex < leaders.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="relative w-full py-12 lg:py-16 bg-[#ffffff] overflow-hidden font-jakarta flex justify-center">
      <div className="w-full px-6 sm:px-12 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 max-w-160">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-linear-to-r from-navy to-[#004BC0]" />
            <span className="text-[16px] sm:text-[18px] font-bold text-green tracking-wide">
              Our Leadership
            </span>
          </div>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-dark leading-tight capitalize">
            The Visionaries Behind Every Successful Project
          </h2>
          <p className="text-[15px] sm:text-[16px] font-medium text-grey leading-[1.6]">
            Real people. Real expertise. Passionate about solving complex
            engineering challenges for clients across the globe.
          </p>
        </div>

        {/* Desktop & Tablet Grid Layout */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-[20px] p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col h-full group cursor-pointer"
            >
              {/* Image Container */}
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full aspect-4/5 rounded-xl overflow-hidden mb-5 bg-gray-50 shrink-0"
                aria-label={`LinkedIn profile of ${leader.name}`}
              >
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              {/* Text & Icon */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1 pr-3">
                  <h3 className="text-[17px] font-bold text-[#111827] leading-tight tracking-wide">
                    {leader.name}
                  </h3>
                  <p className="text-[14px] font-semibold whitespace-nowrap text-green">
                    {leader.role}
                  </p>
                </div>

                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#0077b5] group-hover:border-[#0077b5] group-hover:text-white transition-all duration-300 shadow-sm"
                  aria-label={`LinkedIn profile of ${leader.name}`}
                >
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider Layout */}
        <div className="sm:hidden w-full flex flex-col items-center">
          <div
            className="w-full max-w-85 overflow-hidden pb-6 pt-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {leaders.map((leader, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 px-3 flex justify-center"
                >
                  <div className="group bg-white rounded-[20px] w-full p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-full">
                    {/* Image Container */}
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full aspect-4/5 rounded-xl overflow-hidden mb-5 bg-gray-50 shrink-0"
                      aria-label={`LinkedIn profile of ${leader.name}`}
                    >
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>

                    {/* Text & Icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1 pr-3">
                        <h3 className="text-[18px] font-bold text-[#111827] leading-tight tracking-wide">
                          {leader.name}
                        </h3>
                        <p className="text-[14px] font-medium text-green">
                          {leader.role}
                        </p>
                      </div>

                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all duration-300 shadow-sm"
                        aria-label={`LinkedIn profile of ${leader.name}`}
                      >
                        <FaLinkedinIn size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-2 mt-8">
            {leaders.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  idx === currentIndex ? "bg-green" : "bg-[#EFEFEF]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
