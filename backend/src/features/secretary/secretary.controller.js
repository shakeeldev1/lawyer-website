import { Client, Case, Reminder, ActivityLog } from "./secretary.model.js";
import User from "../../models/User.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { customError } from "../../utils/customError.js";

export const createClient = asyncHandler(async (req, res) => {
  const { name, contactNumber, email, address, nationalId, additionalInfo } =
    req.body;

  const client = await Client.create({
    name,
    contactNumber,
    email,
    address,
    nationalId,
    additionalInfo,
    createdBy: req.user._id,
  });

  await ActivityLog.create({
    userId: req.user._id,
    action: "CLIENT_CREATED",
    description: `Client ${name} created`,
  });

  res.status(201).json({ success: true, data: client });
});

export const getAllClients = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { contactNumber: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const clients = await Client.find(query)
    .populate("createdBy", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await Client.countDocuments(query);

  res.status(200).json({
    success: true,
    data: clients,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

export const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id).populate(
    "createdBy",
    "name email"
  );

  if (!client) {
    throw new customError("Client not found", 404);
  }

  res.status(200).json({ success: true, data: client });
});

export const updateClient = asyncHandler(async (req, res) => {
  const { name, contactNumber, email, address, nationalId, additionalInfo } =
    req.body;

  const client = await Client.findByIdAndUpdate(
    req.params.id,
    { name, contactNumber, email, address, nationalId, additionalInfo },
    { new: true, runValidators: true }
  );

  if (!client) {
    throw new customError("Client not found", 404);
  }

  await ActivityLog.create({
    userId: req.user._id,
    action: "CLIENT_UPDATED",
    description: `Client ${client.name} updated`,
  });

  res.status(200).json({ success: true, data: client });
});

export const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    throw new customError("Client not found", 404);
  }

  const existingCases = await Case.countDocuments({ clientId: req.params.id });
  if (existingCases > 0) {
    throw new customError("Cannot delete client with existing cases", 400);
  }

  await client.deleteOne();

  await ActivityLog.create({
    userId: req.user._id,
    action: "CLIENT_DELETED",
    description: `Client ${client.name} deleted`,
  });

  res
    .status(200)
    .json({ success: true, message: "Client deleted successfully" });
});

export const createCase = asyncHandler(async (req, res) => {
  const { clientId, caseType, caseDescription, documents } = req.body;

  const client = await Client.findById(clientId);
  if (!client) {
    throw new customError("Client not found", 404);
  }

  const caseCount = await Case.countDocuments();
  const caseNumber = `CASE-${Date.now()}-${caseCount + 1}`;

  const newCase = await Case.create({
    caseNumber,
    clientId,
    caseType,
    caseDescription,
    documents: documents || [],
    secretary: req.user._id,
    stages: [
      {
        stageType: "Main",
        stageNumber: 1,
        status: "InProgress",
      },
    ],
  });

  await ActivityLog.create({
    caseId: newCase._id,
    userId: req.user._id,
    action: "CASE_CREATED",
    description: `Case ${caseNumber} created for client ${client.name}`,
  });

  res.status(201).json({ success: true, data: newCase });
});

