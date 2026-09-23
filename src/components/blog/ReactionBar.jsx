"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Heart, ThumbsUp, Lightbulb, PartyPopper, Rocket } from "lucide-react";

const REACTIONS = [
  { id: "like", label: "Like", emoji: "👍", Icon: ThumbsUp, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { id: "love", label: "Love", emoji: "❤️", Icon: Heart, color: "text-rose-600 bg-rose-50 border-rose-200" },
  { id: "insightful", label: "Insightful", emoji: "💡", Icon: Lightbulb, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { id: "celebrate", label: "Celebrate", emoji: "🎉", Icon: PartyPopper, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { id: "rocket", label: "Rocket", emoji: "🚀", Icon: Rocket, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
];

export default function ReactionBar({ slug = "blog-detail" }) {
  const [counts, setCounts] = useState({
    like: 14,
    love: 9,
    insightful: 23,
    celebrate: 6,
    rocket: 18,
  });
  const [userReactions, setUserReactions] = useState({});
  const [animatingId, setAnimatingId] = useState(null);

  // Load reaction counts and active user states from localStorage
  useEffect(() => {
    if (!slug) return;

    // Load active state from localStorage
    try {
      const stored = localStorage.getItem(`softmind_reactions_${slug}`);
      if (stored) {
        setUserReactions(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not read localStorage for reactions", e);
    }

    // Fetch live counts from API (Supabase)
    fetch(`/api/reactions?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.counts) {
          setCounts((prev) => ({ ...prev, ...data.counts }));
        }
      })
      .catch((err) => console.warn("Failed to fetch reactions", err));
  }, [slug]);

  const handleToggleReaction = async (reactionId) => {
    const isCurrentlyActive = !!userReactions[reactionId];
    const delta = isCurrentlyActive ? -1 : 1;

    // Trigger bounce animation
    setAnimatingId(reactionId);
    setTimeout(() => setAnimatingId(null), 400);

    // Optimistic UI updates
    const updatedUserReactions = {
      ...userReactions,
      [reactionId]: !isCurrentlyActive,
    };
    setUserReactions(updatedUserReactions);

    setCounts((prev) => ({
      ...prev,
      [reactionId]: Math.max(0, (prev[reactionId] || 0) + delta),
    }));

    // Save to localStorage
    try {
      localStorage.setItem(
        `softmind_reactions_${slug}`,
        JSON.stringify(updatedUserReactions)
      );
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    // Sync to Supabase via API route
    try {
      await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, reactionType: reactionId, delta }),
      });
    } catch (err) {
      console.warn("Reaction sync error:", err);
    }
  };

  const totalReactions = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <section className="w-full my-12 font-jakarta" aria-label="Article reactions">
      <div className="bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-gray-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-navy flex items-center gap-2">
              <span>What did you think of this article?</span>
              <Sparkles className="w-4 h-4 text-green" />
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Let us know your thoughts · {totalReactions} readers reacted
            </p>
          </div>

          <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 shadow-xs">
            SoftMind Reactions
          </span>
        </div>

        {/* Reaction Buttons Grid / Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {REACTIONS.map((item) => {
            const isActive = !!userReactions[item.id];
            const isBouncing = animatingId === item.id;
            const count = counts[item.id] || 0;

            return (
              <button
                key={item.id}
                onClick={() => handleToggleReaction(item.id)}
                className={`group flex items-center justify-center gap-2.5 px-3.5 py-3 rounded-xl border font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? `${item.color} shadow-sm font-bold scale-102 ring-2 ring-offset-1 ring-green/20`
                    : "bg-white hover:bg-gray-50/80 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-xs"
                } ${isBouncing ? "scale-115 transition-transform" : ""}`}
              >
                <span className="text-xl leading-none group-hover:scale-120 transition-transform duration-200">
                  {item.emoji}
                </span>
                <span className="font-semibold text-xs sm:text-sm">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
