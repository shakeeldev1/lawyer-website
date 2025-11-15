import React, { useEffect, useState } from "react";
import { FiClock, FiChevronRight, FiTrash2 } from "react-icons/fi";
import StatusPill from "./StatusPill";

export default function CasesTable({ cases, onOpen, onDelete }) {
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className={`overflow-x-auto w-[330px] text-left border-collapse ${sidebarOpen ? "md:w-[489px] lg:w-[1050px]" : "md:w-[680px] lg:w-[1225px]"}`}>
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white sticky top-0 z-10">
            <tr>
              {["Case #", "Client Name", "Email", "Phone", "Type", "Stage", "Hearing", "Status", "Actions"].map((h) => (
                <th key={h} className="p-4 text-sm font-semibold tracking-wide uppercase whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {cases.map((c, idx) => {
              const memoStatus = c.memorandum?.[c.assignedStage]?.status;
              const displayStatus = memoStatus || c.status;

              return (
                <tr key={c.id} className={`transition-all duration-200 hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">{c.caseNumber}</td>
                  <td className="p-4 text-slate-800 whitespace-nowrap">{c.clientName}</td>
                  <td className="p-4 text-slate-800 whitespace-nowrap">{c.clientEmail || "—"}</td>
                  <td className="p-4 text-slate-800 whitespace-nowrap">{c.clientPhone || "—"}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {c.caseType}
                    </span>
                  </td>
                  <td className="p-4 text-slate-800 whitespace-nowrap"> <StatusPill status={c.assignedStage} /></td>
                  <td className="p-4 text-slate-800 whitespace-nowrap">
                    {c.hearing.nextHearing ? (
                      <div className="flex flex-col text-xs">
                        <span>{formatDate(c.hearing.nextHearing)}</span>
                        {threeDaysBefore(c.hearing.nextHearing) && (
                          <span className="text-orange-600 flex items-center gap-1">
                            <FiClock /> 3-day reminder
                          </span>
                        )}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <StatusPill status={displayStatus} />
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2 whitespace-nowrap">
                    <button
                      onClick={() => onOpen(c)}
                      className="inline-flex items-center justify-center px-3 py-2 text-sm rounded shadow-sm bg-slate-800 text-white hover:bg-slate-700 transition"
                    >
                      <FiChevronRight /> Open
                    </button>
                    <button
                      onClick={() => onDelete(c)}
                      className="inline-flex items-center justify-center px-3 py-2 text-sm rounded shadow-sm bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
