// src/components/DocumentViewerModal.jsx
import React from "react";
import { X } from "lucide-react";

const DocumentViewerModal = ({ isOpen, onClose, documentName, documentUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{documentName}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Document Content */}
        <div className="p-4">
          {documentUrl.endsWith(".pdf") ? (
            <iframe
              src={documentUrl}
              title={documentName}
              className="w-full h-[70vh] border rounded"
            />
          ) : (
            <p className="text-gray-600">
              Preview not available. <br />
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Click here to download
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
