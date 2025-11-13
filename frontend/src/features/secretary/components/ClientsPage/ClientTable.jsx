// src/features/secretary/clients/ClientTable.jsx
import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import DeleteModal from "./DeleteModal";

export default function ClientTable({ clients = [], setClients, setSelectedClient, setShowForm }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setShowForm(true);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setClients(clients.filter(c => c.id !== clientToDelete.id));
    setDeleteModalOpen(false);
    setClientToDelete(null);
  };

  return (
    <div className="space-y-6">

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#162030] text-[#FE9A00] uppercase text-sm font-semibold">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Case Type</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clients.length > 0 ? clients.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{c.name}</td>
                  <td className="p-4 text-gray-700">{c.contact}</td>
                  <td className="p-4 text-gray-700">{c.caseType}</td>
                  <td className="p-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleEditClick(c)}
                      className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition shadow-md hover:shadow-lg"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(c)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition shadow-md hover:shadow-lg"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-gray-500">No clients found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablet Cards */}
      <div className="hidden md:flex lg:hidden flex-col space-y-4">
        {clients.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow hover:shadow-lg transition">
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 text-xl">{c.name}</h3>
              <p className="text-gray-600 mt-1">{c.contact}</p>
              <p className="text-gray-500 text-sm mt-1 font-medium">Type: {c.caseType}</p>
            </div>
            <div className="flex justify-between gap-3">
              <button
                onClick={() => handleEditClick(c)}
                className="flex-1 bg-slate-700/20 hover:bg-slate-800 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDeleteClick(c)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {clients.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-md transition">
            <div className="flex flex-col gap-1 mb-3">
              <h3 className="font-bold text-gray-800">{c.name}</h3>
              <p className="text-gray-600 text-sm">{c.contact}</p>
              <p className="text-gray-500 text-xs font-medium">Type: {c.caseType}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => handleEditClick(c)}
                className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-2xl font-medium flex items-center justify-center gap-2 transition shadow"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDeleteClick(c)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-2xl font-medium flex items-center justify-center gap-2 transition shadow"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
          name={clientToDelete?.name}
        />
      )}
    </div>
  );
}
