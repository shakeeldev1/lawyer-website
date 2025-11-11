import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Bell } from "lucide-react";
import CasesTable from "../components/LawyerCases/CasesTable";
import CaseDetails from "../components/LawyerCases/CaseDetails";

// Dummy Data
const dummyCases = [
  {
    id: "C-001",
    clientName: "Ahmed Ali",
    caseNumber: "2025-M-001",
    stage: "Main",
    status: "Pending",
    documents: ["Contract.pdf", "Evidence1.pdf"],
    memorandums: [{ version: 1, approved: null, comments: "" }],
    stages: [
      { stage: "Main", status: "Pending", hearingDate: "2025-11-20" },
      { stage: "Appeal", status: "Pending" },
      { stage: "Cassation", status: "Pending" },
    ],
  },
  {
    id: "C-002",
    clientName: "Sara Khan",
    caseNumber: "2025-A-001",
    stage: "Appeal",
    status: "Sent to Ragab",
    documents: ["AppealDoc.pdf"],
    memorandums: [
      { version: 1, approved: false, comments: "Update points 2 and 3" },
    ],
    stages: [
      { stage: "Main", status: "Approved", hearingDate: "2025-11-10" },
      { stage: "Appeal", status: "Pending", hearingDate: "2025-11-25" },
      { stage: "Cassation", status: "Pending" },
    ],
  },
];

const MyCases = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [notifications, setNotifications] = useState([]);
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

  useEffect(() => {
    setCases(dummyCases);
    setNotifications([
      { id: 1, message: "New case assigned: Ahmed Ali - Main" },
      { id: 2, message: "Feedback received: Sara Khan - Appeal" },
    ]);
  }, []);

  const handleSelectCase = (caseItem) => setSelectedCase(caseItem);
  const handleBack = () => setSelectedCase(null);

  const handleSubmitMemorandum = (caseId, text) => {
    const updatedCases = cases.map((c) =>
      c.id === caseId
        ? {
            ...c,
            memorandums: [
              ...c.memorandums,
              {
                version: c.memorandums.length + 1,
                approved: null,
                comments: text,
              },
            ],
            status: "Sent to Ragab",
          }
        : c
    );
    setCases(updatedCases);
    alert("Memorandum submitted to Ragab successfully!");
  };

  return (
    <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b border-[#E1E1E2] pb-4 mt-20">
        <h1 className="text-3xl font-semibold text-slate-800">My Cases</h1>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow">
          <Bell className="text-slate-700 w-5 h-5" />
          <span className="text-slate-700 font-medium">
            {notifications.length} Notifications
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedCase ? (
            <motion.div
              key="cases"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <CasesTable cases={cases} onSelectCase={handleSelectCase} />
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <CaseDetails
                selectedCase={selectedCase}
                onSubmitMemorandum={handleSubmitMemorandum}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyCases;
