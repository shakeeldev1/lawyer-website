import React, { useState, useRef } from "react";
import { Upload, FileText, X, Trash2, AlertCircle, CheckCircle } from "lucide-react";

const DocumentDetailsForm = ({ caseInfo, onChange }) => {
  const [documents, setDocuments] = useState(caseInfo?.documents || []);
  const [errors, setErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Update parent when documents change
  React.useEffect(() => {
    if (onChange) {
      onChange({
        target: {
          name: 'documents',
          value: documents
        }
      });
    }
  }, [documents, onChange]);

  // Validate documents
  const validateDocuments = () => {
    const newErrors = [];
    
    if (documents.length < 3) {
      newErrors.push(`At least 3 documents are required. Currently have ${documents.length}.`);
    }
    
    // Validate file types and sizes
    documents.forEach((doc, index) => {
      if (doc.file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/png',
          'image/jpg'
        ];

        if (doc.file.size > maxSize) {
          newErrors.push(`"${doc.name}" is too large. Maximum size is 10MB.`);
        }

        if (!allowedTypes.includes(doc.file.type)) {
          newErrors.push(`"${doc.name}" has an invalid file type.`);
        }
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle file selection
  const handleFileSelect = (files) => {
    const newDocuments = Array.from(files).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file // Store the actual file object
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
    // Reset input to allow selecting same files again
    e.target.value = '';
  };

  // Remove document
  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  // Get file icon based on type
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📎';
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Status */}
      <div className={`p-4 rounded-lg border ${
        documents.length >= 3 
          ? "bg-green-50 border-green-200 text-green-800" 
          : "bg-yellow-50 border-yellow-200 text-yellow-800"
      }`}>
        <div className="flex items-center gap-2">
          {documents.length >= 3 ? (
            <CheckCircle size={18} className="text-green-600" />
          ) : (
            <AlertCircle size={18} className="text-yellow-600" />
          )}
          <span className="font-medium">
            {documents.length} / 3 documents uploaded
          </span>
        </div>
        <p className="text-sm mt-1">
          {documents.length >= 3 
            ? "Great! Minimum requirement met."
            : `Need ${3 - documents.length} more document(s) to proceed.`
          }
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          isDragging 
            ? "border-blue-400 bg-blue-50" 
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2 font-medium">
          Drag and drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
        />
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 mb-2">
            <AlertCircle size={18} />
            <h4 className="font-semibold">Please fix the following issues:</h4>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Uploaded Documents ({documents.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl">{getFileIcon(doc.name)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {doc.file ? `Size: ${(doc.file.size / 1024 / 1024).toFixed(2)}MB` : 'Uploaded'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDocument(index);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove document"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <AlertCircle size={16} />
          Required Documents
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• At least 3 documents are mandatory</li>
          <li>• Supported formats: PDF, Word documents, Images</li>
          <li>• Maximum file size: 10MB per document</li>
          <li>• Recommended: Case files, evidence, contracts, identification</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentDetailsForm;