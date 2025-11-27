import { Client, Case, Reminder, ActivityLog } from "./secretary.model.js";
import User from "../auth/User.model.js";
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

export const getAllCases = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, search } = req.query;

  const query = {};
  if (search) {
    const clients = await Client.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
      ],
    }).select("_id");

    query.$or = [
      { caseNumber: { $regex: search, $options: "i" } },
      { caseType: { $regex: search, $options: "i" } },
      { clientId: { $in: clients.map((c) => c._id) } },
    ];
  }

  const cases = await Case.find(query)
    .populate(
      "clientId",
      "name email contactNumber nationalId address additionalInfo"
    )
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

export const createCase = asyncHandler(async (req, res) => {
  const { clientId, caseType, caseDescription, documents, assignedLawyer } =
    req.body;

  const client = await Client.findById(clientId);
  if (!client) {
    throw new customError("Client not found", 404);
  }

  // Validate lawyer if provided
  if (assignedLawyer) {
    const lawyer = await User.findById(assignedLawyer);
    if (!lawyer || lawyer.role !== "lawyer") {
      throw new customError("Invalid lawyer assignment", 400);
    }
  }

  const caseCount = await Case.countDocuments();
  const caseNumber = `CASE-${Date.now()}-${caseCount + 1}`;

  const newCase = await Case.create({
    caseNumber,
    clientId,
    caseType,
    caseDescription,
    documents: documents || [],
    assignedLawyer: assignedLawyer || null,
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
  const { caseType, caseDescription, documents, assignedLawyer } = req.body;

  // Validate lawyer if provided
  if (assignedLawyer) {
    const lawyer = await User.findById(assignedLawyer);
    if (!lawyer || lawyer.role !== "lawyer") {
      throw new customError("Invalid lawyer assignment", 400);
    }
  }

  const updateData = {
    caseType,
    caseDescription,
    documents,
  };

  // Only update assignedLawyer if it's provided in the request
  if (assignedLawyer !== undefined) {
    updateData.assignedLawyer = assignedLawyer;
  }

  const caseData = await Case.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

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

export const deleteCase = asyncHandler(async (req, res) => {
  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  // Optional: Prevent deletion of archived cases
  if (caseData.archived) {
    throw new customError(
      "Cannot delete archived case. Unarchive it first.",
      400
    );
  }

  await Case.findByIdAndDelete(req.params.id);

  await ActivityLog.create({
    caseId: req.params.id,
    userId: req.user._id,
    action: "CASE_DELETED",
    description: `Case ${caseData.caseNumber} deleted`,
  });

  res.status(200).json({
    success: true,
    message: "Case deleted successfully",
  });
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

  // Build recipients list with null checks
  const recipients = [];

  // Add assigned lawyer if exists
  if (caseData.assignedLawyer) {
    recipients.push(caseData.assignedLawyer);
  }

  // Add all lawyers
  const allLawyers = await User.find({ role: "lawyer" });
  recipients.push(...allLawyers.map((l) => l._id));

  // Add secretary if exists
  if (caseData.secretary) {
    const secretary = await User.findById(caseData.secretary);
    if (secretary) {
      recipients.push(secretary._id);
    }
  }

  // Add director if exists
  const director = await User.findOne({ role: "director" });
  if (director) {
    recipients.push(director._id);
  }

  // Remove duplicates
  const uniqueRecipients = [
    ...new Set(recipients.map((id) => id.toString())),
  ].map((id) => id);

  await Reminder.create({
    caseId: caseData._id,
    reminderType: "Hearing",
    reminderDate,
    recipients: uniqueRecipients,
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

export const getActivityLogs = asyncHandler(async (req, res) => {
  const { caseId, page = 1, limit = 20 } = req.query;

  const query = caseId ? { caseId } : {};

  const logs = await ActivityLog.find(query)
    .populate("userId", "name email")
    .populate("caseId", "caseNumber")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ timestamp: -1 })
    .lean();

  const count = await ActivityLog.countDocuments(query);

  // Format activities for frontend
  const formattedActivities = logs.map((log) => ({
    _id: log._id,
    activity: log.description,
    time: formatTimeAgo(log.timestamp),
    userId: log.userId,
    caseId: log.caseId,
    action: log.action,
  }));

  res.status(200).json({
    success: true,
    activities: formattedActivities,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  // Basic stats
  const totalClients = await Client.countDocuments();
  const activeCases = await Case.countDocuments({ archived: false });

  // Count cases with documents less than required
  const pendingDocuments = await Case.countDocuments({
    archived: false,
    $expr: { $lt: [{ $size: "$documents" }, 3] },
  });

  // Count upcoming hearings (next 30 days)
  const today = new Date();
  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);

  const upcomingHearingsCount = await Case.aggregate([
    { $unwind: "$stages" },
    {
      $match: {
        "stages.hearingDate": {
          $gte: today,
          $lte: next30Days,
        },
      },
    },
    { $count: "total" },
  ]);

  // Cases by type for pie chart
  const casesByType = await Case.aggregate([
    { $match: { archived: false } },
    { $group: { _id: "$caseType", count: { $sum: 1 } } },
    { $project: { name: "$_id", value: "$count", _id: 0 } },
  ]);

  // Pending documents status breakdown
  const allCases = await Case.find({ archived: false }).select(
    "documents status"
  );
  const pendingDocsData = [
    {
      status: "Not Started",
      count: allCases.filter((c) => c.documents.length === 0).length,
    },
    {
      status: "In Progress",
      count: allCases.filter(
        (c) => c.documents.length > 0 && c.documents.length < 3
      ).length,
    },
    {
      status: "Completed",
      count: allCases.filter((c) => c.documents.length >= 3).length,
    },
  ];

  // Recent activity logs formatted for frontend
  const recentActivity = await ActivityLog.find()
    .populate("userId", "name")
    .populate("caseId", "caseNumber")
    .sort({ timestamp: -1 })
    .limit(10)
    .lean();

  const formattedActivities = recentActivity.map((log) => ({
    _id: log._id,
    activity: log.description,
    time: formatTimeAgo(log.timestamp),
  }));

  res.status(200).json({
    success: true,
    stats: {
      totalClients,
      activeCases,
      pendingDocuments,
      upcomingHearings: upcomingHearingsCount[0]?.total || 0,
    },
    caseTypeData:
      casesByType.length > 0
        ? casesByType
        : [
            { name: "Civil", value: 0 },
            { name: "Criminal", value: 0 },
            { name: "Family", value: 0 },
          ],
    pendingDocsData,
    activities: formattedActivities,
  });
});

// Helper function to format time ago
function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return "Just now";
}

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

export const getReminders = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reminders = await Reminder.find({
    reminderDate: { $gte: today },
  })
    .populate({
      path: "caseId",
      select: "caseNumber caseType status stages clientId",
      populate: { path: "clientId", select: "name" },
    })
    .sort({ reminderDate: 1 })
    .lean();

  // Format reminders for frontend
  const formattedReminders = reminders.map((reminder) => {
    const daysUntil = Math.ceil(
      (new Date(reminder.reminderDate) - today) / (1000 * 60 * 60 * 24)
    );
    const isOverdue = daysUntil < 0;
    const isToday = daysUntil === 0;
    const isUpcoming = daysUntil > 0 && daysUntil <= 7;

    let type, color;
    if (reminder.reminderType === "Hearing") {
      if (isOverdue) {
        type = "Overdue Hearing";
        color = "bg-red-100 text-red-800";
      } else if (isToday) {
        type = "Hearing Today";
        color = "bg-orange-100 text-orange-800";
      } else if (isUpcoming) {
        type = "Upcoming Hearing";
        color = "bg-blue-100 text-blue-800";
      } else {
        type = "Scheduled Hearing";
        color = "bg-blue-50 text-blue-700";
      }
    } else if (reminder.reminderType === "Submission") {
      if (isOverdue) {
        type = "Overdue Submission";
        color = "bg-red-100 text-red-800";
      } else if (isToday) {
        type = "Submission Due Today";
        color = "bg-yellow-100 text-yellow-800";
      } else {
        type = "Pending Submission";
        color = "bg-yellow-50 text-yellow-700";
      }
    } else {
      type = "Reminder";
      color = "bg-gray-100 text-gray-800";
    }

    return {
      _id: reminder._id,
      type,
      caseName: reminder.caseId?.clientId?.name || "Unknown Client",
      caseNumber: reminder.caseId?.caseNumber || "N/A",
      caseType: reminder.caseId?.caseType || "N/A",
      stage: getCurrentStage(reminder.caseId),
      dueDate: formatDate(reminder.reminderDate),
      message: reminder.message || `${reminder.reminderType} reminder`,
      color,
      reminderType: reminder.reminderType,
      isOverdue,
      isToday,
      daysUntil: Math.abs(daysUntil),
    };
  });

  res.status(200).json({
    success: true,
    data: formattedReminders,
  });
});

// Helper function to get current stage
function getCurrentStage(caseData) {
  if (!caseData || !caseData.stages || caseData.stages.length === 0) {
    return "Main Case";
  }
  const currentStageIndex = caseData.currentStage || 0;
  const stage = caseData.stages[currentStageIndex];
  return stage?.stageType || "Main Case";
}

// Helper function to format date
function formatDate(date) {
  const d = new Date(date);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return d.toLocaleDateString("en-GB", options);
}

export const createReminder = asyncHandler(async (req, res) => {
  const { caseId, reminderType, reminderDate, message, recipients } = req.body;

  if (!caseId || !reminderType || !reminderDate) {
    throw new customError("Case ID, reminder type, and date are required", 400);
  }

  const caseData = await Case.findById(caseId);
  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  // If recipients not provided, default to secretary and assigned lawyer
  let reminderRecipients = recipients || [];
  if (reminderRecipients.length === 0) {
    if (caseData.secretary) reminderRecipients.push(caseData.secretary);
    if (caseData.assignedLawyer)
      reminderRecipients.push(caseData.assignedLawyer);
  }

  const reminder = await Reminder.create({
    caseId,
    reminderType,
    reminderDate: new Date(reminderDate),
    message:
      message || `${reminderType} reminder for case ${caseData.caseNumber}`,
    recipients: reminderRecipients,
  });

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "REMINDER_CREATED",
    description: `Reminder created for ${reminderType} on ${formatDate(
      reminderDate
    )}`,
  });

  res.status(201).json({
    success: true,
    message: "Reminder created successfully",
    data: reminder,
  });
});

export const deleteReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.findByIdAndDelete(req.params.id);

  if (!reminder) {
    throw new customError("Reminder not found", 404);
  }

  await ActivityLog.create({
    caseId: reminder.caseId,
    userId: req.user._id,
    action: "REMINDER_DELETED",
    description: `Reminder deleted`,
  });

  res.status(200).json({
    success: true,
    message: "Reminder deleted successfully",
  });
});

export const getCaseStatsByStatus = asyncHandler(async (req, res) => {
  const statsByStatus = await Case.aggregate([
    { $match: { archived: false } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $project: { status: "$_id", count: 1, _id: 0 } },
  ]);

  res.status(200).json({
    success: true,
    data: statsByStatus,
  });
});

export const getRecentCases = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const recentCases = await Case.find({ archived: false })
    .populate("clientId", "name contactNumber")
    .populate("assignedLawyer", "name")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .select("caseNumber caseType status createdAt");

  res.status(200).json({
    success: true,
    data: recentCases,
  });
});

export const getQuickStats = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Active cases count
  const activeCasesCount = await Case.countDocuments({ archived: false });

  // Today's hearings count
  const todayHearingsCount = await Case.aggregate([
    { $unwind: "$stages" },
    {
      $match: {
        "stages.hearingDate": {
          $gte: today,
          $lt: tomorrow,
        },
      },
    },
    { $count: "total" },
  ]);

  res.status(200).json({
    success: true,
    data: {
      activeCases: activeCasesCount,
      todayHearings: todayHearingsCount[0]?.total || 0,
    },
  });
});
