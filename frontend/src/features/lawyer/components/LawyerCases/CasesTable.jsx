import React, { useState, useMemo, useRef } from "react";
import { Trash2, Filter, Search, Eye, Upload } from "lucide-react";
import DeleteModal from './../../../secretary/components/ClientsPage/DeleteModal';

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Submitted: "bg-blue-200 text-blue-800",
  Approved: "bg-green-100 text-green-800",
};

const getStatus = (stage) => {
  const memo = stage.memorandum;

  if (!memo?.mdSigned) return "Pending";
  if (memo?.mdSigned && memo?.ragabFeedback !== "Approved") return "Submitted";
  if (memo?.mdSigned && memo?.ragabFeedback === "Approved") return "Approved";
};

export default function CasesTable({ cases, setCases, onDeleteCase }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [selectedStageIdx, setSelectedStageIdx] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleDeleteClick = (c) => {
    setCaseToDelete(c);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDeleteCase && caseToDelete) onDeleteCase(caseToDelete.id);
    setDeleteModalOpen(false);
    setCaseToDelete(null);
  };

  const handleUploadClick = (caseId, stageIdx) => {
    setSelectedCaseId(caseId);
    setSelectedStageIdx(stageIdx);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCases(prevCases =>
      prevCases.map(c => {
        if (c.id === selectedCaseId) {
          const updatedStages = c.stages.map((s, idx) => {
            if (idx === selectedStageIdx) {
              return {
                ...s,
                memorandum: {
                  ...s.memorandum,
                  file: file.name,
                  mdSigned: true, // now uploaded
                  ragabFeedback: "Pending"
                }
              };
            }
            return s;
          });
          return { ...c, stages: updatedStages };
        }
        return c;
      })
    );

    // Reset
    e.target.value = "";
    setSelectedCaseId(null);
    setSelectedStageIdx(null);
  };

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter
        ? c.stages.some((s) => getStatus(s) === statusFilter)
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [cases, searchTerm, statusFilter]);

  return (
    <div className="space-y-4">
      {/* Hidden file input for memo */}
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by case, client, email, phone, or type"
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/4">
          <Filter size={18} />
          <select
            className="outline-none w-full bg-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1100px]">
            <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
              <tr>
                <th className="p-4">Case #</th>
                <th className="p-4">Client</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Type</th>
                <th className="p-4">Stages & Workflow</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{c.caseNumber}</td>
                  <td className="p-4">{c.clientName}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4">{c.caseType}</td>

                  <td className="p-4 space-y-2">
                    {c.stages.map((s, idx) => {
                      const status = getStatus(s);
                      return (
                        <div key={idx} className="border p-2 rounded-lg bg-gray-50 flex justify-between items-center">
                          <div>
                            <span className="font-medium">{s.stage}</span>
                            <span className={`px-2 py-1 ml-2 text-xs rounded-full ${statusColors[status]}`}>
                              {status}
                            </span>
                            {s.memorandum?.file && (
                              <div className="text-xs text-gray-600 mt-1">Memo: {s.memorandum.file}</div>
                            )}
                          </div>

                          {!s.memorandum?.mdSigned && (
                            <button
                              onClick={() => handleUploadClick(c.id, idx)}
                              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              title="Upload Memo"
                            >
                              <Upload size={16} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </td>

                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => {}}
                      className="bg-slate-700 text-white px-4 py-2 rounded text-sm"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(c)}
                      className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        caseName={caseToDelete?.caseNumber}
      />
    </div>
  );
}
