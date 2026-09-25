import React from "react";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { CheckCircle2, AlertCircle, Quote } from "lucide-react";
import { urlFor } from "@/backend/sanity/client";

// Utility to create URL-friendly slug ID from text
export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export default function ArticleBody({ body, plainTextFallback = "" }) {
  // Custom PortableText components
  const portableTextComponents = {
    block: {
      h2: ({ children }) => {
        const text = React.Children.toArray(children)
          .map((c) => (typeof c === "string" ? c : c?.props?.text || ""))
          .join("");
        const id = slugify(text);
        return (
          <h2
            id={id}
            className="scroll-mt-28 text-2xl sm:text-3xl font-bold text-navy font-jakarta mt-12 mb-5 pb-2 border-b border-gray-100 flex items-center justify-between"
          >
            <span>{children}</span>
          </h2>
        );
      },
      h3: ({ children }) => {
        const text = React.Children.toArray(children)
          .map((c) => (typeof c === "string" ? c : c?.props?.text || ""))
          .join("");
        const id = slugify(text);
        return (
          <h3
            id={id}
            className="scroll-mt-28 text-xl sm:text-2xl font-bold text-navy font-jakarta mt-8 mb-4"
          >
            {children}
          </h3>
        );
      },
      h4: ({ children }) => (
        <h4 className="text-lg font-bold text-navy font-jakarta mt-6 mb-3">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="text-[17px] leading-[1.85] text-gray-700 font-normal mb-6">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 relative rounded-2xl bg-gradient-to-r from-emerald-50/70 to-teal-50/40 p-6 md:p-8 border-l-4 border-green text-navy font-medium shadow-xs">
          <Quote className="w-8 h-8 text-green/40 mb-2" />
          <div className="text-lg md:text-xl italic font-serif leading-relaxed text-navy">
            {children}
          </div>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-outside pl-6 space-y-2 mb-6 text-[17px] leading-[1.8] text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 text-[17px] leading-[1.8] text-gray-700 font-medium">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-1">{children}</li>,
      number: ({ children }) => <li className="pl-1">{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-navy">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-gray-100 text-navy font-mono text-sm px-1.5 py-0.5 rounded border border-gray-200">
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noindex nofollow" : undefined}
            className="text-[#0B63BD] font-semibold underline underline-offset-4 hover:text-green transition-colors"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        const imageUrl = urlFor(value)?.url();
        if (!imageUrl) return null;
        return (
          <figure className="my-8 w-full">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
              <Image
                src={imageUrl}
                alt={value.alt || "Article illustration"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {value.alt && (
              <figcaption className="text-center text-xs text-gray-500 mt-2 font-medium">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      },
      // Table support in PortableText
      table: ({ value }) => {
        if (!value?.rows || value.rows.length === 0) return null;
        const [headerRow, ...bodyRows] = value.rows;
        return (
          <div className="my-8 w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
            <table className="w-full text-left text-sm font-jakarta border-collapse">
              {headerRow && (
                <thead className="bg-[#F8FAFC] border-b border-gray-200 text-navy">
                  <tr>
                    {headerRow.cells?.map((cell, idx) => (
                      <th
                        key={idx}
                        className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-gray-100 bg-white">
                {bodyRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    {row.cells?.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-5 py-3.5 text-gray-700 ${
                          cIdx === 0 ? "font-semibold text-navy" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },
  };

  if (body && Array.isArray(body) && body.length > 0) {
    return (
      <article className="w-full text-gray-800 font-jakarta leading-relaxed max-w-none">
        <PortableText value={body} components={portableTextComponents} />
      </article>
    );
  }

  // Fallback demo content rendering with full Arbisoft reference fidelity
  return (
    <article className="w-full text-gray-800 font-jakarta leading-relaxed max-w-none">
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        EdTech partner rankings go wrong when they compare fundamentally
        different purchases as though they were interchangeable. Finding the
        right software engineering partner is not just about raw headcount — it
        requires specialized domain mastery in LMS ecosystems, adaptive learning
        algorithms, SCORM/LTI compliance, and high-concurrency cloud
        architectures.
      </p>

      {/* Major Section 1 */}
      <h2
        id="what-counts-as-an-edtech-technology-partner"
        className="scroll-mt-28 text-2xl sm:text-3xl font-bold text-navy font-jakarta mt-12 mb-5 pb-2 border-b border-gray-100"
      >
        What Counts As An EdTech Technology Partner
      </h2>
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        An EdTech technology partner is not simply a generic IT staff
        augmentation firm. They understand the distinct compliance requirements
        of student privacy (FERPA, COPPA, GDPR-K), learning analytics standards
        (xAPI, Caliper), and the asynchronous workflows needed for digital
        learning platforms.
      </p>

      {/* Bold inline stat callout */}
      <div className="my-6 p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-jakarta">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium">
            Domain Specialization:
          </span>
          <span className="font-bold text-navy bg-white px-2.5 py-0.5 rounded border border-gray-200">
            Strong (14+ Yrs)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium">Proof of Delivery:</span>
          <span className="font-bold text-green bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            100+ Enterprise Deployments
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium">
            Security & Compliance:
          </span>
          <span className="font-bold text-navy">FERPA / SOC-2 Type II</span>
        </div>
      </div>

      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        When evaluating potential partners, engineering leaders must assess both
        architectural capability and domain depth. A partner should be able to
        design multi-tenant architectures, optimize video streaming latency, and
        build intelligent assessment engines.
      </p>

      {/* Major Section 2 */}
      <h2
        id="how-we-scored-these-education-technology-partners"
        className="scroll-mt-28 text-2xl sm:text-3xl font-bold text-navy font-jakarta mt-12 mb-5 pb-2 border-b border-gray-100"
      >
        How We Scored These Education Technology Partners
      </h2>
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        Our scoring matrix evaluates engineering organizations across four key
        pillars: architectural depth, compliance readiness, dedicated senior
        talent retention, and historical proof of delivery in high-scale EdTech
        environments.
      </p>

      {/* Data Comparison Table */}
      <div className="my-8 w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
        <table className="w-full text-left text-sm font-jakarta border-collapse">
          <thead className="bg-[#F8FAFC] border-b border-gray-200 text-navy">
            <tr>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs">
                Evaluation Criteria
              </th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs">
                Weight
              </th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs">
                Benchmark Expectation
              </th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs">
                SoftMind Capability
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            <tr className="hover:bg-gray-50/60 transition-colors">
              <td className="px-5 py-3.5 font-bold text-navy">
                LMS & Open edX Architecture
              </td>
              <td className="px-5 py-3.5 text-gray-600 font-semibold">30%</td>
              <td className="px-5 py-3.5 text-gray-600">
                Custom theme, LTI v1.3 tools, micro-frontends
              </td>
              <td className="px-5 py-3.5 text-green font-bold">
                Deep Production Experience
              </td>
            </tr>
            <tr className="hover:bg-gray-50/60 transition-colors">
              <td className="px-5 py-3.5 font-bold text-navy">
                AI-Driven Adaptive Learning
              </td>
              <td className="px-5 py-3.5 text-gray-600 font-semibold">25%</td>
              <td className="px-5 py-3.5 text-gray-600">
                RAG agents, vector databases, LLM guardrails
              </td>
              <td className="px-5 py-3.5 text-green font-bold">
                Full AI Stack & Model Tuning
              </td>
            </tr>
            <tr className="hover:bg-gray-50/60 transition-colors">
              <td className="px-5 py-3.5 font-bold text-navy">
                Scale & High Concurrency
              </td>
              <td className="px-5 py-3.5 text-gray-600 font-semibold">25%</td>
              <td className="px-5 py-3.5 text-gray-600">
                50k+ concurrent active test takers
              </td>
              <td className="px-5 py-3.5 text-green font-bold">
                Autoscaling Cloud Architectures
              </td>
            </tr>
            <tr className="hover:bg-gray-50/60 transition-colors">
              <td className="px-5 py-3.5 font-bold text-navy">
                Data Privacy & FERPA
              </td>
              <td className="px-5 py-3.5 text-gray-600 font-semibold">20%</td>
              <td className="px-5 py-3.5 text-gray-600">
                Encrypted PII at rest, audit logging
              </td>
              <td className="px-5 py-3.5 text-green font-bold">
                End-to-End Enterprise Compliance
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Major Section 3 */}
      <h2
        id="the-10-best-edtech-partners-in-2026"
        className="scroll-mt-28 text-2xl sm:text-3xl font-bold text-navy font-jakarta mt-12 mb-5 pb-2 border-b border-gray-100"
      >
        The 10 Best EdTech Partners In 2026
      </h2>
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        Below is our analysis of the top specialized software partners capable
        of executing complex education technology roadmaps in 2026.
      </p>

      {/* Subsection 3.1 */}
      <h3
        id="1-softmind-solutions-ai-native-edtech-engineering"
        className="scroll-mt-28 text-xl sm:text-2xl font-bold text-navy font-jakarta mt-8 mb-4"
      >
        1. SoftMind Solutions — AI-Native EdTech & Cloud Platforms
      </h3>
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        SoftMind Solutions combines 14+ years of enterprise engineering
        excellence with cutting-edge Generative AI and adaptive learning
        systems. With a dedicated bench of senior full-stack and machine
        learning engineers, SoftMind builds high-throughput LMS architectures,
        interactive course builders, and intelligent student coaching bots.
      </p>

      {/* Pull Quote */}
      <blockquote className="my-8 relative rounded-2xl bg-gradient-to-r from-emerald-50/70 to-teal-50/40 p-6 md:p-8 border-y border-r border-l-4 border-green text-navy font-medium shadow-xs">
        <Quote className="w-8 h-8 text-green/40 mb-2" />
        <div className="text-lg md:text-xl font-serif leading-relaxed text-navy">
          &ldquo;SoftMind&apos;s team delivered our adaptive assessment engine
          40% faster than internal projections, enabling us to support over
          120,000 active students seamlessly.&rdquo;
        </div>
        <div className="mt-3 text-sm font-semibold text-gray-600">
          — VP of Engineering, Tier-1 EdTech SaaS
        </div>
      </blockquote>

      {/* "Best for:" / "Less suited for:" Takeaway Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <div className="flex items-center gap-2 mb-2.5 text-emerald-900 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-green shrink-0" />
            <span>Best for:</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            Fast-growing EdTech companies and enterprise learning teams needing
            dedicated, senior AI/LMS developers to ship custom features, scale
            infrastructure, and integrate agentic workflows.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
          <div className="flex items-center gap-2 mb-2.5 text-amber-900 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Less suited for:</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            Organizations looking for off-the-shelf, no-code templates without
            custom engineering requirements or enterprise integrations.
          </p>
        </div>
      </div>

      {/* Subsection 3.2 */}
      <h3
        id="2-enterprise-scale-cloud-architectures"
        className="scroll-mt-28 text-xl sm:text-2xl font-bold text-navy font-jakarta mt-8 mb-4"
      >
        2. Enterprise Scale Cloud & Open edX Integrations
      </h3>
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        When scaling educational platforms to millions of users, distributed
        micro-frontend frameworks, Redis caching strategies, and automated
        grading pipelines become mission critical.
      </p>

      {/* Major Section 4 */}
      <h2
        id="which-edtech-partner-fits-what-you-are-building"
        className="scroll-mt-28 text-2xl sm:text-3xl font-bold text-navy font-jakarta mt-12 mb-5 pb-2 border-b border-gray-100"
      >
        Which EdTech Partner Fits What You Are Building
      </h2>
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        Selecting the right engineering team depends on your platform lifecycle
        stage. For greenfield MVP builds, prioritize speed-to-market and modern
        React/Next.js frameworks. For legacy modernizations, prioritize database
        partitioning and zero-downtime migration expertise.
      </p>

      {/* Major Section 5 */}
      <h2
        id="how-to-evaluate-an-edtech-partner-that-is-not-on-this-list"
        className="scroll-mt-28 text-2xl sm:text-3xl font-bold text-navy font-jakarta mt-12 mb-5 pb-2 border-b border-gray-100"
      >
        How To Evaluate An EdTech Partner That Is Not On This List
      </h2>
      <p className="text-[17px] leading-[1.85] text-gray-700 mb-6">
        Always insist on interviewing the specific developers who will be
        assigned to your account. Review their Github history, assess their
        problem-solving approaches to concurrency bottlenecks, and verify their
        references with previous EdTech product leads.
      </p>
    </article>
  );
}
