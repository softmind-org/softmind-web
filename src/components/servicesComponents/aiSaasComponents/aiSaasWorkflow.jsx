"use client";

import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* SSR-safe layout effect (avoids the React server-render warning). */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ *
 * Content — wording is authoritative, do not alter
 * ------------------------------------------------------------------ */

const STEPS = [
  {
    key: "b1",
    index: "1",
    side: "left",
    title: "Discovery & Strategy",
    caption: "Business & tech scope alignment",
    subs: [
      {
        title: "Business & User Research",
        desc: "Stakeholder interviews, competitor analysis, user mapping.",
      },
      {
        title: "AI Feasibility & Tech Stack",
        desc: "Is AI the right fit, which models/tools & cloud stack to use.",
      },
      {
        title: "Roadmap & Success Metrics",
        desc: "Phased delivery plan, KPIs to measure project success.",
      },
    ],
  },
  {
    key: "b2",
    index: "2",
    side: "right",
    title: "Design & Architecture",
    caption: "Visuals & infrastructure design",
    subs: [
      {
        title: "UX/UI Design",
        desc: "Wireframes, interactive prototypes, product user flows.",
      },
      {
        title: "System Architecture",
        desc: "Backend systems, databases, multi-tenancy & API layers.",
      },
      {
        title: "AI Model & Data Arch",
        desc: "Model choices, data flow pipelines & vector store storage.",
      },
    ],
  },
  {
    key: "b3",
    index: "3",
    side: "left",
    title: "AI Dev & Integration",
    caption: "Full SaaS & model build",
    subs: [
      {
        title: "Core SaaS Feature Build",
        desc: "Auth, dashboards, subscription/billing, and multi-tenancy.",
      },
      {
        title: "AI Model Integration",
        desc: "Connecting, training & fine-tuning LLMs or custom ML models.",
      },
      {
        title: "Data Pipelines & APIs",
        desc: "Connecting external databases, tools & third-party integrations.",
      },
    ],
  },
  {
    key: "b4",
    index: "4",
    side: "right",
    title: "Deploy & Optimize",
    caption: "QA, hosting & analytics",
    subs: [
      {
        title: "QA & Security Testing",
        desc: "Functional code review, load testing, and security hardening.",
      },
      {
        title: "Cloud Deployment & CI/CD",
        desc: "Scalable cloud setups, automated CI/CD deployment pipelines.",
      },
      {
        title: "Monitoring & Iteration",
        desc: "Performance logs, user analytics tracking, and updates.",
      },
    ],
  },
];

const OUTCOMES = [
  "Fully functional AI SaaS product live in production.",
  "Scalable architecture that grows with user demand.",
  "Secure, tested, and monitored infrastructure.",
  "Ongoing improvement loop & data-driven updates.",
];

/* ------------------------------------------------------------------ *
 * Layout tokens
 * ------------------------------------------------------------------ */

/** Vertical rhythm of the spine AND the rail's overhang at each end, so
 *  the line always meets the hub and destination cards exactly. */
const STACK_GAP = "clamp(2rem, 4vw, 3.25rem)";

/* Motion is deliberately small: short distances, short durations. */
const EASE = "power2.out";
const DUR = 0.5;
const RISE = 14;

/* ------------------------------------------------------------------ *
 * Geometry — only the feedback-loop path needs measured coordinates.
 * Everything else is pure CSS layout, so it cannot drift or overlap.
 * ------------------------------------------------------------------ */

const n = (v) => Math.round(v * 10) / 10;

/** Layout box relative to `root`, read from offset* so GSAP transforms
 *  never corrupt the measurement. */
const layoutBox = (root, selector) => {
  const el = root.querySelector(selector);
  if (!el) return null;
  let x = 0;
  let y = 0;
  let node = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return {
    left: x,
    top: y,
    right: x + el.offsetWidth,
    bottom: y + el.offsetHeight,
    cx: x + el.offsetWidth / 2,
    cy: y + el.offsetHeight / 2,
  };
};

/** Right-angle route with rounded corners — reads as a technical
 *  diagram rather than a hand-drawn squiggle. */
