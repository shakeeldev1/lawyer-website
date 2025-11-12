import express from "express";
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
  uploadCaseDocuments,
  assignCaseToLawyer,
  addCaseStage,
  uploadStageDocuments,
  updateHearingDetails,
  submitToCourt,
  archiveCase,
  getArchivedCases,
  addCaseNote,
  getAllReminders,
  getActivityLogs,
  getDashboardStats,
  getLawyers,
  uploadCaseDocumentsWithFiles,
  uploadStageDocumentsWithFiles,
  uploadCourtSubmissionProof,
} from "./secretary.controller.js";
import { loginRequired } from "../../utils/loginRequired.js";
import {
  uploadCaseDocuments as uploadCaseDocsMulter,
  uploadCourtProof,
} from "../../middleware/upload.js";

const router = express.Router();

router.use(loginRequired);

router.post("/clients", createClient);
router.get("/clients", getAllClients);
router.get("/clients/:id", getClientById);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

router.post("/cases", createCase);
router.get("/cases", getAllCases);
router.get("/cases/:id", getCaseById);
router.put("/cases/:id", updateCase);
router.post("/cases/:id/documents", uploadCaseDocuments);
router.post(
  "/cases/:id/documents/upload",
  uploadCaseDocsMulter.array("documents", 10),
  uploadCaseDocumentsWithFiles
);
router.post("/cases/:id/assign", assignCaseToLawyer);
router.post("/cases/:id/stages", addCaseStage);
router.post("/cases/:id/stages/documents", uploadStageDocuments);
router.post(
  "/cases/:id/stages/documents/upload",
  uploadCaseDocsMulter.array("documents", 10),
  uploadStageDocumentsWithFiles
);
router.put("/cases/:id/hearing", updateHearingDetails);
router.post("/cases/:id/submit", submitToCourt);
router.post(
  "/cases/:id/submit/upload",
  uploadCourtProof.single("courtProof"),
  uploadCourtSubmissionProof
);
router.post("/cases/:id/archive", archiveCase);
router.post("/cases/:id/notes", addCaseNote);

router.get("/archive", getArchivedCases);
router.get("/reminders", getAllReminders);
router.get("/activity-logs", getActivityLogs);
router.get("/dashboard/stats", getDashboardStats);
router.get("/lawyers", getLawyers);

export default router;
