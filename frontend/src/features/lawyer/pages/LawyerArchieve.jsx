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
      const interval = setInterval(handleSidebarToggle, 100);

      return () => {
         window.removeEventListener('resize', handleResize);
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
             className={`min-h-screen
                 px-3 sm:px-4 mt-10 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
              ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
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
