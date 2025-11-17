import React from "react";
import { XCircle, Trash } from "lucide-react";

const ArchiveDeleteModal = ({ deleteCaseModal, setDeleteCaseModal, handleDeleteCase }) => {
  if (!deleteCaseModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-[9999] flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center border border-slate-200">
        <Trash className="text-red-600 mx-auto mb-3" size={40} />
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Delete Case?
        </h3>
        <p className="text-slate-600 mb-6">
          Are you sure you want to permanently delete <strong>{deleteCaseModal.caseNumber}</strong>? <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleDeleteCase(deleteCaseModal.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setDeleteCaseModal(null)}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveDeleteModal;
