import React, { useState, useEffect } from "react";
import AddCaseModal from "../components/dashboardCaseManagement/AddCaseModal";
import CaseTimelineModal from "../components/dashboardCaseManagement/CaseTimelineModal";
import CasesTable from "../components/dashboardCaseManagement/CasesTable";
import CasesHeader from "../components/dashboardCaseManagement/CaseHeader";
import DeleteCaseModal from "../components/dashboardCaseManagement/DeleteCaseModal";
import { useGetAllCasesQuery } from "../api/directorApi";

const AllCases = () => {
  const { data, isLoading, isError } = useGetAllCasesQuery();

  const apiCases = data?.data || [];

  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  // Sync sidebar state
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  // 🔥 Update cases when API loads
  useEffect(() => {
    if (apiCases.length) {
      setCases(apiCases);
    }
  }, [apiCases]);

  // 🔎 Search + Stage Filtering (unchanged)
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = filterStage === "All" || c.stage === filterStage;

    return matchesSearch && matchesStage;
  });

  const handleViewTimeline = (caseItem) => {
    setSelectedCase(caseItem);
    setShowTimelineModal(true);
  };

  const handleDeleteClick = (caseItem) => {
    setCaseToDelete(caseItem);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (id) => {
    setCases((prev) => prev.filter((c) => c._id !== id));
    setShowDeleteModal(false);
  };

  return (
    <div
      className={`min-h-screen 
        px-3 sm:px-4 md:px-6 lg:px-2
        py-3 sm:py-4 md:py-5 
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}`}
    >
      {/* Header Section */}
      <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
        <CasesHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStage={filterStage}
          setFilterStage={setFilterStage}
          onAddClick={() => setShowAddModal(true)}
        />
      </div>

      {/* Loading & Error */}
      {isLoading && (
        <p className="text-center text-gray-400 py-10 text-xl">Loading cases...</p>
      )}

      {isError && (
        <p className="text-center text-red-500 py-10 text-xl">Failed to load cases</p>
      )}

      {/* Table Section */}
      {!isLoading && !isError && (
        <CasesTable
          cases={filteredCases}
          onView={handleViewTimeline}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Modals */}
      {showAddModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 px-3 sm:px-4 md:px-6
          ${sidebarOpen ? "lg:pl-64" : "lg:pl-0"} transition-all duration-300`}
        >
          <AddCaseModal onCancel={() => setShowAddModal(false)} />
        </div>
      )}

      {showTimelineModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 px-3 sm:px-4 md:px-6
          ${sidebarOpen ? "lg:pl-64" : "lg:pl-0"} transition-all duration-300`}
        >
          <CaseTimelineModal
            isOpen={showTimelineModal}
            onClose={() => setShowTimelineModal(false)}
            caseData={selectedCase}
          />
        </div>
      )}

      {showDeleteModal && (
        <DeleteCaseModal
          caseData={caseToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => handleConfirmDelete(caseToDelete?._id)}
        />
      )}
    </div>
  );
};

export default AllCases;
