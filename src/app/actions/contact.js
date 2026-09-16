"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitContactForm(data) {
  try {
    const name = (data.name || data.fullName || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || data.company || "").trim();
    const projectType = (data.projectType || "General Inquiry").trim();
    const message = (data.message || "").trim();
    const sourceUrl = (data.sourceUrl || "").trim();

    if (!name || !email) {
      return { success: false, error: "Name and email are required." };
    }

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

    // Directly submit to SoftOps Business Development pipeline in MQL stage with website_contact tag
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      "submit_website_contact_lead",
      {
        p_name: name,
        p_email: email,
        p_phone: phone || null,
        p_project_type: projectType || null,
        p_message: message || null,
        p_source_url: sourceUrl || null,
      },
    );

    if (rpcError) {
      console.error("Supabase submit_website_contact_lead error:", rpcError);
      return { success: false, error: "Failed to submit inquiry to pipeline." };
    }

    if (rpcResult && rpcResult.success === false) {
      return {
        success: false,
        error: rpcResult.error || "Submission rejected by pipeline.",
      };
    }

    // Insert successful — send confirmation email to user & alert to admin
    if (process.env.RESEND_API_KEY) {
      const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "bilalbhatti@softmindsol.com";

      const userEmailPayload = {
        from: "SoftMind Solutions <contact@softmindsol.com>",
        to: email,
        subject: "We've received your project inquiry",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color:#00235A;">Thanks for reaching out, ${name}!</h2>
            <p>We've received your message about your <strong>${projectType}</strong> project.</p>
            <p>Our business development team will review your submission and get back to you within 24 hours.</p>
            <p style="color:#666; font-size:13px; margin-top:24px;">
              <strong>Your message:</strong><br/>
              ${message}
            </p>
            <p>Best regards,<br/>SoftMind Solutions Team</p>
          </div>
        `,
      };

      const adminEmailPayload = {
        from: "SoftMind Website <contact@softmindsol.com>",
        to: ADMIN_EMAIL,
        subject: `🔔 New Website Lead: ${name} — ${projectType}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background:#00235A; padding: 20px 24px;">
              <h2 style="color:#fff; margin:0; font-size:18px;">🔔 New Website Contact Form Submission (SoftOps MQL)</h2>
            </div>
            <div style="padding: 24px;">
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280; width:140px;"><strong>Name</strong></td>
                  <td style="padding:10px 0;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Email</strong></td>
                  <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#00235A;">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Phone</strong></td>
                  <td style="padding:10px 0;">${phone || "Not provided"}</td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Project Type</strong></td>
                  <td style="padding:10px 0;">${projectType}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; color:#6b7280; vertical-align:top;"><strong>Message</strong></td>
                  <td style="padding:10px 0;">${message}</td>
                </tr>
                <tr style="border-top:1px solid #f3f4f6;">
                  <td style="padding:10px 0; color:#6b7280;"><strong>Source Page</strong></td>
                  <td style="padding:10px 0;">
                    ${sourceUrl
                      ? `<a href="${sourceUrl}" style="color:#00235A; word-break:break-all;">${sourceUrl}</a>`
                      : "<span style='color:#9ca3af;'>Direct</span>"
                    }
                  </td>
                </tr>
              </table>
              <div style="margin-top:20px;">
                <a href="mailto:${email}?subject=Re: Your ${projectType} project inquiry"
                   style="display:inline-block; background:#00235A; color:#fff; padding:10px 20px; border-radius:6px; text-decoration:none; font-size:14px;">
                  Reply to ${name}
                </a>
              </div>
            </div>
            <div style="background:#f9fafb; padding:12px 24px; font-size:12px; color:#9ca3af;">
              Submitted on ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT · Tagged in SoftOps as Website Contact
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
    }

    return { success: true, leadId: rpcResult?.lead_id };
  } catch (error) {
    console.error("Server action error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
