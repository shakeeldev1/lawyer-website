// src/features/secretary/clients/ClientEditModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ClientEditModal({
  client,
  onClose,
  onSave,
  isCreating = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    nationalId: "",
    address: "",
    additionalInfo: "",
  });

  // ✅ Load client data on open
  useEffect(() => {
    if (client) setFormData({ ...client });
  }, [client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.contactNumber) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[95%] max-w-2xl p-6 sm:p-8 animate-slideIn overflow-y-auto max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-700">
            {isCreating ? "Add New Client" : "Edit Client"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter client name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email address"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700 transition"
            />
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium">Contact Number</label>
            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              placeholder="Enter contact number"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700 transition"
            />
          </div>

          {/* National ID */}
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium">National ID</label>
            <input
              type="text"
              value={formData.nationalId}
              onChange={(e) =>
                setFormData({ ...formData, nationalId: e.target.value })
              }
              placeholder="Enter national ID"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700 transition"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-slate-700 font-medium">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Enter address"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700 transition"
            />
          </div>

          {/* Additional Info */}
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-slate-700 font-medium">
              Additional Information
            </label>
            <textarea
              rows={3}
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData({ ...formData, additionalInfo: e.target.value })
              }
              placeholder="Enter any case or client details"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700 transition resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition font-medium text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
