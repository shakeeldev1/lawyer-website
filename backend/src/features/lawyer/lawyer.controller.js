import { Case, ActivityLog, Reminder } from "../secretary/secretary.model.js";
import User from "../auth/User.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { customError } from "../../utils/customError.js";

export const getAssignedCases = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const query = {
    assignedLawyer: req.user._id,
    archived: false,
  };

  if (status) query.status = status;
  if (search) {
    query.$or = [
      { caseNumber: { $regex: search, $options: "i" } },
      { caseType: { $regex: search, $options: "i" } },
    ];
  }

  const cases = await Case.find(query)
    .populate("clientId", "name contactNumber email")
    .populate("secretary", "name email")
    .populate("approvingLawyer", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ assignedAt: -1 });

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
    .populate("approvingLawyer", "name email phone")
    .populate("secretary", "name email")
    .populate("directorSignature.signedBy", "name email");

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (
    caseData.assignedLawyer?._id.toString() !== req.user._id.toString() &&
    caseData.approvingLawyer?._id.toString() !== req.user._id.toString()
  ) {
    throw new customError("Not authorized to view this case", 403);
  }

  res.status(200).json({ success: true, data: caseData });
});

export const acceptCase = asyncHandler(async (req, res) => {
  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.assignedLawyer?.toString() !== req.user._id.toString()) {
    throw new customError("Not authorized to accept this case", 403);
  }

  if (caseData.status !== "Assigned") {
    throw new customError("Case cannot be accepted at this stage", 400);
  }

  caseData.status = "UnderReview";
  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "CASE_ACCEPTED",
    description: `Lawyer ${req.user.name} accepted case ${caseData.caseNumber}`,
  });

  res.status(200).json({
    success: true,
    message: "Case accepted successfully",
    data: caseData,
  });
});

export const submitMemorandum = asyncHandler(async (req, res) => {
  const { stageIndex, content, fileUrl } = req.body;

  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.assignedLawyer?.toString() !== req.user._id.toString()) {
    throw new customError("Not authorized to submit memorandum", 403);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  caseData.stages[stageIndex].memorandum = {
    content,
    fileUrl,
    preparedBy: req.user._id,
    preparedAt: new Date(),
    status: "Pending",
  };

  caseData.status = "PendingApproval";
  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "MEMORANDUM_SUBMITTED",
    description: `Memorandum submitted for stage ${stageIndex + 1} of case ${
      caseData.caseNumber
    }`,
  });

  res.status(200).json({
    success: true,
    message: "Memorandum submitted successfully",
    data: caseData,
  });
});

export const uploadMemorandumFile = asyncHandler(async (req, res) => {
  const { stageIndex, content } = req.body;

  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.assignedLawyer?.toString() !== req.user._id.toString()) {
    throw new customError("Not authorized to submit memorandum", 403);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  if (!req.file) {
    throw new customError("No file uploaded", 400);
  }

  caseData.stages[stageIndex].memorandum = {
    content: content || "",
    fileUrl: req.file.path,
    preparedBy: req.user._id,
    preparedAt: new Date(),
    status: "Pending",
  };

  caseData.status = "PendingApproval";
  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "MEMORANDUM_SUBMITTED",
    description: `Memorandum file submitted for stage ${
      parseInt(stageIndex) + 1
    } of case ${caseData.caseNumber}`,
  });

  res.status(200).json({
    success: true,
    message: "Memorandum uploaded successfully",
    data: caseData,
  });
});

export const updateMemorandum = asyncHandler(async (req, res) => {
  const { stageIndex, content, fileUrl } = req.body;

  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.assignedLawyer?.toString() !== req.user._id.toString()) {
    throw new customError("Not authorized to update memorandum", 403);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  if (!caseData.stages[stageIndex].memorandum) {
    throw new customError("No memorandum found for this stage", 404);
  }

  if (caseData.stages[stageIndex].memorandum.status === "Approved") {
    throw new customError("Cannot update approved memorandum", 400);
  }

  if (content) caseData.stages[stageIndex].memorandum.content = content;
  if (fileUrl) caseData.stages[stageIndex].memorandum.fileUrl = fileUrl;
  caseData.stages[stageIndex].memorandum.preparedAt = new Date();
  caseData.stages[stageIndex].memorandum.status = "Pending";

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "MEMORANDUM_UPDATED",
    description: `Memorandum updated for stage ${stageIndex + 1} of case ${
      caseData.caseNumber
    }`,
  });

  res.status(200).json({
    success: true,
    message: "Memorandum updated successfully",
    data: caseData,
  });
});

