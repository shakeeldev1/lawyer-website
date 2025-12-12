// src/features/secretary/clients/ClientsPage.jsx
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ClientTable from "./../components/ClientsPage/ClientTable";
import ClientEditModal from "../components/ClientsPage/ClientEditModal";
import {
  useGetAllClientsQuery,
  useUpdateClientMutation,
  useCreateClientMutation,
} from "../api/secretaryApi";
import { toast } from "react-toastify";

const ClientsPage = () => {
  // Fetch clients from API
  const { data: clientsData, isLoading, error } = useGetAllClientsQuery();
  const [updateClient] = useUpdateClientMutation();
  const [createClient] = useCreateClientMutation();

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Update local state when API data changes
  useEffect(() => {
    if (clientsData?.clients) {
      setClients(clientsData.clients);
    }
  }, [clientsData]);

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // ✅ Sync sidebar with screen size
 useEffect(() => {
     const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
     const handleSidebarToggle = () => {
       const sidebar = document.querySelector("aside");
       if (sidebar) {
         const width = sidebar.offsetWidth;
         setSidebarOpen(width > 100);
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
      className={`min-h-screen pt-16
        px-2 sm:px-3
        py-3 sm:py-8
        transition-all duration-300 ease-in-out mt-8
      ${sidebarOpen ? 'lg:ml-50  lg:w-[85.5%]' : 'lg:ml-13 w-[96%]'}`}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md sm:text-2xl font-semibold text-slate-800">
              Client Management
            </h2>
            <p className="text-md text-slate-600 mt-0.5">
              Manage client information and records
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedClient({
                name: "",
                email: "",
                contactNumber: "",
                nationalId: "",
                address: "",
                additionalInfo: "",
              });
              setIsCreatingNew(true);
              setShowForm(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#A48C65] hover:bg-[#ffff] hover:text-[#A48C65] text-white text-xs hover:border-[#A48C65]  border transition"
          >
            <Plus size={14} /> Add Client
          </button>
        </div>
      </div>

      {/* Client Table */}
      <ClientTable
        clients={clients}
        setClients={setClients}
        setSelectedClient={(client) => {
          setSelectedClient(client);
          setIsCreatingNew(false);
        }}
        setShowForm={setShowForm}
      />

      {/* Client Form Modal */}
      {showForm && selectedClient && (
        <ClientEditModal
          client={selectedClient}
          isCreating={isCreatingNew}
          onClose={() => {
            setShowForm(false);
            setIsCreatingNew(false);
            setSelectedClient(null);
          }}
          onSave={async (updatedData) => {
            try {
              if (isCreatingNew) {
                await createClient(updatedData).unwrap();
                toast.success("Client created successfully");
              } else {
                await updateClient({
                  id: selectedClient._id || selectedClient.id,
                  data: updatedData,
                }).unwrap();
                toast.success("Client updated successfully");
              }
              setShowForm(false);
              setIsCreatingNew(false);
              setSelectedClient(null);
            } catch (error) {
              toast.error(
                error?.data?.message ||
                  `Failed to ${isCreatingNew ? "create" : "update"} client`
              );
            }
          }}
        />
      )}

      {/* Loading & Error States */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-xs text-slate-500 mt-2">Loading clients...</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 text-center">
          <p className="text-xs text-red-600">
            Error: {error?.data?.message || "Failed to load clients"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
