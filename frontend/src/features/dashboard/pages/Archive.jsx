import React, { useState, useEffect } from 'react'
import ArchiveFilters from '../components/DashboardArchive/ArchiveFilters';
import ArchiveTable from '../components/DashboardArchive/ArchiveTable';
import ArchiveViewModal from '../components/DashboardArchive/ArchiveViewModal';
import ArchiveEditModal from '../components/DashboardArchive/ArchiveEditModal';
import ArchiveDeleteModal from '../components/DashboardArchive/ArchiveDeleteModal';

const Archive = () => {
  const [archives, setArchives] = useState([
    {
      archiveId: "A-2025-001",
      id: "C-101",
      client: "Ali Khan",
      lawyer: "Sara Ahmed",
      caseType: "Civil",
      createdOn: "2025-10-01",
      submittedOn: "2025-10-10",
      archivedOn: "2025-11-01",
      stage: "Main",
      status: "Approved",
      description: "Client dispute resolved amicably after mediation.",
      outcome: "Case dismissed after mutual settlement.",
      memorandum: {
        name: "Memorandum_A-2025-001.pdf",
        url: "/uploads/memorandum_A-2025-001.pdf",
      },
      evidence: [{ name: "Contract.pdf", url: "/uploads/contract.pdf" }],
    },
    {
      archiveId: "A-2025-002",
      id: "C-102",
      client: "Fatima Noor",
      lawyer: "Zain Malik",
      caseType: "Criminal",
      createdOn: "2025-08-28",
      submittedOn: "2025-09-05",
      archivedOn: "2025-10-20",
      stage: "Appeal",
      status: "Pending",
      description: "Client accused in a minor fraud case; evidence under review.",
      outcome: "Awaiting court’s final decision.",
      memorandum: {
        name: "Memorandum_A-2025-001.pdf",
        url: "/uploads/memorandum_A-2025-001.pdf",
      },
      evidence: [{ name: "WitnessStatement.docx", url: "/uploads/witness.docx" }],
    },
    {
      archiveId: "A-2025-003",
      id: "C-103",
      client: "Bilal Ahmed",
      lawyer: "Nadia Khan",
      caseType: "Family",
      createdOn: "2025-07-01",
      submittedOn: "2025-07-12",
      archivedOn: "2025-09-10",
      stage: "Cassation",
      status: "Rejected",
      description: "Dispute regarding divorce settlement and property division.",
      outcome: "Case dismissed due to insufficient evidence.",
      memorandum: {
        name: "Memorandum_A-2025-001.pdf",
        url: "/uploads/memorandum_A-2025-001.pdf",
      },
      evidence: [],
    },
    {
      archiveId: "A-2025-004",
      id: "C-104",
      client: "Zara Shah",
      lawyer: "Hamza Ali",
      caseType: "Property",
      createdOn: "2025-09-14",
      submittedOn: "2025-09-20",
      archivedOn: "2025-10-29",
      stage: "Main",
      status: "Approved",
      description: "Property ownership dispute between two siblings.",
      outcome: "Ownership transferred after settlement agreement.",
      memorandum: {
        name: "Memorandum_A-2025-001.pdf",
        url: "/uploads/memorandum_A-2025-001.pdf",
      },
      evidence: [{ name: "OwnershipDocs.pdf", url: "/uploads/ownership.pdf" }],
    },
  ]);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [editingArchive, setEditingArchive] = useState(null);
  const [archiveToDelete, setArchiveToDelete] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    searchClient: "",
    searchCaseId: "",
    stage: "",
    date: "",
    status: ""
  });
  const [filteredArchives, setFilteredArchives] = useState(archives);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Detect sidebar open/close (same logic as AllCases)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
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

  // ✅ Filters logic unchanged
  useEffect(() => {
    const filtered = archives.filter(archive => {
      const matchesClient = archive.client.toLowerCase().includes(filters.searchClient.toLowerCase());
      const matchesCaseId = archive.id.toLowerCase().includes(filters.searchCaseId.toLowerCase());
      const matchesStage = !filters.stage || archive.stage === filters.stage;
      const matchesStatus = !filters.status || archive.status === filters.status;
      const matchesDate = !filters.date || archive.submittedOn === filters.date;

      return matchesClient && matchesCaseId && matchesStage && matchesStatus && matchesDate;
    });
    setFilteredArchives(filtered);
  }, [filters, archives]);

  const openViewModal = (archive) => {
    setSelectedArchive(archive);
    setViewModalOpen(true);
  };

  const openEditModal = (archive) => {
    setEditingArchive({ ...archive });
    setEditModalOpen(true);
  };

  const openDeleteModal = (archive) => {
    setArchiveToDelete(archive);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedArchive(null);
    setEditingArchive(null);
    setArchiveToDelete(null);
  };

  const handleEditSubmit = (updatedArchive) => {
    setArchives(archives.map(archive =>
      archive.id === updatedArchive.id ? updatedArchive : archive
    ));
    closeModals();
  };

  const handleDeleteConfirm = () => {
    if (archiveToDelete) {
      setArchives(archives.filter((a) => a.id !== archiveToDelete.id));
      closeModals();
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchClient: "",
      searchCaseId: "",
      stage: "",
      date: "",
      status: ""
    });
  };

  const exportToCSV = () => {
    const headers = ["Archive ID", "Case ID", "Client", "Stage", "Lawyer", "Submitted On", "Status", "Description"];
    const csvContent = [
      headers.join(","),
      ...filteredArchives.map(archive => [
        archive.archiveId,
        archive.id,
        `"${archive.client}"`,
        archive.stage,
        `"${archive.lawyer}"`,
        archive.submittedOn,
        archive.status,
        `"${archive.description}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `archived-cases-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`max-w-6xl min-h-screen transition-all duration-300 ease-in-out  mt-16 
      sm:px-2 md:px-6 lg:px-2 py-3 sm:py-4 md:py-5 
      ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6  pl-5 ">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1c283c]">Archived Cases</h2>
          <p className="text-slate-600 mt-1">
            {filteredArchives.length} case{filteredArchives.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex gap-3 mt-4 lg:mt-0">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#1C2B4A] text-white font-medium rounded-lg 
            border border-transparent hover:border-amber-500 transition-all duration-300"
          >
            Export CSV
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1C283C] text-[#fe9800e5] rounded-lg hover:bg-[#FE9A00] hover:text-white transition-colors lg:hidden"
          >
            Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      <ArchiveFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        showFilters={showFilters}
      />

      {/* Table */}
      <ArchiveTable
        archives={filteredArchives}
        onView={openViewModal}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        sidebarOpen={sidebarOpen}   // ✅ add this
      />

      {/* Modals */}
      <ArchiveViewModal isOpen={isViewModalOpen} archive={selectedArchive} onClose={closeModals} />
      <ArchiveEditModal isOpen={isEditModalOpen} archive={editingArchive} onClose={closeModals} onSave={handleEditSubmit} />
      <ArchiveDeleteModal isOpen={isDeleteModalOpen} archive={archiveToDelete} onClose={closeModals} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default Archive;
