"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { trackEvent } from "@/lib/ga";
import { submitContactForm } from "@/app/actions/contact";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const sourceUrl = typeof window !== "undefined" ? window.location.href : "";
      const res = await submitContactForm({
        name: data.fullName,
        email: data.email,
        phone: data.company || "",
        projectType: "General Inquiry",
        message: data.message,
        sourceUrl,
      });

      if (!res || !res.success) {
        toast.error(res?.error || "Failed to submit inquiry. Please try again.");
        return;
      }

      toast.success("Thanks for reaching out! We've received your inquiry.");
      trackEvent("generate_lead", { location: "contact_page_form" });
      reset();
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="w-full bg-[#f8fafc] py-20 px-6 sm:px-12 flex justify-center font-jakarta relative overflow-hidden"
    >
      {/* Background glow matching the image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgba(164,255,225,0.15)] blur-[150px] rounded-full opacity-50 pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 relative z-10">
        {/* Left Column: Info */}
        <div className="flex flex-col gap-8 lg:pr-10 pt-4">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green" />
              <span className="text-[16px] sm:text-[18px] font-bold text-green tracking-wide">
                Contact Us
              </span>
            </div>

            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-dark leading-tight capitalize text-center lg:text-start">
              We Are Always Ready To Help You And Answer Your Questions
            </h2>

            <p className="text-[15px] sm:text-[16px] font-medium text-grey leading-[1.6] text-center lg:text-start">
              Have a project in mind? Get in touch with our team to discuss your
              goals, explore solutions, and turn your ideas into impactful
              digital products.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col gap-1.5">
              <h4 className="text-[18px] font-bold text-dark">Email</h4>
              <a
                href="mailto:contact@softmindsol.com"
                onClick={() => trackEvent("email_click", { location: "contact_page_info" })}
                className="text-[15px] font-medium text-grey hover:text-green transition-colors"
              >
                contact@softmindsol.com
              </a>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="text-[18px] font-bold text-dark">Our Location</h4>
              <p className="text-[15px] font-medium text-grey leading-relaxed max-w-[280px]">
                333 R-Block First Floor Main Blvd,
                <br />
                Johar Town, Lahore, 54770
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="text-[18px] font-bold text-dark">Contact Us</h4>
              <a
                href="tel:+923344447957"
                className="text-[15px] font-medium text-grey hover:text-green transition-colors"
              >
                +923344447957
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="w-full bg-white rounded-[24px] p-8 sm:p-12 shadow-[0_10px_60px_rgba(0,0,0,0.05)] border border-[#EFEFEF]">
          <div className="flex flex-col gap-2 mb-8">
            <h3 className="text-[28px] sm:text-[32px] font-bold text-dark">
              Get in Touch
            </h3>
            <p className="text-[15px] font-medium text-grey leading-[1.6]">
              Define your goals and identify areas where AI can add value to
              your business
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col">
              <input
                {...register("fullName")}
                type="text"
                placeholder="Full Name"
                className="w-full h-[54px] px-4 rounded-[8px] border border-[#EBEBEB] text-[15px] text-dark placeholder-[#999999] focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all bg-transparent"
              />
              {errors.fullName && (
                <span className="text-red-500 text-[13px] mt-1">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="w-full h-[54px] px-4 rounded-[8px] border border-[#EBEBEB] text-[15px] text-dark placeholder-[#999999] focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all bg-transparent"
              />
              {errors.email && (
                <span className="text-red-500 text-[13px] mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <input
                {...register("company")}
                type="text"
                placeholder="Company / Phone (Optional)"
                className="w-full h-[54px] px-4 rounded-[8px] border border-[#EBEBEB] text-[15px] text-dark placeholder-[#999999] focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all bg-transparent"
              />
            </div>

            <div className="flex flex-col">
              <textarea
                {...register("message")}
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-4 rounded-[8px] border border-[#EBEBEB] text-[15px] text-dark placeholder-[#999999] focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all resize-none bg-transparent"
              />
              {errors.message && (
                <span className="text-red-500 text-[13px] mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-[56px] mt-2 bg-green hover:bg-[#0aa672] disabled:opacity-70 text-white font-bold text-[16px] rounded-[12px] transition-colors flex justify-center items-center cursor-pointer"
            >
              {submitting ? "Sending message..." : "Send a message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
