// src/features/secretary/clients/DeleteModal.jsx
import React from "react";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  name,
  isDeleting = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[10000] p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
        <div className="bg-slate-800 px-4 py-3 rounded-t-lg border-b border-slate-700">
          <h2 className="text-sm font-semibold text-white">Confirm Delete</h2>
        </div>
        <div className="p-4">
          <p className="text-xs text-slate-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{name}</span>? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-end gap-2 px-4 py-3 bg-slate-50 rounded-b-lg">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="px-3 py-1.5 rounded bg-red-600 text-white text-xs hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {isDeleting ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
