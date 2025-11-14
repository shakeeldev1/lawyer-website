// src/features/secretary/clients/ClientForm.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ClientForm({ client, onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "", contact: "", caseType: "" });

  useEffect(() => {
    if (client) setFormData({ ...client });
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.caseType) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex justify-center items-center z-[9999] animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 animate-slideIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-[#162030]">
            {client ? "Edit Client" : "Add Client"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter client name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE9A00] transition"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Contact</label>
            <input
              type="text"
              placeholder="Enter contact number"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE9A00] transition"
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Case Type</label>
            <input
              type="text"
              placeholder="Enter case type"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE9A00] transition"
              value={formData.caseType}
              onChange={e => setFormData({ ...formData, caseType: e.target.value })}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#FE9A00] hover:bg-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              {client ? "Update Client" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
