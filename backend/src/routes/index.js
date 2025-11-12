import express from "express";
const router = express.Router();

import authRoutes from "../features/auth/auth.routes.js";
import secretaryRoutes from "../features/secretary/secretary.routes.js";
import lawyerRoutes from "../features/lawyer/lawyer.routes.js";

router.use("/auth", authRoutes);
router.use("/secretary", secretaryRoutes);
router.use("/lawyer", lawyerRoutes);

export default router;
