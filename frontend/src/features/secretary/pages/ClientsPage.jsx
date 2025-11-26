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
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
            Client Management
          </h2>
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
            className="flex items-center gap-2 bg-[#11408bee] hover:bg-[#0f3674] text-white px-4 py-2 rounded-lg transition-all"
          >
            <Plus size={18} /> Add Client
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
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#fe9a00]"></div>
        </div>
      )}
      {error && (
        <div className="text-center py-10 text-red-600">
          Error loading clients:{" "}
          {error?.data?.message || "Something went wrong"}
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
