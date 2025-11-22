import React, { useEffect, useState, useMemo } from "react";
import { FiClock, FiChevronRight, FiTrash2, FiSearch } from "react-icons/fi";
import StatusPill from "./StatusPill"; // assuming you have this component

export default function CasesTable({ cases, onOpen, onDelete }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ▌ Map backend data to table-friendly format
  const mappedCases = cases.map((c) => ({
    id: c._id,
    caseNumber: c.caseNumber,
    clientName: c.clientId?.name || "—",
    clientEmail: c.clientId?.email || "—",
    clientPhone: c.clientId?.contactNumber || "—",
    caseType: c.caseType,
    assignedStage: c.currentStage,
    status: c.status,
    hearing: c.stages?.[c.currentStage]?.hearingDate
      ? { nextHearing: c.stages[c.currentStage].hearingDate }
      : null,
    documents: c.documents || [],
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

  // ▌ SIDEBAR RESIZE HANDLING
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        <h3 className="text-xl font-bold text-gray-900 mb-3">No Cases Assigned</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Your assigned cases will appear here once available.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b border-gray-200 bg-gray-50">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by case number, client name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600 focus:border-slate-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === "all" ? "All Statuses" : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white sticky top-0 z-10">
            <tr>
              {["Case #", "Client Name", "Email", "Phone", "Type", "Stage", "Hearing", "Status", "Actions"].map((h) => (
                <th key={h} className="p-4 text-sm font-semibold uppercase whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredCases.map((c, idx) => (
              <tr key={c.id} className={`transition-all duration-200 hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">{c.caseNumber}</td>
                <td className="p-4 text-slate-800 whitespace-nowrap">{c.clientName}</td>
                <td className="p-4 text-slate-800 whitespace-nowrap">{c.clientEmail}</td>
                <td className="p-4 text-slate-800 whitespace-nowrap">{c.clientPhone}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">{c.caseType}</span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <StatusPill status={c.assignedStage} />
                </td>
                <td className="p-4 whitespace-nowrap">
                  {c.hearing?.nextHearing ? (
                    <div className="flex flex-col text-xs">
                      <span>{formatDate(c.hearing.nextHearing)}</span>
                      {threeDaysBefore(c.hearing.nextHearing) && (
                        <span className="text-orange-600 flex items-center gap-1"><FiClock /> 3-day reminder</span>
                      )}
                    </div>
                  ) : "—"}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <StatusPill status={c.status} />
                </td>
                <td className="p-4 whitespace-nowrap flex justify-end gap-2">
                  <button onClick={() => onOpen(c)} className="inline-flex items-center px-3 py-2 text-sm rounded bg-slate-800 text-white hover:bg-slate-700"><FiChevronRight /> Open</button>
                  <button onClick={() => onDelete(c)} className="inline-flex items-center px-3 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
