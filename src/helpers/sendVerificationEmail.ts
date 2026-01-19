import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from "resend";
import "server-only";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }

    // ✅ SAFE: created at runtime, not build time
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Mistry Message <onboarding@resend.dev>",
      to: email, // ✅ send to user
      subject: "Mistry Message | Verification Code",
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
