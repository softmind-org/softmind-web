"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Check } from "lucide-react";

const REACTIONS = [
  {
    id: "not_useful",
    label: "Not useful",
    emoji: "😞",
    activeClass:
      "bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-200/50 shadow-xs",
    hoverBorder: "hover:border-rose-300 hover:bg-rose-50/50",
  },
  {
    id: "okay",
    label: "It was okay",
    emoji: "😐",
    activeClass:
      "bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-200/50 shadow-xs",
    hoverBorder: "hover:border-amber-300 hover:bg-amber-50/50",
  },
  {
    id: "helpful",
    label: "Helpful",
    emoji: "🙂",
    activeClass:
      "bg-emerald-50 text-emerald-950 border-green ring-2 ring-green/25 shadow-xs font-semibold",
    hoverBorder: "hover:border-green hover:bg-emerald-50/40",
  },
  {
    id: "very_helpful",
    label: "Very helpful",
    emoji: "😍",
    activeClass:
      "bg-emerald-50 text-emerald-950 border-green ring-2 ring-green/30 shadow-xs font-semibold",
    hoverBorder: "hover:border-green hover:bg-emerald-50/40",
  },
];

export default function ReactionBar({ slug = "blog-detail" }) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [animatingId, setAnimatingId] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Read stored user reaction from localStorage
    try {
      const stored = localStorage.getItem(`softmind_reactions_${slug}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        const activeKey = Object.keys(parsed).find((k) => parsed[k] === true);
        if (activeKey) {
          setSelectedReaction(activeKey);
          setFeedbackSubmitted(true);
        }
      }
    } catch (e) {
      console.warn("Could not read localStorage for reactions", e);
    }
  }, [slug]);

  const handleSelectReaction = async (reactionId) => {
    const isSame = selectedReaction === reactionId;
    const previousReaction = selectedReaction;

    // Trigger micro-bounce
    setAnimatingId(reactionId);
    setTimeout(() => setAnimatingId(null), 350);

    const nextSelection = isSame ? null : reactionId;
    setSelectedReaction(nextSelection);
    setFeedbackSubmitted(!isSame);

    // Save to localStorage
    try {
      const storeObj = nextSelection ? { [nextSelection]: true } : {};
      localStorage.setItem(`softmind_reactions_${slug}`, JSON.stringify(storeObj));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    // Sync in background to Supabase
    try {
      if (previousReaction) {
        fetch("/api/reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, reactionType: previousReaction, delta: -1 }),
        });
      }
      if (nextSelection) {
        fetch("/api/reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, reactionType: nextSelection, delta: 1 }),
        });
      }
    } catch (err) {
      console.warn("Reaction sync error:", err);
    }
  };

  return (
    <section
      className="w-full my-8 font-jakarta"
      aria-label="Article feedback"
    >
      <div className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
          <h3 className="text-[15px] sm:text-base font-bold text-navy flex items-center gap-2">
            <span>How did you like this blog?</span>
            <Sparkles className="w-3.5 h-3.5 text-green" />
          </h3>

          {feedbackSubmitted && (
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              <Check className="w-3 h-3 text-green stroke-[3]" />
              Thanks for your feedback!
            </span>
          )}
        </div>

        {/* Compact Reaction Buttons: Only Emoji & Label */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {REACTIONS.map((item) => {
            const isSelected = selectedReaction === item.id;
            const isBouncing = animatingId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectReaction(item.id)}
                className={`group flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? `${item.activeClass} scale-[1.02]`
                    : `bg-white border-gray-200 text-gray-700 hover:text-navy ${item.hoverBorder} hover:shadow-xs`
                } ${isBouncing ? "scale-105 transition-transform" : ""}`}
              >
                <span className="text-lg leading-none transition-transform duration-200 group-hover:scale-115">
                  {item.emoji}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
