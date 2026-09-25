"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";

export default function SummarizeButton({ content, theme = "dark" }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (summary) {
      setIsOpen(!isOpen);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to summarize.");
      }

      setSummary(data.summary);
      setIsOpen(true);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="w-full flex flex-col gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
      <Button
        onClick={handleSummarize}
        disabled={loading}
        className={`w-full sm:w-auto self-start flex items-center gap-2 rounded-full font-jakarta font-semibold transition-all duration-300 px-5 py-2.5 h-auto ${
          isDark 
            ? "bg-white/10 hover:bg-white/20 text-white border border-white/10" 
            : "bg-navy hover:bg-navy/90 text-white shadow-md"
        }`}
      >
        <Sparkles size={16} className={isDark ? "text-green" : "text-green"} />
        {loading ? "Summarizing..." : summary ? (isOpen ? "Hide Summary" : "Summarized") : "Summarize"}
        {summary && (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </Button>

      {error && (
        <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
      )}

      {summary && isOpen && (
        <div 
          className={`p-5 rounded-2xl border transition-all duration-500 ease-in-out ${
            isDark
              ? "bg-black/30 border-white/10 text-gray-300"
              : "bg-white border-gray-200 text-gray-700 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-green" />
            <span className={`font-bold text-[15px] ${isDark ? "text-white" : "text-navy"}`}>
              AI Summary
            </span>
          </div>
          <p className="text-[15px] leading-relaxed font-medium">
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}
