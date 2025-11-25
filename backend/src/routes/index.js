import express from "express";
const router = express.Router();

import authRoutes from "../features/auth/auth.routes.js";
import secretaryRoutes from "../features/secretary/secretary.routes.js";
import lawyerRoutes from "../features/lawyer/lawyer.routes.js";
import directorRoutes from "../features/dashboard/director.routes.js";
import adminReminderRoutes from "../features/dashboard/reminder.routes.js";

router.use("/auth", authRoutes);
router.use("/secretary", secretaryRoutes);
router.use("/lawyer", lawyerRoutes);
router.use("/director", directorRoutes);
router.use("/director",adminReminderRoutes);

export default router;
