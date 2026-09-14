"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Menu, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  LuCode,
  LuPenTool,
  LuUsers,
  LuBriefcase,
  LuHeart,
  LuHouse,
  LuCreditCard,
  LuGraduationCap,
  LuShoppingCart,
  LuMonitor,
  LuSun,
  LuSmartphone,
  LuGlobe,
  LuZap,
  LuClipboardCheck,
  LuSearch,
  LuLayoutGrid,
  LuUserPlus,
  LuFileText,
  LuPhoneCall,
} from "react-icons/lu";
import { NAV_ITEMS } from "./Navbar.constants";
import { Logo } from "../../../public/images";
import CustomButton from "../customs/customButton";
import { trackEvent } from "@/lib/ga";

// ─── Services Mega-menu data ───────────────────────────────────────────────
const SERVICES_MEGA_MENU = [
  {
    category: "Development Services",
    icon: <LuCode size={18} strokeWidth={2} />,
    viewAllLabel: "View all Development Services",
    viewAllHref: "/services/development",
    items: [
      {
        label: "AI SaaS Development",
        // desc: "Build intelligent, scalable and secure AI-powered SaaS products.",
        href: "/services/ai-saas-development",
      },
      {
        label: "Custom Software Development",
        // desc: "End-to-end custom software solutions tailored to your business needs.",
        href: "/services/custom-software-development",
      },
      {
        label: "Mobile App Development",
        // desc: "High-performance mobile apps for iOS and Android platforms.",
        href: "/services/mobile-app-development",
      },
      {
        label: "Web Application Development",
        // desc: "Modern, responsive and scalable web applications.",
        href: "/services/web-app-development",
      },
      {
        label: "MVP Development",
        // desc: "Validate your idea quickly with a lean and powerful MVP.",
        href: "/services/mvp-development",
      },
      {
        label: "Offshore Software Testing",
        // desc: "Enhance product quality with expert offshore software testing services.",
        href: "/services/software-testing",
      },
    ],
  },
  {
    category: "Product & Design Services",
    icon: <LuPenTool size={18} strokeWidth={2} />,
    viewAllLabel: "View all Product & Design Services",
    viewAllHref: "/services/design",
    items: [
      {
        label: "Product Design (UX/UI)",
        // desc: "User-centric design that creates intuitive and delightful experiences.",
        href: "/services/product-design",
      },
      {
        label: "Product Development",
        // desc: "In-depth research and strategy to build products users truly need.",
        href: "/services/product-development",
      },
      // {
      //   label: "Design Systems",
      //   desc: "Scalable design systems for consistency and faster development.",
      //   href: "/services/design-systems",
      // },
    ],
  },
  {
    category: "Team & Engagement Services",
    icon: <LuUsers size={18} strokeWidth={2} />,
    viewAllLabel: "View all Team & Engagement Services",
    viewAllHref: "/services/team",
    items: [
      {
        label: "Dedicated Development Teams",
        // desc: "Hire dedicated developers to build your product like their own.",
        href: "/services/dedicated-development-teams",
      },
      {
        label: "Staff Augmentation",
        // desc: "Extend your team with pre-vetted experts and specialists.",
        href: "/services/staff-augmentation",
      },
      // {
      //   label: "Project-Based Engagement",
      //   desc: "Fixed scope, budget and timeline for defined project goals.",
      //   href: "/services/project-based",
      // },
      // {
      //   label: "Maintenance & Support",
      //   desc: "Ongoing support and maintenance to keep your product running smoothly.",
      //   href: "/services/maintenance",
      // },
    ],
  },
];

