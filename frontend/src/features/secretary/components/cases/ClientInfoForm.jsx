import React, { useState, useEffect } from "react";
import { useGetAllClientsQuery } from "../../api/secretaryApi";

const ClientInfoForm = ({
  clientInfo,
  onChange,
  onClientSelect,
  selectedClientId: parentSelectedClientId,
}) => {
  const { data: clientsData } = useGetAllClientsQuery();
  const [useExistingClient, setUseExistingClient] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");

  // Sync with parent when selectedClientId changes
  useEffect(() => {
    if (onClientSelect) {
      onClientSelect(selectedClientId || null);
    }
  }, [selectedClientId, onClientSelect]);

  // If parent provides selectedClientId, sync with it
  useEffect(() => {
    if (parentSelectedClientId && parentSelectedClientId !== selectedClientId) {
      setSelectedClientId(parentSelectedClientId);
      setUseExistingClient(true);
    }
  }, [parentSelectedClientId]);

  const handleClientSelect = (e) => {
    const clientId = e.target.value;
    setSelectedClientId(clientId);

    if (clientId) {
      const client = clientsData?.clients?.find((c) => c._id === clientId);
      if (client) {
        // Populate form with selected client data
        onChange({ target: { name: "name", value: client.name } });
        onChange({ target: { name: "contact", value: client.contactNumber } });
        onChange({ target: { name: "email", value: client.email } });
        onChange({ target: { name: "nationalId", value: client.nationalId } });
        onChange({ target: { name: "address", value: client.address || "" } });
        onChange({
          target: {
            name: "additionalInformation",
            value: client.additionalInfo || "",
          },
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Selection Toggle */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="useExisting"
            checked={useExistingClient}
            onChange={(e) => {
              setUseExistingClient(e.target.checked);
              if (!e.target.checked) {
                setSelectedClientId("");
              }
            }}
            className="w-4 h-4 text-blue-600"
          />
          <label
            htmlFor="useExisting"
            className="text-sm font-medium text-gray-700"
          >
            Select from existing clients
          </label>
        </div>

        {useExistingClient && (
          <div className="mt-3">
            <select
              value={selectedClientId}
              onChange={handleClientSelect}
              className="w-full rounded-lg p-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a client --</option>
              {clientsData?.clients?.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} - {client.email}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Personal Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Client Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Client Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={clientInfo.name}
            onChange={onChange}
            className="w-full  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20 "
            required
          />
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Contact Number *
          </label>
          <input
            type="text"
            name="contact"
            placeholder="Enter contact number"
            value={clientInfo.contact}
            onChange={onChange}
            className="w-full  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-amber-200  border border-amber-600/20"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={clientInfo.email}
            onChange={onChange}
            className="w-full  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-amber-200  border border-amber-600/20"
            required
          />
        </div>

        {/* National ID / Passport */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            National ID / Passport *
          </label>
          <input
            type="text"
            name="nationalId"
            placeholder="Enter ID or passport number"
            value={clientInfo.nationalId}
            onChange={onChange}
            className="w-full  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-amber-200  border border-amber-600/20"
            required
          />
        </div>
      </div>

      {/* Full Width Fields */}
      <div className="space-y-4">
        {/* Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Address *
          </label>
          <textarea
            name="address"
            placeholder="Enter complete address"
            value={clientInfo.address}
            onChange={onChange}
            rows="3"
            className="w-full  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-amber-200  border border-amber-600/20"
            required
          />
        </div>

        {/* Additional Information */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Additional Information
          </label>
          <textarea
            name="additionalInformation"
            placeholder="Any additional notes or information about the client"
            value={clientInfo.additionalInformation}
            onChange={onChange}
            rows="3"
            className="w-full rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-amber-200  border border-amber-600/20"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfoForm;
