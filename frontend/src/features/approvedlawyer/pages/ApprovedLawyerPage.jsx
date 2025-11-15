// ApprovedLawyerPage.jsx
import React, { useState } from "react";
import { FiCheckCircle, FiX, FiFilter } from "react-icons/fi";

// Dummy data
const dummyCases = [
  {
    id: 1,
    caseNumber: "MC-2025-001",
    caseName: "Ahmed vs Ali",
    stage: "Main",
    assignedLawyer: "Lawyer A",
    uploadDate: "2025-11-10",
    status: "Pending",
    memorandum: "Lorem ipsum dolor sit amet...",
    documents: ["doc1.pdf", "doc2.pdf"],
    client: { name: "Ahmed", contact: "+923001234567" },
    notes: "Initial memorandum uploaded.",
  },
  {
    id: 2,
    caseNumber: "AP-2025-002",
    caseName: "Fatima vs State",
    stage: "Appeal",
    assignedLawyer: "Lawyer B",
    uploadDate: "2025-11-12",
    status: "Pending",
    memorandum: "Second memorandum for appeal...",
    documents: ["appeal_doc1.pdf"],
    client: { name: "Fatima", contact: "+923009876543" },
    notes: "",
  },
];

export default function ApprovedLawyerPage() {
  const [cases, setCases] = useState(dummyCases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStage, setFilterStage] = useState("");

  const filteredCases = cases.filter(
    (c) => filterStage === "" || c.stage === filterStage
  );

  const handleApproval = (id, status, note = "") => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: status, notes: note || c.notes + " | Approved" }
          : c
      )
    );
    setSelectedCase(null);
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Memorandum Approval</h1>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="border rounded p-2"
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
        >
          <option value="">All Stages</option>
          <option value="Main">Main</option>
          <option value="Appeal">Appeal</option>
          <option value="Cassation">Cassation</option>
        </select>
        <FiFilter className="text-gray-500" />
      </div>

      <div className="flex gap-6">
        {/* Cases List */}
        <div className="w-1/2 bg-white shadow rounded p-4 overflow-y-auto max-h-[600px]">
          <h2 className="font-semibold mb-2">Pending Memorandums</h2>
          <ul>
            {filteredCases.map((c) => (
              <li
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className="border p-3 mb-2 rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{c.caseName} ({c.caseNumber})</p>
                  <p className="text-sm text-gray-500">{c.stage}</p>
                  <p className="text-sm text-gray-500">Lawyer: {c.assignedLawyer}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    c.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Case Detail & Actions */}
        <div className="w-1/2 bg-white shadow rounded p-4 max-h-[600px] overflow-y-auto">
          {selectedCase ? (
            <>
              <h2 className="text-xl font-semibold mb-2">
                {selectedCase.caseName} ({selectedCase.caseNumber})
              </h2>
              <p className="mb-1"><strong>Stage:</strong> {selectedCase.stage}</p>
              <p className="mb-1"><strong>Assigned Lawyer:</strong> {selectedCase.assignedLawyer}</p>
              <p className="mb-1"><strong>Client:</strong> {selectedCase.client.name} / {selectedCase.client.contact}</p>
              <p className="mb-2"><strong>Notes:</strong> {selectedCase.notes || "No notes"}</p>

              <h3 className="font-semibold mb-2">Memorandum</h3>
              <p className="mb-2 border p-2 rounded bg-gray-50">{selectedCase.memorandum}</p>

              <h3 className="font-semibold mb-2">Documents</h3>
              <ul className="mb-4">
                {selectedCase.documents.map((doc, index) => (
                  <li key={index} className="text-blue-600 underline cursor-pointer">{doc}</li>
                ))}
              </ul>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center justify-center gap-2"
                  onClick={() => handleApproval(selectedCase.id, "Approved")}
                >
                  <FiCheckCircle /> Approve
                </button>
                <button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center justify-center gap-2"
                  onClick={() =>
                    handleApproval(selectedCase.id, "Modification Requested", "Modification requested by Ragab")
                  }
                >
                  <FiX /> Request Modification
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select a case to review</p>
          )}
        </div>
      </div>
    </div>
  );
}
