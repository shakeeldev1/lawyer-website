import express from "express";
import {
  getAssignedCases,
  getCaseById,
  acceptCase,
  submitMemorandum,
  uploadMemorandumFile,
  updateMemorandum,
  approveMemorandum,
  rejectMemorandum,
  getPendingApprovals,
  getMyArchive,
  getUpcomingHearings,
  getDashboardStats,
  addCaseNote,
  getMyReminders,
  getCaseTimeline,
} from "./lawyer.controller.js";
import { loginRequired } from "../../utils/loginRequired.js";
import { uploadMemorandum } from "../../middleware/upload.js";

const router = express.Router();

router.use(loginRequired);

router.get("/cases", getAssignedCases);
router.get("/cases/:id", getCaseById);
router.post("/cases/:id/accept", acceptCase);
router.post("/cases/:id/memorandum", submitMemorandum);
router.post(
  "/cases/:id/memorandum/upload",
  uploadMemorandum.single("memorandum"),
  uploadMemorandumFile
);
router.put("/cases/:id/memorandum", updateMemorandum);
router.post("/cases/:id/memorandum/approve", approveMemorandum);
router.post("/cases/:id/memorandum/reject", rejectMemorandum);
router.post("/cases/:id/notes", addCaseNote);
router.get("/cases/:id/timeline", getCaseTimeline);

router.get("/pending-approvals", getPendingApprovals);
router.get("/archive", getMyArchive);
router.get("/hearings", getUpcomingHearings);
router.get("/reminders", getMyReminders);
router.get("/dashboard/stats", getDashboardStats);

export default router;