// ─── Industries Mega-menu data ─────────────────────────────────────────────
const INDUSTRIES_MEGA_MENU = {
  header: {
    label: "Industries We Serve",
    desc: "Domain-focused software solutions tailored to the unique challenges of your industry.",
    icon: <LuBriefcase size={20} strokeWidth={2} />,
  },
  industries: [
    {
      label: "HealthTech & Fitness",
      desc: "Digital solutions that improve patient care, streamline operations and ensure regulatory compliance.",
      href: "/industries/healthtech",
      icon: <LuHeart size={20} strokeWidth={1.75} />,
    },
    {
      label: "PropTech",
      desc: "Smart real estate technology solutions for buying, selling, managing and investing in properties.",
      href: "/industries/proptech",
      icon: <LuHouse size={20} strokeWidth={1.75} />,
    },
    {
      label: "FinTech",
      desc: "Secure, scalable fintech solutions that power digital banking, payments and financial services.",
      href: "/industries/fintech",
      icon: <LuCreditCard size={20} strokeWidth={1.75} />,
    },
    {
      label: "EdTech",
      desc: "Engaging digital learning platforms that enhance education outcomes and drive student success.",
      href: "/industries/edtech",
      icon: <LuGraduationCap size={20} strokeWidth={1.75} />,
    },
    {
      label: "E-Commerce",
      desc: "High-performance e-commerce platforms that increase conversions and scale your business.",
      href: "/industries/ecommerce",
      icon: <LuShoppingCart size={20} strokeWidth={1.75} />,
    },
    // {
    //   label: "AI Products",
    //   desc: "AI-powered applications and platforms that automate workflows and unlock new opportunities.",
    //   href: "/industries/ai-products",
    //   icon: (
    //     <svg
    //       width="20"
    //       height="20"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="1.75"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    //     </svg>
    //   ),
    // },
  ],
  // sidebar: {
  //   eyebrow: "Why SoftMind?",
  //   title: "Deep Industry Expertise.",
  //   titleAccent: "Real Impact.",
  //   desc: "We understand your industry challenges and build software solutions that drive measurable outcomes.",
  //   points: [
  //     "Domain expertise",
  //     "Regulatory understanding",
  //     "Scalable architecture",
  //     "Future-ready technology",
  //     "Long-term partnership",
  //   ],
  //   ctaLabel: "Discuss Your Industry Needs",
  //   ctaHref: "/contact",
  // },
};

// ─── Service icons ─────────────────────────────────────────────────────────
const ServiceIcon = ({ index, categoryIndex }) => {
  const icons = [
    [
      <LuMonitor key="ai" size={16} strokeWidth={2} />,
      <LuSun key="custom" size={16} strokeWidth={2} />,
      <LuSmartphone key="mobile" size={16} strokeWidth={2} />,
      <LuGlobe key="web" size={16} strokeWidth={2} />,
      <LuZap key="mvp" size={16} strokeWidth={2} />,
      <LuClipboardCheck key="testing" size={16} strokeWidth={2} />,
      <LuPenTool key="design" size={16} strokeWidth={2} />,
    ],
    [
      <LuPenTool key="design" size={16} strokeWidth={2} />,
      <LuSearch key="research" size={16} strokeWidth={2} />,
      <LuLayoutGrid key="ds" size={16} strokeWidth={2} />,
    ],
    [
      <LuUsers key="team" size={16} strokeWidth={2} />,
      <LuUserPlus key="staff" size={16} strokeWidth={2} />,
      <LuFileText key="project" size={16} strokeWidth={2} />,
      <LuPhoneCall key="support" size={16} strokeWidth={2} />,
    ],
  ];
  return icons[categoryIndex]?.[index] ?? null;
};

