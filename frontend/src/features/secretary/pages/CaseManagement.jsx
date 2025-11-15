import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import CaseFilters from "../components/cases/CaseFilters";
import CaseTable from "../components/cases/CaseTable";
import AddCase from "../components/cases/AddCase";
import dummyCases from "../../../data/dummyCases";
import ViewCaseModal from "../components/cases/ViewCaseModal";

const CaseManagement = () => {
  const [cases, setCases] = useState(dummyCases);
  const [filteredCases, setFilteredCases] = useState(dummyCases);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCaseData, setEditCaseData] = useState(null);
  const [viewCase, setViewCase] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Improved sidebar resize handling (same as Archive component)
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    const handleSidebarToggle = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) setSidebarOpen(sidebar.classList.contains('w-64'));
    };
    
    window.addEventListener('resize', handleResize);
    const interval = setInterval(handleSidebarToggle, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const handleViewCase = (caseId) => {
    const caseToView = cases.find(c => c.id === caseId);
    console.log("success");
    setViewCase(caseToView);
  };

  const handleFilterChange = (filters) => {
    const filtered = cases.filter((c) => {
      const matchesSearch =
        !filters.search ||
        c.client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || c.case.status === filters.status;
      const matchesLawyer = !filters.lawyer || c.case.assignedLawyer === filters.lawyer;
      return matchesSearch && matchesStatus && matchesLawyer;
    });
    setFilteredCases(filtered);
  };

  const handleClearFilters = () => setFilteredCases(cases);

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
    setCases((prev) =>
      prev.some((c) => c.id === updatedCase.id)
        ? prev.map((c) => (c.id === updatedCase.id ? updatedCase : c))
        : [...prev, updatedCase]
    );

    setFilteredCases((prev) =>
      prev.some((c) => c.id === updatedCase.id)
        ? prev.map((c) => (c.id === updatedCase.id ? updatedCase : c))
        : [...prev, updatedCase]
    );

    setShowAddModal(false);
    setEditCaseData(null);
  };

  return (
    <div 
      className={`max-w-6xl min-h-screen transition-all duration-300 ease-in-out mt-16 sm:px-2 md:px-6 lg:px-2 py-3 sm:py-4 md:py-5 ${
        sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'
      }`}
    >
      {/* Header - Updated to match Archive styling */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 pl-5">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1c283c]">Case Management</h2>
          <p className="text-slate-600 mt-1">{filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found</p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-[#11408bee] hover:bg-[#0f3674] text-white px-4 py-2 rounded-lg transition-all"
          >
            <Plus size={18} /> Add Case
          </button>
        </div>
      </div>

      <CaseFilters onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

      <CaseTable
        sidebarOpen={sidebarOpen}
        cases={filteredCases}
        onEditCase={handleEditCase}
        onViewCase={handleViewCase}
      />

      {/* VIEW MODAL */}
      <ViewCaseModal caseData={viewCase} onClose={() => setViewCase(null)} />
          
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