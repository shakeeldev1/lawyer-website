import { asyncHandler } from "../../middleware/asyncHandler.js";
import User from "../../models/User.model.js";
import { customError } from "../../utils/customError.js";
import { otpTemplate } from "../../utils/emailTemplates/otpTemplate.js";
import { generateOtp } from "../../utils/generateOtp.js";
import sendMail from "../../utils/sendMail.js";
import { generateToken } from "../../utils/token.js";

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
        throw new customError("User not found", 404);
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
        throw new customError("Invalid email or password");

    if (!user.isVerified)
        throw new customError('Please verify your account before logging in', 401);

    const token = generateToken({
        id: user._id,
        role: user.role
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        message: "Login Successfull",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
})

export const signupUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        throw new customError('Please provide all required fields', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new customError('User with this email already exist! Please try with another email');
    }

    const otp = generateOtp(6);
    const otpExpires = Date.now() + 10 * 60 * 1000;

    await sendMail({
        email: user.email,
        subject: 'Your Law Firm OTP Verification',
        html: otpTemplate(user.name, otp)
    })

    const user = await User.create({
        name, email, phone, password, otp, otpExpires
    })

    res.status(201).json({
        message: "Signup Successfull", user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
    });
});

export const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new customError('Email and otp required')
    }

    const user = await User.findOne({ email });
    if (!user)
        throw new customError('User not found', 404);

    if (user.isVerified)
        throw new customError('User already verified', 400)
    if (user.otp !== otp)
        throw new customError('Invalid or Expired otp')
    if (user.otpExpires < Date.now())
        throw new customError('Otp has expired', 400)

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken({ id: user._id, role: user.role });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Account Verified Successfully" });
})

