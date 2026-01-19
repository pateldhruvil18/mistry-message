import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import "server-only";


export async function sendVerificationEmail (
    email: string,
    username: string,
    verifyCode: string
) : Promise<ApiResponse>{
    try{
        await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['dhp204600@gmail.com'],

        subject: 'Mystry message | verification code',
        react: VerificationEmail({username, otp : verifyCode}),
    });
        return {success : true, message : 'Verification email send Successfully'}

    } catch(emailError){
        console.error("Error sending verify", emailError)
        return {success : false, message : 'Failed to send verification email'}
    }
}