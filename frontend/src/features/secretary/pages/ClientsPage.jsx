// src/pages/SecretaryDashboard/ClientsPage.jsx
import React, { useState } from "react";

import { Plus } from "lucide-react";
import Clienttable from "../components/ClientsPage/ClientTable";
import ClientTable from "../components/ClientsPage/ClientTable";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const handleAddClient = (newClient) => {
    setClients((prev) => [...prev, { ...newClient, id: Date.now() }]);
    setShowForm(false);
  };

  const handleAssignLawyer = (clientId, lawyerName) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, assignedLawyer: lawyerName } : c
      )
    );
    setAssignModalOpen(false);
  };

  const handleDeleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={18} /> Add Client
        </button>
      </div>

      {/* Table */}
      <ClientTable
        clients={clients}
        onDelete={handleDeleteClient}
        onAssign={(client) => {
          setSelectedClient(client);
          setAssignModalOpen(true);
        }}
      />

      {/* Add Client Form Modal */}
      {showForm && (
        <ClientForm
          onClose={() => setShowForm(false)}
          onSave={handleAddClient}
        />
      )}

      {/* Assign Lawyer Modal */}
      {assignModalOpen && selectedClient && (
        <AssignLawyerModal
          client={selectedClient}
          onClose={() => setAssignModalOpen(false)}
          onAssign={handleAssignLawyer}
        />
      )}
    </div>
  );
};

export default ClientsPage;
