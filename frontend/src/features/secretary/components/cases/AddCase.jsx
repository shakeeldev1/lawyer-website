import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import ClientInfoForm from "./ClientInfoForm";
import CaseDetailsForm from "./CaseDetailsForm";
import DocumentDetailsForm from "./DocumentDetailsForm";
import {
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useGetAllClientsQuery,
} from "../../api/secretaryApi";
import { toast } from "react-toastify";

const AddCase = ({ isOpen, onClose, onAddCase, caseData }) => {
  const [step, setStep] = useState(1);
  const prevOpenState = useRef(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

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

  // Only run when modal transitions from closed to open
  useEffect(() => {
    // Detect when modal just opened
    if (isOpen && !prevOpenState.current) {
      if (caseData) {
        setClientInfo({ ...caseData.client });
        // When editing, use assignedLawyerId for the dropdown value
        setCaseInfo({
          ...caseData.case,
          assignedLawyer:
            caseData.case.assignedLawyerId ||
            caseData.case.assignedLawyer ||
            "",
        });
      } else {
        // Reset for new case
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
      setStep(1);
    }

    // Update ref for next render
    prevOpenState.current = isOpen;
  }, [isOpen, caseData]);

  const handleClientChange = (e) =>
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  const handleCaseChange = (e) =>
    setCaseInfo({ ...caseInfo, [e.target.name]: e.target.value });

  const [createCase, { isLoading: isCreating }] = useCreateCaseMutation();
  const [updateCase, { isLoading: isUpdating }] = useUpdateCaseMutation();
  const { data: clientsData } = useGetAllClientsQuery();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      if (caseData) {
        // Update existing case - use _id from MongoDB
        await updateCase({
          id: caseData._id || caseData.id,
          data: {
            caseType: caseInfo.caseType,
            caseDescription: caseInfo.description,
            assignedLawyer: caseInfo.assignedLawyer || null,
            documents: caseInfo.documents,
          },
        }).unwrap();
        toast.success("Case updated successfully!");
      } else {
        // Create new case - requires clientId
        let clientId = selectedClientId;

        // If no client selected from dropdown, try to find by email/contact
        if (!clientId) {
          const existingClient = clientsData?.clients?.find(
            (c) =>
              c.email === clientInfo.email ||
              c.contactNumber === clientInfo.contact
          );
          clientId = existingClient?._id;
        }

        // If still no client, show error
        if (!clientId) {
          toast.error(
            "Please select an existing client or create a new client first from the Clients page."
          );
          return;
        }

        // Validate required fields
        if (!caseInfo.caseType) {
          toast.error("Please select a case type");
          return;
        }

        if (!caseInfo.assignedLawyer) {
          toast.error("Please assign a lawyer to the case");
          return;
        }

        // Create the case with assigned lawyer
        await createCase({
          clientId,
          caseType: caseInfo.caseType,
          caseDescription: caseInfo.description,
          assignedLawyer: caseInfo.assignedLawyer,
          documents: caseInfo.documents || [],
        }).unwrap();
        toast.success("Case created successfully!");
      }
      onAddCase();
      onClose();
      setSelectedClientId(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save case");
    }
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
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1
                    ? "bg-white text-[#11408bee]"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={`ml-2 text-sm ${
                  step >= 1 ? "text-white" : "text-gray-300"
                }`}
              >
                Client
              </span>
            </div>

            {/* Connector */}
            <div
              className={`w-8 h-0.5 ${step >= 2 ? "bg-white" : "bg-gray-300"}`}
            ></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2
                    ? "bg-white text-[#11408bee]"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 text-sm ${
                  step >= 2 ? "text-white" : "text-gray-300"
                }`}
              >
                Case
              </span>
            </div>

            {/* Connector */}
            <div
              className={`w-8 h-0.5 ${step >= 3 ? "bg-white" : "bg-gray-300"}`}
            ></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3
                    ? "bg-white text-[#11408bee]"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`ml-2 text-sm ${
                  step >= 3 ? "text-white" : "text-gray-300"
                }`}
              >
                Documents
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {step === 1 && (
            <ClientInfoForm
              clientInfo={clientInfo}
              onChange={handleClientChange}
              onClientSelect={setSelectedClientId}
              selectedClientId={selectedClientId}
            />
          )}

          {step === 2 && (
            <CaseDetailsForm caseInfo={caseInfo} onChange={handleCaseChange} />
          )}

          {step === 3 && (
            <DocumentDetailsForm
              caseInfo={caseInfo}
              onChange={(e) => {
                if (e.target.name === "documents") {
                  setCaseInfo((prev) => ({
                    ...prev,
                    documents: e.target.value,
                  }));
                }
              }}
            />
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
              disabled={isCreating || isUpdating}
              className={`px-6 py-2 bg-[#11408bee]/90 text-white rounded-lg hover:bg-[#11408bee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                step === 1 ? "ml-auto" : ""
              }`}
            >
              {step === 3 ? (
                isCreating || isUpdating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  "Save Case"
                )
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCase;
