import React, { useEffect, useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import CasesTable from "../components/LawyerCases/CasesTable";
import DeleteModal from "../components/LawyerCases/DeleteModal";
import CaseDetail from "../components/LawyerCases/CaseDetail";
import DocumentsTab from "../components/LawyerCases/DocumentsTab";
import MemorandumTab from "../components/LawyerCases/MemorandumTab";
import { useGetAssignedCasesQuery } from "../api/lawyerApi";

export default function MyCases() {
   const [cases, setCases] = useState([]);
   const [search, setSearch] = useState("");
   const [selectedCase, setSelectedCase] = useState(null);
   const [activeTab, setActiveTab] = useState("Details");
   const [selectedStage, setSelectedStage] = useState(0);
   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
   const [caseToDelete, setCaseToDelete] = useState(null);

   const { data, isLoading, isError } = useGetAssignedCasesQuery({
      search: search || undefined,
      limit: 50, // Get more cases for better UX
   });

   useEffect(() => {
      if (data?.data) {
         const mapped = data.data.map((c) => ({
            ...c,
            id: c._id || c.id,
            _id: c._id || c.id,
            clientName: c.clientId?.name || "—",
            clientEmail: c.clientId?.email || "—",
            clientPhone: c.clientId?.contactNumber || "—",
            assignedStage: c.currentStage || 0,
            currentStage: c.currentStage || 0,
            stages: c.stages || [],
            notes: c.notes || [],
            caseNumber: c.caseNumber,
            caseType: c.caseType,
            status: c.status,
         }));
         setCases(mapped);
      }
   }, [data]);

   useEffect(() => {
      const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
      const interval = setInterval(() => {
         const sidebar = document.querySelector("aside");
         if (sidebar) setSidebarOpen(sidebar.classList.contains("w-64"));
      }, 100);
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
         clearInterval(interval);
      };
   }, []);

   const openCase = (c) => {
      // Ensure we have valid data
      const validCase = {
         ...c,
         _id: c._id || c.id,
         id: c.id || c._id,
         stages: Array.isArray(c.stages) ? c.stages : [],
         notes: Array.isArray(c.notes) ? c.notes : [],
         currentStage:
            typeof c.currentStage === "number"
               ? c.currentStage
               : typeof c.assignedStage === "number"
               ? c.assignedStage
               : 0,
      };

      console.log("✅ Validated case:", validCase);
      setSelectedCase(validCase);
      setActiveTab("Details");
      setSelectedStage(validCase.currentStage);
   };

   const closeCase = () => setSelectedCase(null);
   
   const handleDeleteClick = (c) => {
      setCaseToDelete(c);
      setDeleteModalOpen(true);
   };
   const handleDeleteConfirm = () => {
      setCases((prev) => prev.filter((c) => c.id !== caseToDelete.id));
      setDeleteModalOpen(false);
      setCaseToDelete(null);
      if (selectedCase?.id === caseToDelete.id) closeCase();
   };

   if (isLoading)
      return (
         <p className="text-center mt-20 text-xs text-slate-700">
            Loading cases...
         </p>
      );
   if (isError)
      return (
         <p className="text-center mt-20 text-xs text-red-500">
            Error fetching cases. Please try again.
         </p>
      );

   return (
      <div
         className={`min-h-screen transition-all duration-300 ease-in-out pt-16 px-2 py-3 sm:px-3 sm:py-4 mt-8 md:mt-15 ${
            sidebarOpen ? "md:ml-52 ml-0" : "md:ml-14 ml-0"
         }`}
      >
         {/* Header - Compact and minimalist */}
         <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-3 gap-2">
            <div>
               <h2 className="text-2xl md:text-3xl font-bold text-[#A48D66]">
                  My Assigned Cases
               </h2>
               <p className="text-[18px] text-slate-600 mt-0.5">
                  {cases.length} case{cases.length !== 1 ? "s" : ""} assigned
               </p>
            </div>

            <div className="relative w-full xs:w-56">
               <FiSearch
                  size={18}
                  className="absolute top-4 left-3 text-slate-400"
               />
               <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search cases..."
                  className="w-full pl-9 pr-2 py-3 rounded border shadow-md focus:shadow-lg border-slate-300 focus:ring-1 focus:ring-[#A48D66] focus:outline-none text-[16px]"
               />
            </div>
         </div>

         <CasesTable
            cases={cases}
            onOpen={openCase}
            onDelete={handleDeleteClick}
         />

         {selectedCase && (
            <div className="fixed inset-0 z-10000 flex items-center justify-center p-3">
               {/* Backdrop */}
               <div
                  className="absolute inset-0 bg-black/60"
                  onClick={closeCase}
               />

               {/* Modal Content */}
               <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                  {/* Header */}
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-800 text-white">
                     <h2 className="font-semibold text-sm">
                        {selectedCase.caseNumber}
                     </h2>
                     <button
                        onClick={closeCase}
                        className="p-1 rounded hover:bg-slate-700 transition"
                     >
                        <FiX size={16} />
                     </button>
                  </div>

                  {/* Tabs */}
                  <div className="px-4 py-2 bg-white sticky top-0 z-20 border-b border-slate-200">
                     <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                        {["Details", "Documents", "Memorandum"].map((t) => (
                           <button
                              key={t}
                              onClick={() => setActiveTab(t)}
                              className={`pb-1 px-2 text-[10px] font-medium transition whitespace-nowrap ${
                                 activeTab === t
                                    ? "border-b-2 border-slate-800 text-slate-900"
                                    : "text-slate-500 hover:text-slate-800"
                              }`}
                           >
                              {t}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-auto p-4 bg-slate-50">
                     {activeTab === "Details" && (
                        <CaseDetail selectedCase={selectedCase} />
                     )}
                     {activeTab === "Documents" && (
                        <DocumentsTab
                           selectedCase={selectedCase}
                           selectedStage={selectedStage}
                        />
                     )}
                     {activeTab === "Memorandum" && (
                        <MemorandumTab
                           selectedCase={selectedCase}
                           selectedStage={selectedStage}
                        />
                     )}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end px-4 py-2 border-t sticky bottom-0 bg-white">
                     <button
                        onClick={closeCase}
                        className="px-3 py-1.5 rounded border border-slate-300 text-xs text-slate-700 hover:bg-slate-50 transition"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         )}

         {deleteModalOpen && (
            <DeleteModal
               isOpen={deleteModalOpen}
               onClose={() => setDeleteModalOpen(false)}
               onDelete={handleDeleteConfirm}
               caseName={caseToDelete?.caseNumber}
            />
         )}
      </div>
   );
}
