"use client";
import {
  FaBehance,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { TbBrandFiverr } from "react-icons/tb";
import { FaUpwork } from "react-icons/fa6";
import { RiArrowRightLongLine } from "react-icons/ri";
import LiveLocation from "./LiveLocation";
import { Input } from "../ui/input";
import { trackEvent } from "@/lib/ga";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#161616] text-white rounded-t-[25px] pt-16 pb-8 overflow-hidden font-jakarta">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-0">
        {/* Main Footer columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-12">
          {/* Column 1: Contact Us (Spans 3 cols on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-2xl font-bold tracking-wide">Contact Us</h4>

            <div className="space-y-4">
              {/* Phone item */}
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 bg-[#2C2C2C] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.622l1.018-1.019a1.71 1.71 0 012.418 0l2.418 2.418a1.71 1.71 0 010 2.418L7.092 11.45a11.106 11.106 0 005.457 5.457l1.019-1.018a1.71 1.71 0 012.418 0l2.418 2.418a1.71 1.71 0 010 2.418l-1.019 1.018a1.71 1.71 0 01-2.418 0l-1.019-1.019a19.462 19.462 0 01-5.457-5.457L3.269 8.35a1.71 1.71 0 010-2.418z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 font-medium leading-[15px]">
                    Phone
                  </span>
                  <a
                    href="tel:+923344447957"
                    className="text-sm font-medium leading-[18px] hover:text-[#0CBF83] transition-colors"
                  >
                    +923344447957
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 bg-[#2C2C2C] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 font-medium leading-[15px]">
                    Email
                  </span>
                  <a
                    href="mailto:contact@softmindsol.com"
                    onClick={() =>
                      trackEvent("email_click", { location: "footer" })
                    }
                    className="text-sm font-medium leading-[18px] hover:text-[#0CBF83] transition-colors break-all"
                  >
                    contact@softmindsol.com
                  </a>
                </div>
              </div>

              {/* Location items */}
              <LiveLocation
                city="Lahore City"
                country="Pakistan"
                timezone="Asia/Karachi"
                subtext="UTC Primary location"
              />
              <LiveLocation
                city="Sharjah"
                country="United Arab Emirates"
                timezone="Asia/Dubai"
                subtext="GMT+4"
              />
            </div>
          </div>

          {/* Column 2: Quick Link (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-2xl font-bold tracking-wide">Quick Link</h4>
            <ul className="space-y-3.5">
              {[
                {
                  name: "HealthTech & Fitness",
                  path: "/industries/healthtech",
                },
                { name: "FinTech", path: "/industries/fintech" },
                { name: "Proptech", path: "/industries/proptech" },
                { name: "EdTech", path: "/industries/edtech" },
                { name: "E-commerce", path: "/industries/ecommerce" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-base text-white/90 hover:text-[#0CBF83] transition-colors font-normal leading-[20px]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Spans 3 cols on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-2xl font-bold tracking-wide">Services</h4>
            <ul className="space-y-3.5">
              {[
                {
                  name: "AI SaaS Development",
                  path: "/services/ai-saas-development",
                },
                {
                  name: "Custom Software Development",
                  path: "/services/custom-software-development",
                },
                {
                  name: "Web App Development",
                  path: "/services/web-app-development",
                },
                {
                  name: "Mobile App Development",
                  path: "/services/mobile-app-development",
                },
                { name: "MVP Development", path: "/services/mvp-development" },
                {
                  name: "Offshore Software Testing",
                  path: "/services/software-testing",
                },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-base text-white/90 hover:text-[#0CBF83] transition-colors font-normal leading-[20px] line-clamp-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Input and Social Media (Spans 4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-2xl font-bold tracking-wide">Newletters</h4>

            <p className="text-base text-white/90 font-normal leading-[20px]">
              Stay in the know with our latest updates and exclusive offers, by
              subscribing to our newsletter for a direct line to all things
              exciting!
            </p>

            {/* Premium Newsletter input */}
            <div className="relative flex items-center w-full max-w-[380px]">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-[56px] w-full bg-white/[0.04] border-white/10 text-white placeholder:text-white/40 focus-visible:border-[#0CBF83] focus-visible:ring-[#0CBF83]/20 pl-4 pr-[120px] rounded-xl shadow-inner backdrop-blur-sm transition-all duration-300"
              />
              <button className="group absolute right-1.5 top-1.5 bottom-1.5 bg-[#0CBF83] text-white hover:bg-[#0aa672] transition-all duration-300 rounded-[8px] px-4 flex items-center gap-1.5 text-sm font-bold shadow-[0_0_15px_rgba(12,191,131,0.25)] hover:shadow-[0_0_20px_rgba(12,191,131,0.4)]">
                <span>Subscribe</span>
                <RiArrowRightLongLine
                  className="mt-[1px] group-hover:translate-x-1 transition-transform duration-300"
                  size={18}
                />
              </button>
            </div>

            {/* Social media badges */}
            <div className="flex items-center gap-3.5 pt-2">
              {/* Upwork */}
              <a
                href="https://www.fiverr.com/sellers/bilalbhatti139"
                target="_blank"
                onClick={() =>
                  trackEvent("outbound_profile_click", {
                    platform: "upwork",
                    location: "footer",
                  })
                }
                className="w-[28px] h-[28px] bg-white/5 hover:bg-white hover:text-dark border border-white/10 rounded-sm flex items-center justify-center transition-colors"
              >
                <FaUpwork className="size-4.5 pt-0.5" />
              </a>
              {/* Fiverr */}
              <a
                href="https://www.fiverr.com/sellers/bilalbhatti139"
                target="_blank"
                onClick={() =>
                  trackEvent("outbound_profile_click", {
                    platform: "fiverr",
                    location: "footer",
                  })
                }
                className="w-[28px] h-[28px] bg-white/5 hover:bg-green border border-white/10 rounded-sm flex items-center justify-center transition-colors"
              >
                <TbBrandFiverr className="size-4.5" />
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/softmindsol"
                target="_blank"
                className="w-[28px] h-[28px] bg-white/5 hover:bg-[#1152D1] border border-white/10 rounded-sm flex items-center justify-center transition-colors"
              >
                <FaFacebookF />
              </a>
              {/* Behance stylized logo */}
              <a
                href="https://www.behance.net/softmindsol"
                target="_blank"
                className="w-[28px] h-[28px] bg-white/5 hover:bg-[#1152D1] border border-white/10 rounded-sm flex items-center justify-center transition-colors text-white font-bold text-xs select-none"
              >
                <FaBehance className="size-4" />
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/softmindsol"
                target="_blank"
                className="w-[28px] h-[28px] bg-white/5 hover:bg-[#1152D1] border border-white/10 rounded-sm flex items-center justify-center transition-colors"
              >
                <FaLinkedinIn className="size-4" />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/softmindsol"
                target="_blank"
                className="w-[28px] h-[28px] bg-white/5 hover:bg-gradient-to-br from-[#6429D2] via-[#D6314F] to-[#F7BA5C] border border-white/10 rounded-sm flex items-center justify-center transition-colors hover:border-none"
              >
                <FaInstagram className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider and Copyright bottom section */}
        <div className="border-t border-white/20 pt-6 mt-12 flex flex-col items-center">
          <p className="text-xs text-white/80 font-medium text-center">
            Copyright @2026 SoftMind Solutions All Right Reserve.
          </p>
        </div>
      </div>
    </footer>
  );
}
