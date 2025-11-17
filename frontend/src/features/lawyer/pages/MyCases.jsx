import React, { useEffect, useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import DetailsTab from "../components/LawyerCases/DetailsTab";
import DocumentsTab from "../components/LawyerCases/DocumentsTab";
import MemorandumTab from "../components/LawyerCases/MemorandumTab";
import CasesTable from "../components/LawyerCases/CasesTable";
import DeleteModal from "../components/LawyerCases/DeleteModal";
import { useLawyerCasesQuery } from "../api/lawyerApi";

export default function MyCases() {
  const currentUserId = "lawyer1"; // replace with dynamic user ID if needed
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");
  const [selectedStage, setSelectedStage] = useState("Main");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [search, setSearch] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  // API Query
  const { data, isLoading, isError } = useLawyerCasesQuery(search);

  // Update cases from API
  useEffect(() => {
    if (data?.success) {
      setCases(data.data);
    }
  }, [data]);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Open/Close case modal
  const openCase = (c) => {
    setSelectedCase(c);
    setActiveTab("Details");
    setSelectedStage(c.assignedStage);
  };
  const closeCase = () => setSelectedCase(null);

  // Update memorandum
  const updateCaseMemorandum = (stage, updatedMemo) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === selectedCase.id
          ? { ...c, memorandum: { ...c.memorandum, [stage]: updatedMemo } }
          : c
      )
    );
    setSelectedCase((prev) => ({
      ...prev,
      memorandum: { ...prev.memorandum, [stage]: updatedMemo },
    }));
  };

  // Delete handlers
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
      <p className="text-center mt-20 text-slate-700 font-medium">
        Loading cases...
      </p>
    );
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500 font-medium">
        Error fetching cases. Please try again.
      </p>
    );

  return (
    <div
      className={`min-h-screen px-3 sm:px-4 md:px-6 lg:px-2 py-3 sm:py-4 md:py-5 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"
      }`}
    >
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header + Search */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
              My Assigned Cases
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Workspace for lawyers — review documents, manage workflow efficiently.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64 mt-2 md:mt-0">
            <FiSearch className="absolute top-2.5 left-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cases..."
              className="w-full pl-10 pr-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:outline-none text-sm md:text-base"
            />
          </div>
        </header>

        {/* Cases Table */}
        <CasesTable
          cases={cases.filter((c) => c.assignedTo === currentUserId)}
          onOpen={openCase}
          onDelete={handleDeleteClick}
        />

        {/* Case Modal */}
        {selectedCase && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-transform duration-300 scale-100 md:scale-100">
              {/* Header */}
              <div className="flex justify-between items-start px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-2xl">
                <div>
                  <h2 className="font-bold text-xl md:text-2xl">
                    {selectedCase.caseNumber}
                  </h2>
                  <p className="text-sm md:text-base text-slate-200 mt-1">
                    {selectedCase.clientName} • {selectedCase.caseType}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="px-3 py-2 rounded border text-sm bg-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    {["Main", "Appeal", "Cassation"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={closeCase}
                    className="p-2 rounded hover:bg-slate-600 transition"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 py-3 bg-white sticky top-0 z-20 shadow-sm">
                <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                  {["Details", "Documents", "Memorandum"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`pb-2 px-2 text-sm md:text-base font-medium transition ${
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

              {/* Content */}
              <div className="flex-1 overflow-auto p-6 bg-slate-50">
                {activeTab === "Details" && (
                  <DetailsTab selectedCase={selectedCase} />
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
                    updateCaseMemorandum={updateCaseMemorandum}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end px-6 py-4 border-t sticky bottom-0 bg-white">
                <button
                  onClick={closeCase}
                  className="px-5 py-2 rounded-md border text-slate-800 hover:bg-slate-50 transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={handleDeleteConfirm}
            caseName={caseToDelete?.caseNumber}
          />
        )}
      </div>
    </div>
  );
}