const buildLoopPath = (g) => {
  const { W, H, wide, hub, out } = g;
  const r = 16;
  const bottomY = H - 2;

  if (wide) {
    const laneX = 12;
    return [
      `M ${n(out.cx)} ${n(out.bottom)}`,
      `L ${n(out.cx)} ${n(bottomY - r)}`,
      `Q ${n(out.cx)} ${n(bottomY)} ${n(out.cx - r)} ${n(bottomY)}`,
      `L ${n(laneX + r)} ${n(bottomY)}`,
      `Q ${n(laneX)} ${n(bottomY)} ${n(laneX)} ${n(bottomY - r)}`,
      `L ${n(laneX)} ${n(hub.cy + r)}`,
      `Q ${n(laneX)} ${n(hub.cy)} ${n(laneX + r)} ${n(hub.cy)}`,
      `L ${n(hub.left)} ${n(hub.cy)}`,
    ].join(" ");
  }

  const laneX = W - 8;
  return [
    `M ${n(out.cx)} ${n(out.bottom)}`,
    `L ${n(out.cx)} ${n(bottomY - r)}`,
    `Q ${n(out.cx)} ${n(bottomY)} ${n(out.cx + r)} ${n(bottomY)}`,
    `L ${n(laneX - r)} ${n(bottomY)}`,
    `Q ${n(laneX)} ${n(bottomY)} ${n(laneX)} ${n(bottomY - r)}`,
    `L ${n(laneX)} ${n(hub.cy + r)}`,
    `Q ${n(laneX)} ${n(hub.cy)} ${n(laneX - r)} ${n(hub.cy)}`,
    `L ${n(hub.right)} ${n(hub.cy)}`,
  ].join(" ");
};

/* ------------------------------------------------------------------ *
 * Icons
 * ------------------------------------------------------------------ */

const RocketIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const CheckIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Cursor spotlight — writes CSS vars directly, no React re-render,
 * no layout reads per move.
 * ------------------------------------------------------------------ */

const useSpotlight = () => {
  const frame = useRef(0);
  const next = useRef(null);

  const onMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    next.current = [el, e.clientX - rect.left, e.clientY - rect.top];
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const [node, x, y] = next.current || [];
      if (!node) return;
      node.style.setProperty("--mx", `${x}px`);
      node.style.setProperty("--my", `${y}px`);
    });
  }, []);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return onMove;
};

const SPOTLIGHT =
  "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(12,191,131,0.10), transparent 70%)";

/* ------------------------------------------------------------------ *
 * Step card
 * ------------------------------------------------------------------ */

