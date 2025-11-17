import React from "react";

export default function DeleteModal({ selectedCase, isOpen, closeModal, handleDelete }) {
  if (!isOpen || !selectedCase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full z-50 p-6">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete case "{selectedCase.caseName}"?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleDelete(selectedCase.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
