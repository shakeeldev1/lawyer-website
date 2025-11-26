import express from "express";
import { loginRequired } from "../../utils/loginRequired.js";
import { addUser, deleteUser, getAllArchivedCases, getAllCases, getAllReminders, getAllUsers, getPendingSignature, updateStatusReadyForSubmission, updateUserRole, userStats } from "./director.controller.js";
import { allowedRoles } from "../../utils/allowedRoles.js";
const router = express.Router();

router.use(loginRequired, allowedRoles(['director']));

router.get("/director-archive", getAllArchivedCases)
router.get("/reminders", getAllReminders);
router.get('/all-users', getAllUsers);
router.put('/update-user-role/:id', updateUserRole);
router.delete("/delete-user/:id", deleteUser);
router.post("/addUser", addUser);
router.get("/stats", userStats);
router.get("/cases", getAllCases);
router.put("/updateStatusReadyForSubmission/:id", updateStatusReadyForSubmission);
router.get("/getPendingSignature",getPendingSignature);

export default router;