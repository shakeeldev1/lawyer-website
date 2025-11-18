// src/features/secretary/clients/ClientTable.jsx
import React, { useState, useEffect } from "react";
import { Trash2, Edit, FileText } from "lucide-react";
import DeleteModal from "./DeleteModal";

export default function ClientTable({
  clients = [],
  setClients,
  setSelectedClient,
  setShowForm,
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // ✅ Sync sidebar width responsiveness (same logic as ArchiveTable)
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setShowForm(true);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setClients(clients.filter((c) => c.id !== clientToDelete.id));
    setDeleteModalOpen(false);
    setClientToDelete(null);
  };

  if (!clients.length)
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <FileText className="w-10 h-10 text-blue-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Clients Found
        </h3>
        <p className="text-gray-500 text-sm">
          Clients will appear here once added.
        </p>
      </div>
    );

  const TableRow = ({ c, idx }) => (
    <tr
      className={`transition-all duration-200 hover:bg-slate-50 ${
        idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
      }`}
    >
      <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">
        {c.id}
      </td>
      <td className="p-4 text-slate-800 whitespace-nowrap">{c.name}</td>
      <td className="p-4 text-slate-800 whitespace-nowrap">{c.email}</td>
      <td className="p-4 text-slate-800 whitespace-nowrap">
        {c.contactNumber}
      </td>
      <td className="p-4 text-slate-800 whitespace-nowrap">{c.nationalId}</td>
      <td className="p-4 text-slate-800 whitespace-nowrap">{c.address}</td>
      <td className="p-4 text-slate-800 whitespace-nowrap">
        {c.additionalInfo}
      </td>
      <td className="p-4 text-right flex justify-end mt-4 gap-2">
        <button
          className="inline-flex items-center justify-center w-8 h-8 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors duration-200 shadow-sm"
          onClick={() => handleEditClick(c)}
        >
          <Edit size={14} />
        </button>
        <button
          className="inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm"
          onClick={() => handleDeleteClick(c)}
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );

  return (
    <div
  className={`bg-white rounded-2xl w-[330px] shadow-sm border border-gray-200 overflow-hidden transition-all duration-300
    ${sidebarOpen ? "md:w-[510px] lg:w-[980px]" : "md:w-[700px] lg:w-[1160px]"}
  `}
>
      {/* ✅ Responsive container width based on sidebar */}
     <div
  className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-400/40 scrollbar-track-transparent w-full text-left border-collapse"
>

        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white sticky top-0 z-10">
            <tr>
              {[
                "Client ID",
                "Name",
                "Email",
                "Contact Number",
                "National ID",
                "Address",
                "Additional Info",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="p-4 text-sm font-semibold tracking-wide text-white uppercase whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {clients.map((c, idx) => (
              <TableRow key={c.id} c={c} idx={idx} />
            ))}
          </tbody>
        </table>
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
