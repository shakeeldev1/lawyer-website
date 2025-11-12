import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import CaseFilters from "../components/cases/CaseFilters";
import CaseTable from "../components/cases/CaseTable";

const CaseManagement = () => {
  const [cases, setCases] = useState([
    {
      id: "C-101",
      client: "Ali Khan",
      status: "Pending",
      lawyer: "Sara Ahmed",
      hearingDate: "2025-12-12",
      documents: 3,
      memorandum: "Pending",
      notes: "",
      stage: "Main", // current stage for display
      stages: [
        {
          stage: "Main",
          submittedOn: "2025-11-01",
          approvedBy: "Ragab",
          description: "Initial client dispute filed.",
          outcome: "Pending review",
          memorandum: { name: "Memorandum_C-101-1.pdf", url: "/uploads/memo_C-101-1.pdf" },
          evidence: [{ name: "Contract.pdf", url: "/uploads/contract.pdf" }],
        },
        {
          stage: "Appeal",
          submittedOn: "2025-11-10",
          approvedBy: "Ragab",
          description: "Appeal filed after first hearing.",
          outcome: "Under review",
          memorandum: { name: "Memorandum_C-101-2.pdf", url: "/uploads/memo_C-101-2.pdf" },
          evidence: [{ name: "WitnessStatement.docx", url: "/uploads/witness.docx" }],
        },
      ],
    },
    {
      id: "C-102",
      client: "John Doe",
      status: "Approved",
      lawyer: "John Doe",
      hearingDate: "2025-12-15",
      documents: 2,
      memorandum: "Uploaded",
      notes: "Check attachments",
      stage: "Main",
      stages: [
        {
          stage: "Main",
          submittedOn: "2025-10-20",
          approvedBy: "Ragab",
          description: "Case reviewed and approved.",
          outcome: "Approved",
          memorandum: { name: "Memorandum_C-102-1.pdf", url: "/uploads/memo_C-102-1.pdf" },
          evidence: [{ name: "Invoice.pdf", url: "/uploads/invoice.pdf" }],
        },
      ],
    },
    {
      id: "C-103",
      client: "Aisha Malik",
      status: "Submitted",
      lawyer: "Sara Ahmed",
      hearingDate: "2025-12-20",
      documents: 5,
      memorandum: "Uploaded",
      notes: "",
      stage: "Main",
      stages: [
        {
          stage: "Main",
          submittedOn: "2025-11-15",
          approvedBy: "Ragab",
          description: "Client requested mediation.",
          outcome: "Partial settlement",
          memorandum: { name: "Memorandum_C-103-1.pdf", url: "/uploads/memo_C-103-1.pdf" },
          evidence: [{ name: "Agreement.pdf", url: "/uploads/agreement.pdf" }],
        },
      ],
    },
  ]);

  const [filteredCases, setFilteredCases] = useState(cases);
   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
    // Sidebar resize handling
    useEffect(() => {
      const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
      const handleSidebarToggle = () => {
        const sidebar = document.querySelector('aside');
        if (sidebar) setSidebarOpen(sidebar.classList.contains('w-64'));
      };
      window.addEventListener('resize', handleResize);
      const interval = setInterval(handleSidebarToggle, 100);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(interval);
      };
    }, []);

  // Filter handler
  const handleFilterChange = (filters) => {
    let filtered = cases.filter((c) => {
      const matchesSearch =
        !filters.search ||
        c.client.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || c.status === filters.status;
      const matchesLawyer = !filters.lawyer || c.lawyer === filters.lawyer;
      return matchesSearch && matchesStatus && matchesLawyer;
    });
    setFilteredCases(filtered);
  };

  return (
     <div className={` min-h-screen transition-all duration-300 ease-in-out mt-16 sm:px-2 md:px-4 lg:px-6 py-3 sm:py-4 md:py-5 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Cases</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={18} /> Add Cases
        </button>
      </div>

      <CaseFilters onFilterChange={handleFilterChange} />

      <CaseTable
      sidebarOpen={sidebarOpen}
        cases={filteredCases} // ✅ pass the filtered cases to th table
      />
    </div>
  );
};

export default CaseManagement;
