import React, { useState, useEffect } from "react";

import ArchiveHeader from "../components/LawyerArchive/ArchiveHeader";
import ArchiveSearch from "../components/LawyerArchive/ArchiveSearch";
import ArchiveTable from "../components/LawyerArchive/ArchiveTable";
import ArchiveModal from "../components/LawyerArchive/ArchiveModal";
import ArchiveDeleteModal from "../components/LawyerArchive/ArchiveDeleteModal";

import { useGetLawyerArchieveQuery } from "../api/lawyerApi";

export default function LawyerArchive() {
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  const { data, isLoading, isError } = useGetLawyerArchieveQuery(search);
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
      c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      (c.archiveReference && c.archiveReference.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDeleteClick = (c) => {
    setCaseToDelete(c);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (caseToDelete) {
      // Optimistically update UI
      // Note: You might also want to call a delete API here
      archivedCases.splice(archivedCases.indexOf(caseToDelete), 1);
    }
    setDeleteModalOpen(false);
    setCaseToDelete(null);
  };

  return (
    <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-4
                 py-3 sm:py-4 md:py-5
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}`}
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
