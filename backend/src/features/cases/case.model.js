import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    caseNumber: { type: String, unique: true, required: true },
    caseType: { type: String, enum: ['Main', 'Appeal', 'Cassation'], required: true },

    clientName: { type: String, required: true },
    clientContactNumber: { type: String },
    clientEmail: { type: String },
    clientAddress: { type: String },
    clientNotes: { type: String },

    assignedLawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    secretary: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ragab: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    directorSigned: { type: Boolean, default: false },

    stages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CaseStage' }],
    status: {
        type: String,
        enum: ['Draft', 'UnderReview', 'ApprovedByRagab', 'SignedByDirector', 'SubmittedToCourt', 'Archived'],
        default: 'Draft'
    },
}, { timestamps: true })

const Case = mongoose.model('Case', caseSchema);
export default Case;