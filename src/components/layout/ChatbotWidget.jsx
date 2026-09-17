"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Trash2, Sparkles, ExternalLink, RefreshCw } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! 👋 I'm SoftMind's AI Assistant. How can I help you today with our AI SaaS solutions or services?",
      sources: [],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: "assistant", content: "", sources: [] },
    ]);

    try {
      // Build conversation history format for API
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get chat response");
      }

      // Parse sources from header if present
      let sources = [];
      const sourcesHeader = response.headers.get("X-Sources");
      if (sourcesHeader) {
        try {
          sources = JSON.parse(decodeURIComponent(sourcesHeader));
        } catch (e) {
          console.warn("Could not parse sources header", e);
        }
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // Handle SSE format from Gemini
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              const textSnippet = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
              assistantText += textSnippet;

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: assistantText, sources }
                    : msg
                )
              );
            } catch (err) {
              // Raw text chunk fallback
              assistantText += line.slice(6);
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: assistantText, sources }
                    : msg
                )
              );
            }
          } else if (line.trim() && !line.startsWith(":")) {
            assistantText += line;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? { ...msg, content: assistantText, sources }
                  : msg
              )
            );
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: "I apologize, but I encountered a temporary issue connecting. Please try asking again!",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! 👋 I'm SoftMind's AI Assistant. How can I help you today with our AI SaaS solutions or services?",
        sources: [],
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-jakarta">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-navy to-[#004BC0] text-white shadow-xl hover:scale-105 transition-all duration-300 border border-green/30"
          aria-label="Open AI Assistant Chat"
        >
          {/* Subtle green ambient pulse */}
          <span className="absolute -inset-1 rounded-full bg-green/40 opacity-75 blur-sm group-hover:opacity-100 transition-opacity animate-pulse" />
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-green animate-spin-slow" />
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] flex flex-col bg-[#161616]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* Chat Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-navy to-[#00235A] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green/20 border border-green/40 flex items-center justify-center text-green">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight flex items-center gap-1.5">
                  SoftMind AI <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                </h3>
                <p className="text-xs text-gray-300 font-medium">Unified RAG Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Clear Chat"
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-green/20 border border-green/30 flex items-center justify-center text-green shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] flex flex-col gap-1.5`}>
                  <div
                    className={`px-4 py-3 rounded-2xl leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-green to-[#0ab37a] text-navy font-semibold rounded-tr-none shadow-md"
                        : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {msg.content ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="w-2 h-2 rounded-full bg-green animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-green animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 rounded-full bg-green animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                  </div>

                  {/* Sources Attribution */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1 px-1">
                      <span className="text-[11px] text-gray-400 font-medium">Sources:</span>
                      {msg.sources.map((src, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-green font-medium"
                        >
                          {src.title}
                          {src.url && (
                            <a href={src.url} target="_blank" rel="noreferrer" className="hover:underline">
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about SoftMind..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green text-sm transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-green text-navy font-bold flex items-center justify-center hover:bg-[#0aa772] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
