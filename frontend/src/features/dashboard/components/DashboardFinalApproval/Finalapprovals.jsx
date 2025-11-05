import { useState } from "react";
import FinalApprovalsTable from "./FinalApprovalsTable";
import FinalApprovalsViewModal from "./FinalApprovalsViewModal";
import FinalApprovalsEditModal from "./FinalApprovalsEditModal";

const FinalApprovals = () => {
    const [cases, setCases] = useState([
        {
            id: "C-101",
            client: "Ahmed Khan",
            stage: "Main",
            lawyer: "Ali Raza",
            submittedOn: "2025-11-05",
            status: "Pending",
            description: "Case regarding property dispute.",
        },
        {
            id: "C-102",
            client: "Sara Ahmed",
            stage: "Appeal",
            lawyer: "Mariam Tariq",
            submittedOn: "2025-11-03",
            status: "Pending",
            description: "Appeal for prior case judgment.",
        },
        {
            id: "C-103",
            client: "John Smith",
            stage: "Cassation",
            lawyer: "Robert Brown",
            submittedOn: "2025-11-01",
            status: "Pending",
            description: "Final cassation appeal process.",
        },
    ]);

    const [selectedCase, setSelectedCase] = useState(null);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const openViewModal = (caseItem) => {
        setSelectedCase(caseItem);
        setViewModalOpen(true);
    };

    const openEditModal = (caseItem) => {
        setSelectedCase(caseItem);
        setFormData(caseItem);
        setEditModalOpen(true);
    };

    const closeModal = () => {
        setViewModalOpen(false);
        setEditModalOpen(false);
        setSelectedCase(null);
        setFormData({});
    };

    const handleFormChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const saveChanges = () => {
        if (formData.id) {
            setCases(
                cases.map((c) => (c.id === formData.id ? { ...formData } : c))
            );
            closeModal();
        }
    };

    const approveCase = (caseId) => {
        setCases(cases.map(c =>
            c.id === caseId ? { ...c, status: "Approved" } : c
        ));
    };

    const rejectCase = (caseId) => {
        setCases(cases.map(c =>
            c.id === caseId ? { ...c, status: "Rejected" } : c
        ));
    };

    return (
        <div className="p-6 mt-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Final Approvals</h2>
                <p className="text-slate-600 mb-6">Review and approve pending cases</p>

                {/* Table */}
                <FinalApprovalsTable
                    cases={cases}
                    onView={openViewModal}
                    onEdit={openEditModal}
                    onApprove={approveCase}
                    onReject={rejectCase}
                />

                {/* View Modal */}
                <FinalApprovalsViewModal
                    isOpen={isViewModalOpen}
                    caseItem={selectedCase}
                    onClose={closeModal}
                />

                {/* Edit Modal */}
                <FinalApprovalsEditModal
                    isOpen={isEditModalOpen}
                    caseItem={selectedCase}
                    formData={formData}
                    onClose={closeModal}
                    onSave={saveChanges}
                    onFormChange={handleFormChange}
                />
            </div>
        </div>
    );
};

export default FinalApprovals;