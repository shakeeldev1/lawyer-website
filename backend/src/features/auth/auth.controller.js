import { asyncHandler } from "../../middleware/asyncHandler.js";
import User from "../../models/User.model.js";
import { customError } from "../../utils/customError.js";
import { generateToken } from "../../utils/token.js";

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new customError("User not found", 404);
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new customError("Invalid email or password");

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

