import React, { useState, useEffect } from 'react'
import ArchiveFilters from '../components/DashboardArchive/ArchiveFilters';
import ArchiveTable from '../components/DashboardArchive/ArchiveTable'
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
  {
    archiveId: "A-2025-005",
    id: "C-105",
    client: "Omar Farooq",
    lawyer: "Ayesha Khan",
    caseType: "Corporate",
    createdOn: "2025-10-05",
    submittedOn: "2025-10-15",
    archivedOn: "2025-11-05",
    stage: "Appeal",
    status: "Approved",
    description: "Corporate contract dispute regarding service delivery terms.",
    outcome: "Case resolved in favor of the client.",
    memorandum: {
      name: "Memorandum_A-2025-001.pdf",
      url: "/uploads/memorandum_A-2025-001.pdf",
    },
    evidence: [{ name: "ServiceContract.pdf", url: "/uploads/service-contract.pdf" }],
  },
  {
    archiveId: "A-2025-006",
    id: "C-106",
    client: "Hina Tariq",
    lawyer: "Asad Mehmood",
    caseType: "Employment",
    createdOn: "2025-09-01",
    submittedOn: "2025-09-10",
    archivedOn: "2025-10-25",
    stage: "Cassation",
    status: "Pending",
    description: "Unlawful termination case filed by the employee.",
    outcome: "Awaiting employer response before closure.",
    memorandum: {
      name: "Memorandum_A-2025-001.pdf",
      url: "/uploads/memorandum_A-2025-001.pdf",
    },
    evidence: [{ name: "TerminationLetter.pdf", url: "/uploads/termination.pdf" }],
  },
  {
    archiveId: "A-2025-007",
    id: "C-107",
    client: "Omar Farooq",
    lawyer: "Ayesha Khan",
    caseType: "Corporate",
    createdOn: "2025-10-05",
    submittedOn: "2025-10-15",
    archivedOn: "2025-11-05",
    stage: "Main",
    status: "Approved",
    description: "Corporate contract dispute regarding service delivery terms.",
    outcome: "Case resolved in favor of the client.",
    memorandum: {
      name: "Memorandum_A-2025-001.pdf",
      url: "/uploads/memorandum_A-2025-001.pdf",
    },
    evidence: [{ name: "ServiceContract.pdf", url: "/uploads/service-contract.pdf" }],
  },
  {
    archiveId: "A-2025-008",
    id: "C-106",
    client: "Omar Farooq",
    lawyer: "Ayesha Khan",
    caseType: "Corporate",
    createdOn: "2025-10-05",
    submittedOn: "2025-10-15",
    archivedOn: "2025-11-05",
    stage: "Appeal",
    status: "Approved",
    description: "Corporate contract dispute regarding service delivery terms.",
    outcome: "Case resolved in favor of the client.",
    memorandum: {
      name: "Memorandum_A-2025-001.pdf",
      url: "/uploads/memorandum_A-2025-001.pdf",
    },
    evidence: [{ name: "ServiceContract.pdf", url: "/uploads/service-contract.pdf" }],
  },
  {
    archiveId: "A-2025-009",
    id: "C-107",
    client: "Omar Farooq",
    lawyer: "Ayesha Khan",
    caseType: "Corporate",
    createdOn: "2025-10-05",
    submittedOn: "2025-10-15",
    archivedOn: "2025-11-05",
    stage: "Cassation",
    status: "Approved",
    description: "Corporate contract dispute regarding service delivery terms.",
    outcome: "Case resolved in favor of the client.",
    memorandum: {
      name: "Memorandum_A-2025-001.pdf",
      url: "/uploads/memorandum_A-2025-001.pdf",
    },
    evidence: [{ name: "ServiceContract.pdf", url: "/uploads/service-contract.pdf" }],
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

    // Apply filters whenever filters or archives change
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
        <div className="max-w-7xl lg:p-2 mt-20 lg:mt-24 min-h-screen  ">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                    <h2 className="text-4xl font-extrabold text-[#1c283c]">Archived Cases</h2>
                    <p className="text-slate-600 mt-1">
                        {filteredArchives.length} case{filteredArchives.length !== 1 ? 's' : ''} found
                    </p>
                </div>

                <div className="flex gap-3 mt-4 lg:mt-0">
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FE9A00] to-[#1C283C] 
text-white font-medium rounded-lg 
hover:from-[#1C283C] hover:to-[#FE9A00] 
transition-color duration-300 shadow-md hover:shadow-lg
"
                    >
                        Export CSV
                    </button>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1C283C] text-[#fe9800e5] rounded-lg hover:bg-[#FE9A00] transition-colors lg:hidden "
                        
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


            <ArchiveTable
                archives={filteredArchives}
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />




            {/* Modals */}
            <ArchiveViewModal
                isOpen={isViewModalOpen}
                archive={selectedArchive}
                onClose={closeModals}
            />

            <ArchiveEditModal
                isOpen={isEditModalOpen}
                archive={editingArchive}
                onClose={closeModals}
                onSave={handleEditSubmit}
            />

            <ArchiveDeleteModal
                isOpen={isDeleteModalOpen}
                archive={archiveToDelete}
                onClose={closeModals}
                onConfirm={handleDeleteConfirm}
            />
        </div>

    )
}

export default Archive