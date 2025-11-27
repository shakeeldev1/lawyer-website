import React, { useEffect, useState, useMemo } from "react";
import { FiClock, FiChevronRight, FiTrash2, FiSearch } from "react-icons/fi";
import StatusPill from "./StatusPill"; // assuming you have this component

export default function CasesTable({ cases, onOpen, onDelete }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ▌ Map backend data to table-friendly format
  const mappedCases = cases.map((c) => ({
    ...c, // Keep all original data
    id: c._id || c.id,
    _id: c._id || c.id,
    caseNumber: c.caseNumber,
    clientName: c.clientId?.name || "—",
    clientEmail: c.clientId?.email || "—",
    clientPhone: c.clientId?.contactNumber || "—",
    caseType: c.caseType,
    assignedStage: c.currentStage,
    currentStage: c.currentStage,
    status: c.status,
    hearing: c.stages?.[c.currentStage]?.hearingDate
      ? { nextHearing: c.stages[c.currentStage].hearingDate }
      : null,
    stages: c.stages || [],
    notes: c.notes || [],
  }));

  // ▌ Get dynamic statuses
  const statuses = useMemo(
    () => ["all", ...Array.from(new Set(mappedCases.map((c) => c.status)))],
    [mappedCases]
  );

  // ▌ FILTERED DATA LOGIC
  const filteredCases = useMemo(
    () =>
      mappedCases.filter((c) => {
        const matchSearch =
          c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
          c.clientName.toLowerCase().includes(search.toLowerCase()) ||
          c.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
          c.clientPhone.toLowerCase().includes(search.toLowerCase());

        const matchStatus = filterStatus === "all" || c.status === filterStatus;
        return matchSearch && matchStatus;
      }),
    [mappedCases, search, filterStatus]
  );

  // ✅ Sync with sidebar state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      // Listen for sidebar state changes from the sidebar component
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check sidebar state periodically (you can use a better state management approach)
    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  // ▌ DATE FORMATTER
  const formatDate = (iso) => (iso ? new Date(iso).toLocaleString() : "—");

  const threeDaysBefore = (iso) => {
    if (!iso) return false;
    const diff = new Date(iso) - new Date();
    return diff > 0 && diff <= 3 * 24 * 60 * 60 * 1000;
  };

  if (!cases.length)
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiChevronRight className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          No Cases Assigned
        </h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Your assigned cases will appear here once available.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded border border-slate-200 overflow-hidden">
      {/* Filter */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-200 bg-slate-50">
        <span className="text-[10px] text-slate-600 font-medium">
          {filteredCases.length} case{filteredCases.length !== 1 ? "s" : ""}
        </span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-2 py-1 border border-slate-300 rounded text-[10px] focus:ring-1 focus:ring-slate-600"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All Statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800 text-white hidden md:table-header-group">
            <tr>
              {[
                { label: "Case #", class: "" },
                { label: "Client", class: "" },
                { label: "Email", class: "hidden lg:table-cell" },
                { label: "Phone", class: "hidden xl:table-cell" },
                { label: "Type", class: "" },
                { label: "Stage", class: "hidden lg:table-cell" },
                { label: "Hearing", class: "hidden xl:table-cell" },
                { label: "Status", class: "" },
                { label: "Actions", class: "text-right" },
              ].map((h) => (
                <th
                  key={h.label}
                  className={`px-3 py-2 text-[10px] font-semibold uppercase ${h.class}`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredCases.map((c, idx) => (
              <React.Fragment key={c.id}>
                {/* Desktop Row */}
                <tr className="hidden md:table-row hover:bg-slate-50">
                  <td className="px-3 py-2 text-xs font-semibold text-slate-800">
                    {c.caseNumber}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-800">
                    {c.clientName}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-700 hidden lg:table-cell truncate max-w-[150px]">
                    {c.clientEmail}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-700 hidden xl:table-cell">
                    {c.clientPhone}
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-medium">
                      {c.caseType}
                    </span>
                  </td>
                  <td className="px-3 py-2 hidden lg:table-cell">
                    <StatusPill status={c.assignedStage} />
                  </td>
                  <td className="px-3 py-2 hidden xl:table-cell">
                    {c.hearing?.nextHearing ? (
                      <div className="flex flex-col text-[10px]">
                        <span className="text-slate-700">
                          {formatDate(c.hearing.nextHearing)}
                        </span>
                        {threeDaysBefore(c.hearing.nextHearing) && (
                          <span className="text-orange-600 flex items-center gap-0.5">
                            <FiClock size={10} /> Alert
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <StatusPill status={c.status} />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onOpen(c)}
                        className="p-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        title="Open"
                      >
                        <FiChevronRight size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(c)}
                        className="p-1 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Mobile Card */}
                <tr className="md:hidden">
                  <td colSpan="9" className="p-0">
                    <div className="p-3 border-b border-slate-200 hover:bg-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-xs font-semibold text-slate-800">
                            {c.caseNumber}
                          </h3>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {c.clientName}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => onOpen(c)}
                            className="p-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                          >
                            <FiChevronRight size={16} />
                          </button>
                          <button
                            onClick={() => onDelete(c)}
                            className="p-1 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Type:</span>
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-medium">
                            {c.caseType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Stage:</span>
                          <StatusPill status={c.assignedStage} />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Status:</span>
                          <StatusPill status={c.status} />
                        </div>
                        {c.hearing?.nextHearing && (
                          <div className="flex justify-between pt-1 border-t border-slate-200 mt-1">
                            <span className="text-slate-500">Hearing:</span>
                            <span className="text-slate-700">
                              {formatDate(c.hearing.nextHearing)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
