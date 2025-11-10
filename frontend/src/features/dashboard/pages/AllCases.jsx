import React, { useState, useEffect } from "react";
import AddCaseModal from "../components/dashboardCaseManagement/AddCaseModal";
import CaseTimelineModal from "../components/dashboardCaseManagement/CaseTimelineModal";
import CasesTable from "../components/dashboardCaseManagement/CasesTable";
import CasesHeader from "../components/dashboardCaseManagement/CaseHeader";
import DeleteCaseModal from "../components/dashboardCaseManagement/DeleteCaseModal";

const AllCases = ({ casesData = [] }) => {
  const dummyCases = [
    {
      id: 1,
      caseNumber: "C-2025-001",
      clientName: "Ahmed Ali",
      stage: "Main Case",
      lawyer: "Lawyer A",
      status: "Submitted",
      lastUpdated: "2025-11-05",
      stages: [
        {
          title: "Main Case",
          lawyer: "Lawyer A",
          status: "Submitted",
          approvedByRagab: true,
          directorSigned: false,
          hearingDate: "2025-11-10",
          documentsCount: 4,
          lastUpdated: "2025-11-05",
        },
      ],
    },
    {
      id: 2,
      caseNumber: "C-2025-002",
      clientName: "Sara Khan",
      stage: "Appeal",
      lawyer: "Lawyer B",
      status: "Awaiting Approval",
      lastUpdated: "2025-11-06",
      stages: [
        {
          title: "Appeal",
          lawyer: "Lawyer B",
          status: "Awaiting Approval",
          approvedByRagab: false,
          directorSigned: false,
          hearingDate: "2025-11-20",
          documentsCount: 2,
          lastUpdated: "2025-11-06",
        },
      ],
    },
  ];

  const [cases, setCases] = useState(casesData.length ? casesData : dummyCases);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [caseToDelete, setCaseToDelete] = useState(null);



  // ✅ Sync with sidebar state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      // Listen for sidebar state changes from the sidebar component
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        const isOpen = sidebar.classList.contains('w-64');
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Check sidebar state periodically (you can use a better state management approach)
    const interval = setInterval(handleSidebarToggle, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === "All" || c.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const handleAddCase = (newCase) => {
    const formattedCase = {
      id: cases.length + 1,
      ...newCase,
      lastUpdated: new Date().toISOString().split("T")[0],
      stages: [
        {
          title: newCase.stage,
          lawyer: newCase.lawyer,
          status: newCase.status,
          approvedByRagab: false,
          directorSigned: false,
          hearingDate: newCase.hearingDate,
          documentsCount: 0,
          lastUpdated: new Date().toISOString().split("T")[0],
        },
      ],
    };
    setCases((prev) => [...prev, formattedCase]);
    setShowAddModal(false);
  };

  const handleViewTimeline = (caseItem) => {
    setSelectedCase(caseItem);
    setShowTimelineModal(true);
  };

  const handleDeleteClick = (caseItem) => {
  setCaseToDelete(caseItem);
  setShowDeleteModal(true);
};

const handleConfirmDelete = (id) => {
  setCases((prev) => prev.filter((c) => c.id !== id));
  setShowDeleteModal(false);
};

  return (
    <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
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

      {/* Table Section */}
      <div className="w-full">
        <CasesTable cases={filteredCases} onView={handleViewTimeline}  onDelete={handleDeleteClick}/>
      </div>

      {/* Modals */}
      {showAddModal && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 px-3 sm:px-4 md:px-6
          ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'} transition-all duration-300`}>
          <AddCaseModal
            onCancel={() => setShowAddModal(false)}
            onSubmit={handleAddCase}
          />
        </div>
      )}

      {showTimelineModal && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 px-3 sm:px-4 md:px-6
          ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'} transition-all duration-300`}>
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
    onConfirm={handleConfirmDelete}
  />
)}
    </div>
  );
};

export default AllCases;