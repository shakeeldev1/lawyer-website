// src/components/LawyerCases/CasesTable.jsx
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import DeleteModal from "./DeleteModal";

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Submitted: "bg-blue-200 text-blue-800",
  Approved: "bg-green-100 text-green-800",
  Locked: "bg-gray-300 text-gray-800",
};

export default function CasesTable({ cases, onSelectCase, onDeleteCase }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  const handleDeleteClick = (c) => {
    setCaseToDelete(c);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDeleteCase && caseToDelete) {
      onDeleteCase(caseToDelete.id);
    }
    setDeleteModalOpen(false);
    setCaseToDelete(null);
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table - Show on lg screens and up */}
      <div className="hidden lg:block bg-[E1E1E2]/70 rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
              <tr>
                <th className="p-4 text-left font-medium">Case #</th>
                <th className="p-4 text-left font-medium">Client</th>
                <th className="p-4 text-left font-medium">Current Stage</th>
                <th className="p-4 text-left font-medium">Next Hearing</th>
                <th className="p-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => {
                const currentStage =
                  c.stages.find((s) => s.memorandum.status === "Pending" || s.memorandum.status === "Locked") ||
                  c.stages[0];

                return (
                  <tr key={c.id} className="border-b hover:bg-gray-50 transition duration-150">
                    <td className="p-4 font-medium text-gray-800">{c.caseNumber}</td>
                    <td className="p-4 text-gray-700">{c.clientName}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[currentStage.memorandum.status]}`}
                      >
                        {currentStage.stage} ({currentStage.memorandum.status})
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{currentStage.hearingDate}</td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => onSelectCase(c)}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded transition text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteClick(c)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition flex items-center gap-1 text-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

{/* Tablet Cards - Show on md screens (including when sidebar is open) */}
<div className="hidden md:flex lg:hidden flex-col space-y-4">
  {cases.map((c) => {
    const currentStage =
      c.stages.find(
        (s) =>
          s.memorandum.status === "Pending" ||
          s.memorandum.status === "Locked"
      ) || c.stages[0];

    return (
      <div
        key={c.id}
        className="bg-[#E1E1E2] rounded-2xl  border border-gray-200 p-5 hover:shadow-xl transition-all shadow-md shadow-[#162030]"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-gray-800 text-xl">{c.caseNumber}</h3>
            <p className="text-gray-600 mt-1">{c.clientName}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[currentStage.memorandum.status]}`}
          >
            {currentStage.memorandum.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-5">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Current Stage</p>
            <p className="text-gray-800 font-medium">{currentStage.stage}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Next Hearing</p>
            <p className="text-gray-800 font-medium">{currentStage.hearingDate}</p>
          </div>
        </div>

        {/* Centered Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onSelectCase(c)}
            className="w-36 bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
          >
            View Case
          </button>
          <button
            onClick={() => handleDeleteClick(c)}
            className="w-36 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    );
  })}
</div>



      {/* Mobile Cards - Show on small screens */}
      <div className="md:hidden space-y-3">
        {cases.map((c) => {
          const currentStage =
            c.stages.find((s) => s.memorandum.status === "Pending" || s.memorandum.status === "Locked") ||
            c.stages[0];

          return (
            <div key={c.id} className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{c.caseNumber}</h3>
                  <p className="text-gray-600 text-sm mt-1">{c.clientName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[currentStage.memorandum.status]}`}>
                  {currentStage.memorandum.status}
                </span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Stage:</span> {currentStage.stage}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Next Hearing:</span> {currentStage.hearingDate}
                </p>
              </div>

           <div className="flex gap-3 justify-center">
  <button
    onClick={() => onSelectCase(c)}
    className="flex-1 max-w-[120px] bg-slate-700 hover:bg-slate-800 text-white py-2.5 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
  >
    View
  </button>
  <button
    onClick={() => handleDeleteClick(c)}
    className="flex-1 max-w-[120px] bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2.5 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
  >
    <Trash2 size={16} />
    Delete
  </button>
</div>

            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {cases.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-600 mb-2">No cases found</h3>
          <p className="text-gray-500">There are no cases to display at the moment.</p>
        </div>
      )}

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