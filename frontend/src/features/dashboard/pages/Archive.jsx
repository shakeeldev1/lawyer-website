import React, { useState, useEffect } from 'react';
import ArchiveFilters from '../components/DashboardArchive/ArchiveFilters';
import ArchiveTable from '../components/DashboardArchive/ArchiveTable';
import ArchiveViewModal from '../components/DashboardArchive/ArchiveViewModal';
import ArchiveDeleteModal from '../components/DashboardArchive/ArchiveDeleteModal';

const Archive = () => {
  const [archives, setArchives] = useState([
    {
      archiveId: "A-2025-001",
      id: "C-101",
      client: "Ali Khan",
      status: "Approved",
      lawyers: ["Sara Ahmed"],
      archivedOn: "2025-11-01",
      downloadFile: { name: "Case_A-2025-001.pdf", url: "/uploads/case_A-2025-001.pdf" },
      stages: [
        {
          stage: "Main",
          submittedOn: "2025-10-10",
          approvedBy: "Ragab",
          description: "Client dispute resolved amicably after mediation.",
          outcome: "Partial settlement.",
          memorandum: { name: "Memorandum_A-2025-001.pdf", url: "/uploads/memorandum_A-2025-001.pdf" },
          evidence: [{ name: "Contract.pdf", url: "/uploads/contract.pdf" }],
        },
        {
          stage: "Appeal",
          submittedOn: "2025-10-20",
          approvedBy: "Ragab",
          description: "Appeal resolved in favor of client.",
          outcome: "Case approved.",
          memorandum: { name: "Memorandum_A-2025-002.pdf", url: "/uploads/memorandum_A-2025-002.pdf" },
          evidence: [{ name: "WitnessStatement.docx", url: "/uploads/witness.docx" }],
        },
      ],
    },
    {
      archiveId: "A-2025-002",
      id: "C-102",
      client: "Fatima Noor",
      status: "Approved",
      lawyers: ["Zain Malik"],
      archivedOn: "2025-10-20",
      downloadFile: { name: "Case_A-2025-002.pdf", url: "/uploads/case_A-2025-002.pdf" },
      stages: [
        {
          stage: "Main",
          submittedOn: "2025-09-05",
          approvedBy: "Ragab",
          description: "Client accused in a minor fraud case; evidence under review.",
          outcome: "Initial hearing completed.",
          memorandum: { name: "Memorandum_A-2025-004.pdf", url: "/uploads/memorandum_A-2025-004.pdf" },
          evidence: [{ name: "Invoice.pdf", url: "/uploads/invoice.pdf" }],
        },
        {
          stage: "Appeal",
          submittedOn: "2025-09-20",
          approvedBy: "Ragab",
          description: "Appeal submitted against initial verdict.",
          outcome: "Appeal under review.",
          memorandum: { name: "Memorandum_A-2025-005.pdf", url: "/uploads/memorandum_A-2025-005.pdf" },
          evidence: [{ name: "WitnessStatement.docx", url: "/uploads/witness2.docx" }],
        },
      ],
    },
  ]);

  const [selectedArchive, setSelectedArchive] = useState(null);
  const [archiveToDelete, setArchiveToDelete] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
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

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Sidebar resize handling
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    const handleSidebarToggle = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) setSidebarOpen(sidebar.classList.contains('w-64'));
    };
    window.addEventListener('resize', handleResize);
    const interval = setInterval(handleSidebarToggle, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  // ✅ Filter logic with useEffect
  useEffect(() => {
    const filtered = archives.filter((archive) => {
      const finalStage =
        Array.isArray(archive.stages) && archive.stages.length > 0
          ? archive.stages[archive.stages.length - 1]
          : {};

      const clientName = archive.client?.toLowerCase() || "";
      const caseId = archive.id?.toLowerCase() || "";
      const stageName = finalStage.stage?.toLowerCase() || "";
      const statusName = archive.status?.toLowerCase() || "";
      const submittedDate = finalStage.submittedOn || "";

      const searchClient = filters.searchClient?.toLowerCase() || "";
      const searchCaseId = filters.searchCaseId?.toLowerCase() || "";
      const filterStage = filters.stage?.toLowerCase() || "";
      const filterStatus = filters.status?.toLowerCase() || "";
      const filterDate = filters.date || "";

      return (
        clientName.includes(searchClient) &&
        caseId.includes(searchCaseId) &&
        (!filterStage || stageName === filterStage) &&
        (!filterStatus || statusName === filterStatus) &&
        (!filterDate || submittedDate === filterDate)
      );
    });

    setFilteredArchives(filtered);
  }, [archives, filters]);

  // Modals
  const openViewModal = (archive) => {
    setSelectedArchive(archive);
    setViewModalOpen(true);
  };
  const openDeleteModal = (archive) => {
    setArchiveToDelete(archive);
    setDeleteModalOpen(true);
  };
  const closeModals = () => {
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedArchive(null);
    setArchiveToDelete(null);
  };
  const handleDeleteConfirm = () => {
    if (archiveToDelete) {
      setArchives(archives.filter(a => a.id !== archiveToDelete.id));
      closeModals();
    }
  };

  // Filters
  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const clearFilters = () => setFilters({ searchClient: "", searchCaseId: "", stage: "", date: "", status: "" });

  // CSV Export
  const exportToCSV = () => {
    const headers = ["Archive ID", "Case ID", "Client", "Stage", "Lawyer", "Submitted On", "Status", "Description"];
    const csvContent = [
      headers.join(","),
      ...filteredArchives.map(archive => {
        const finalStage = archive.stages[archive.stages.length - 1];
        return [
          archive.archiveId,
          archive.id,
          `"${archive.client}"`,
          finalStage.stage,
          `"${archive.lawyers.join(", ")}"`,
          finalStage.submittedOn,
          archive.status,
          `"${finalStage.description}"`
        ].join(",");
      })
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
    <div className={`max-w-6xl min-h-screen transition-all duration-300 ease-in-out mt-16 sm:px-2 md:px-6 lg:px-2 py-3 sm:py-4 md:py-5 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 pl-5">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1c283c]">Archived Cases</h2>
          <p className="text-slate-600 mt-1">{filteredArchives.length} case{filteredArchives.length !== 1 ? 's' : ''} found</p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-[#1C2B4A] text-white font-medium rounded-lg border border-transparent hover:border-amber-500 transition-all duration-300">
            Export CSV
          </button>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-[#1C283C] text-[#fe9800e5] rounded-lg hover:bg-[#FE9A00] hover:text-white transition-colors lg:hidden">
            Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      <ArchiveFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} showFilters={showFilters} />

      {/* Table */}
      <ArchiveTable archives={filteredArchives} onView={openViewModal} onDelete={openDeleteModal} sidebarOpen={sidebarOpen} />

      {/* Modals */}
      <ArchiveViewModal isOpen={isViewModalOpen} archive={selectedArchive} onClose={closeModals} />
      <ArchiveDeleteModal isOpen={isDeleteModalOpen} archive={archiveToDelete} onClose={closeModals} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default Archive;
