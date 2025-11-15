import React, { useState, useEffect } from "react";
import { Archive, Search } from "lucide-react";
import ViewCaseModal from "../components/SecretaryArchiveCases/ViewCaseModal";
import ArchiveDeleteModal from "../components/SecretaryArchiveCases/ArchiveDeleteModal";
import ArchiveTable from "../components/SecretaryArchiveCases/ArchiveTable";

const SecretaryArchiveCases = () => {
  const [search, setSearch] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [deleteCaseModal, setDeleteCaseModal] = useState(null);
  const [archivedCases, setArchivedCases] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
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


      useEffect(() => {
  setArchivedCases([
    {
      id: "ARC-001",
      client: "Ahmed Ali",
      clientNumber: "0234167181",
      email: "ahmed.ali@example.com",
      nationalId: "12345678901234",
      address:"-",
      additionalInfo: "VIP client, priority case",
      caseNumber: "C-1001",
      caseType: "Civil Litigation",
      lawyer: "Lawyer Hina",
      date: "2025-10-15",
      archived: true,
      stages: [
        { stage: "Main Case", hearingDate: "2025-10-15", documents: [{ name: "MainCaseDocument1.pdf" }] },
        { stage: "Appeal", hearingDate: "2025-10-20", documents: [{ name: "AppealDocument.pdf" }] },
        { stage: "Cassation", hearingDate: "2025-11-01", documents: [{ name: "CassationOrder.pdf" }] },
      ],
    },
    {
      id: "ARC-002",
      client: "Omar Malik",
      clientNumber: "728112892",
      email: "omar.malik@example.com",
      nationalId: "98765432101234",
      address:"",
      additionalInfo: "Corporate client",
      caseNumber: "C-1002",
      caseType: "Corporate Dispute",
      lawyer: "Lawyer Sara",
      date: "2025-11-10",
      archived: true,
      stages: [
        { stage: "Main Case", hearingDate: "2025-11-10", documents: [{ name: "ContractDispute.pdf" }] },
        { stage: "Appeal", hearingDate: "2025-11-15", documents: [{ name: "AppealSummary.pdf" }] },
      ],
    },
  ]);
}, []);






  const filteredCases = archivedCases.filter(
    (c) =>
      c.archived &&
      (c.client.toLowerCase().includes(search.toLowerCase()) ||
        c.caseNumber.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDeleteCase = (caseId) => {
    setArchivedCases((prev) => prev.filter((c) => c.id !== caseId));
    setDeleteCaseModal(null);
  };

  return (
    <div
      className={`min-h-screen  mt-20
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center md:justify-start gap-3">
          Archiving Section
        </h2>
        <p className="text-slate-600 mt-2 text-sm md:text-base">
          View completed cases with all stages, memorandums, documents, and approvals.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8 w-full max-w-md mx-auto md:mx-0 shadow-[#162030] rounded-full shadow-md">
        <Search className="absolute left-3 top-3 text-slate-500" size={20} />
        <input
          type="text"
          placeholder="Search by client name or case number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 p-3 w-full border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#fe9a00] focus:border-[#fe9a00] outline-none transition-all duration-200 text-slate-800 bg-slate-50 hover:bg-white"
        />
      </div>

      {/* Table Component */}
      <ArchiveTable
        cases={filteredCases}
        onView={setViewModal}
        onDelete={setDeleteCaseModal}
      />

      {/* Modals */}
      {viewModal && (
        <ViewCaseModal
          viewModal={viewModal}
          setViewModal={setViewModal}
          setDeleteModal={setDeleteCaseModal}
        />
      )}

      {deleteCaseModal && (
        <ArchiveDeleteModal
          deleteCaseModal={deleteCaseModal}
          setDeleteCaseModal={setDeleteCaseModal}
          handleDeleteCase={handleDeleteCase}
        />
      )}
    </div>
  );
};

export default SecretaryArchiveCases;
