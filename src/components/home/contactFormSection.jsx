"use client";
import React, { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/ga";
import {
  CheckCircle2,
  MessageSquare,
  Phone,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "sonner";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import { BsAnthropic } from "react-icons/bs";
import { SiCisco } from "react-icons/si";
import Image from "next/image";
import { MsLogo } from "../../../public/images";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z
    .string()
    .min(10, "Please provide at least a brief description of your project"),
});

const projectTypes = [
  "Select project type...",
  "Web Application",
  "Mobile App",
  "AI / SaaS Product",
  "E-Commerce Platform",
  "UI/UX Design",
  "Dedicated Development Team",
  "Free Discovery Call",
];

const howItWorksSteps = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Fill the Form",
    description:
      "Tell us about your project — what you're building, your timeline, and budget. Takes less than 2 minutes.",
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: "We Review & Respond",
    description:
      "Our team reviews your submission and reaches out within 24 hours with initial thoughts and next steps.",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Free Discovery Call",
    description:
      "We schedule a 30-minute call to deep dive into your requirements, answer questions, and propose a plan.",
  },
];

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  const watchProjectType = watch("projectType");

  const onSubmit = async (data) => {
    try {
      // Capture the current page URL so admin knows where the lead came from
      const sourceUrl =
        typeof window !== "undefined" ? window.location.href : "";
      const result = await submitContactForm({ ...data, sourceUrl });
      if (result && !result.success) {
        toast.error(result.error || "Failed to submit form.");
        return;
      }
      trackEvent("generate_lead", { location: "homepage_contact_form" });
      reset();
      setTimeout(() => clearErrors(), 10);
      toast.success("Form submitted successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative w-full bg-gray-200 py-16 md:py-24 overflow-hidden font-jakarta">
      <Toaster position="top-right" richColors />
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#00235A_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-navy rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-green rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="relative w-full mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex flex-col items-center gap-3 text-center mb-14">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[linear-gradient(104.04deg,#00235A_8.33%,#004BC0_93.33%)]" />
            <span className="text-green text-[22px] font-bold tracking-wide">
              Let&apos;s Connect
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] lg:leading-14.5 font-bold tracking-wide text-dark max-w-170">
            Tell Us About Your Project
          </h2>
          <p className="text-sm md:text-base text-grey font-medium leading-relaxed max-w-135">
            Ready to build something great? Share your requirements and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-start">
          {/* Left: How it Works */}
          <div className="sticky top-52 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl font-bold text-dark mb-2">
                How Does It Work?
              </h3>
              <p className="text-sm text-grey font-medium leading-relaxed">
                Getting started is simple. Here&apos;s what happens after you
                send your message:
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-6 relative">
              {/* Connector Line */}
              <div className="absolute left-5.5 top-12 bottom-8 w-px bg-gradient-to-b from-green/40 via-navy/20 to-transparent hidden sm:block" />

              {howItWorksSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-5 relative">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center shrink-0 shadow-md z-10">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1 pt-1">
                    <h4 className="text-base font-bold text-dark">
                      {step.title}
                    </h4>
                    <p className="text-sm text-grey font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
              <p className="text-base font-bold text-dark">
                The World&apos;s Leading Technology Platforms Trust Our
                Engineers. So Can You.
              </p>
              <div className="flex flex-wrap items-center gap-6 sm:gap-x-8 transition-all duration-500">
                <div className="flex items-center gap-2 text-black font-bold text-xl">
                  <FcGoogle size={28} />
                  <span>Google</span>
                </div>
                <div className="flex items-center gap-2 text-black font-bold text-xl">
                  <FaMeta size={28} color="#0369E5" />
                  <span>Meta</span>
                </div>
                <div className="flex items-center gap-2 text-black font-bold text-xl">
                  <BsAnthropic size={28} color="#000000" />
                  <span>Anthropic</span>
                </div>
                <div className="flex items-center gap-2 text-black font-bold text-xl">
                  <Image src={MsLogo} alt="Microsoft" width={22} height={22} />
                  <span>Microsoft</span>
                </div>
                <div className="flex items-center gap-2 text-black font-bold text-xl">
                  <SiCisco size={34} color="#049fd9" />
                  <span>Cisco</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/65 border border-gray-100 rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.08)] p-8 md:p-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <h3 className="text-xl font-bold text-dark mb-1">
                Start a Conversation
              </h3>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-dark/70 uppercase tracking-wider"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    {...register("name")}
                    className={`w-full bg-white px-4 py-3 rounded-xl border text-sm font-medium text-dark placeholder:text-grey/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500/30"
                        : "border-gray-200 focus:ring-green/30 focus:border-green/50"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs font-semibold">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-dark/70 uppercase tracking-wider"
                  >
                    Work Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    {...register("email")}
                    className={`w-full bg-white px-4 py-3 rounded-xl border text-sm font-medium text-dark placeholder:text-grey/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500/30"
                        : "border-gray-200 focus:ring-green/30 focus:border-green/50"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs font-semibold">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-bold text-dark/70 uppercase tracking-wider"
                >
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      defaultCountry="us"
                      value={value}
                      onChange={onChange}
                      style={{
                        "--react-international-phone-height": "46px",
                      }}
                      className={`flex w-full rounded-xl border bg-white transition-all duration-200 px-3 ${
                        errors.phone
                          ? "border-red-500 focus-within:ring-red-500/30 focus-within:ring-2 focus-within:border-red-500"
                          : "border-gray-200 focus-within:ring-green/30 focus-within:border-green/50 focus-within:ring-2"
                      }`}
                      inputClassName="w-full !bg-transparent px-4 text-sm font-medium text-dark placeholder:text-grey/50 focus:outline-none !border-none !ring-0 !h-[46px] !rounded-r-xl"
                      countrySelectorStyleProps={{
                        buttonClassName:
                          "px-3 !bg-transparent !border-y-0 !border-l-0 !border-r !border-gray-200 !h-[46px] hover:!bg-gray-50 transition-colors flex items-center justify-center m-0 !rounded-l-xl",
                      }}
                    />
                  )}
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 w-full">
                {/* Project Type */}
                <div className="w-full flex flex-col gap-1.5">
                  <label
                    htmlFor="projectType"
                    className="text-xs font-bold text-dark/70 uppercase tracking-wider"
                  >
                    Project Type *
                  </label>
                  {/* Hidden input to ensure React Hook Form tracks this field properly */}
                  <input type="hidden" {...register("projectType")} />
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      id="projectType"
                      type="button"
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border text-sm font-medium text-dark focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                        errors.projectType
                          ? "border-red-500 focus:ring-red-500/30"
                          : "border-gray-200 focus:ring-green/30 focus:border-green/50"
                      }`}
                    >
                      <span>
                        {watchProjectType || "Select project type..."}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--anchor-width] z-50">
                      {projectTypes.slice(1).map((type, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          onClick={() =>
                            setValue("projectType", type, {
                              shouldValidate: true,
                            })
                          }
                          className="cursor-pointer"
                        >
                          {type}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {errors.projectType && (
                    <span className="text-red-500 text-xs font-semibold">
                      {errors.projectType.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold text-dark/70 uppercase tracking-wider"
                >
                  Project Description *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project — what you're building, your target users, and any specific requirements..."
                  {...register("message")}
                  className={`w-full bg-white px-4 py-3 rounded-xl border text-sm font-medium text-dark placeholder:text-grey/50 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500/30"
                      : "border-gray-200 focus:ring-green/30 focus:border-green/50"
                  }`}
                />
                {errors.message && (
                  <span className="text-red-500 text-xs font-semibold">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-navy text-white font-bold rounded-xl hover:bg-[#003080] disabled:bg-navy/70 transition-all duration-300 hover:shadow-lg text-sm tracking-wide mt-1 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <p className="text-center text-xs text-grey/60 font-medium">
                No spam. Your information is kept confidential and protected
                under NDA.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
