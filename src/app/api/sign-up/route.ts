export const runtime = "nodejs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔁 Existing but unverified user
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      }

      existingUserByEmail.password = await bcrypt.hash(password, 10);
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserByEmail.save();

      await sendVerificationEmail(
        existingUserByEmail.email,
        existingUserByEmail.username,
        verifyCode
      );

      return Response.json(
        {
          success: true,
          message: "Verification code resent. Please check your email.",
        },
        { status: 200 }
      );
    }

    // 🆕 New user
    const newUser = new UserModel({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      verifyCode,
      verifyCodeExpiry: new Date(Date.now() + 3600000),
      isVerified: false,
      isAcceptingMessage: true,
      messages: [],
    });

    await newUser.save();

    await sendVerificationEmail(email, username, verifyCode);

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
