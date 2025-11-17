import React, { useState, useMemo, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import ApprovedLawyerCasesTable from "../components/ApprovedLawyerPage/ApprovedLawyerCasesTable";
import ApprovedLawyerViewModal from "../components/ApprovedLawyerPage/ApprovedLawyerViewModal";
import ModificationModal from "../components/ApprovedLawyerPage/ModificationModal";
import DeleteModal from "../components/ApprovedLawyerPage/DeleteModal";

// Dummy data
const dummyCases = [
  {
    id: 1,
    caseNumber: "MC-2025-001",
    caseName: "Ahmed vs Ali",
    caseType: "Civil",
    assignedLawyer: "Lawyer A",
    status: "Pending",
    memorandums: [{ name: "memorandum1.pdf", url: "#" }],
    documents: [
      { name: "doc1.pdf", url: "#" },
      { name: "doc2.pdf", url: "#" },
    ],
    client: {
      name: "Ahmed",
      email: "ahmed@example.com",
      phone: "+923001234567",
      address: "Street 12, Karachi",
      additionalInfo: "VIP client",
    },
    notes: "Initial memorandum uploaded.",
    stageTimeline: ["Main", "Appeal", "Cassation"],
    currentStageIndex: 1,
    currentStage: "Appeal",
  },
   {
    id: 2,
    caseNumber: "MC-2025-001",
    caseName: "Ahmed vs Ali",
    caseType: "Civil",
    assignedLawyer: "Lawyer A",
    status: "Pending",
    memorandums: [{ name: "memorandum1.pdf", url: "#" }],
    documents: [
      { name: "doc1.pdf", url: "#" },
      { name: "doc2.pdf", url: "#" },
    ],
    client: {
      name: "Ahmed",
      email: "ahmed@example.com",
      phone: "+923001234567",
      address: "Street 12, Karachi",
      additionalInfo: "VIP client",
    },
    notes: "Initial memorandum uploaded.",
    stageTimeline: ["Main", "Appeal", "Cassation"],
    currentStageIndex: 1,
    currentStage: "Cassation",
  },
];

export default function ApprovedLawyerPage() {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
  const [cases, setCases] = useState(dummyCases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseToDelete, setCaseToDelete] = useState(null);

  const [isModificationModalOpen, setIsModificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [filterStage, setFilterStage] = useState("");
  const [search, setSearch] = useState("");
  const [modificationMessage, setModificationMessage] = useState("");

  const STAGES = ["Main", "Appeal", "Cassation"];

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

  // FILTER CASES
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchStage = filterStage === "" || c.currentStage === filterStage;
      const matchSearch =
        c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
        c.client.name.toLowerCase().includes(search.toLowerCase()) ||
        c.client.email.toLowerCase().includes(search.toLowerCase()) ||
        c.client.phone.toLowerCase().includes(search.toLowerCase());

      return matchStage && matchSearch;
    });
  }, [cases, filterStage, search]);

  // OPEN/CLOSE MODALS
  const openModal = (c) => setSelectedCase(c);

  const closeModal = () => {
    setSelectedCase(null);
  };

  const openModificationModal = () => {
    setModificationMessage("");
    setIsModificationModalOpen(true);
  };

  const closeModificationModal = () => setIsModificationModalOpen(false);
const openDeleteModal = (c) => {
  setCaseToDelete(c); // separate from selectedCase
  setIsDeleteModalOpen(true);
};

const closeDeleteModal = () => {
  setCaseToDelete(null);
  setIsDeleteModalOpen(false);
};

  // ACTION HANDLERS
 // APPROVE, LOCK, SUBMIT OR SEND MODIFICATION REQUEST
const handleApproval = (id, status, note = "") => {
  setCases((prev) =>
    prev.map((c) =>
      c.id === id
        ? {
            ...c,
            status,
            modificationMessage: note, // ✅ Store modification message
            notes: note || `${c.notes} | ${status}`,
            history: [
              ...(c.history || []),
              `${new Date().toLocaleString()}: ${status}`,
            ],
          }
        : c
    )
  );

  closeModal();
  closeModificationModal();
};

// SEND MODIFICATION MESSAGE
const sendModificationRequest = () => {
  const msg =
    modificationMessage.trim() === ""
      ? "Modification requested"
      : modificationMessage;

  handleApproval(selectedCase.id, "Modification Requested", msg);
};


  const handleDelete = (id) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    closeDeleteModal();
  };

  return (
   <div
      className={`mt-20 min-h-screen px-3 sm:px-4 md:px-6 lg:px-2 py-3 sm:py-4 md:py-5 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"
      }`}
    >
    <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight ">Memorandums Management</h1>
      <p className="text-gray-600 mt-2 text-sm sm:text-base mb-4">
    Manage and review all case memorandums efficiently.
  </p>


    {/* SEARCH & FILTER */}
<div className="flex flex-col sm:flex-row gap-4 mb-6 items-center w-full">
  {/* Search Input */}
  <div className="relative flex-1 w-full md:w-[200px]">
    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
    <input
      type="text"
      placeholder="Search by case #, client name, email, or phone..."
      className="w-full lg:w-[680px] pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm shadow-slate-600 text-gray-700 placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 "
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Stage Filter */}
  <div className="w-full sm:w-48">
    <select
      value={filterStage}
      onChange={(e) => setFilterStage(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
    >
      <option value="">All Stages</option>
      {STAGES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  </div>
</div>



      {/* CASES TABLE */}
      <ApprovedLawyerCasesTable
        cases={filteredCases}
        openModal={openModal}
        openDeleteModal={openDeleteModal}
      />

      {/* VIEW MODAL — Only render when selectedCase is NOT null */}
      {selectedCase && (
        <ApprovedLawyerViewModal
          selectedCase={selectedCase}
          closeModal={closeModal}
          openModificationModal={openModificationModal}
          handleApproval={handleApproval}
        />
      )}

      {/* MODIFICATION MODAL */}
      <ModificationModal
        selectedCase={selectedCase}
        isOpen={isModificationModalOpen}
        closeModal={closeModificationModal}
        modificationMessage={modificationMessage}
        setModificationMessage={setModificationMessage}
        sendModificationRequest={sendModificationRequest}
      />

      {/* DELETE MODAL */}
     <DeleteModal
  selectedCase={caseToDelete}
  isOpen={isDeleteModalOpen}
  closeModal={closeDeleteModal}
  handleDelete={handleDelete}
/>

    </div>
  );
}
