import React, { useRef, useState, useMemo } from "react";
import { FiUpload, FiFileText, FiLoader } from "react-icons/fi";
import StatusPill from "./StatusPill";
import { useUploadMemorandumFileMutation } from "../../api/lawyerApi";

export default function MemorandumTab({
  selectedCase,
  selectedStage,
  userRole = "Lawyer",
}) {
  // Get memorandum from the stages array, not from memorandum object
  const currentStage = selectedCase.stages?.[selectedStage];
  const memo = currentStage?.memorandum || {};
  const fileInputRef = useRef(null);

  const [uploadMemorandum, { isLoading: isUploading }] =
    useUploadMemorandumFileMutation();
  const [content, setContent] = useState("");
  const [localFile, setLocalFile] = useState(null);

  // Use useMemo to prevent creating new objects on every render
  const uploadedFile = useMemo(() => memo.fileUrl || null, [memo.fileUrl]);
  const status = useMemo(() => memo.status || "Pending", [memo.status]);

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLocalFile(file);
  };

  const handleSubmitMemorandum = async () => {
    if (!localFile && !content) {
      alert("Please provide content or upload a file");
      return;
    }

    console.log("📝 Uploading memorandum:", {
      hasFile: !!localFile,
      hasContent: !!content,
      stageIndex: selectedStage,
      caseId: selectedCase._id || selectedCase.id,
      fileName: localFile?.name,
    });

    try {
      const formData = new FormData();
      if (localFile) {
        formData.append("memorandum", localFile);
        console.log("📄 Added file to FormData:", localFile.name);
      }
      formData.append("stageIndex", selectedStage);
      console.log("🎯 Stage index:", selectedStage);
      if (content) {
        formData.append("content", content);
        console.log("📝 Content length:", content.length);
      }

      const result = await uploadMemorandum({
        id: selectedCase._id || selectedCase.id,
        formData,
      }).unwrap();

      console.log("✅ Upload successful:", result);
      console.log(
        "📝 New memorandum in response:",
        result.data?.stages?.[selectedStage]?.memorandum
      );
      alert("Memorandum uploaded successfully!");
      setLocalFile(null);
      setContent("");
      // Note: Parent component will auto-refresh from RTK Query cache invalidation
    } catch (error) {
      console.error("❌ Failed to upload memorandum:", {
        error,
        message: error?.message,
        data: error?.data,
        status: error?.status,
      });
      alert(
        `Failed to upload memorandum: ${
          error?.data?.message || error?.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">
            Memorandum -{" "}
            <span className="text-slate-600">
              {currentStage?.stageType || `Stage ${selectedStage + 1}`}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Last updated:{" "}
            {memo?.preparedAt
              ? new Date(memo.preparedAt).toLocaleString()
              : "—"}
          </div>
          {status && <StatusPill status={status} />}
        </div>

        <div className="flex gap-2">
          {/* Lawyer Actions */}
          {userRole === "Lawyer" && (
            <>
              <button
                onClick={handleUploadClick}
                disabled={isUploading}
                className="inline-flex items-center gap-2 px-3 py-2 border rounded text-sm hover:bg-slate-50 disabled:opacity-50"
              >
                <FiUpload /> Choose File
              </button>
              {(localFile || content) && (
                <button
                  onClick={handleSubmitMemorandum}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <FiLoader className="animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <FiUpload /> Submit Memorandum
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload Form */}
      {userRole === "Lawyer" && !memo?.fileUrl && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h4 className="font-semibold text-sm mb-3 text-blue-900">
            Upload New Memorandum
          </h4>

          {/* Content Textarea */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Memorandum Content (Optional)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter memorandum content..."
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              rows={4}
            />
          </div>

          {/* File Selection Display */}
          {localFile && (
            <div className="flex items-center gap-2 p-2 bg-white border border-slate-300 rounded text-sm">
              <FiFileText className="text-blue-600" />
              <span className="flex-1 text-slate-700">{localFile.name}</span>
              <button
                onClick={() => setLocalFile(null)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}

      {/* Display memorandum content and file */}
      {memo && (memo.content || memo.fileUrl) ? (
        <div className="space-y-4">
          {/* Content */}
          {memo.content && (
            <div className="p-4 bg-slate-50 border rounded">
              <h4 className="font-semibold text-sm mb-2">
                Memorandum Content:
              </h4>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">
                {memo.content}
              </p>
            </div>
          )}

          {/* File */}
          {memo.fileUrl && (
            <div className="flex items-center gap-3 p-3 border rounded bg-white">
              <FiFileText className="text-slate-700" />
              <div className="flex-1">
                <div className="font-medium">Memorandum Document</div>
                <div className="text-xs text-slate-500">
                  {memo.preparedAt &&
                    `Uploaded: ${new Date(memo.preparedAt).toLocaleString()}`}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={memo.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded border text-sm hover:bg-slate-50"
                >
                  View
                </a>
                <a
                  href={memo.fileUrl}
                  download
                  className="px-3 py-1 rounded border text-sm hover:bg-slate-50"
                >
                  Download
                </a>
              </div>
            </div>
          )}

          {/* Feedback if rejected */}
          {memo.feedback && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h4 className="font-semibold text-sm text-red-700 mb-2">
                Feedback from Ragab:
              </h4>
              <p className="text-sm text-red-600">{memo.feedback}</p>
            </div>
          )}

          {/* Approval info */}
          {memo.status === "Approved" && memo.approvedAt && (
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">
                ✓ Approved on {new Date(memo.approvedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 text-slate-500 bg-slate-50 rounded border">
          No memorandum uploaded for this stage yet.
        </div>
      )}
    </div>
  );
}
