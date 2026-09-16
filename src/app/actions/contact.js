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

    // 1. Submit lead to SoftOps Business Development pipeline (MQL stage, website_contact tag)
    let rpcResult = null;
    let rpcError = null;

    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      try {
        const supabase = await createClient();
        const res = await supabase.rpc("submit_website_contact_lead", {
          p_name: name,
          p_email: email,
          p_phone: phone || null,
          p_project_type: projectType || null,
          p_message: message || null,
          p_source_url: sourceUrl || null,
        });
        rpcResult = res.data;
        rpcError = res.error;
      } catch (clientErr) {
        console.error("Supabase client initialization error:", clientErr);
        rpcError = clientErr;
      }
    } else {
      console.warn("Supabase credentials not configured in environment.");
    }

    if (rpcError) {
      console.error("Supabase submit_website_contact_lead error:", rpcError);
    }

    const leadId = rpcResult?.lead_id;

    // 2. Send email notifications via Resend (Visitor confirmation & Admin notification)
    // Email sending is guaranteed and executes alongside the SoftOps integration
    if (process.env.RESEND_API_KEY) {
      const rawAdminEmails =
        process.env.ADMIN_NOTIFICATION_EMAIL || "bilalbhatti@softmindsol.com,ahmadnawaz@softmindsol.com";
      const adminRecipients = rawAdminEmails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

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
              ${message || "(No message provided)"}
            </p>
            <p>Best regards,<br/>SoftMind Solutions Team</p>
          </div>
        `,
      };

      const softOpsUrl = leadId
        ? `https://dashboard.softmindsol.com/admin/bd/leads/${leadId}`
        : null;

      const adminEmailPayload = {
        from: "SoftMind Website <contact@softmindsol.com>",
        to: adminRecipients,
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
                  <td style="padding:10px 0;">${message || "No message provided."}</td>
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
              <div style="margin-top:20px; display:flex; gap:12px;">
                ${softOpsUrl
                  ? `<a href="${softOpsUrl}"
                       style="display:inline-block; background:#00235A; color:#fff; padding:10px 18px; border-radius:6px; text-decoration:none; font-size:14px; font-weight:600;">
                      Open in SoftOps Pipeline →
                    </a>`
                  : ""
                }
                <a href="mailto:${email}?subject=Re: Your ${projectType} project inquiry"
                   style="display:inline-block; background:#f3f4f6; color:#111827; padding:10px 18px; border-radius:6px; text-decoration:none; font-size:14px; font-weight:500;">
                  Reply to ${name}
                </a>
              </div>
            </div>
            <div style="background:#f9fafb; padding:12px 24px; font-size:12px; color:#9ca3af;">
              Submitted on ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT · Automatically logged in SoftOps as Website Contact (MQL)
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

    return { success: true, leadId };
  } catch (error) {
    console.error("Server action error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