export const getAllCases = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { caseNumber: { $regex: search, $options: "i" } },
      { caseType: { $regex: search, $options: "i" } },
    ];
  }

  const cases = await Case.find(query)
    .populate("clientId", "name contactNumber email")
    .populate("assignedLawyer", "name email")
    .populate("secretary", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await Case.countDocuments(query);

  res.status(200).json({
    success: true,
    data: cases,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

export const getCaseById = asyncHandler(async (req, res) => {
  const caseData = await Case.findById(req.params.id)
    .populate("clientId")
    .populate("assignedLawyer", "name email phone")
    .populate("secretary", "name email")
    .populate("approvingLawyer", "name email")
    .populate("directorSignature.signedBy", "name email");

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  res.status(200).json({ success: true, data: caseData });
});

export const updateCase = asyncHandler(async (req, res) => {
  const { caseType, caseDescription, documents } = req.body;

  const caseData = await Case.findByIdAndUpdate(
    req.params.id,
    { caseType, caseDescription, documents },
    { new: true, runValidators: true }
  );

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "CASE_UPDATED",
    description: `Case ${caseData.caseNumber} updated`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const uploadCaseDocuments = asyncHandler(async (req, res) => {
  const { documents } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  documents.forEach((doc) => {
    caseData.documents.push({
      name: doc.name,
      url: doc.url,
      uploadedBy: req.user._id,
    });
  });

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "DOCUMENTS_UPLOADED",
    description: `${documents.length} document(s) uploaded to case ${caseData.caseNumber}`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const assignCaseToLawyer = asyncHandler(async (req, res) => {
  const { lawyerId, approvingLawyerId } = req.body;

  const lawyer = await User.findById(lawyerId);
  if (!lawyer || lawyer.role !== "lawyer") {
    throw new customError("Invalid lawyer", 400);
  }

  const approvingLawyer = await User.findById(approvingLawyerId);
  if (!approvingLawyer || approvingLawyer.role !== "lawyer") {
    throw new customError("Invalid approving lawyer", 400);
  }

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.documents.length < 3) {
    throw new customError(
      "Minimum 3 documents required before assigning to lawyer",
      400
    );
  }

  caseData.assignedLawyer = lawyerId;
  caseData.approvingLawyer = approvingLawyerId;
  caseData.assignedAt = new Date();
  caseData.status = "Assigned";

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "CASE_ASSIGNED",
    description: `Case ${caseData.caseNumber} assigned to lawyer ${lawyer.name}`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const addCaseStage = asyncHandler(async (req, res) => {
  const { stageType, documents } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  const stageNumber = caseData.stages.length + 1;

  caseData.stages.push({
    stageType,
    stageNumber,
    documents: documents || [],
    status: "InProgress",
  });

  caseData.currentStage = stageNumber - 1;
  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "STAGE_ADDED",
    description: `${stageType} stage added to case ${caseData.caseNumber}`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const uploadStageDocuments = asyncHandler(async (req, res) => {
  const { stageIndex, documents } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  documents.forEach((doc) => {
    caseData.stages[stageIndex].documents.push({
      name: doc.name,
      url: doc.url,
      uploadedBy: req.user._id,
    });
  });

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "STAGE_DOCUMENTS_UPLOADED",
    description: `Documents uploaded to stage ${stageIndex + 1} of case ${
      caseData.caseNumber
    }`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const updateHearingDetails = asyncHandler(async (req, res) => {
  const { stageIndex, hearingDate, hearingTime } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  caseData.stages[stageIndex].hearingDate = hearingDate;
  caseData.stages[stageIndex].hearingTime = hearingTime;

  await caseData.save();

  const hearingDateObj = new Date(hearingDate);
  const reminderDate = new Date(hearingDateObj);
  reminderDate.setDate(reminderDate.getDate() - 3);

  const allLawyers = await User.find({ role: "lawyer" });
  const secretary = await User.findById(caseData.secretary);
  const director = await User.findOne({ role: "director" });

  const recipients = [
    ...allLawyers.map((l) => l._id),
    secretary._id,
    director._id,
  ];

  await Reminder.create({
    caseId: caseData._id,
    reminderType: "Hearing",
    reminderDate,
    recipients,
    message: `Hearing scheduled for case ${caseData.caseNumber} on ${hearingDate} at ${hearingTime}`,
  });

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "HEARING_SCHEDULED",
    description: `Hearing scheduled for case ${caseData.caseNumber}`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const submitToCourt = asyncHandler(async (req, res) => {
  const { stageIndex, courtSubmissionProof } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  if (!caseData.directorSignature || !caseData.directorSignature.signedBy) {
    throw new customError("Director signature required before submission", 400);
  }

  caseData.stages[stageIndex].courtSubmissionProof = courtSubmissionProof;
  caseData.stages[stageIndex].status = "Submitted";
  caseData.status = "Submitted";

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "SUBMITTED_TO_COURT",
    description: `Case ${caseData.caseNumber} submitted to court`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const archiveCase = asyncHandler(async (req, res) => {
  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.status !== "Submitted") {
    throw new customError("Only submitted cases can be archived", 400);
  }

  caseData.archived = true;
  caseData.archivedAt = new Date();
  caseData.archivedBy = req.user._id;
  caseData.status = "Archived";

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "CASE_ARCHIVED",
    description: `Case ${caseData.caseNumber} archived`,
  });

  res.status(200).json({ success: true, data: caseData });
});

export const getArchivedCases = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = { archived: true };
  if (search) {
    query.$or = [
      { caseNumber: { $regex: search, $options: "i" } },
      { caseType: { $regex: search, $options: "i" } },
    ];
  }

  const cases = await Case.find(query)
    .populate("clientId", "name contactNumber")
    .populate("assignedLawyer", "name email")
    .populate("archivedBy", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ archivedAt: -1 });

  const count = await Case.countDocuments(query);

  res.status(200).json({
    success: true,
    data: cases,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

export const addCaseNote = asyncHandler(async (req, res) => {
  const { note } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  caseData.notes.push({
    text: note,
    addedBy: req.user._id,
  });

  await caseData.save();

  res.status(200).json({ success: true, data: caseData });
});

export const getAllReminders = asyncHandler(async (req, res) => {
  const { upcoming } = req.query;

  const query = {};
  if (upcoming === "true") {
    query.reminderDate = { $gte: new Date() };
    query.sent = false;
  }

  const reminders = await Reminder.find(query)
    .populate("caseId", "caseNumber caseType")
    .populate("recipients", "name email")
    .sort({ reminderDate: 1 });

  res.status(200).json({ success: true, data: reminders });
});

export const getActivityLogs = asyncHandler(async (req, res) => {
  const { caseId, page = 1, limit = 20 } = req.query;

  const query = caseId ? { caseId } : {};

  const logs = await ActivityLog.find(query)
    .populate("userId", "name email")
    .populate("caseId", "caseNumber")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ timestamp: -1 });

  const count = await ActivityLog.countDocuments(query);

  res.status(200).json({
    success: true,
    data: logs,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalClients = await Client.countDocuments();
  const totalCases = await Case.countDocuments();
  const activeCases = await Case.countDocuments({ archived: false });
  const archivedCases = await Case.countDocuments({ archived: true });

  const casesByStatus = await Case.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const upcomingHearings = await Case.aggregate([
    { $unwind: "$stages" },
    { $match: { "stages.hearingDate": { $gte: new Date() } } },
    { $sort: { "stages.hearingDate": 1 } },
    { $limit: 10 },
  ]);

  const recentActivity = await ActivityLog.find()
    .populate("userId", "name")
    .populate("caseId", "caseNumber")
    .sort({ timestamp: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    data: {
      totalClients,
      totalCases,
      activeCases,
      archivedCases,
      casesByStatus,
      upcomingHearings,
      recentActivity,
    },
  });
});

export const getLawyers = asyncHandler(async (req, res) => {
  const lawyers = await User.find({ role: "lawyer", status: "active" }).select(
    "name email phone"
  );
  res.status(200).json({ success: true, data: lawyers });
});

export const uploadCaseDocumentsWithFiles = asyncHandler(async (req, res) => {
  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (!req.files || req.files.length === 0) {
    throw new customError("No files uploaded", 400);
  }

  req.files.forEach((file) => {
    caseData.documents.push({
      name: file.originalname,
      url: file.path,
      uploadedBy: req.user._id,
    });
  });

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "DOCUMENTS_UPLOADED",
    description: `${req.files.length} document(s) uploaded to case ${caseData.caseNumber}`,
  });

  res.status(200).json({
    success: true,
    message: "Documents uploaded successfully",
    data: caseData,
  });
});

export const uploadStageDocumentsWithFiles = asyncHandler(async (req, res) => {
  const { stageIndex } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  if (!req.files || req.files.length === 0) {
    throw new customError("No files uploaded", 400);
  }

  req.files.forEach((file) => {
    caseData.stages[stageIndex].documents.push({
      name: file.originalname,
      url: file.path,
      uploadedBy: req.user._id,
    });
  });

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "STAGE_DOCUMENTS_UPLOADED",
    description: `${req.files.length} document(s) uploaded to stage ${
      parseInt(stageIndex) + 1
    } of case ${caseData.caseNumber}`,
  });

  res.status(200).json({
    success: true,
    message: "Stage documents uploaded successfully",
    data: caseData,
  });
});

export const uploadCourtSubmissionProof = asyncHandler(async (req, res) => {
  const { stageIndex } = req.body;

  const caseData = await Case.findById(req.params.id);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  if (!req.file) {
    throw new customError("No file uploaded", 400);
  }

  if (!caseData.directorSignature || !caseData.directorSignature.signedBy) {
    throw new customError("Director signature required before submission", 400);
  }

  caseData.stages[stageIndex].courtSubmissionProof = req.file.path;
  caseData.stages[stageIndex].status = "Submitted";
  caseData.status = "Submitted";

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "SUBMITTED_TO_COURT",
    description: `Case ${caseData.caseNumber} submitted to court with proof`,
  });

  res.status(200).json({
    success: true,
    message: "Court submission proof uploaded successfully",
    data: caseData,
  });
});