// ─── Shared dropdown transition classes ───────────────────────────────────
const dropdownTransition = (open) =>
  `absolute top-full mt-4 bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,35,90,0.16)] border border-gray-100 overflow-hidden transition-all duration-200 origin-top ${
    open
      ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
      : "opacity-0 scale-y-95 -translate-y-3 pointer-events-none"
  }`;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Track which desktop dropdown is open: null | "services" | "industries"
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);

  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const timerRef = useRef(null);

  const openDropdown = (name) => {
    clearTimeout(timerRef.current);
    setActiveDropdown(name);
  };

  const scheduleClose = () => {
    timerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target) &&
        industriesRef.current &&
        !industriesRef.current.contains(e.target)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Lock scroll on mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="sticky top-4 z-50 flex justify-center w-full px-4 sm:px-8 font-jakarta">
        <div className="flex items-center justify-between w-full bg-white/80 backdrop-blur-xl rounded-full px-4 py-2 shadow-[0_4px_30px_rgba(0,35,90,0.08)] border border-white/80 h-16 gap-3 xl:gap-8 transition-all duration-300">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src={Logo}
              alt="SoftMind Solutions Logo"
              className="h-8 xl:h-9 w-auto"
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-0 xl:gap-1">
            {NAV_ITEMS.map((item) => {
              // ── Services dropdown ──────────────────────────────────────
              if (item.hasDropdown && item.dropdownType === "services") {
                const isOpen = activeDropdown === "services";
                return (
                  <div
                    key={item.label}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => openDropdown("services")}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      className={`flex items-center gap-1 xl:gap-1.5 px-3 py-2 xl:px-5 xl:py-2.5 rounded-full text-[13.5px] xl:text-[15px] font-semibold transition-all duration-200 whitespace-nowrap ${isOpen ? "text-green bg-green/5" : "text-dark hover:text-green hover:bg-green/5"}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-green" : ""}`}
                      />
                    </button>

                    <div
                      className={`${dropdownTransition(isOpen)} left-1/2 -translate-x-1/2 w-[670px] p-4`}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {/* Left Column: Development Services */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3 px-2 pt-2 pb-3 mb-2 border-b border-gray-100/80">
                            <div className="flex items-center justify-center text-green bg-green/10 w-8 h-8 rounded-lg shadow-sm shrink-0">
                              {SERVICES_MEGA_MENU[0].icon}
                            </div>
                            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-gray-800">
                              {SERVICES_MEGA_MENU[0].category}
                            </p>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            {SERVICES_MEGA_MENU[0].items.map((service, idx) => (
                              <Link
                                key={service.label}
                                href={service.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-green/[0.04] border border-transparent hover:border-green/10"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gray-50/50 border border-gray-100 group-hover:border-green/20 flex items-center justify-center transition-all duration-300 text-gray-500 group-hover:text-green group-hover:bg-white group-hover:shadow-[0_4px_12px_rgba(0,186,117,0.12)]">
                                  <ServiceIcon index={idx} categoryIndex={0} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[13px] font-bold text-gray-900 group-hover:text-green transition-colors duration-200">
                                      {service.label}
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 text-green opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                                  </div>
                                  {service.desc && (
                                    <p className="text-[11.5px] text-gray-500 leading-relaxed line-clamp-2 mt-1">
                                      {service.desc}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Right Column: Other Services Stacked */}
                        <div className="flex flex-col gap-6">
                          {SERVICES_MEGA_MENU.slice(1).map(
                            (categoryData, catIdx) => (
                              <div
                                key={categoryData.category}
                                className="flex flex-col"
                              >
                                <div className="flex items-center gap-3 px-2 pt-2 pb-3 mb-2 border-b border-gray-100/80">
                                  <div className="flex items-center justify-center text-green bg-green/10 w-8 h-8 rounded-lg shadow-sm shrink-0">
                                    {categoryData.icon}
                                  </div>
                                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-gray-800">
                                    {categoryData.category}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  {categoryData.items.map((service, idx) => (
                                    <Link
                                      key={service.label}
                                      href={service.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="group flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-green/[0.04] border border-transparent hover:border-green/10"
                                    >
                                      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gray-50/50 border border-gray-100 group-hover:border-green/20 flex items-center justify-center transition-all duration-300 text-gray-500 group-hover:text-green group-hover:bg-white group-hover:shadow-[0_4px_12px_rgba(0,186,117,0.12)]">
                                        <ServiceIcon
                                          index={idx}
                                          categoryIndex={catIdx + 1}
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                          <span className="text-[13px] font-bold text-gray-900 group-hover:text-green transition-colors duration-200">
                                            {service.label}
                                          </span>
                                          <ArrowRight className="w-3.5 h-3.5 text-green opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                                        </div>
                                        {service.desc && (
                                          <p className="text-[11.5px] text-gray-500 leading-relaxed line-clamp-2 mt-1">
                                            {service.desc}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // ── Industries dropdown ────────────────────────────────────
              if (item.hasDropdown && item.dropdownType === "industries") {
                const isOpen = activeDropdown === "industries";
                const { header, industries, sidebar } = INDUSTRIES_MEGA_MENU;
                return (
                  <div
                    key={item.label}
                    ref={industriesRef}
                    className="relative"
                    onMouseEnter={() => openDropdown("industries")}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      className={`flex items-center gap-1 xl:gap-1.5 px-3 py-2 xl:px-5 xl:py-2.5 rounded-full text-[13.5px] xl:text-[15px] font-semibold transition-all duration-200 whitespace-nowrap ${isOpen ? "text-green bg-green/5" : "text-dark hover:text-green hover:bg-green/5"}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-green" : ""}`}
                      />
                    </button>

                    <div
                      className={`${dropdownTransition(isOpen)} left-1/2 -translate-x-1/2 w-[680px] p-3`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 px-3 pt-2 pb-4 mb-2 border-b border-gray-100/80">
                          <div className="flex items-center justify-center text-green bg-green/10 w-8 h-8 rounded-lg shadow-sm">
                            {header.icon}
                          </div>
                          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-gray-800">
                            {header.label}
                          </p>
                        </div>

                        <div
                          className="grid grid-flow-col auto-cols-fr gap-x-2 gap-y-1"
                          style={{
                            gridTemplateRows: `repeat(${Math.ceil(industries.length / 2)}, minmax(0, 1fr))`,
                          }}
                        >
                          {industries.map((industry, idx) => (
                            <Link
                              key={industry.label}
                              href={industry.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3.5 p-3 rounded-xl transition-all duration-200 hover:bg-green/[0.04] border border-transparent hover:border-green/10 h-full"
                            >
                              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-50/50 border border-gray-100 group-hover:border-green/20 flex items-center justify-center transition-all duration-300 text-gray-500 group-hover:text-green group-hover:bg-white group-hover:shadow-[0_4px_12px_rgba(0,186,117,0.12)] mt-0.5">
                                {industry.icon}
                              </div>
                              <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="text-[13px] font-bold text-gray-900 group-hover:text-green transition-colors duration-200">
                                    {industry.label}
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 text-green opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                                </div>
                                <p className="text-[11.5px] text-gray-500 leading-relaxed line-clamp-2">
                                  {industry.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // ── Regular nav link ───────────────────────────────────────
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 xl:px-5 xl:py-2.5 rounded-full text-[13.5px] xl:text-[15px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-green"
                      : "text-dark hover:text-green hover:bg-green/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* ── CTA Button (Desktop) ── */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link href="/contact-us">
              <CustomButton btnText="Book a Free Discovery Call" />
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-navy/5 hover:bg-navy/10 text-navy transition-all duration-200 active:scale-95 shrink-0"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════
          Mobile Drawer
      ════════════════════════════════════════════════════════════════ */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-navy/30 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute mx-4 sm:mx-8 top-20 left-0 right-0 rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,35,90,0.18)] border border-gray-100 font-jakarta overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}
          style={{ overflowY: "auto" }}
        >
          <div className="flex flex-col px-4 py-6 gap-1">
            {NAV_ITEMS.map((item, idx) => {
              // ── Mobile Services ──────────────────────────────────────
              if (item.hasDropdown && item.dropdownType === "services") {
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() => setMobileServicesOpen((p) => !p)}
                      className="flex items-center justify-between w-full px-4 py-3 text-[15px] font-bold text-dark transition-all hover:text-green hover:bg-green/5 rounded-xl"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-green transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="ml-2 pl-3 border-l-2 border-green/20 mt-1 flex flex-col gap-4">
                        {SERVICES_MEGA_MENU.map((categoryData, catIdx) => (
                          <div
                            key={categoryData.category}
                            className="flex flex-col gap-0.5"
                          >
                            <div className="px-3 py-1 mb-1">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-green">
                                {categoryData.category}
                              </p>
                            </div>
                            {categoryData.items.map((service, sIdx) => (
                              <Link
                                key={service.label}
                                href={service.href}
                                onClick={() => setMobileOpen(false)}
                                className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-green/5 transition-all duration-150 my-0.5"
                              >
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-green/10 flex items-center justify-center transition-colors duration-150 text-gray-400 group-hover:text-green mt-0.5">
                                  <ServiceIcon
                                    index={sIdx}
                                    categoryIndex={catIdx}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-semibold text-dark group-hover:text-green transition-colors duration-150 leading-tight">
                                    {service.label}
                                  </p>
                                  {service.desc && (
                                    <p className="text-[11.5px] text-gray-400 mt-0.5 leading-snug">
                                      {service.desc}
                                    </p>
                                  )}
                                </div>
                                <ArrowRight className="w-3 h-3 text-green opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 mt-1" />
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // ── Mobile Industries ────────────────────────────────────
              if (item.hasDropdown && item.dropdownType === "industries") {
                const { industries, sidebar } = INDUSTRIES_MEGA_MENU;
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() => setMobileIndustriesOpen((p) => !p)}
                      className="flex items-center justify-between w-full px-4 py-3 text-[15px] font-bold text-dark transition-all hover:text-green hover:bg-green/5 rounded-xl"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-green transition-transform duration-300 ${mobileIndustriesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileIndustriesOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {/* Industry items */}
                      <div className="ml-2 pl-3 border-l-2 border-green/20 mt-1 flex flex-col gap-0.5">
                        {industries.map((industry) => (
                          <Link
                            key={industry.label}
                            href={industry.href}
                            onClick={() => setMobileOpen(false)}
                            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green/5 transition-all duration-150"
                          >
                            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-green/10 flex items-center justify-center transition-colors duration-150 text-gray-400 group-hover:text-green mt-0.5">
                              {industry.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold text-dark group-hover:text-green transition-colors duration-150 leading-tight">
                                {industry.label}
                              </p>
                              {/* <p className="text-[11.5px] text-gray-400 mt-0.5 leading-snug">
                                {industry.desc}
                              </p> */}
                            </div>
                            <ArrowRight className="w-3 h-3 text-green opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 mt-1" />
                          </Link>
                        ))}
                      </div>

                      {/* Mobile sidebar summary card */}
                      {/* <div className="mx-2 mt-3 mb-1 p-4 rounded-xl bg-gradient-to-br from-green/5 to-green/10 border border-green/15">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-green mb-1">
                          {sidebar.eyebrow}
                        </p>
                        <p className="text-[14px] font-bold text-dark leading-snug mb-1">
                          {sidebar.title}{" "}
                          <span className="text-green italic">
                            {sidebar.titleAccent}
                          </span>
                        </p>
                        <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
                          {sidebar.desc}
                        </p>
                        <Link
                          href={sidebar.ctaHref}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-center gap-2 bg-green text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-green/90 transition-colors duration-200"
                        >
                          {sidebar.ctaLabel}{" "}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div> */}
                    </div>
                  </div>
                );
              }

              // ── Regular mobile link ──────────────────────────────────
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-[15px] font-bold transition-all duration-200 ${
                    isActive
                      ? "text-green bg-green/5"
                      : "text-dark hover:text-green hover:bg-green/5"
                  }`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* CTA */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/contact-us"
                onClick={() =>
                  trackEvent("book_meeting_click", {
                    location: "navbar_mobile",
                    label: "book_free_discovery_call",
                  })
                }
              >
                <CustomButton btnText="Book a Free Discovery Call" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
