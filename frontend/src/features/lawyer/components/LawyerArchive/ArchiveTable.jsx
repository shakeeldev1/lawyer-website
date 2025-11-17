import React, { useEffect, useState } from "react";
import { Eye, Trash2, ChevronRight } from "lucide-react";

const ArchiveTable = ({ cases, loading, onViewCase, onDeleteCase }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // 🔄 Sync with sidebar width
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    const detectSidebar = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(detectSidebar, 120);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  if (loading)
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Archive</h3>
        <p className="text-gray-500">Retrieving your archived cases...</p>
      </div>
    );

  if (!cases.length)
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ChevronRight className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">No Archived Cases</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Your case archives will appear here once cases are completed and archived.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

      {/* 📌 Responsive Scroll Wrapper */}
    <div className={`overflow-x-auto w-[330px]  text-left border-collapse ${sidebarOpen ? "md:w-[489px] lg:w-[1050px] ":"md:w-[680px] lg:w-[1225px]" }`}>
        <table className="w-full min-w-[1000px] text-left border-collapse">
         <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white sticky top-0 z-10">
            <tr>
              {[
                "Archive ID",
                "Case Number",
                "Client Name",
                "Phone",
                "Email",
                "National ID",
                "Address",
                "Additional Info",
                "Case Type",
                "Date",
                "Stages",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="p-4 text-sm font-semibold tracking-wide uppercase whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {cases.map((caseData, idx) => (
              <tr
                key={caseData.id}
                className={`transition-all duration-200 hover:bg-slate-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                {/* Archive ID */}
                <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">
                  {caseData.id}
                </td>

                {/* Case Number */}
                <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">
                  {caseData.caseNumber}
                </td>

                {/* Client Name */}
                <td className="p-4 text-slate-800 whitespace-nowrap">
                  {caseData.clientName}
                </td>

                {/* Phone */}
                <td className="p-4 text-slate-800 whitespace-nowrap">{caseData.clientPhone}</td>

                {/* Email */}
                <td className="p-4 text-slate-800 whitespace-nowrap">{caseData.clientEmail}</td>

                {/* National ID */}
                <td className="p-4 text-slate-800 whitespace-nowrap">{caseData.nationalId}</td>

                {/* Address */}
                <td className="p-4 text-slate-800 whitespace-nowrap">{caseData.address}</td>

                {/* Additional Info */}
                <td className="p-4 text-slate-800 whitespace-nowrap">
                  {caseData.additionalInfo}
                </td>

                {/* Case Type */}
                <td className="p-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {caseData.caseType}
                  </span>
                </td>


                {/* Date */}
                <td className="p-4 text-slate-600 whitespace-nowrap">{caseData.date}</td>

                {/* Stages List */}
                <td className="p-4">
                  <div className="space-y-1">
                    {caseData.stages.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-700 whitespace-nowrap"
                      >
                        <ChevronRight size={14} className="text-slate-500" />
                        <span>{s.stage}</span>
                        <span className="text-slate-500 text-xs">
                          ({s.documents.length} doc
                          {s.documents.length > 1 ? "s" : ""})
                        </span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onViewCase(caseData)}
                    className="inline-flex items-center justify-center w-8 h-8 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition shadow-sm"
                  >
                    <Eye size={14} />
                  </button>

                  <button
                    onClick={() => onDeleteCase(caseData)}
                    className="inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ArchiveTable;