export const approveMemorandum = asyncHandler(async (req, res) => {
  const { stageIndex } = req.body;

  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.approvingLawyer?.toString() !== req.user._id.toString()) {
    throw new customError("Not authorized to approve memorandum", 403);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  if (!caseData.stages[stageIndex].memorandum) {
    throw new customError("No memorandum found for this stage", 404);
  }

  if (caseData.stages[stageIndex].memorandum.status === "Approved") {
    throw new customError("Memorandum already approved", 400);
  }

  caseData.stages[stageIndex].memorandum.status = "Approved";
  caseData.stages[stageIndex].memorandum.approvedBy = req.user._id;
  caseData.stages[stageIndex].memorandum.approvedAt = new Date();
  caseData.stages[stageIndex].status = "Approved";
  caseData.status = "Approved";

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "MEMORANDUM_APPROVED",
    description: `Memorandum approved for stage ${stageIndex + 1} of case ${
      caseData.caseNumber
    } by ${req.user.name}`,
  });

  res.status(200).json({
    success: true,
    message: "Memorandum approved successfully",
    data: caseData,
  });
});

export const rejectMemorandum = asyncHandler(async (req, res) => {
  const { stageIndex, feedback } = req.body;

  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (caseData.approvingLawyer?.toString() !== req.user._id.toString()) {
    throw new customError("Not authorized to reject memorandum", 403);
  }

  if (!caseData.stages[stageIndex]) {
    throw new customError("Stage not found", 404);
  }

  if (!caseData.stages[stageIndex].memorandum) {
    throw new customError("No memorandum found for this stage", 404);
  }

  if (!feedback || feedback.trim().length === 0) {
    throw new customError("Feedback is required for rejection", 400);
  }

  caseData.stages[stageIndex].memorandum.status = "Rejected";
  caseData.stages[stageIndex].memorandum.feedback = feedback;
  caseData.status = "UnderReview";

  await caseData.save();

  await ActivityLog.create({
    caseId: caseData._id,
    userId: req.user._id,
    action: "MEMORANDUM_REJECTED",
    description: `Memorandum rejected for stage ${stageIndex + 1} of case ${
      caseData.caseNumber
    }`,
  });

  res.status(200).json({
    success: true,
    message: "Memorandum rejected with feedback",
    data: caseData,
  });
});

