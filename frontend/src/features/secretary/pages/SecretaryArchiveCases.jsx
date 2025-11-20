import React, { useState, useEffect } from "react";
import { Archive, Search } from "lucide-react";
import ViewCaseModal from "../components/SecretaryArchiveCases/ViewCaseModal";
import ArchiveDeleteModal from "../components/SecretaryArchiveCases/ArchiveDeleteModal";
import ArchiveTable from "../components/SecretaryArchiveCases/ArchiveTable";
import { useGetArchivedCasesQuery } from "../api/secretaryApi";

const SecretaryArchiveCases = () => {
  const [search, setSearch] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [deleteCaseModal, setDeleteCaseModal] = useState(null);
  const [archivedCases, setArchivedCases] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Fetch archived cases from API
  const { data: archiveData, isLoading, error } = useGetArchivedCasesQuery();

  // Update local state when API data changes
  useEffect(() => {
    if (archiveData?.data) {
      setArchivedCases(archiveData.data);
    }
  }, [archiveData]);
  // ✅ Sync with sidebar state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      // Listen for sidebar state changes from the sidebar component
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check sidebar state periodically (you can use a better state management approach)
    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  // Filter cases based on search (API already returns archived cases)
  const filteredCases = archivedCases.filter((c) => {
    const searchLower = search.toLowerCase();
    const clientName = c.clientId?.name?.toLowerCase() || "";
    const caseNumber = c.caseNumber?.toLowerCase() || "";
    const caseType = c.caseType?.toLowerCase() || "";

    return (
      clientName.includes(searchLower) ||
      caseNumber.includes(searchLower) ||
      caseType.includes(searchLower)
    );
  });

  const handleDeleteCase = (caseId) => {
    setArchivedCases((prev) => prev.filter((c) => c._id !== caseId));
    setDeleteCaseModal(null);
  };

  return (
    <div
      className={`min-h-screen  mt-20
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}`}
    >
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight flex items-center justify-center md:justify-start gap-3">
          Archiving Section
        </h2>
        <p className="text-slate-600 mt-2 text-sm md:text-base">
          View completed cases with all stages, memorandums, documents, and
          approvals.
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

      {/* Loading & Error States */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#fe9a00]"></div>
        </div>
      )}
      {error && (
        <div className="text-center py-10 text-red-600">
          Error loading archived cases:{" "}
          {error?.data?.message || "Something went wrong"}
        </div>
      )}

      {/* Table Component */}
      {!isLoading && (
        <ArchiveTable
          cases={filteredCases}
          onView={setViewModal}
          onDelete={setDeleteCaseModal}
        />
      )}

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
