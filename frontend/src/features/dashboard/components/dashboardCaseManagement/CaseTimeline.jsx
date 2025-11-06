import React, { useState } from "react";
import { ArrowLeft, Clock, Calendar, FileText, User, Download, Share2, Edit } from "lucide-react";

const CaseTimeline = () => {
  // Sample case data - in real app, this would come from props or API
  const [caseData] = useState({
    caseNumber: "C-2024-001",
    clientName: "Ahmed Khan",
    lawyer: "Ali Raza",
    stage: "Appeal",
    status: "In Progress",
    filingDate: "2024-01-15",
    nextHearing: "2024-12-10",
    caseType: "Civil",
    court: "District Court Dubai",
  });

  const [stages] = useState([
    {
      title: "Case Filing",
      status: "completed",
      date: "2024-01-15",
      description: "Initial case documents submitted to the court registry.",
      documents: ["Complaint.pdf", "Power_of_Attorney.pdf"],
    },
    {
      title: "First Hearing",
      status: "completed",
      date: "2024-03-20",
      description: "Preliminary hearing conducted. Defendant filed response.",
      documents: ["Hearing_Minutes.pdf", "Defendant_Response.pdf"],
    },
    {
      title: "Evidence Submission",
      status: "completed",
      date: "2024-06-10",
      description: "All evidence and witness statements submitted to court.",
      documents: ["Evidence_List.pdf", "Witness_Affidavits.zip"],
    },
    {
      title: "Main Case Hearing",
      status: "in-progress",
      date: "2024-09-05",
      description: "Main hearings ongoing. Next session scheduled for December.",
      documents: ["Hearing_Transcript.pdf", "Exhibits_List.pdf"],
    },
    {
      title: "Appeal",
      status: "pending",
      date: "2025-02-15",
      description: "Appeal stage - awaiting main case conclusion.",
      documents: [],
    },
    {
      title: "Cassation",
      status: "pending",
      date: "2025-06-01",
      description: "Final cassation stage at Supreme Court.",
      documents: [],
    },
  ]);

  const [activeTab, setActiveTab] = useState("timeline");

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⟳";
      case "pending":
        return "⏱";
      default:
        return "•";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors p-2 rounded-lg hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Cases
              </button>
              <div className="w-px h-6 bg-slate-300"></div>
              <h1 className="text-2xl font-bold text-slate-900">Case Timeline</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                <Edit className="w-4 h-4" />
                Edit Case
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Case Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {caseData.caseNumber}
                  </h2>
                  <p className="text-lg text-slate-600 mb-4">{caseData.clientName}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                    caseData.status.toLowerCase().replace(" ", "-")
                  )}`}
                >
                  {caseData.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Lawyer</p>
                    <p className="font-semibold text-slate-900">{caseData.lawyer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Case Type</p>
                    <p className="font-semibold text-slate-900">{caseData.caseType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Filing Date</p>
                    <p className="font-semibold text-slate-900">{caseData.filingDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Next Hearing</p>
                    <p className="font-semibold text-slate-900">{caseData.nextHearing}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex space-x-8 border-b border-slate-200">
            {["timeline", "documents", "notes", "parties"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium capitalize transition-colors ${activeTab === tab
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        {activeTab === "timeline" && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Case Progress Timeline</h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-slate-300"></div>

              <div className="space-y-8">
                {stages.map((stage, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-lg font-semibold ${stage.status === "completed"
                          ? "bg-green-500 text-white"
                          : stage.status === "in-progress"
                            ? "bg-blue-500 text-white"
                            : "bg-slate-300 text-slate-600"
                        }`}
                    >
                      {getStatusIcon(stage.status)}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 p-6 rounded-xl border-2 transition-all hover:shadow-md ${stage.status === "completed"
                          ? "bg-green-50 border-green-200"
                          : stage.status === "in-progress"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-slate-50 border-slate-200"
                        }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-lg font-semibold text-slate-900 mb-2 sm:mb-0">
                          {stage.title}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                            stage.status
                          )}`}
                        >
                          {stage.status.replace("-", " ")}
                        </span>
                      </div>

                      <div className="flex items-center text-slate-600 mb-3">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{stage.date}</span>
                      </div>

                      <p className="text-slate-700 mb-4">{stage.description}</p>

                      {stage.documents && stage.documents.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-sm font-medium text-slate-600 mb-2">Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {stage.documents.map((doc, docIndex) => (
                              <button
                                key={docIndex}
                                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                              >
                                <FileText className="w-4 h-4 text-slate-400" />
                                {doc}
                                <Download className="w-3 h-3 text-slate-400" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional tabs content can be added here */}
        {activeTab !== "timeline" && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h3>
              <p className="text-slate-500">
                This section is under development. Coming soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseTimeline;