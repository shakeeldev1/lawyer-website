import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { customError } from "../utils/customError.js";
import User from "../models/User.model.js";

export const loginRequired = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies?.token) {
        token = req.cookies.token;
    }

    else if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw customError("Login required to access this resource", 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            throw customError("User not found", 404);
        }
        req.user = user;
        next();
    } catch (error) {
        throw customError("Invalid or expired token", 401);
    }
});
