"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Mail, Send } from "lucide-react";

const SOLUTIONS_LINKS = [
  { label: "AI & ML Solutions", href: "/services" },
  { label: "Data Solutions", href: "/services" },
  { label: "Odoo & ERP Solutions", href: "/services" },
  { label: "Databricks & Cloud", href: "/services" },
  { label: "eCommerce Development", href: "/services" },
  { label: "Agentic AI & LLMs", href: "/services" },
];

const SERVICES_LINKS = [
  { label: "Dedicated Engineers", href: "/services" },
  { label: "Custom SaaS Development", href: "/services" },
  { label: "Mobile App Development", href: "/services" },
  { label: "UI/UX Product Design", href: "/services" },
  { label: "DevOps & Cloud Architecture", href: "/services" },
  { label: "Quality Assurance & Testing", href: "/services" },
];

export default function BlogSidebar() {
  const [activeTab, setActiveTab] = useState("solutions");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);

    // Simulate quick subscription
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 600);
  };

  const activeLinks =
    activeTab === "solutions" ? SOLUTIONS_LINKS : SERVICES_LINKS;

  return (
    <aside className="w-full lg:w-[260px] xl:w-[290px] shrink-0 font-jakarta space-y-8 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pl-1">
      {/* ── Tabbed Navigation Widget (Solutions / Services) ── */}
      <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-5 shadow-xs">
        {/* Tab Buttons */}
        <div className="flex rounded-xl bg-gray-200/70 p-1 mb-5">
          <button
            onClick={() => setActiveTab("solutions")}
            className={`flex-1 py-2 text-xs sm:text-[13px] font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "solutions"
                ? "bg-white text-navy shadow-xs"
                : "text-gray-500 hover:text-navy"
            }`}
          >
            Solutions
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 py-2 text-xs sm:text-[13px] font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-white text-navy shadow-xs"
                : "text-gray-500 hover:text-navy"
            }`}
          >
            Services
          </button>
        </div>

        {/* Tab Items */}
        <ul className="space-y-3 text-sm">
          {activeLinks.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className="group flex items-center justify-between text-gray-700 hover:text-[#0B63BD] font-medium py-1 transition-colors"
              >
                <span className="group-hover:underline underline-offset-2">
                  {item.label}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B63BD] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Newsletter Card (Matching reference design) ── */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs">
        <h3 className="text-lg font-bold text-navy tracking-tight mb-2">
          Newsletter
        </h3>
        <p className="text-xs sm:text-[13px] text-gray-600 font-medium leading-relaxed mb-4">
          Join us to stay connected with the global trends and technologies.
        </p>

        {subscribed ? (
          <div className="flex items-center gap-2 text-green font-semibold text-sm bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 text-sm font-jakarta placeholder:text-gray-400 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0070E0] hover:bg-[#005bb8] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs float-right"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <div className="clear-both" />
          </form>
        )}
      </div>
    </aside>
  );
}
