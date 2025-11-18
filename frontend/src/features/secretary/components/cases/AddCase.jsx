import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import ClientInfoForm from "./ClientInfoForm";
import CaseDetailsForm from "./CaseDetailsForm";
import DocumentDetailsForm from "./DocumentDetailsForm";

const AddCase = ({ isOpen, onClose, onAddCase, caseData }) => {
  const [step, setStep] = useState(1);

  const [clientInfo, setClientInfo] = useState({
    name: "",
    contact: "",
    email: "",
    nationalId: "",
    address: "",
    additionalInformation: "",
  });

  const [caseInfo, setCaseInfo] = useState({
    caseType: "",
    description: "",
    assignedLawyer: "",
    hearingDate: "",
    filingDate: new Date().toISOString().slice(0, 10),
    status: "Pending",
    stage: "Main Case",
    documents: [],
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (caseData) {
      setClientInfo({ ...caseData.client });
      setCaseInfo({ ...caseData.case });
    } else {
      setClientInfo({
        name: "",
        contact: "",
        email: "",
        nationalId: "",
        address: "",
        additionalInformation: "",
      });
      setCaseInfo({
        caseType: "",
        description: "",
        assignedLawyer: "",
        hearingDate: "",
        filingDate: new Date().toISOString().slice(0, 10),
        status: "Pending",
        stage: "Main Case",
        documents: [],
      });
    }
  }, [caseData, isOpen]);

  const handleClientChange = (e) =>
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  const handleCaseChange = (e) =>
    setCaseInfo({ ...caseInfo, [e.target.name]: e.target.value });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    const updatedCase = caseData
      ? { id: caseData.id, client: { ...clientInfo }, case: { ...caseInfo } }
      : { id: `C-${Date.now().toString().slice(-6)}`, client: { ...clientInfo }, case: { ...caseInfo } };

    onAddCase(updatedCase);
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 !z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col relative">

        {/* Fixed Header */}
        <div className="sticky top-0 bg-[#11408bee] z-10 border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-100">
              {caseData ? "Edit Case" : "Add New Case"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-100" />
            </button>
          </div>

          {/* Mini Step Indicator */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-white text-[#11408bee]" : "bg-gray-300 text-gray-500"
                }`}>
                1
              </div>
              <span className={`ml-2 text-sm ${step >= 1 ? "text-white" : "text-gray-300"}`}>
                Client
              </span>
            </div>

            {/* Connector */}
            <div className={`w-8 h-0.5 ${step >= 2 ? "bg-white" : "bg-gray-300"}`}></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-white text-[#11408bee]" : "bg-gray-300 text-gray-500"
                }`}>
                2
              </div>
              <span className={`ml-2 text-sm ${step >= 2 ? "text-white" : "text-gray-300"}`}>
                Case
              </span>
            </div>

            {/* Connector */}
            <div className={`w-8 h-0.5 ${step >= 3 ? "bg-white" : "bg-gray-300"}`}></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? "bg-white text-[#11408bee]" : "bg-gray-300 text-gray-500"
                }`}>
                3
              </div>
              <span className={`ml-2 text-sm ${step >= 3 ? "text-white" : "text-gray-300"}`}>
                Documents
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {step === 1 && (
            <ClientInfoForm clientInfo={clientInfo} onChange={handleClientChange} />
          )}

          {step === 2 && (
            <CaseDetailsForm caseInfo={caseInfo} onChange={handleCaseChange} />
          )}

          {step === 3 && (
            <DocumentDetailsForm
              caseInfo={caseInfo}
              onChange={(e) => {
                if (e.target.name === 'documents') {
                  setCaseInfo(prev => ({
                    ...prev,
                    documents: e.target.value
                  }));
                }
              }}
            />
            // <div className="space-y-4">
            //   <h3 className="text-lg font-semibold text-gray-800">Document Details</h3>
            //   <p className="text-gray-600">Document upload functionality will be implemented here.</p>
            //   {/* Add your document upload components here */}
            //   <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            //     <p className="text-gray-500">Drag and drop files here or click to upload</p>
            //     <button className="mt-2 px-4 py-2 bg-[#11408bee] text-white rounded-lg hover:bg-[#0f3674] transition-colors">
            //       Upload Documents
            //     </button>
            //   </div>
            // </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
            )}

            <button
              onClick={step === 3 ? handleSubmit : handleNext}
              className={`px-6 py-2 bg-[#11408bee]/90 text-white rounded-lg hover:bg-[#11408bee] transition-colors ${step === 1 ? "ml-auto" : ""
                }`}
            >
              {step === 3 ? "Save Case" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCase;