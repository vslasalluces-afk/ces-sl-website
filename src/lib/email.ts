import { Resend } from "resend";
import { SITE } from "./constants";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = process.env.EMAIL_FROM || "CES SL <noreply@cessl.org>";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://cessl.org";

// ─── Shared email wrapper ────────────────────────────────────────
async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!resend) {
    console.log("[Email stub] To:", params.to, "Subject:", params.subject);
    return true; // Succeed silently in dev so flows don't break
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

// ─── Layout wrapper ──────────────────────────────────────────────
function emailLayout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#FFF9F5;font-family:'Segoe UI',system-ui,sans-serif;color:#333333">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFF9F5;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#5A3A2E,#333333);border-radius:16px 16px 0 0;padding:32px;text-align:center">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#F8B195,#D4A574);margin:0 auto 12px;line-height:48px;font-weight:bold;color:#5A3A2E;font-size:14px">CES</div>
          <h1 style="color:#FFFFFF;font-size:20px;margin:0;font-weight:700">${title}</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="background:#FFFFFF;padding:32px;border:1px solid #FFE0D0;border-top:none">
          ${body}
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#FAEDE3;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;border:1px solid #FFE0D0;border-top:none">
          <p style="margin:0 0 8px;font-size:13px;color:#5A3A2E;font-weight:600">Christian Extension Services (CES)</p>
          <p style="margin:0 0 4px;font-size:12px;color:#666">${SITE.address}</p>
          <p style="margin:0;font-size:12px;color:#666">${SITE.phone} · ${SITE.email}</p>
          <p style="margin:12px 0 0;font-size:11px;color:#999">Transforming Communities. Empowering Lives.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background-color:#5A3A2E;color:#FFFFFF;font-weight:600;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:10px;margin:8px 0">${label}</a>`;
}

// ─── Email Templates ─────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string, verificationToken: string): Promise<boolean> {
  const verifyUrl = `${BASE_URL}/api/auth/verify-email?token=${verificationToken}`;

  return sendEmail({
    to,
    subject: "Welcome to CES – Please Verify Your Email",
    html: emailLayout("Welcome to CES", `
      <p style="font-size:15px;line-height:1.7;color:#333">Hello <strong>${name}</strong>,</p>
      <p style="font-size:15px;line-height:1.7;color:#333">Thank you for creating a donor account with Christian Extension Services. We're delighted to welcome you to our community of supporters.</p>
      <p style="font-size:15px;line-height:1.7;color:#333">Please verify your email address to activate your account:</p>
      <div style="text-align:center;margin:24px 0">${btn(verifyUrl, "Verify Email Address")}</div>
      <p style="font-size:13px;color:#666">This link expires in 24 hours. If you did not create this account, you can safely ignore this email.</p>
    `),
  });
}

export async function sendPasswordResetEmail(to: string, name: string, resetToken: string): Promise<boolean> {
  const resetUrl = `${BASE_URL}/portal/reset-password?token=${resetToken}`;

  return sendEmail({
    to,
    subject: "CES – Password Reset Request",
    html: emailLayout("Password Reset", `
      <p style="font-size:15px;line-height:1.7;color:#333">Hello <strong>${name}</strong>,</p>
      <p style="font-size:15px;line-height:1.7;color:#333">We received a request to reset your password. Click the button below to choose a new password:</p>
      <div style="text-align:center;margin:24px 0">${btn(resetUrl, "Reset Password")}</div>
      <p style="font-size:13px;color:#666">This link expires in 1 hour. If you did not request a password reset, no action is needed – your password remains unchanged.</p>
    `),
  });
}

export async function sendPasswordChangedEmail(to: string, name: string): Promise<boolean> {
  return sendEmail({
    to,
    subject: "CES – Your Password Has Been Changed",
    html: emailLayout("Password Changed", `
      <p style="font-size:15px;line-height:1.7;color:#333">Hello <strong>${name}</strong>,</p>
      <p style="font-size:15px;line-height:1.7;color:#333">Your CES donor portal password has been changed successfully.</p>
      <p style="font-size:15px;line-height:1.7;color:#333">If you did not make this change, please contact CES immediately at <a href="mailto:${SITE.email}" style="color:#6B8E6B">${SITE.email}</a>.</p>
    `),
  });
}

export async function sendDonationReceiptEmail(
  to: string,
  name: string,
  amount: string,
  currency: string,
  date: string,
  receiptId: string
): Promise<boolean> {
  return sendEmail({
    to,
    subject: `CES – Donation Receipt #${receiptId}`,
    html: emailLayout("Donation Receipt", `
      <p style="font-size:15px;line-height:1.7;color:#333">Dear <strong>${name}</strong>,</p>
      <p style="font-size:15px;line-height:1.7;color:#333">Thank you for your generous donation to Christian Extension Services.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#FFF0E8;border-radius:10px;padding:20px">
        <tr><td style="padding:10px 20px">
          <p style="margin:0 0 8px;font-size:13px;color:#666">Receipt Number</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#5A3A2E">CES-${receiptId}</p>
        </td><td style="padding:10px 20px;text-align:right">
          <p style="margin:0 0 8px;font-size:13px;color:#666">Amount</p>
          <p style="margin:0;font-size:22px;font-weight:700;color:#5A3A2E">${currency} ${amount}</p>
        </td></tr>
        <tr><td colspan="2" style="padding:10px 20px">
          <p style="margin:0;font-size:13px;color:#666">Date: ${date}</p>
        </td></tr>
      </table>
      <p style="font-size:15px;line-height:1.7;color:#333">Your support helps transform communities across Sierra Leone through training, empowerment, and sustainable development.</p>
      <div style="text-align:center;margin:24px 0">${btn(`${BASE_URL}/portal/dashboard`, "View Your Dashboard")}</div>
    `),
  });
}
