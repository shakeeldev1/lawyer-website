import express from "express";
const router = express.Router();

import authRoutes from "../features/auth/auth.routes.js";

router.use("/auth", authRoutes);

export default router;