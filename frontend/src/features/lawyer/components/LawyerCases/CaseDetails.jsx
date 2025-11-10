import React, { useState, useEffect } from "react";
import CaseTimeline from "./CaseTimeline";
import DocumentViewerModal from "./DocumentViewerModal";
import { ArrowLeft, FileText, Send, FileArchive, CheckCircle, Clock } from "lucide-react";

const CaseDetails = ({ selectedCase, onSubmitMemorandum, onBack }) => {
  const [memorandumText, setMemorandumText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDoc, setModalDoc] = useState({ name: "", url: "" });

  useEffect(() => {
    if (selectedCase?.memorandums?.length > 0) {
      const lastMemo = selectedCase.memorandums[selectedCase.memorandums.length - 1];
      setMemorandumText(lastMemo.comments || "");
    } else {
      setMemorandumText("");
    }
  }, [selectedCase]);

  const handleSubmit = () => {
    if (!memorandumText.trim()) return alert("Please enter the memorandum text.");
    onSubmitMemorandum(selectedCase.id, memorandumText);
    setMemorandumText("");
  };

  const handleViewDocument = (docName) => {
    const docUrl = `/documents/${docName}`;
    setModalDoc({ name: docName, url: docUrl });
    setModalOpen(true);
  };

  if (!selectedCase) return null;

  // Determine status style and icon
  const getStatusBadge = (status) => {
    const base = "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium";
    switch (status) {
      case "Approved":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <CheckCircle className="w-4 h-4" /> Approved
          </span>
        );
      case "Pending":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            <Clock className="w-4 h-4" /> Pending
          </span>
        );
      default:
        return (
          <span className={`${base} bg-slate-100 text-slate-700`}>
            <Clock className="w-4 h-4" /> In Progress
          </span>
        );
    }
  };

  return (
    <div className="bg-[#F9FAFB] rounded-2xl shadow-lg border border-[#E1E1E2] p-8 mt-6 transition-all duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition p-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-slate-800" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">{selectedCase.clientName}</h2>
            <p className="text-sm text-gray-500">
              Case #: {selectedCase.caseNumber} — Stage: {selectedCase.stage}
            </p>
          </div>
        </div>
        {getStatusBadge(selectedCase.status)}
      </div>

      <hr className="border-gray-200 my-4" />

      {/* Documents Section */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FileArchive className="w-5 h-5 text-slate-600" /> Attached Documents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedCase.documents?.length > 0 ? (
            selectedCase.documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center"
              >
                <span className="text-gray-700 font-medium truncate">{doc}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    View
                  </button>
                  <a
                    href={`/documents/${doc}`}
                    download
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">No documents uploaded yet.</p>
          )}
        </div>
      </section>

      {/* Draft Memorandum Section */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-600" /> Draft New Memorandum
        </h3>
        <textarea
          rows={6}
          className="w-full border border-gray-300 bg-white p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write your draft memorandum here..."
          value={memorandumText}
          onChange={(e) => setMemorandumText(e.target.value)}
        />
        <button
          className="mt-4 px-6 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition flex items-center gap-2"
          onClick={handleSubmit}
        >
          <Send className="w-4 h-4" /> Submit to Ragab
        </button>
      </section>

      {/* Previous Memorandums */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Previous Memorandums</h3>
        {selectedCase.memorandums?.length > 0 ? (
          <div className="space-y-3">
            {selectedCase.memorandums.map((m, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-slate-800">Version {m.version}</p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  {m.approved === null
                    ? "Pending Approval"
                    : m.approved
                    ? "Approved"
                    : "Modification Requested"}
                </p>
                {m.comments && (
                  <p className="mt-2 text-gray-700 text-sm">Comments: {m.comments}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No previous memorandums found.</p>
        )}
      </section>

      {/* Case Timeline */}
      <CaseTimeline stages={selectedCase.stages} />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        documentName={modalDoc.name}
        documentUrl={modalDoc.url}
      />
    </div>
  );
};

export default CaseDetails;