const StepRow = ({ step, onMove }) => {
  const isLeft = step.side === "left";

  return (
    <div className="relative grid grid-cols-1 pl-12 xs:pl-14 lg:grid-cols-[minmax(0,1fr)_clamp(4rem,7vw,7rem)_minmax(0,1fr)] lg:items-start lg:pl-0">
      {/* Rail marker + elbow */}
      <div className="absolute left-[22px] top-[28px] z-20 -translate-x-1/2 lg:static lg:col-start-2 lg:mt-[28px] lg:translate-x-0 lg:justify-self-center">
        <div className="relative">
          <span
            className={`${step.key}-marker flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-[#08080B] text-[12px] font-semibold tabular-nums text-white/55 shadow-[0_0_0_6px_#050507]`}
          >
            {step.index}
          </span>
          <span
            className={`${step.key}-elbow absolute top-1/2 h-px w-[26px] origin-left bg-gradient-to-r from-[#0CBF83]/45 to-transparent lg:w-[clamp(1.25rem,2.5vw,2.5rem)] ${
              isLeft
                ? "left-full ml-1 lg:left-auto lg:right-full lg:ml-0 lg:mr-1 lg:origin-right lg:bg-gradient-to-l"
                : "left-full ml-1"
            }`}
          />
        </div>
      </div>

      {/* Card */}
      <article
        className={`${step.key}-node ${
          isLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"
        }`}
      >
        <div
          onMouseMove={onMove}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-4 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:border-[#0CBF83]/30 hover:shadow-[0_20px_46px_-28px_rgba(12,191,131,0.55)] sm:p-5 lg:p-6"
        >
          {/* top hairline + cursor spotlight */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: SPOTLIGHT }}
          />

          <div
            className={`flex items-baseline gap-2.5 ${isLeft ? "lg:flex-row-reverse" : ""}`}
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0CBF83]/75">
              Step {step.index}
            </span>
            <span className="h-px flex-1 bg-white/[0.07]" />
          </div>

          <h3 className="mt-3 text-[clamp(1.125rem,2.2vw,1.25rem)] font-semibold leading-snug tracking-[-0.01em] text-white">
            {step.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-white/45">
            {step.caption}
          </p>

          <ul className="mt-5">
            {step.subs.map((sub) => (
              <li
                key={sub.title}
                className={`${step.key}-sub group/sub flex gap-3 border-t border-white/[0.055] py-3 first:border-t-0 first:pt-0 last:pb-0 ${
                  isLeft ? "lg:flex-row-reverse lg:text-right" : ""
                }`}
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0CBF83]/60 transition-colors duration-200 group-hover/sub:bg-[#0CBF83]" />
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium leading-snug text-white/85 transition-colors duration-200 group-hover/sub:text-white">
                    {sub.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-white/40">
                    {sub.desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

const AiSaasWorkflow = () => {
  const containerRef = useRef(null);
  const diagramRef = useRef(null);
  const onSpotlightMove = useSpotlight();

  const [geo, setGeo] = useState(null);
  const loopPath = useMemo(() => (geo ? buildLoopPath(geo) : null), [geo]);

  /* ------------------- measurement (loop path only) ----------------- */

  const measure = useCallback(() => {
    const root = diagramRef.current;
    if (!root) return;

    const W = root.offsetWidth;
    const H = root.offsetHeight;
    if (!W || !H) return;

    const hub = layoutBox(root, "[data-node='hub']");
    const out = layoutBox(root, "[data-node='out']");
    if (!hub || !out) return;

    const wide =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;

    const key = `${W}|${H}|${wide}|${hub.cy}|${out.bottom}`;
    setGeo((prev) =>
      prev && prev.key === key ? prev : { key, W, H, wide, hub, out },
    );
  }, []);

  useIsoLayoutEffect(() => {
    const root = diagramRef.current;
    if (!root) return;

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, [measure]);

  /* ------------------- motion ---------------------------------------- */

  useIsoLayoutEffect(() => {
    if (!loopPath) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* Reveal helper: short, once, no blur filters. */
      const reveal = (targets, { trigger, ...vars } = {}, start = "top 88%") =>
        gsap.from(targets, {
          opacity: 0,
          y: RISE,
          duration: DUR,
          ease: EASE,
          ...vars,
          scrollTrigger: { trigger: trigger || targets, start, once: true },
        });

      if (reduced) {
        gsap.set(".rail-progress", { scaleY: 1 });
        gsap.set(".loop-line", { strokeDashoffset: 0, strokeDasharray: "6,7" });
        return;
      }

      reveal(".title-anim", { stagger: 0.08, trigger: containerRef.current }, "top 82%");
      reveal(".hub-node", { y: 10 }, "top 90%");

      /* Rail fills as the section scrolls — the one continuous motion. */
      gsap.fromTo(
        ".rail-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".spine",
            start: "top 72%",
            end: "bottom 68%",
            scrub: 0.6,
          },
        },
      );

      STEPS.forEach((step) => {
        const row = `.${step.key}-node`;

        gsap
          .timeline({
            scrollTrigger: { trigger: row, start: "top 86%", once: true },
          })
          .from(row, { opacity: 0, y: RISE, duration: DUR, ease: EASE })
          .from(
            `.${step.key}-elbow`,
            { scaleX: 0, duration: 0.3, ease: EASE },
            0.05,
          )
          .from(
            `.${step.key}-sub`,
            { opacity: 0, y: 8, duration: 0.32, stagger: 0.06, ease: EASE },
            0.12,
          );

        /* Marker lights up as the rail reaches it. */
        gsap.to(`.${step.key}-marker`, {
          borderColor: "rgba(12,191,131,0.55)",
          backgroundColor: "rgba(12,191,131,0.10)",
          color: "#ffffff",
          duration: 0.3,
          ease: EASE,
          scrollTrigger: {
            trigger: `.${step.key}-marker`,
            start: "center 62%",
            once: true,
          },
        });
      });

      /* Destination */
      gsap
        .timeline({
          scrollTrigger: { trigger: ".out-node", start: "top 84%", once: true },
        })
        .from(".out-node", { opacity: 0, y: 18, duration: 0.55, ease: EASE })
        .from(
          ".out-sub",
          { opacity: 0, y: 10, duration: 0.35, stagger: 0.06, ease: EASE },
          0.15,
        )
        .to(
          ".out-glow",
          { opacity: 1, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" },
          0.1,
        );

      /* Feedback loop: draws once, then a slow marching dash. */
      const loopEl = containerRef.current.querySelector(".loop-line");
      if (loopEl?.getTotalLength) {
        const len = loopEl.getTotalLength();
        gsap.set(loopEl, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(loopEl, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".out-node",
            start: "top 78%",
            once: true,
          },
          onComplete: () => {
            gsap.set(loopEl, { strokeDasharray: "5,8", strokeDashoffset: 0 });
            gsap.to(loopEl, {
              strokeDashoffset: -13,
              duration: 1.4,
              ease: "none",
              repeat: -1,
            });
          },
        });
      }

      /* Ambient drift — slow enough to read as light, not motion. */
      gsap.utils.toArray(".bg-blob").forEach((blob, i) => {
        gsap.to(blob, {
          yPercent: i % 2 === 0 ? 4 : -4,
          scale: 1.05,
          duration: 14 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      ctx.revert();
    };
  }, [loopPath, geo?.wide]);

  /* ------------------- render ----------------------------------------- */

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#050507] font-jakarta py-[clamp(4rem,9vw,7.5rem)]"
    >
      {/* Depth layers */}
      <div className="bg-blob pointer-events-none absolute -top-1/4 left-1/2 h-[min(720px,95vw)] w-[min(720px,95vw)] -translate-x-1/2 rounded-full bg-[#00235A]/20 blur-[170px]" />
      <div className="bg-blob pointer-events-none absolute -bottom-1/3 left-1/2 h-[min(600px,85vw)] w-[min(600px,85vw)] -translate-x-1/2 rounded-full bg-[#0CBF83]/[0.10] blur-[180px]" />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]"
        style={{
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(ellipse 62% 52% at 50% 32%, #000 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 52% at 50% 32%, #000 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mx-auto max-w-[44rem] text-center">
          <div className="title-anim inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(104deg,#00235A,#004BC0)] shadow-[0_0_8px_#004BC0]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0CBF83] sm:text-[13px]">
              AI SaaS Development
            </span>
          </div>
          <h2 className="title-anim mt-6 text-[clamp(1.875rem,4.8vw,3rem)] font-semibold leading-[1.14] tracking-[-0.022em] text-white">
            Build More Than Software.
            <br />
            <span className="bg-[linear-gradient(100deg,#ffffff_0%,#8ee9c8_58%,#5aa2ff_100%)] bg-clip-text text-transparent">
              Build an Intelligent SaaS Product.
            </span>
          </h2>
        </header>

        {/* Process spine */}
        <div
          ref={diagramRef}
          className="relative mt-[clamp(3rem,6.5vw,5.5rem)] pb-[clamp(3rem,6vw,5rem)]"
        >
          {/* Feedback loop */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {loopPath && (
              <svg
                className="h-full w-full"
                viewBox={`0 0 ${geo.W} ${geo.H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="loop-line"
                  d={loopPath}
                  fill="none"
                  stroke="rgba(12,191,131,0.28)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 6000, strokeDashoffset: 6000 }}
                />
              </svg>
            )}
          </div>

          <div
            className="relative z-10 flex flex-col"
            style={{ gap: STACK_GAP }}
          >
            {/* Hub */}
            <div className="pl-12 xs:pl-14 lg:pl-0">
              <div
                data-node="hub"
                className="hub-node relative mx-auto w-full lg:max-w-[420px]"
              >
                <div
                  onMouseMove={onSpotlightMove}
                  className="group relative overflow-hidden rounded-2xl border border-[#0CBF83]/22 bg-[linear-gradient(165deg,rgba(12,191,131,0.10),rgba(255,255,255,0.02)_52%)] px-6 py-5 text-center transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:border-[#0CBF83]/45 hover:shadow-[0_22px_54px_-30px_rgba(12,191,131,0.7)]"
                >
                  <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#0CBF83]/45 to-transparent" />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: SPOTLIGHT }}
                  />
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0CBF83]">
                    Central Hub
                  </p>
                  <h3 className="mt-2 text-[clamp(1.1875rem,2.2vw,1.375rem)] font-semibold tracking-[-0.012em] text-white">
                    AI SaaS Development
                  </h3>
                </div>
              </div>
            </div>

            {/* Steps + rail */}
            <div
              className="spine relative flex flex-col"
              style={{ gap: STACK_GAP }}
            >
              <div
                className="pointer-events-none absolute left-[22px] w-px overflow-hidden bg-white/[0.08] lg:left-1/2 lg:-translate-x-1/2"
                style={{
                  top: `calc(${STACK_GAP} * -1)`,
                  bottom: `calc(${STACK_GAP} * -1)`,
                }}
              >
                <span
                  className="rail-progress absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,#0CBF83_0%,rgba(12,191,131,0.5)_55%,#004BC0_100%)]"
                  style={{ transform: "scaleY(0)", transformOrigin: "top" }}
                />
              </div>

              {STEPS.map((step) => (
                <StepRow
                  key={step.key}
                  step={step}
                  onMove={onSpotlightMove}
                />
              ))}
            </div>

            {/* Destination */}
            <div className="pl-12 xs:pl-14 lg:pl-0">
              <div
                data-node="out"
                className="out-node relative mx-auto w-full max-w-[860px]"
              >
                <div className="relative rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(12,191,131,0.5),rgba(0,75,192,0.4)_58%,rgba(255,255,255,0.05))] p-px">
                  <div
                    onMouseMove={onSpotlightMove}
                    className="group relative overflow-hidden rounded-[1.2rem] bg-[#07080B] px-[clamp(1.25rem,3.5vw,2.5rem)] py-[clamp(1.75rem,4vw,2.5rem)]"
                  >
                    <span className="out-glow pointer-events-none absolute inset-0 rounded-[1.2rem] opacity-0 shadow-[inset_0_0_70px_rgba(12,191,131,0.3)]" />
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: SPOTLIGHT }}
                    />
                    <span className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[68%] -translate-x-1/2 rounded-full bg-[#0CBF83]/12 blur-[80px]" />

                    <div className="relative flex flex-col items-center text-center">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#0CBF83]/28 bg-[#0CBF83]/[0.08] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0CBF83] sm:text-[12px]">
                        Destination Node
                      </span>

                      <span className="mt-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#0CBF83] transition-transform duration-300 group-hover:-translate-y-1">
                        <RocketIcon className="h-[22px] w-[22px]" />
                      </span>

                      <h3 className="mt-5 text-[clamp(1.375rem,2.8vw,1.8125rem)] font-semibold leading-tight tracking-[-0.018em] text-white">
                        Production-Ready AI SaaS Product
                      </h3>

                      <p className="mt-3 max-w-[54ch] text-[14px] leading-relaxed text-white/55 sm:text-[15px]">
                        A live, scalable, secure AI-powered SaaS application
                        built, deployed, and continuously improved for your
                        business.
                      </p>
                    </div>

                    <div className="my-[clamp(1.5rem,3vw,2rem)] h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/65">
                      What you walk away with:
                    </h4>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {OUTCOMES.map((item) => (
                        <div
                          key={item}
                          className="out-sub flex items-start gap-3 rounded-xl border border-white/[0.065] bg-white/[0.02] p-3.5 transition-colors duration-200 hover:border-[#0CBF83]/28 hover:bg-white/[0.035]"
                        >
                          <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0CBF83]/15 text-[#0CBF83]">
                            <CheckIcon className="h-3 w-3" />
                          </span>
                          <span className="text-[14px] leading-relaxed text-white/80">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiSaasWorkflow;
