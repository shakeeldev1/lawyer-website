import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import FinalApprovalTable from "../components/DashboardFinalApproval/FinalApprovalTable";
import FinalApprovalsViewModal from "../components/DashboardFinalApproval/FinalApprovalsViewModal";
import FeedbackModal from "../components/DashboardFinalApproval/FeedbackModal";
import ConfirmationModal from "../components/DashboardFinalApproval/ConfirmationModal";
import FinalApprovalHeader from "../components/DashboardFinalApproval/FinalApprovalHeader";
import DeleteConfirmationModal from "../components/DashboardFinalApproval/DeleteConfirmationModal";
import { useGetAllCasesQuery } from "../api/directorApi";

const FinalApprovals = () => {
  const { data, isLoading, isError } = useGetAllCasesQuery();
  const allCases = data?.data || [];

  const [selectedCase, setSelectedCase] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [deleteCase, setDeleteCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

   useEffect(() => {
     const handleResize = () => {
       const desktop = window.innerWidth >= 1024;
       setSidebarOpen(desktop);
     };
 
     const handleSidebarToggle = () => {
       const sidebar = document.querySelector('aside');
       if (sidebar) {
         const isOpen = sidebar.classList.contains('w-64');
         setSidebarOpen(isOpen);
       }
     };
 
     window.addEventListener('resize', handleResize);
 
     const interval = setInterval(handleSidebarToggle, 100);
 
     return () => {
       window.removeEventListener('resize', handleResize);
       clearInterval(interval);
     };
   }, []);

  // Filter cases that require final approval
  const pendingCases = allCases.filter((c) =>
    ["Draft", "Pending Review"].includes(c.status)
  );

  // Apply search filter
  const filteredCases = pendingCases.filter(
    (c) =>
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.assignedLawyer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.stages?.some((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApprove = (caseItem) => {
    // TODO: call API to approve case
    setConfirmation(
      `✅ Case ${caseItem.caseNumber} has been approved and digitally signed.`
    );
    setSelectedCase(null);
  };

  const handleRequestChanges = (caseItem) => {
    setSelectedCase(caseItem);
    setShowFeedbackModal(true);
  };

  const submitFeedback = (feedbackText) => {
    // TODO: call API to submit feedback
    setConfirmation(
      `🔁 Case ${selectedCase.caseNumber} returned for changes with feedback.`
    );
    setShowFeedbackModal(false);
    setSelectedCase(null);
  };

  const confirmDelete = (caseItem) => {
    // TODO: call API to delete case
    setConfirmation(`🗑️ Case ${caseItem.caseNumber} deleted successfully.`);
    setDeleteCase(null);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading Final Approvals...
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load cases. Try again later.</p>
    );

  return (
    <div
      className={`min-h-screen px-3 sm:px-4 md:px-6 lg:px-2 py-3 sm:py-4 md:py-5 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"
      }`}
    >
      {/* Header */}
      <FinalApprovalHeader onSearch={setSearchTerm} />

      {/* Table */}
      <FinalApprovalTable
        cases={filteredCases}
        onView={setSelectedCase}
        onDelete={(c) => setDeleteCase(c)}
      />

      {/* Modals */}
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

      {deleteCase && (
        <DeleteConfirmationModal
          caseItem={deleteCase}
          onCancel={() => setDeleteCase(null)}
          onConfirm={confirmDelete}
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
