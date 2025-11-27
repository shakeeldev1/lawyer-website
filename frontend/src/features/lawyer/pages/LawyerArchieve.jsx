import { useState, useEffect } from "react";

import ArchiveHeader from "../components/LawyerArchive/ArchiveHeader";
import ArchiveSearch from "../components/LawyerArchive/ArchiveSearch";
import ArchiveTable from "../components/LawyerArchive/ArchiveTable";
import ArchiveModal from "../components/LawyerArchive/ArchiveModal";
import ArchiveDeleteModal from "../components/LawyerArchive/ArchiveDeleteModal";

import { useGetMyArchiveQuery } from "../api/lawyerApi";

export default function LawyerArchive() {
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  const { data, isLoading, isError } = useGetMyArchiveQuery({
    search: search || undefined,
  });

  const archivedCases = data?.data || [];

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);

    window.addEventListener("resize", handleResize);

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        setSidebarOpen(sidebar.classList.contains("w-64"));
      }
    };

    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const filteredCases = archivedCases.filter(
    (c) =>
      c.caseNumber?.toLowerCase().includes(search.toLowerCase()) ||
      c.clientId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      (c.archiveReference &&
        c.archiveReference.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDeleteClick = (c) => {
    setCaseToDelete(c);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (caseToDelete) {
      // TODO: Implement delete API call here when backend is ready
      // For now, just close the modal
      console.log("Delete functionality to be implemented");
    }
    setDeleteModalOpen(false);
    setCaseToDelete(null);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ease-in-out pt-16 px-2 py-3 sm:px-3 sm:py-4 mt-8 ${
        sidebarOpen ? "md:ml-52 ml-0" : "md:ml-14 ml-0"
      }`}
    >
      <ArchiveHeader caseCount={filteredCases.length} />

      <ArchiveSearch search={search} onSearchChange={setSearch} />

      <ArchiveTable
        cases={filteredCases}
        loading={isLoading}
        onViewCase={setSelectedCase}
        onDeleteCase={handleDeleteClick}
      />

      {/* View Modal */}
      {selectedCase && (
        <ArchiveModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <ArchiveDeleteModal
          caseToDelete={caseToDelete}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isError && (
        <p className="text-red-500 mt-4 text-center">
          Failed to load archived cases.
        </p>
      )}
    </div>
  );
}
