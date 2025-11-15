// src/features/secretary/clients/ClientsPage.jsx
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ClientTable from './../components/ClientsPage/ClientTable';
import ClientEditModal from "../components/ClientsPage/ClientEditModal";

const ClientsPage = () => {
  // Dummy client data
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      contactNumber: "+923001234567",
      nationalId: "31302-345891-2",
      address: "-",
      additionalInfo: "Civil case regarding property dispute",
    },
    {
      id: 2,
      name: "Sarah Ali",
      email: "sarahali@gmail.com",
      contactNumber: "+923009876543",
      nationalId: "35201-1234567-8",
      address: "-",
      additionalInfo: "Criminal case related to fraud investigation",
    },
    {
      id: 3,
      name: "Ahmed Khan",
      email: "ahmedkhan@gmail.com",
      contactNumber: "+923001112233",
      nationalId: "37402-7654321-9",
      address: "-",
      additionalInfo: "Family case involving child custody",
    },
  ]);

  // ✅ FIXED: Add missing states
  const [selectedClient, setSelectedClient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // ✅ Sync sidebar with screen size
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

  return (
    <div
      className={`min-h-screen mt-20
        px-3 sm:px-4 md:px-6 lg:px-2
        py-3 sm:py-4 md:py-5 
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}`}
    >
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Client Management</h2>
         
        </div>
      </div>

      {/* Client Table */}
      <ClientTable
        clients={clients}
        setClients={setClients}
        setSelectedClient={setSelectedClient}
        setShowForm={setShowForm}
      />

      {/* Client Form Modal */}
   {showForm && selectedClient && (
  <ClientEditModal
    client={selectedClient}
    onClose={() => setShowForm(false)}
    onSave={(updatedData) => {
      setClients((prev) =>
        prev.map((c) => (c.id === selectedClient.id ? { ...c, ...updatedData } : c))
      );
      setShowForm(false);
    }}
  />
)}

    </div>
  );
};

export default ClientsPage;
