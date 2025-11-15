// src/components/ArchivePage.jsx
import React, { useState, useEffect } from "react";


import ArchiveHeader from "../components/LawyerArchive/ArchiveHeader";
import ArchiveSearch from "../components/LawyerArchive/ArchiveSearch";
import ArchiveTable from "../components/LawyerArchive/ArchiveTable";
import ArchiveModal from "../components/LawyerArchive/ArchiveModal";
import ArchiveDeleteModal from "../components/LawyerArchive/ArchiveDeleteModal";
import { fetchArchivedCases } from "../components/LawyerArchive/MockData";

export default function LawyerArchive() {
  const [archivedCases, setArchivedCases] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);


  useEffect(() => {
    const loadCases = async () => {
      setLoading(true);
      try {
        const data = await fetchArchivedCases();
        setArchivedCases(data);
      } catch (error) {
        console.error("Error loading archived cases:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCases();
  }, []);

  const filteredCases = archivedCases.filter(
    (c) =>
      c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.archiveReference.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleDeleteClick = (c) => {
    setCaseToDelete(c);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (caseToDelete) {
      setArchivedCases(prev => prev.filter(c => c.id !== caseToDelete.id));
    }
    setDeleteModalOpen(false);
    setCaseToDelete(null);
  };

  return (
    <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      <ArchiveHeader caseCount={filteredCases.length} />
      
      <ArchiveSearch
        search={search} 
        onSearchChange={setSearch} 
      />

      <ArchiveTable
        cases={filteredCases}
        loading={loading}
        onViewCase={setSelectedCase}
        onDeleteCase={handleDeleteClick}
      />

      {/* Modals */}
      {selectedCase && (
        <ArchiveModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}

      {deleteModalOpen && (
        <ArchiveDeleteModal
          caseToDelete={caseToDelete}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}