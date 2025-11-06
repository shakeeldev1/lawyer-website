import React, { useState } from "react";
import AddCaseModal from "../components/dashboardCaseManagement/AddCaseModal";
import CaseTimelineModal from "../components/dashboardCaseManagement/CaseTimelineModal";
import CasesTable from "../components/dashboardCaseManagement/CasesTable";
import CasesHeader from "../components/dashboardCaseManagement/CaseHeader";

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

  return (
    <div className="p-8 min-h-screen">
      <CasesHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStage={filterStage}
        setFilterStage={setFilterStage}
        onAddClick={() => setShowAddModal(true)}
      />

      {/* Table Section */}
      <CasesTable cases={filteredCases} onView={handleViewTimeline} />

      {/* Modals */}
      {showAddModal && (
        <AddCaseModal
          onCancel={() => setShowAddModal(false)}
          onSubmit={handleAddCase}
        />
      )}
      {showTimelineModal && (
        <CaseTimelineModal
          isOpen={showTimelineModal}
          onClose={() => setShowTimelineModal(false)}
          caseData={selectedCase}
        />
      )}
    </div>
  );
};

export default AllCases;
