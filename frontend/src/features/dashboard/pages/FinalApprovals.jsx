import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import FinalApprovalTable from "../components/DashboardFinalApproval/FinalApprovalTable";
import FinalApprovalsViewModal from "../components/DashboardFinalApproval/FinalApprovalsViewModal";
import FeedbackModal from "../components/DashboardFinalApproval/FeedbackModal";
import ConfirmationModal from "../components/DashboardFinalApproval/ConfirmationModal";
import FinalApprovalHeader from "../components/DashboardFinalApproval/FinalApprovalHeader";

const FinalApprovals = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setCases([
        {
          id: 1,
          caseNumber: "C-2025-001",
          clientName: "Ahmed Ali",
          lawyer: "Sara Khan",
          stage: "Main Case",
          status: "Pending Review",
          memorandum: "Memorandum for C-2025-001 — prepared by Sara Khan.",
          lastUpdated: "2025-11-05 09:42 AM",
        },
        {
          id: 2,
          caseNumber: "C-2025-002",
          clientName: "Bilal Hussain",
          lawyer: "Ali Raza",
          stage: "Appeal",
          status: "Pending Review",
          memorandum: "Appeal memorandum for C-2025-002 — prepared by Ali Raza.",
          lastUpdated: "2025-11-04 02:15 PM",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCases = cases.filter(
    (c) =>
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lawyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (caseItem) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseItem.id ? { ...c, status: "Approved & Signed" } : c
      )
    );
    setSelectedCase(null);
    setConfirmation(`✅ Case ${caseItem.caseNumber} has been approved and digitally signed.`);
  };

  const handleRequestChanges = (caseItem) => {
    setSelectedCase(caseItem);
    setShowFeedbackModal(true);
  };

  const submitFeedback = (feedbackText) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === selectedCase.id
          ? { ...c, status: "Returned for Changes", feedback: feedbackText }
          : c
      )
    );
    setShowFeedbackModal(false);
    setSelectedCase(null);
    setConfirmation("🔁 Case returned for changes successfully with your feedback.");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading Final Approvals...
      </div>
    );

  return (
    <div className="p-6">
      {/* ✅ Header */}
      <FinalApprovalHeader onSearch={setSearchTerm} />

      {/* ✅ Filtered Table */}
      <FinalApprovalTable cases={filteredCases} onView={setSelectedCase} />

      {/* ✅ Modals */}
      {selectedCase && !showFeedbackModal && (
        <FinalApprovalsViewModal
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
          onApprove={handleApprove}
          onRequestChanges={handleRequestChanges}
        />
      )}

      {showFeedbackModal && (
        <FeedbackModal
          onCancel={() => setShowFeedbackModal(false)}
          onSubmit={submitFeedback}
        />
      )}

      {confirmation && (
        <ConfirmationModal
          message={confirmation}
          onClose={() => setConfirmation("")}
        />
      )}
    </div>
  );
};

export default FinalApprovals;
