import React from "react";
import { FiFileText, FiUpload } from "react-icons/fi";

export default function DocumentsTab({ selectedCase, selectedStage, userRole }) {
  const docs = selectedCase.documents[selectedStage] || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-slate-700">
          Documents for <span className="font-medium">{selectedStage}</span>
        </div>
        {userRole !== "Client" && (
          <button className="inline-flex items-center gap-2 bg-white border px-3 py-2 rounded text-sm">
            <FiUpload /> Upload
          </button>
        )}
      </div>
      <div className="space-y-3">
        {docs.length > 0 ? (
          docs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
                <FiFileText className="text-slate-700" />
                <div>
                  <div className="font-medium">{doc.title}</div>
                  <div className="text-xs text-slate-500">{doc.uploadedAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded border text-sm">View</button>
                <button className="px-3 py-1 rounded border text-sm">Download</button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-slate-500">No documents uploaded for this stage yet.</div>
        )}
      </div>
    </div>
  );
}
