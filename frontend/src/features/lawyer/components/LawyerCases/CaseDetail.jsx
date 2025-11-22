import React from "react";

export default function CaseDetail({ selectedCase }) {
  if (!selectedCase) return null;

  const {
    caseNumber,
    caseType,
    clientName,
    clientEmail,
    clientPhone,
    status,
    stages = [],
    documents = [],
    notes = [],
    memorandum = {},
    hearing,
  } = selectedCase;

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">{caseNumber}</h2>
        <p><strong>Case Type:</strong> {caseType || "—"}</p>
        <p><strong>Status:</strong> {status || "—"}</p>
        <p><strong>Client Name:</strong> {clientName || "—"}</p>
        <p><strong>Client Email:</strong> {clientEmail || "—"}</p>
        <p><strong>Client Phone:</strong> {clientPhone || "—"}</p>
        {hearing && <p><strong>Hearing Date:</strong> {new Date(hearing).toLocaleString()}</p>}
      </div>

      {/* Stages */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Stages</h3>
        {stages.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {stages.map((stage, idx) => (
              <li key={idx}>
                {stage.title || `Stage ${idx + 1}`} - {stage.description || "No description"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No stages available.</p>
        )}
      </div>

      {/* Documents */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Documents</h3>
        {documents.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {documents.map((doc) => (
              <li key={doc._id}>
                <a
                  href={doc.url}
                  download={doc.name} // forces download
                  className="text-blue-600 hover:underline"
                >
                  {doc.name}
                </a>{" "}
                ({new Date(doc.uploadedAt).toLocaleString()})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No documents uploaded.</p>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        {notes.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No notes available.</p>
        )}
      </div>

      {/* Memorandum */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Memorandum</h3>
        {Object.keys(memorandum).length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(memorandum).map(([stage, memo]) => (
              <li key={stage}>
                <strong>{stage}:</strong>{" "}
                {typeof memo === "string" && memo.endsWith(".pdf") ? (
                  <a
                    href={memo}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    {memo.split("/").pop()}
                  </a>
                ) : (
                  memo
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No memorandum available.</p>
        )}
      </div>
    </div>
  );
}
