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
        <p>
          <strong>Case Type:</strong> {caseType || "—"}
        </p>
        <p>
          <strong>Status:</strong> {status || "—"}
        </p>
        <p>
          <strong>Client Name:</strong> {clientName || "—"}
        </p>
        <p>
          <strong>Client Email:</strong> {clientEmail || "—"}
        </p>
        <p>
          <strong>Client Phone:</strong> {clientPhone || "—"}
        </p>
        {hearing && (
          <p>
            <strong>Hearing Date:</strong> {new Date(hearing).toLocaleString()}
          </p>
        )}
      </div>

      {/* Stages */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Stages</h3>
        {stages.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {stages.map((stage, idx) => (
              <li key={idx}>
                {stage.title || `Stage ${idx + 1}`} -{" "}
                {stage.description || "No description"}
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

      {/* Memorandum Status by Stage */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Memorandum Status</h3>
        {stages.length > 0 ? (
          <div className="space-y-3">
            {stages.map((stage, idx) => {
              const stageMemo = stage.memorandum;
              return (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">
                    {stage.stageType || `Stage ${idx + 1}`}
                  </p>
                  {stageMemo ? (
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            stageMemo.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : stageMemo.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : stageMemo.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {stageMemo.status}
                        </span>
                      </p>
                      {stageMemo.content && (
                        <p>
                          <strong>Content:</strong> {stageMemo.content}
                        </p>
                      )}
                      {stageMemo.fileUrl && (
                        <p>
                          <strong>File:</strong>{" "}
                          <a
                            href={stageMemo.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Document
                          </a>
                        </p>
                      )}
                      {stageMemo.preparedAt && (
                        <p className="text-xs text-slate-500">
                          Prepared:{" "}
                          {new Date(stageMemo.preparedAt).toLocaleString()}
                        </p>
                      )}
                      {stageMemo.feedback && (
                        <p className="text-red-600">
                          <strong>Feedback:</strong> {stageMemo.feedback}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm mt-1">
                      No memorandum submitted yet
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500">No stages available.</p>
        )}
      </div>
    </div>
  );
}
