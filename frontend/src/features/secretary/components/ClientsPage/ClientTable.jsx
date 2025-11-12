// src/components/SecretaryComponents/Clients/ClientTable.jsx
import React from "react";
import { User, Trash2, Briefcase } from "lucide-react";

const ClientTable = ({ clients, onAssign, onDelete }) => {
  if (clients.length === 0)
    return (
      <div className="text-center text-gray-500 py-10">
        No clients added yet.
      </div>
    );

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-3">Client Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Lawyer</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-t hover:bg-gray-50 transition-all"
            >
              <td className="px-4 py-3">{client.name}</td>
              <td className="px-4 py-3">{client.email}</td>
              <td className="px-4 py-3">{client.phone}</td>
              <td className="px-4 py-3">
                {client.assignedLawyer || (
                  <span className="text-gray-400 italic">Unassigned</span>
                )}
              </td>
              <td className="px-4 py-3 flex justify-center gap-3">
                <button
                  onClick={() => onAssign(client)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Briefcase size={16} /> Assign
                </button>
                <button
                  onClick={() => onDelete(client.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
