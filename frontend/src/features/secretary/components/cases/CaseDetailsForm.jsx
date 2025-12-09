import React from "react";
import { useGetLawyersQuery } from "../../api/secretaryApi";

const CaseDetailsForm = ({ caseInfo, onChange, isEditMode = false }) => {
  const {
    data: lawyersData,
    isLoading: loadingLawyers,
    error: lawyersError,
  } = useGetLawyersQuery();

  // Debug logging
  React.useEffect(() => {
    if (lawyersData) {
      console.log("Lawyers loaded:", lawyersData);
    }
    if (lawyersError) {
      console.error("Error loading lawyers:", lawyersError);
    }
  }, [lawyersData, lawyersError]);

  return (
    <div className="space-y-3">
      {/* Case Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Case Type */}
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Case Type *
          </label>
          <select
            name="caseType"
            value={caseInfo.caseType}
            onChange={onChange}
            className="w-full rounded px-2 py-1.5 border border-slate-200 bg-slate-50 focus:ring-1 focus:ring-blue-500 text-xs"
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
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Assigned Lawyer *
          </label>
          <select
            name="assignedLawyer"
            value={caseInfo.assignedLawyer}
            onChange={onChange}
            className="w-full rounded px-2 py-1.5 border border-slate-200 bg-slate-50 focus:ring-1 focus:ring-blue-500 text-xs"
            required
            disabled={loadingLawyers}
          >
            <option value="">
              {loadingLawyers ? "Loading lawyers..." : "Select Lawyer"}
            </option>
            {lawyersData?.data?.map((lawyer) => (
              <option key={lawyer._id} value={lawyer._id}>
                {lawyer.name} - {lawyer.email}
              </option>
            ))}
            {!lawyersData?.data?.length && !loadingLawyers && (
              <option value="" disabled>
                No lawyers available
              </option>
            )}
          </select>
          {loadingLawyers && (
            <p className="text-[10px] text-blue-500 flex items-center gap-1 mt-0.5">
              <span className="inline-block w-2.5 h-2.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              Loading lawyers...
            </p>
          )}
          {lawyersError && (
            <p className="text-[10px] text-red-500 mt-0.5">
              Error: {lawyersError?.data?.message || "Failed to load lawyers"}
            </p>
          )}
          {!lawyersData?.data?.length && !loadingLawyers && !lawyersError && (
            <p className="text-[10px] text-orange-500 mt-0.5">
              No active lawyers found.
            </p>
          )}
        </div>

        {/* Approving Lawyer - Only show during creation, not edit */}
        {!isEditMode && (
          <div className="space-y-1">
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              Approving Lawyer *
            </label>
            <select
              name="approvingLawyer"
              value={caseInfo.approvingLawyer || ""}
              onChange={onChange}
              className="w-full rounded px-2 py-1.5 border border-slate-200 bg-slate-50 focus:ring-1 focus:ring-blue-500 text-xs"
              required
              disabled={loadingLawyers}
            >
              <option value="">
                {loadingLawyers
                  ? "Loading lawyers..."
                  : "Select Approving Lawyer"}
              </option>
              {lawyersData?.data?.map((lawyer) => (
                <option key={lawyer._id} value={lawyer._id}>
                  {lawyer.name} - {lawyer.email}
                </option>
              ))}
              {!lawyersData?.data?.length && !loadingLawyers && (
                <option value="" disabled>
                  No lawyers available
                </option>
              )}
            </select>
            <p className="text-[9px] text-slate-500 mt-0.5">
              📋 Lawyer responsible for final case approval
            </p>
          </div>
        )}

        {/* Filing Date */}
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Filing Date *
          </label>
          <input
            type="date"
            name="filingDate"
            value={caseInfo.filingDate}
            onChange={onChange}
            className="w-full rounded px-2 py-1.5 border border-slate-200 bg-slate-100 focus:ring-1 focus:ring-blue-500 text-xs"
            required
            readOnly
          />
          <p className="text-[10px] text-slate-500 mt-0.5">
            Automatically set to today
          </p>
        </div>
      </div>

      {/* Status and Stage Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Case Status */}
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Case Status *
          </label>
          <select
            name="status"
            value={caseInfo.status}
            onChange={onChange}
            className="w-full rounded px-2 py-1.5 border border-slate-200 bg-slate-50 focus:ring-1 focus:ring-blue-500 text-xs"
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
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Case Stage *
          </label>
          <select
            name="stage"
            value={caseInfo.stage}
            onChange={onChange}
            className="w-full rounded px-2 py-1.5 border border-slate-200 bg-slate-50 focus:ring-1 focus:ring-blue-500 text-xs"
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
      <div className="space-y-1">
        <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
          Case Description *
        </label>
        <textarea
          name="description"
          placeholder="Provide detailed description of the case"
          value={caseInfo.description}
          onChange={onChange}
          rows="3"
          className="w-full rounded px-2 py-1.5 border border-slate-200 bg-slate-50 focus:ring-1 focus:ring-blue-500 text-xs resize-y"
          required
        />
      </div>
    </div>
  );
};

export default CaseDetailsForm;