export const getPendingApprovals = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const cases = await Case.find({
    approvingLawyer: req.user._id,
    status: "PendingApproval",
    archived: false,
  })
    .populate("clientId", "name contactNumber")
    .populate("assignedLawyer", "name email")
    .populate("secretary", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ updatedAt: -1 });

  const count = await Case.countDocuments({
    approvingLawyer: req.user._id,
    status: "PendingApproval",
    archived: false,
  });

  res.status(200).json({
    success: true,
    data: cases,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

export const getMyArchive = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = {
    $or: [{ assignedLawyer: req.user._id }, { approvingLawyer: req.user._id }],
    archived: true,
  };

  if (search) {
    query.$and = [
      {
        $or: [
          { caseNumber: { $regex: search, $options: "i" } },
          { caseType: { $regex: search, $options: "i" } },
        ],
      },
    ];
  }

  const cases = await Case.find(query)
    .populate("clientId", "name contactNumber")
    .populate("assignedLawyer", "name email")
    .populate("approvingLawyer", "name email")
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

export const getUpcomingHearings = asyncHandler(async (req, res) => {
  const cases = await Case.find({
    $or: [{ assignedLawyer: req.user._id }, { approvingLawyer: req.user._id }],
    archived: false,
  }).populate("clientId", "name contactNumber");

  const upcomingHearings = [];

  cases.forEach((caseData) => {
    caseData.stages.forEach((stage, index) => {
      if (stage.hearingDate && new Date(stage.hearingDate) >= new Date()) {
        upcomingHearings.push({
          caseId: caseData._id,
          caseNumber: caseData.caseNumber,
          caseType: caseData.caseType,
          clientName: caseData.clientId?.name,
          stageType: stage.stageType,
          stageNumber: stage.stageNumber,
          hearingDate: stage.hearingDate,
          hearingTime: stage.hearingTime,
        });
      }
    });
  });

  upcomingHearings.sort(
    (a, b) => new Date(a.hearingDate) - new Date(b.hearingDate)
  );

  res.status(200).json({
    success: true,
    data: upcomingHearings,
  });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalAssigned = await Case.countDocuments({
    assignedLawyer: req.user._id,
    archived: false,
  });

  const underReview = await Case.countDocuments({
    assignedLawyer: req.user._id,
    status: "UnderReview",
    archived: false,
  });

  const pendingApproval = await Case.countDocuments({
    assignedLawyer: req.user._id,
    status: "PendingApproval",
    archived: false,
  });

  const approved = await Case.countDocuments({
    assignedLawyer: req.user._id,
    status: "Approved",
    archived: false,
  });

  const pendingMyApproval = await Case.countDocuments({
    approvingLawyer: req.user._id,
    status: "PendingApproval",
    archived: false,
  });

  const cases = await Case.find({
    $or: [{ assignedLawyer: req.user._id }, { approvingLawyer: req.user._id }],
    archived: false,
  }).populate("clientId", "name");

  const upcomingHearings = [];
  cases.forEach((caseData) => {
    caseData.stages.forEach((stage) => {
      if (stage.hearingDate && new Date(stage.hearingDate) >= new Date()) {
        upcomingHearings.push({
          caseNumber: caseData.caseNumber,
          clientName: caseData.clientId?.name,
          stageType: stage.stageType,
          hearingDate: stage.hearingDate,
          hearingTime: stage.hearingTime,
        });
      }
    });
  });

  upcomingHearings.sort(
    (a, b) => new Date(a.hearingDate) - new Date(b.hearingDate)
  );

  const recentActivity = await ActivityLog.find({
    userId: req.user._id,
  })
    .populate("caseId", "caseNumber")
    .sort({ timestamp: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    data: {
      totalAssigned,
      underReview,
      pendingApproval,
      approved,
      pendingMyApproval,
      upcomingHearings: upcomingHearings.slice(0, 5),
      recentActivity,
    },
  });
});

export const addCaseNote = asyncHandler(async (req, res) => {
  const { note } = req.body;

  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (
    caseData.assignedLawyer?.toString() !== req.user._id.toString() &&
    caseData.approvingLawyer?.toString() !== req.user._id.toString()
  ) {
    throw new customError("Not authorized to add note", 403);
  }

  caseData.notes.push({
    text: note,
    addedBy: req.user._id,
  });

  await caseData.save();

  res.status(200).json({
    success: true,
    message: "Note added successfully",
    data: caseData,
  });
});

export const getMyReminders = asyncHandler(async (req, res) => {
  const { upcoming } = req.query;

  const query = {
    recipients: req.user._id,
  };

  if (upcoming === "true") {
    query.reminderDate = { $gte: new Date() };
    query.sent = false;
  }

  const reminders = await Reminder.find(query)
    .populate("caseId", "caseNumber caseType")
    .sort({ reminderDate: 1 });

  res.status(200).json({
    success: true,
    data: reminders,
  });
});

export const getCaseTimeline = asyncHandler(async (req, res) => {
  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    throw new customError("Case not found", 404);
  }

  if (
    caseData.assignedLawyer?.toString() !== req.user._id.toString() &&
    caseData.approvingLawyer?.toString() !== req.user._id.toString()
  ) {
    throw new customError("Not authorized to view this case", 403);
  }

  const activities = await ActivityLog.find({
    caseId: req.params.id,
  })
    .populate("userId", "name email")
    .sort({ timestamp: 1 });

  res.status(200).json({
    success: true,
    data: activities,
  });
});
