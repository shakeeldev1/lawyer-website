import React, {useState,useEffect} from 'react'
import ArchiveFilters from '../components/DashboardArchive/ArchiveFilters';
import ArchiveTable from '../components/DashboardArchive/ArchiveTable'
import ArchiveViewModal from '../components/DashboardArchive/ArchiveViewModal';
import ArchiveEditModal from '../components/DashboardArchive/ArchiveEditModal';
import ArchiveDeleteModal from '../components/DashboardArchive/ArchiveDeleteModal';
const Archive = () => {
    const [archives, setArchives] = useState([
        {
            id: "C-101",
            client: "Ahmed Khan",
            stage: "Main",
            lawyer: "Ali Raza",
            submittedOn: "2025-10-10",
            status: "Approved",
            archiveId: "ARC-001",
            description: "Property dispute case resolved.",
        },
        {
            id: "C-102",
            client: "Sara Ahmed",
            stage: "Appeal",
            lawyer: "Mariam Tariq",
            submittedOn: "2025-10-15",
            status: "Approved",
            archiveId: "ARC-002",
            description: "Appeal successfully processed.",
        },
        {
            id: "C-103",
            client: "John Smith",
            stage: "Cassation",
            lawyer: "Robert Brown",
            submittedOn: "2025-10-20",
            status: "Pending",
            archiveId: "ARC-003",
            description: "Waiting for final review.",
        },
        {
            id: "C-104",
            client: "Maria Garcia",
            stage: "Main",
            lawyer: "David Wilson",
            submittedOn: "2025-10-25",
            status: "Approved",
            archiveId: "ARC-004",
            description: "Contract agreement finalized.",
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
            <div className="max-w-7xl lg:p-2 mt-20 lg:mt-24 min-h-screen">
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
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Export CSV
                        </button>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors lg:hidden"
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