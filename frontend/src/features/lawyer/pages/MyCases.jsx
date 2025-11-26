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
      console.log("📊 Raw case data from API:", data.data[0]);
      const mapped = data.data.map((c) => {
        const mappedCase = {
          ...c,
          id: c._id || c.id,
          _id: c._id || c.id, // Keep both for compatibility
          clientName: c.clientId?.name || "—",
          clientEmail: c.clientId?.email || "—",
          clientPhone: c.clientId?.contactNumber || "—",
          assignedStage: c.currentStage || 0,
          currentStage: c.currentStage || 0, // Keep both
          stages: c.stages || [],
          notes: c.notes || [],
          caseNumber: c.caseNumber,
          caseType: c.caseType,
          status: c.status,
        };
        return mappedCase;
      });
      console.log("📊 Mapped case:", mapped[0]);
      setCases(mapped);

      // Update selectedCase if it's currently open and data has changed
      if (selectedCase) {
        const updatedCase = mapped.find(
          (c) => c._id === selectedCase._id || c.id === selectedCase.id
        );
        if (updatedCase) {
          console.log("🔄 Updating selected case with fresh data");
          setSelectedCase(updatedCase);
        }
      }
    }
  }, [data, selectedCase]);

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
    console.log("🔍 Opening case - Full object:", c);
    console.log("🔍 Case details:", {
      _id: c._id,
      id: c.id,
      caseNumber: c.caseNumber,
      stagesLength: Array.isArray(c.stages) ? c.stages.length : "NOT ARRAY",
      stagesValue: c.stages,
      currentStage: c.currentStage,
      assignedStage: c.assignedStage,
    });

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

  // This function is no longer needed since we're using RTK Query cache invalidation
  // const updateCaseMemorandum = (stage, updatedMemo) => {
  //   // API will automatically refresh after mutation
  // };

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
      className={`min-h-screen px-4 py-3 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"
      }`}
    >
      <div className="max-w-7xl mx-auto mt-20">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
              My Assigned Cases
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Workspace for lawyers — review documents, manage workflow
              efficiently.
            </p>
          </div>

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

        <CasesTable
          cases={cases}
          onOpen={openCase}
          onDelete={handleDeleteClick}
        />

        {selectedCase && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-transform duration-300 scale-100 md:scale-100">
              {/* Header */}
              <div className="flex justify-between items-start px-6 py-4 bg-linear-to-r from-slate-800 to-slate-700 text-white rounded-t-2xl">
                <h2 className="font-bold text-xl md:text-2xl">
                  {selectedCase.caseNumber}
                </h2>
                <button
                  onClick={closeCase}
                  className="p-2 rounded hover:bg-slate-600 transition"
                >
                  <FiX size={24} />
                </button>
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

              {/* Tab Content */}
              <div className="flex-1 overflow-auto p-6 bg-slate-50">
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
