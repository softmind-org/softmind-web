"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, ListOrdered, Sparkles, X, Menu } from "lucide-react";
import SummarizeButton from "@/components/blogsComponents/summarizeButton";

export default function TableOfContents({ items = [], fullContent = "" }) {
  const [activeId, setActiveId] = useState("");
  const [collapsedSections, setCollapsedSections] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // IntersectionObserver to highlight currently visible heading
  useEffect(() => {
    if (!items || items.length === 0) return;

    // Collect all heading element IDs
    const headingIds = [];
    items.forEach((item) => {
      headingIds.push(item.id);
      if (item.subItems) {
        item.subItems.forEach((sub) => headingIds.push(sub.id));
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-90px 0% -65% 0%",
        threshold: 0.1,
      }
    );

    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const toggleCollapse = (id, e) => {
    e.stopPropagation();
    setCollapsedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setMobileOpen(false);
    }
  };

  if (!items || items.length === 0) return null;

  const contentList = (
    <nav aria-label="Table of Contents" className="space-y-1 text-[14px]">
      {items.map((item, index) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isCollapsed = !!collapsedSections[item.id];
        const isParentActive =
          activeId === item.id ||
          (hasSubItems && item.subItems.some((s) => s.id === activeId));

        return (
          <div key={item.id || index} className="group flex flex-col py-1">
            <div className="flex items-start justify-between gap-2">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`flex-1 text-left font-medium transition-colors duration-200 leading-snug ${
                  activeId === item.id
                    ? "text-[#0B63BD] font-bold"
                    : isParentActive
                    ? "text-navy font-semibold"
                    : "text-gray-600 hover:text-navy"
                }`}
              >
                {item.title}
              </a>

              {hasSubItems && (
                <button
                  onClick={(e) => toggleCollapse(item.id, e)}
                  aria-label={isCollapsed ? "Expand section" : "Collapse section"}
                  className="p-1 text-gray-400 hover:text-navy transition-colors shrink-0"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCollapsed ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Nested Sub-items (H3s) */}
            {hasSubItems && !isCollapsed && (
              <div className="pl-3.5 mt-2 space-y-2 border-l border-gray-200 ml-1">
                {item.subItems.map((sub, sIdx) => {
                  const isSubActive = activeId === sub.id;
                  return (
                    <a
                      key={sub.id || sIdx}
                      href={`#${sub.id}`}
                      onClick={(e) => handleScrollTo(e, sub.id)}
                      className={`block text-xs sm:text-[13px] leading-snug transition-colors duration-200 ${
                        isSubActive
                          ? "text-[#0B63BD] font-bold translate-x-1"
                          : "text-gray-500 hover:text-navy hover:translate-x-0.5"
                      }`}
                    >
                      <span className="text-gray-400 mr-1.5 font-mono text-[11px]">
                        {index + 1}.{sIdx + 1}
                      </span>
                      {sub.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sticky Left Sidebar (matching Arbisoft reference) */}
      <aside className="hidden lg:block w-[240px] xl:w-[270px] shrink-0 font-jakarta">
        <div className="sticky top-28 space-y-6">
          {/* Summarize with AI button placed prominent at the top */}
          <div className="w-full">
            <SummarizeButton content={fullContent} theme="light" />
          </div>

          {/* Table Of Contents Card */}
          <div className="w-full pt-2">
            <div className="border-b border-gray-200 pb-3 mb-4">
              <h3 className="text-lg font-bold text-navy tracking-tight">
                Table Of Content
              </h3>
            </div>

            {contentList}
          </div>
        </div>
      </aside>

      {/* Mobile Floating Drawer Button & Accordion */}
      <div className="block lg:hidden w-full mb-8 font-jakarta">
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center gap-2 text-navy font-bold text-[15px] focus:outline-none"
            >
              <ListOrdered className="w-4 h-4 text-green" />
              <span>Table of Contents</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  mobileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="scale-90 origin-right">
              <SummarizeButton content={fullContent} theme="light" />
            </div>
          </div>

          {/* Collapsible Mobile TOC Accordion */}
          {mobileOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200 max-h-[350px] overflow-y-auto">
              {contentList}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
