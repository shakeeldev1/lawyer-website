import React from "react";

const CaseDetailsForm = ({ caseInfo, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Case Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Case Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Case Type *
          </label>
          <select
            name="caseType"
            value={caseInfo.caseType}
            onChange={onChange}
            className="w-full rounded-lg p-2   focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20"
            required
          >
            <option value="">Select Case Type</option>
            <option value="Civil">Civil Case</option>
            <option value="Criminal">Criminal Case</option>
            <option value="Family">Family Case</option>
            <option value="Commercial">Commercial Case</option>
            <option value="Labor">Labor Case</option>
            <option value="Administrative">Administrative Case</option>
          </select>
        </div>

        {/* Assigned Lawyer */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Assigned Lawyer *
          </label>
          <select
            name="assignedLawyer"
            value={caseInfo.assignedLawyer}
            onChange={onChange}
            className="w-full rounded-lg p-2  focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20"
            required
          >
            <option value="">Select Lawyer</option>
            <option value="Ahmed Mohamed">Ahmed Mohamed</option>
            <option value="Fatima Ali">Fatima Ali</option>
            <option value="Omar Hassan">Omar Hassan</option>
            <option value="Aisha Abdullah">Aisha Abdullah</option>
            <option value="Khalid Ibrahim">Khalid Ibrahim</option>
          </select>
        </div>

        {/* Hearing Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hearing Date *
          </label>
          <input
            type="date"
            name="hearingDate"
            value={caseInfo.hearingDate}
            onChange={onChange}
            className="w-full rounded-lg p-2  focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20"
            required
          />
        </div>

        {/* Filing Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Filing Date *
          </label>
          <input
            type="date"
            name="filingDate"
            value={caseInfo.filingDate}
            onChange={onChange}
            className="w-full rounded-lg p-2  focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20 bg-gray-50"
            required
            readOnly
          />
          <p className="text-xs text-gray-500">Automatically set to today's date</p>
        </div>
      </div>

      {/* Status and Stage Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Case Status */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Case Status *
          </label>
          <select
            name="status"
            value={caseInfo.status}
            onChange={onChange}
            className="w-full rounded-lg p-2  focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20"
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Under Review">Under Review</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Case Stage */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Case Stage *
          </label>
          <select
            name="stage"
            value={caseInfo.stage}
            onChange={onChange}
            className="w-full  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20"
            required
          >
            <option value="Main Case">Main Case</option>
            <option value="Appeal">Appeal</option>
            <option value="Cassation">Cassation</option>
            <option value="Execution">Execution</option>
            <option value="Initial Review">Initial Review</option>
          </select>
        </div>
      </div>

      {/* Full Width Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Case Description *
        </label>
        <textarea
          name="description"
          placeholder="Provide detailed description of the case, including key facts, parties involved, and any special considerations..."
          value={caseInfo.description}
          onChange={onChange}
          rows="4"
          className="w-full rounded-lg p-2  focus:outline-none focus:ring-1 focus:ring-amber-200 border border-amber-600/20 resize-vertical"
          required
        />
      </div>
    </div>
  );
};

export default CaseDetailsForm;