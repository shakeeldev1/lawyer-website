// src/features/secretary/clients/ClientsPage.jsx
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ClientTable from './../components/ClientsPage/ClientTable';
import ClientForm from "../components/ClientsPage/ClientForm";

const ClientsPage = () => {
  // Dummy client data
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", contact: "+923001234567", caseType: "Civil" },
    { id: 2, name: "Sarah Ali", contact: "+923009876543", caseType: "Criminal" },
    { id: 3, name: "Ahmed Khan", contact: "+923001112233", caseType: "Family" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    // ✅ Sync with sidebar state
    useEffect(() => {
      const handleResize = () => {
        const desktop = window.innerWidth >= 1024;
        setSidebarOpen(desktop);
      };
  
      const handleSidebarToggle = () => {
        // Listen for sidebar state changes from the sidebar component
        const sidebar = document.querySelector('aside');
        if (sidebar) {
          const isOpen = sidebar.classList.contains('w-64');
          setSidebarOpen(isOpen);
        }
      };
  
      window.addEventListener('resize', handleResize);
      
      // Check sidebar state periodically (you can use a better state management approach)
      const interval = setInterval(handleSidebarToggle, 100);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(interval);
      };
    }, []);
  

  return (
     <div
      className={`min-h-screen  mt-20
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Client Management</h2>
          <button
            className="flex items-center gap-2 bg-[#FE9A00] hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition"
            onClick={() => {
              setSelectedClient(null);
              setShowForm(true);
            }}
          >
            <Plus size={18} /> Add Client
          </button>
        </div>

        {/* Client Table */}
        <ClientTable
          clients={clients}
          setClients={setClients}
          setSelectedClient={setSelectedClient}
          setShowForm={setShowForm}
        />

        {/* Client Form Modal */}
        {showForm && (
          <ClientForm
            client={selectedClient}
            onClose={() => setShowForm(false)}
            onSave={(clientData) => {
              if (selectedClient) {
                setClients(clients.map(c => (c.id === selectedClient.id ? { ...c, ...clientData } : c)));
              } else {
                setClients([...clients, { ...clientData, id: Date.now() }]);
              }
              setShowForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
