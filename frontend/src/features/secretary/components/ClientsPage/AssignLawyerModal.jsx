// src/components/SecretaryComponents/Clients/AssignLawyerModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const AssignLawyerModal = ({ client, onClose, onAssign }) => {
  const [selectedLawyer, setSelectedLawyer] = useState("");

  const lawyers = [
    "Mr. Ahmed Khan",
    "Ms. Fatima Ali",
    "Mr. Salman Raza",
    "Ms. Noor Zahra",
  ];

  const handleAssign = () => {
    if (!selectedLawyer) {
      alert("Please select a lawyer to assign.");
      return;
    }
    onAssign(client.id, selectedLawyer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Assign Lawyer to {client.name}
        </h2>

        <select
          value={selectedLawyer}
          onChange={(e) => setSelectedLawyer(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        >
          <option value="">Select a Lawyer</option>
          {lawyers.map((lawyer, idx) => (
            <option key={idx} value={lawyer}>
              {lawyer}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignLawyerModal;
