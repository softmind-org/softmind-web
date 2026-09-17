"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { SoftMindSolLogo } from "../../../public/images";

const defaultBlogPosts = [
  {
    id: 1,
    title: "The Future of AI in Modern Businesses",
    description:
      "Discover how AI is transforming workflows, automating operations, and helping businesses scale smarter and faster.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
    time: "2:30 PM - 4:40Pm",
    outcomes: "Outcomes",
    slug: "blog-detail", // Used 'blog-detail' to match user's explicit request
  },
  {
    id: 2,
    title: "How Technology is Reshaping Real Estate",
    description:
      "From smart property management to digital tenant experiences, explore the future of modern real estate solutions.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
    time: "2:30 PM - 4:40Pm",
    outcomes: "Outcomes",
    slug: "reshaping-real-estate",
  },
  {
    id: 3,
    title: "Health Tech Insights & Innovations",
    description:
      "Explore the latest insights, trends, and innovations in AI, telehealth, digital health, and healthcare technology.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&w=400&q=80",
    time: "2:30 PM - 4:40Pm",
    outcomes: "Outcomes",
    slug: "health-tech-insights",
  },
  {
    id: 4,
    title: "EdTech Trends & Insights",
    description:
      "Expert perspectives, industry updates, and innovative ideas shaping the future of learning and educational technology.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
    time: "2:30 PM - 4:40Pm",
    outcomes: "Outcomes",
    slug: "edtech-trends",
  },
  {
    id: 5,
    title: "FinTech Trends & Insights",
    description:
      "Expert analysis, industry updates, and innovative ideas shaping the future of finance and financial technology.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    time: "2:30 PM - 4:40Pm",
    outcomes: "Outcomes",
    slug: "fintech-trends",
  },
  {
    id: 6,
    title: "How Technology is Reshaping Retail",
    description:
      "From smart inventory management to digital customer experiences, explore the future of modern retail solutions.",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80",
    time: "2:30 PM - 4:40Pm",
    outcomes: "Outcomes",
    slug: "reshaping-retail",
  },
];

export default function OurBlogs({ initialPosts }) {
  const postsToDisplay = initialPosts && initialPosts.length > 0 ? initialPosts : defaultBlogPosts;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      let newItemsPerView = 3;
      if (window.innerWidth < 768) newItemsPerView = 1;
      else if (window.innerWidth < 1024) newItemsPerView = 2;

      setItemsPerView(newItemsPerView);
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, postsToDisplay.length - newItemsPerView)),
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [postsToDisplay.length]);

  const maxIndex = Math.max(0, postsToDisplay.length - itemsPerView);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex, isMounted]);

  return (
    <section className="relative w-full bg-[#161616] py-16 md:py-24 text-dark overflow-hidden font-jakarta">
      {/* Background Radial Glow */}
      <div
        className="absolute top-[-187px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full pointer-events-none opacity-40 blur-[130px]"
        style={{ backgroundColor: "navy" }}
      />
      <div className="absolute select-none pointer-events-none">
        <Image
          src={SoftMindSolLogo}
          alt="SoftMindSol Logo"
          className="object-cover max-h-[726px]"
        />
      </div>

      <div className="relative mx-auto px-4 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3.5 text-center mb-12 md:mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[linear-gradient(104.04deg,#00235A_8.33%,#004BC0_93.33%)]" />
            <span className="text-green text-[22px] font-bold tracking-wide">
              Blog
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] lg:leading-[58px] font-bold tracking-wide text-white max-w-[750px]">
            Real Task Real Result
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-medium leading-[24px] tracking-wide max-w-[600px] mt-2">
            Discover insights, trends, and practical tips designed to help you
            stay ahead. Our blog covers everything from industry updates to
            actionable strategies written to inform, inspire, and support your
            journey.
          </p>
        </div>

        {/* Blogs Carousel */}
        <div className="relative z-10 w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {postsToDisplay.map((blog) => (
              <div
                key={blog.id}
                className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3"
                style={{ width: isMounted ? `${100 / itemsPerView}%` : "100%" }}
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group relative flex flex-col p-4 bg-black/20 rounded-[12.345px] border border-white/5 overflow-hidden transition-all duration-300 hover:bg-black/30 hover:border-white/10 h-full"
                >
                  {/* Internal Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#002545] rounded-full pointer-events-none opacity-60 blur-[40px] z-0" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative w-full aspect-[371/242] mb-[16px] overflow-hidden rounded-[12.345px] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col gap-[16.46px] flex-grow">
                      {/* Stars */}
                      <div className="flex items-center gap-[8.54px]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={19.22}
                            className="fill-[#FFBF00] text-[#FFBF00]"
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-[16.46px] flex-grow">
                        <h3 className="text-white text-[18px] font-semibold leading-[23px]">
                          {blog.title}
                        </h3>
                        <p className="text-[#C9CBCF] text-[16px] font-medium leading-[20px]">
                          {blog.description}
                        </p>
                      </div>

                      {/* Outcomes */}
                      <div className="flex flex-col gap-[14.95px] mt-1 shrink-0">
                        <h4 className="text-white text-[18px] font-semibold leading-[23px]">
                          {blog.outcomes}
                        </h4>
                        <div className="flex items-center gap-[8.54px]">
                          <Clock size={19.22} className="text-white" />
                          <span className="text-white text-[16px] font-medium leading-[20px]">
                            {blog.time}
                          </span>
                        </div>
                        {/* <SummarizeButton content={`${blog.title}\n\n${blog.description}`} theme="dark" /> */}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination */}
        {isMounted && maxIndex > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8 relative z-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  currentIndex === idx ? "bg-[#0CBF83]" : "bg-[#333333]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
