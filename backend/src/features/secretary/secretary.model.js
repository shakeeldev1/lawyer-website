import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const caseStageSchema = new mongoose.Schema({
  stageType: {
    type: String,
    enum: ["Main", "Appeal", "Cassation"],
    required: true,
  },
  stageNumber: { type: Number, required: true },
  documents: [documentSchema],
  memorandum: {
    content: String,
    fileUrl: String,
    preparedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    preparedAt: Date,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
    feedback: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  hearingDate: Date,
  hearingTime: String,
  courtSubmissionProof: String,
  status: {
    type: String,
    enum: ["InProgress", "Approved", "Submitted", "Completed"],
    default: "InProgress",
  },
  createdAt: { type: Date, default: Date.now },
});

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: String,
    address: String,
    nationalId: String,
    additionalInfo: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const caseSchema = new mongoose.Schema(
  {
    caseNumber: { type: String, unique: true, required: true },
    courtCaseId: { type: String, default: "" }, // Court-assigned case ID after submission
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    caseType: { type: String, required: true },
    caseDescription: String,
    documents: [documentSchema],
    assignedLawyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedAt: Date,
    approvingLawyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    secretary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stages: [caseStageSchema],
    currentStage: { type: Number, default: 0 },
    directorSignature: {
      signedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      signedAt: Date,
      signatureUrl: String,
    },
    status: {
      type: String,
      enum: [
        "Draft",
        "Assigned",
        "UnderReview",
        "PendingApproval",
        "Approved",
        "PendingSignature",
        "ReadyForSubmission",
        "Submitted",
        "Archived",
      ],
      default: "Draft",
    },
    archived: { type: Boolean, default: false },
    archivedAt: Date,
    archivedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modificationRequests: [
      {
        requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        note: String,
        requestedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const reminderSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    reminderType: {
      type: String,
      enum: ["Submission", "Hearing"],
      required: true,
    },
    reminderDate: { type: Date, required: true },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    message: String,
    sent: { type: Boolean, default: false },
    sentAt: Date,
  },
  { timestamps: true }
);

const activityLogSchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  description: String,
  timestamp: { type: Date, default: Date.now },
});

export const Client = mongoose.model("Client", clientSchema);
export const Case = mongoose.model("Case", caseSchema);
export const Reminder = mongoose.model("Reminder", reminderSchema);
export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
