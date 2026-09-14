"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitContactForm(data) {
  try {
    // If Supabase URL and Key are not set, we simulate a successful submission
    // so the form can still be tested locally without errors.
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.warn(
        "Supabase credentials are not set. Simulating form submission.",
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true };
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("contacts") // You can create a 'contacts' table in your Supabase project
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          project_type: data.projectType,
          message: data.message,
          source_url: data.sourceUrl || null,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: "Failed to save to database." };
    }

    // Insert kaamyab — ab do emails bhejain (parallel):
    // 1. User ko confirmation email
    // 2. Admin ko notification email with full form details
    // Ye best-effort hai: email fail hone par form submission fail nahi hogi.
    if (process.env.RESEND_API_KEY) {
      const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL;

      const userEmailPayload = {
        from: "SoftMind Solutions <contact@softmindsol.com>",
        to: data.email,
        subject: "We've received your project inquiry",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color:#00235A;">Thanks for reaching out, ${data.name}!</h2>
            <p>We've received your message about your <strong>${data.projectType}</strong> project.</p>
            <p>Our team will review your submission and get back to you within 24 hours.</p>
            <p style="color:#666; font-size:13px; margin-top:24px;">
              <strong>Your message:</strong><br/>
              ${data.message}
            </p>
            <p>Best regards,<br/>SoftMind Solutions Team</p>
          </div>
        `,
      };

      const adminEmailPayload = {
        from: "SoftMind Website <contact@softmindsol.com>",
        to: ADMIN_EMAIL,
        subject: `🔔 New Lead: ${data.name} — ${data.projectType}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background:#00235A; padding: 20px 24px;">
              <h2 style="color:#fff; margin:0; font-size:18px;">🔔 New Contact Form Submission</h2>
            </div>
            <div style="padding: 24px;">
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280; width:140px;"><strong>Name</strong></td>
                  <td style="padding:10px 0;">${data.name}</td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Email</strong></td>
                  <td style="padding:10px 0;"><a href="mailto:${data.email}" style="color:#00235A;">${data.email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Phone</strong></td>
                  <td style="padding:10px 0;">${data.phone || "Not provided"}</td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Project Type</strong></td>
                  <td style="padding:10px 0;">${data.projectType}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; color:#6b7280; vertical-align:top;"><strong>Message</strong></td>
                  <td style="padding:10px 0;">${data.message}</td>
                </tr>
                <tr style="border-top:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Source Page</strong></td>
                  <td style="padding:10px 0;">
                    ${data.sourceUrl
                      ? `<a href="${data.sourceUrl}" style="color:#00235A; word-break:break-all;">${data.sourceUrl}</a>`
                      : "<span style='color:#9ca3af;'>Not captured</span>"
                    }
                  </td>
                </tr>
              </table>
              <div style="margin-top:20px;">
                <a href="mailto:${data.email}?subject=Re: Your ${data.projectType} project inquiry"
                   style="display:inline-block; background:#00235A; color:#fff; padding:10px 20px; border-radius:6px; text-decoration:none; font-size:14px;">
                  Reply to ${data.name}
                </a>
              </div>
            </div>
            <div style="background:#f9fafb; padding:12px 24px; font-size:12px; color:#9ca3af;">
              Submitted on ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT
            </div>
          </div>
        `,
      };

      try {
        const sendEmail = (payload) =>
          fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

        const [userResult, adminResult] = await Promise.allSettled([
          sendEmail(userEmailPayload),
          sendEmail(adminEmailPayload),
        ]);

        if (userResult.status === "rejected" || !userResult.value?.ok) {
          console.error(
            "User confirmation email failed:",
            userResult.reason ||
              (await userResult.value?.json().catch(() => ({}))),
          );
        }
        if (adminResult.status === "rejected" || !adminResult.value?.ok) {
          console.error(
            "Admin notification email failed:",
            adminResult.reason ||
              (await adminResult.value?.json().catch(() => ({}))),
          );
        }
      } catch (emailErr) {
        console.error("Unexpected email error:", emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not set. Skipping emails.");
    }

    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
