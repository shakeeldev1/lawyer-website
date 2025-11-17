import React, { useEffect, useState } from "react";
import { FiChevronRight, FiTrash2 } from "react-icons/fi";
import StatusPill from "./StatusPill";

export default function ApprovedLawyerCasesTable({ cases, openModal, openDeleteModal }) {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);


     // ▌ SIDEBAR RESIZE HANDLING
      useEffect(() => {
        const handleResize = () => {
          setSidebarOpen(window.innerWidth >= 1024);
        };
    
        const handleSidebarToggle = () => {
          const sidebar = document.querySelector("aside");
          if (sidebar) {
            const isOpen = sidebar.classList.contains("w-64");
            setSidebarOpen(isOpen);
          }
        };
    
        window.addEventListener("resize", handleResize);
        const interval = setInterval(handleSidebarToggle, 120);
    
        return () => {
          window.removeEventListener("resize", handleResize);
          clearInterval(interval);
        };
      }, []);
  return (
    <div
        className={`rounded-2xl w-[330px] overflow-x-auto transition-all ${
          sidebarOpen ? "md:w-[489px] lg:w-[1050px]" : "md:w-[680px] lg:w-[1225px]"
        }`}
      >
        <table className="w-full min-w-[1000px] text-left">
        <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white sticky top-0 z-10">
          <tr>
            {[
              "Case #", "Client Name","Email","Phone","Case Type", "Stage","Additional Info", "Lawyer", "Status", "Actions",
            ].map((h) => (
              <th key={h} className="p-4 text-sm font-semibold uppercase whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {cases.map((c, idx) => (
            <tr key={c.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100 transition`}>
              <td className="p-4 font-semibold whitespace-nowrap">{c.caseNumber}</td>
              <td className="p-4 whitespace-nowrap">{c.client.name}</td>
              <td className="p-4 whitespace-nowrap">{c.client.email}</td>
              <td className="p-4 whitespace-nowrap">{c.client.phone}</td>
              <td className="p-4 whitespace-nowrap">{c.caseType}</td>
               <td className="p-4 whitespace-nowrap"><StatusPill status={c.currentStage} /></td>
              <td className="p-4 whitespace-nowrap">{c.client.additionalInfo || "—"}</td>
              <td className="p-4 whitespace-nowrap">{c.assignedLawyer}</td>
              <td className="p-4 whitespace-nowrap"><StatusPill status={c.status} /></td>
              <td className="p-4 whitespace-nowrap flex justify-end gap-2">
                <button
                  onClick={() => openModal(c)}
                  className="inline-flex items-center px-3 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 gap-1"
                >
                  <FiChevronRight /> Open
                </button>
                <button
                  onClick={() => openDeleteModal(c)}
                  className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 gap-1"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
