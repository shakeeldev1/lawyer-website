import React, { useRef, useState } from "react";
import {
  FiFileText,
  FiUpload,
  FiLoader,
  FiDownload,
  FiEye,
} from "react-icons/fi";
import { useUploadCaseDocumentMutation } from "../../api/lawyerApi";

export default function DocumentsTab({
  selectedCase,
  selectedStage,
  userRole,
}) {
  const fileInputRef = useRef(null);
  const [localFiles, setLocalFiles] = useState([]);
  const [uploadDocument, { isLoading: isUploading }] =
    useUploadCaseDocumentMutation();

  // Get current stage documents
  const currentStage = selectedCase.stages?.[selectedStage];
  const docs = currentStage?.documents || [];

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setLocalFiles(files);
    }
  };

  const handleSubmitDocuments = async () => {
    if (localFiles.length === 0) {
      alert("Please select files to upload");
      return;
    }

    console.log("📤 Uploading documents:", {
      filesCount: localFiles.length,
      stageIndex: selectedStage,
      caseId: selectedCase._id || selectedCase.id,
      files: localFiles.map((f) => ({ name: f.name, size: f.size })),
    });

    try {
      const formData = new FormData();
      localFiles.forEach((file) => {
        formData.append("documents", file);
        console.log("📄 Added file to FormData:", file.name);
      });
      formData.append("stageIndex", selectedStage);
      console.log("🎯 Stage index:", selectedStage);

      const result = await uploadDocument({
        id: selectedCase._id || selectedCase.id,
        formData,
      }).unwrap();

      console.log("✅ Upload successful:", result);
      console.log(
        "📄 New documents in response:",
        result.data?.stages?.[selectedStage]?.documents
      );
      alert("Documents uploaded successfully!");
      setLocalFiles([]);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // Note: Parent component will auto-refresh from RTK Query cache invalidation
    } catch (error) {
      console.error("❌ Failed to upload documents:", {
        error,
        message: error?.message,
        data: error?.data,
        status: error?.status,
      });
      alert(
        `Failed to upload documents: ${
          error?.data?.message || error?.message || "Unknown error"
        }`
      );
    }
  };

  const handleView = (doc) => {
    const fileUrl = doc.url || doc.fileUrl;
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const handleDownload = (doc) => {
    const fileUrl = doc.url || doc.fileUrl;
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = doc.name || doc.title || "document";
      link.target = "_blank";
      link.click();
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-slate-700">
          Documents for <span className="font-medium">{selectedStage}</span>
        </div>
        {userRole !== "Client" && (
          <div className="flex gap-2">
            <button
              onClick={handleUploadClick}
              disabled={isUploading}
              className="inline-flex items-center gap-2 bg-white border px-3 py-2 rounded text-sm hover:bg-slate-50 disabled:opacity-50"
            >
              <FiUpload /> Choose Files
            </button>
            {localFiles.length > 0 && (
              <button
                onClick={handleSubmitDocuments}
                disabled={isUploading}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <FiLoader className="animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <FiUpload /> Upload {localFiles.length} file(s)
                  </>
                )}
              </button>
            )}
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </div>

      {/* Selected Files Preview */}
      {localFiles.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <h4 className="text-sm font-semibold mb-2 text-blue-900">
            Selected Files:
          </h4>
          <div className="space-y-1">
            {localFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <FiFileText className="text-blue-600" />
                <span>{file.name}</span>
                <span className="text-xs text-slate-500">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Documents List */}
      <div className="space-y-3">
        {docs.length > 0 ? (
          docs.map((doc, idx) => (
            <div
              key={doc._id || idx}
              className="flex items-center justify-between p-3 border rounded hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <FiFileText className="text-slate-700 text-lg" />
                <div>
                  <div className="font-medium text-slate-900">
                    {doc.name || doc.title || "Document"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {doc.uploadedAt
                      ? new Date(doc.uploadedAt).toLocaleDateString()
                      : "No date"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleView(doc)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded border text-sm hover:bg-white transition"
                >
                  <FiEye /> View
                </button>
                <button
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded border text-sm hover:bg-white transition"
                >
                  <FiDownload /> Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-slate-500 border border-dashed rounded">
            <FiFileText className="mx-auto text-3xl mb-2 text-slate-400" />
            <p>No documents uploaded for this stage yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
