import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import DetailsTab from "../components/LawyerCases/DetailsTab";
import DocumentsTab from "../components/LawyerCases/DocumentsTab";
import MemorandumTab from "../components/LawyerCases/MemorandumTab";
import CasesTable from "../components/LawyerCases/CasesTable";
import DeleteModal from "../components/LawyerCases/DeleteModal";

// ✅ Dummy data
const initialCases = [
  {
    id: "C-2024-001",
    caseNumber: "C-2024-001",
    clientName: "Johnathan Davis",
    clientEmail: "john.davis@example.com",
    clientPhone: "+1 555-1234",
    caseType: "Commercial Litigation",
    assignedStage: "Appeal",
    status: "Pending Lawyer Review",
    assignedTo: "lawyer1",
    documents: {
      Main: [
        { id: 1, title: "Client ID.pdf", uploadedAt: "2025-10-10 10:12", url: "#" },
        { id: 2, title: "ContractAgreement.pdf", uploadedAt: "2025-10-10 10:15", url: "#" },
      ],
      Appeal: [{ id: 4, title: "AppealDocs.pdf", uploadedAt: "2025-10-11 11:00", url: "#" }],
      Cassation: [],
    },
    memorandum: {
      Main: {
        file: { title: "MainMemorandum.pdf", uploadedAt: "2025-10-05 09:00", fileObj: null },
        status: "Approved by Ragab",
        lastUpdated: "2025-10-05 09:00",
        history: [
          { actor: "Lawyer", action: "Uploaded", timestamp: "2025-10-05T09:00:00" },
          { actor: "Ragab", action: "Approved", timestamp: "2025-10-06T11:00:00" },
        ],
      },
      Appeal: {
        file: { title: "AppealDraft.pdf", uploadedAt: "2025-10-11 10:30", fileObj: null },
        status: "Pending Lawyer Review",
        lastUpdated: "2025-10-11 10:30",
        history: [
          { actor: "Lawyer", action: "Uploaded draft", timestamp: "2025-10-11T10:30:00" },
        ],
      },
      Cassation: null,
    },
    stages: [
      { type: "Main", completed: true, date: "2024-12-05" },
      { type: "Appeal", completed: false, date: "2025-10-10" },
      { type: "Cassation", completed: false, date: null },
    ],
    hearing: { nextHearing: "2025-11-20T10:00:00", courtroom: "Courtroom 5", reminderSet: true },
    activityLog: [
      { actor: "Secretary", action: "Created client file and uploaded initial docs", timestamp: "2025-10-10T10:20:00" },
      { actor: "System", action: "Assigned to lawyer1", timestamp: "2025-10-10T10:25:00" },
    ],
    archived: false,
  },

  {
    id: "C-2024-014",
    caseNumber: "C-2024-014",
    clientName: "Ahmed Ali",
    clientEmail: "ahmed.ali@example.com",
    clientPhone: "+92 300-1234567",
    caseType: "Civil",
    assignedStage: "Main",
    status: "Under Revision by Ragab",
    assignedTo: "lawyer1",
    documents: {
      Main: [
        { id: 1, title: "CivilForm.pdf", uploadedAt: "2025-10-12 09:05", url: "#" },
        { id: 2, title: "Evidence.zip", uploadedAt: "2025-10-12 09:10", url: "#" },
      ],
      Appeal: [],
      Cassation: [],
    },
    memorandum: {
      Main: {
        file: { title: "CivilMemorandum.pdf", uploadedAt: "2025-10-13 15:00", fileObj: null },
        status: "Under Revision by Ragab",
        lastUpdated: "2025-10-14 11:00",
        history: [
          { actor: "Lawyer", action: "Sent to Ragab", timestamp: "2025-10-13T15:00:00" },
          { actor: "Ragab", action: "Requested modifications", timestamp: "2025-10-14T11:00:00" },
        ],
      },
      Appeal: null,
      Cassation: null,
    },
    stages: [
      { type: "Main", completed: true, date: "2024-12-05" },
      { type: "Appeal", completed: false, date: "2025-10-10" },
      { type: "Cassation", completed: false, date: null },
    ],
    hearing: { nextHearing: null, courtroom: null, reminderSet: false },
    activityLog: [
      { actor: "Secretary", action: "Assigned to lawyer1", timestamp: "2025-10-12T09:20:00" },
    ],
    archived: false,
  },
];

export default function MyCases() {
  const currentUserId = "lawyer1";
  const [cases, setCases] = useState(initialCases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");
  const [selectedStage, setSelectedStage] = useState("Main");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

  const openCase = (c) => {
    setSelectedCase(c);
    setActiveTab("Details");
    setSelectedStage(c.assignedStage);
  };

  const closeCase = () => setSelectedCase(null);

  const updateCaseMemorandum = (stage, updatedMemo) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === selectedCase.id
          ? { ...c, memorandum: { ...c.memorandum, [stage]: updatedMemo } }
          : c
      )
    );
    setSelectedCase((prev) => ({
      ...prev,
      memorandum: { ...prev.memorandum, [stage]: updatedMemo },
    }));
  };

  // Delete handlers
  const handleDeleteClick = (c) => {
    setCaseToDelete(c);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setCases((prev) => prev.filter((c) => c.id !== caseToDelete.id));
    setDeleteModalOpen(false);
    setCaseToDelete(null);
    if (selectedCase?.id === caseToDelete.id) closeCase();
  };

  return (
   <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      <div className="max-w-7xl mx-auto mt-20">
        <header className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold">My Assigned Cases</h1>
            <p className="text-sm text-slate-600">
              Workspace for lawyers — review documents, manage workflow.
            </p>
          </div>
        </header>

        <CasesTable
          cases={cases.filter((c) => c.assignedTo === currentUserId)}
          onOpen={openCase}
          onDelete={handleDeleteClick} // pass delete handler
        />

       {selectedCase && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60">
    <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-transform duration-300 scale-100 md:scale-100">
      
      {/* Header */}
      <div className="flex justify-between items-start px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-2xl">
        <div>
          <h2 className="font-bold text-xl md:text-2xl">{selectedCase.caseNumber}</h2>
          <p className="text-sm md:text-base text-slate-200 mt-1">
            {selectedCase.clientName} • {selectedCase.caseType}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-3 py-2 rounded border text-sm bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            {["Main", "Appeal", "Cassation"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={closeCase}
            className="p-2 rounded hover:bg-slate-600 transition"
          >
            <FiX size={24} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 bg-white sticky top-0 z-20">
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          {["Details", "Documents", "Memorandum"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-2 px-2 text-sm md:text-base font-medium transition ${
                activeTab === t
                  ? "border-b-2 border-slate-800 text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        {activeTab === "Details" && <DetailsTab selectedCase={selectedCase} />}
        {activeTab === "Documents" && (
          <DocumentsTab selectedCase={selectedCase} selectedStage={selectedStage} />
        )}
        {activeTab === "Memorandum" && (
          <MemorandumTab
            selectedCase={selectedCase}
            selectedStage={selectedStage}
            updateCaseMemorandum={updateCaseMemorandum}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end px-6 py-4 border-t  sticky bottom-0 ">
        <button
          onClick={closeCase}
          className="px-5 py-2 rounded-md border text-slate-800 hover:bg-slate-50 transition font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        {/* Delete Modal */}
        {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={handleDeleteConfirm}
            caseName={caseToDelete?.caseNumber}
          />
        )}
      </div>
    </div>
  );
}
