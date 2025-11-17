import React, { useRef, useState } from "react";
import { FiUpload, FiFileText } from "react-icons/fi";
import StatusPill from "./StatusPill";

export default function MemorandumTab({ selectedCase, selectedStage, updateCaseMemorandum, userRole="Lawyer" }) {
  const memo = selectedCase.memorandum[selectedStage] || {};
  const fileInputRef = useRef(null);

  const [uploadedFile, setUploadedFile] = useState(memo.file || null);
  const [status, setStatus] = useState(memo.status || "Pending Lawyer Review");

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFile = {
      title: file.name,
      uploadedAt: new Date().toLocaleString(),
      fileObj: file,
    };

    setUploadedFile(newFile);
    const updatedMemo = { ...memo, file: newFile, status: "Pending Lawyer Review" };
    setStatus("Pending Lawyer Review");
    updateCaseMemorandum(selectedStage, updatedMemo);
  };

  const handleSendToRagab = () => {
    const updatedMemo = { ...memo, status: "Under Revision by Ragab" };
    setStatus("Under Revision by Ragab");
    updateCaseMemorandum(selectedStage, updatedMemo);
  };

  const handleRagabApprove = () => {
    const updatedMemo = { ...memo, status: "Approved" };
    setStatus("Approved");
    updateCaseMemorandum(selectedStage, updatedMemo);
  };

  const handleMDApprove = () => {
    const updatedMemo = { ...memo, status: "Submitted" };
    setStatus("Submitted");
    updateCaseMemorandum(selectedStage, updatedMemo);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">
            Memorandum - <span className="text-slate-600">{selectedStage}</span>
          </div>
          <div className="text-xs text-slate-500">
            Last updated: {uploadedFile?.uploadedAt || memo?.lastUpdated || "—"}
          </div>
          {status && <StatusPill status={status} />}
        </div>

        <div className="flex gap-2">
          {/* Lawyer Actions */}
          {userRole === "Lawyer" && (
            <>
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center gap-2 px-3 py-2 border rounded text-sm"
              >
                <FiUpload /> Upload
              </button>
              {status === "Pending Lawyer Review" && uploadedFile && (
                <button
                  onClick={handleSendToRagab}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                >
                  Send to Ragab
                </button>
              )}
            </>
          )}

          {/* Ragab Actions */}
          {userRole === "Ragab" && status === "Under Revision by Ragab" && (
            <button
              onClick={handleRagabApprove}
              className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
            >
              Approve
            </button>
          )}

          {/* MD Actions */}
          {userRole === "MD" && status === "Approved" && (
            <button
              onClick={handleMDApprove}
              className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition"
            >
              Sign & Submit
            </button>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {uploadedFile ? (
        <div className="flex items-center gap-3 p-3 border rounded">
          <FiFileText className="text-slate-700" />
          <div className="flex-1">
            <div className="font-medium">{uploadedFile.title}</div>
            <div className="text-xs text-slate-500">{uploadedFile.uploadedAt}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded border text-sm"
              onClick={() => window.open(URL.createObjectURL(uploadedFile.fileObj), "_blank")}
            >
              View
            </button>
            <button
              className="px-3 py-1 rounded border text-sm"
              onClick={() => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(uploadedFile.fileObj);
                link.download = uploadedFile.title;
                link.click();
              }}
            >
              Download
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 text-slate-500">No memorandum uploaded for this stage yet.</div>
      )}
    </div>
  );
}
