import React from "react";

const ClientInfoForm = ({ clientInfo, onChange }) => {
  return (
    <div className="space-y-6">
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