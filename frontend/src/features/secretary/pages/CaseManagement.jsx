import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import CaseFilters from "../components/cases/CaseFilters";
import CaseTable from "../components/cases/CaseTable";
import AddCase from "../components/cases/AddCase";
import ViewCaseModal from "../components/cases/ViewCaseModal";
import CaseDeleteModal from "../components/cases/CaseDeleteModal";
import ArchiveCaseModal from "../components/cases/ArchiveCaseModal";
import AddReminderModal from "../components/cases/AddReminderModal";
import AddHearingDateModal from "../components/cases/AddHearingDateModal";
import AssignLawyerModal from "../components/cases/AssignLawyerModal";
import {
  useGetAllCasesQuery,
  useUpdateCaseMutation,
  useArchiveCaseMutation,
  useDeleteCaseMutation,
} from "../api/secretaryApi";
import { toast } from "react-toastify";

const CaseManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [lawyerFilter, setLawyerFilter] = useState("");

  // Fetch cases from API
  const {
    data: casesData,
    isLoading,
    error,
  } = useGetAllCasesQuery({
    search: searchQuery,
    limit: 100,
  });
  const [updateCase] = useUpdateCaseMutation();
  const [archiveCaseMutation] = useArchiveCaseMutation();
  const [deleteCaseMutation] = useDeleteCaseMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editCaseData, setEditCaseData] = useState(null);
  const [viewCase, setViewCase] = useState(null);
  const [deleteCase, setdeleteCase] = useState(null);
  const [archiveCase, setarchiveCase] = useState(null);
  const [reminderCase, setReminderCase] = useState(null);
  const [hearingCase, setHearingCase] = useState(null);
  const [assignLawyerCase, setAssignLawyerCase] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Transform API data to component format
  const cases = React.useMemo(() => {
    if (!casesData?.data) return [];

    return casesData.data.map((c) => ({
      id: c._id,
      _id: c._id, // Keep original _id for API operations
      client: {
        name: c.clientId?.name || "",
        contact: c.clientId?.contactNumber || "",
        email: c.clientId?.email || "",
        nationalId: c.clientId?.nationalId || "",
        address: c.clientId?.address || "",
        additionalInformation: c.clientId?.additionalInfo || "",
      },
      case: {
        caseNumber: c.caseNumber,
        caseType: c.caseType,
        description: c.caseDescription,
        assignedLawyer: c.assignedLawyer?.name || "Not Assigned",
        assignedLawyerId: c.assignedLawyer?._id || "", // Keep lawyer ID for editing
        hearingDate: c.hearingDate || "",
        filingDate: c.createdAt?.slice(0, 10) || "",
        status: c.status || "Pending",
        stage: c.stages?.[0]?.stageType || "Main Case",
        documents: c.documents || [],
      },
      stages: c.stages || [],
    }));
  }, [casesData]);

  // Filter cases based on status and lawyer filters (client-side)
  const filteredCases = React.useMemo(() => {
    return cases.filter((c) => {
      const matchesStatus = !statusFilter || c.case.status === statusFilter;
      const matchesLawyer =
        !lawyerFilter || c.case.assignedLawyer === lawyerFilter;
      return matchesStatus && matchesLawyer;
    });
  }, [cases, statusFilter, lawyerFilter]);

  // Improved sidebar resize handling (same as Archive component)
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const width = sidebar.offsetWidth;
        setSidebarOpen(width > 100);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  // Add delete handler function
  const handleDeleteCase = (caseId) => {
    const caseToDelete = cases.find((c) => c.id === caseId);
    setdeleteCase(caseToDelete);
  };

  // Add confirm delete function
  const handleConfirmDelete = async () => {
    if (deleteCase) {
      try {
        await deleteCaseMutation(deleteCase.id).unwrap();
        toast.success("Case deleted successfully");
        setdeleteCase(null);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete case");
      }
    }
  };
  // Archive handlers
  const handleArchiveCase = (caseId) => {
    const caseToArchive = cases.find((c) => c.id === caseId);
    setarchiveCase(caseToArchive);
  };

  const handleConfirmArchive = async () => {
    if (archiveCase) {
      try {
        await archiveCaseMutation(archiveCase.id).unwrap();
        toast.success("Case archived successfully");
        setarchiveCase(null);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to archive case");
      }
    }
  };

  const handleViewCase = (caseId) => {
    const caseToView = cases.find((c) => c.id === caseId);
    console.log("success");
    setViewCase(caseToView);
  };

  const handleFilterChange = (filters) => {
    // Update search query for API filtering
    setSearchQuery(filters.search || "");
    // Update status and lawyer for client-side filtering
    setStatusFilter(filters.status || "");
    setLawyerFilter(filters.lawyer || "");
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setLawyerFilter("");
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditCaseData(null);
    setShowAddModal(true);
  };

  // Open Edit Modal
  const handleEditCase = (caseId) => {
    const caseToEdit = cases.find((c) => c.id === caseId);
    setEditCaseData(caseToEdit);
    setShowAddModal(true);
  };

  // Add or update case
  const handleAddOrUpdateCase = (updatedCase) => {
    // Just close the modal - RTK Query will automatically refetch and update
    setShowAddModal(false);
    setEditCaseData(null);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ease-in-out pt-16 px-2 py-3 sm:px-3 mt-8 sm:py-4 ${
        sidebarOpen ? "md:ml-52 ml-0" : "md:ml-14 ml-0"
      }`}
    >
      {/* Header - Compact and minimalist */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-3 gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Case Management
          </h2>
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">
            {filteredCases.length} case{filteredCases.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 bg-[#11408bee] hover:bg-[#0f3674] text-white px-3 py-1.5 rounded-lg transition-all text-xs"
          >
            <Plus size={14} /> Add Case
          </button>
        </div>
      </div>

      <CaseFilters
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Loading & Error States */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800"></div>
        </div>
      )}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 text-xs font-medium">
            Error loading cases
          </p>
          <p className="text-red-500 text-xs mt-1">
            {error?.data?.message || "Something went wrong"}
          </p>
        </div>
      )}

      {!isLoading && (
        <CaseTable
          sidebarOpen={sidebarOpen}
          cases={filteredCases}
          onEditCase={handleEditCase}
          onViewCase={handleViewCase}
          onDeleteCase={handleDeleteCase}
          onArchive={handleArchiveCase}
          onAddReminder={(caseData) => setReminderCase(caseData)}
          onScheduleHearing={(caseData) => setHearingCase(caseData)}
          onAssignLawyer={(caseData) => setAssignLawyerCase(caseData)}
        />
      )}

      {/* VIEW MODAL */}
      <ViewCaseModal caseData={viewCase} onClose={() => setViewCase(null)} />

      <CaseDeleteModal
        isOpen={!!deleteCase}
        caseItem={deleteCase}
        onClose={() => setdeleteCase(null)}
        onConfirm={handleConfirmDelete}
      />
      <ArchiveCaseModal
        isOpen={!!archiveCase}
        caseItem={archiveCase}
        onClose={() => setarchiveCase(null)}
        onConfirm={handleConfirmArchive}
      />

      {/* ADD REMINDER MODAL */}
      <AddReminderModal
        isOpen={!!reminderCase}
        onClose={() => setReminderCase(null)}
        caseData={reminderCase}
      />

      {/* ADD HEARING DATE MODAL */}
      <AddHearingDateModal
        isOpen={!!hearingCase}
        onClose={() => setHearingCase(null)}
        caseData={hearingCase}
      />

      {/* ASSIGN LAWYER MODAL */}
      <AssignLawyerModal
        isOpen={!!assignLawyerCase}
        onClose={() => setAssignLawyerCase(null)}
        caseData={assignLawyerCase}
      />

      <AddCase
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditCaseData(null);
        }}
        onAddCase={handleAddOrUpdateCase}
        caseData={editCaseData}
      />
    </div>
  );
};

export default CaseManagement;
