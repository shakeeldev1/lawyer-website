// src/pages/MyCases.jsx
import React, { useEffect, useState } from "react";
import CasesTable from "../components/LawyerCases/CasesTable";
import CaseDetails from "../components/LawyerCases/CaseDetails";

// Dummy cases data
const dummyCases = [
  {
    id: 1,
    clientName: "John Doe",
    caseNumber: "C123",
    stages: [
      {
        stage: "Main",
        secretaryDocuments: ["ClientForm.pdf", "Evidence1.pdf"],
        memorandum: { status: "Approved", file: "MemoMain.pdf", ragabFeedback: "Approved", mdSigned: true },
        hearingDate: "2025-11-15",
      },
      {
        stage: "Appeal",
        applied: true,
        secretaryDocuments: ["AppealForm.pdf", "EvidenceAppeal.pdf"],
        memorandum: { status: "Submitted", file: "MemoAppeal.pdf", ragabFeedback: "Pending", mdSigned: false },
        hearingDate: "2025-12-01",
      },
      {
        stage: "Cassation",
        applied: false,
        secretaryDocuments: [],
        memorandum: { status: "Locked", file: null, ragabFeedback: null, mdSigned: false },
        hearingDate: "2026-01-15",
      },
    ],
  },
  {
    id: 2,
    clientName: "Jane Smith",
    caseNumber: "C124",
    stages: [
      {
        stage: "Main",
        secretaryDocuments: ["FormA.pdf", "EvidenceX.pdf"],
        memorandum: { status: "Approved", file: "MemoA.pdf", ragabFeedback: "Approved", mdSigned: true },
        hearingDate: "2025-10-20",
      },
      {
        stage: "Appeal",
        applied: true,
        secretaryDocuments: ["AppealFormB.pdf"],
        memorandum: { status: "Pending", file: null, ragabFeedback: null, mdSigned: false },
        hearingDate: "2025-11-15",
      },
    ],
  },
];

export default function MyCases() {
  const [cases, setCases] = useState(dummyCases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Sync sidebar state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
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

  // Delete case function
  const handleDeleteCase = (id) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    if (selectedCase?.id === id) setSelectedCase(null); // Close modal if deleting selected case
  };

  return (
    <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}`}
    >
      {/* Page Header */}
      <div className="text-center md:text-left mt-20 mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
          My Cases
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Manage case stages, documents, and client updates.
        </p>
      </div>

      {/* Cases Table */}
      <CasesTable
        cases={cases}
        onSelectCase={setSelectedCase}
        onDeleteCase={handleDeleteCase}
      />

      {/* Case Details Modal */}
      {selectedCase && (
        <CaseDetails
          selectedCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          updateCases={setCases}
          cases={cases}
        />
      )}
    </div>
  );
}
