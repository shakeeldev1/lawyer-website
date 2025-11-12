// src/components/ArchiveComponents/ArchiveTable.jsx
import React from "react";
import { Download, Eye, Trash2, FileText, Archive, Clock, Layers } from "lucide-react";

const ArchiveTable = ({ cases, loading, onViewCase, onDeleteCase }) => {
  const TableRow = ({ caseData }) => (
    <tr className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-200 group">
      <td className="px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm sm:text-base">
              {caseData.caseNumber}
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <span>{caseData.clientName}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 sm:px-6 py-4">
        <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          <Layers className="w-3 h-3" />
          {caseData.stages.length} Stage{caseData.stages.length !== 1 ? "s" : ""}
        </span>
      </td>

      <td className="px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2">
          <Archive className="w-4 h-4 text-green-600" />
          <code className="text-gray-700 text-sm sm:text-base font-mono bg-gray-50 px-2 py-1 rounded">
            {caseData.archiveReference}
          </code>
        </div>
      </td>

      <td className="px-4 sm:px-6 py-4">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onViewCase(caseData)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </button>
          <a
            href={`/download/archive/${caseData.id}`}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <button
            onClick={() => onDeleteCase(caseData)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );

  const Card = ({ caseData }) => (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800">{caseData.caseNumber}</h3>
          <p className="text-gray-600 text-sm mt-1">{caseData.clientName}</p>
          <p className="text-gray-500 text-xs mt-1 font-medium">Type: {caseData.caseType}</p>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {caseData.stages.length} Stage{caseData.stages.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Archive Ref:</span> {caseData.archiveReference}
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => onViewCase(caseData)}
          className="flex-1 max-w-[120px] bg-slate-700 hover:bg-slate-800 text-white py-2.5 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
        >
          View
        </button>
        <a
          href={`/download/archive/${caseData.id}`}
          className="flex-1 max-w-[120px] bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1 text-sm"
        >
          Download
        </a>
        <button
          onClick={() => onDeleteCase(caseData)}
          className="flex-1 max-w-[120px] bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Archive</h3>
        <p className="text-gray-500">Retrieving your archived cases...</p>
      </div>
    );

  if (cases.length === 0)
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Archive className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">No Archived Cases</h3>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Your case archives will appear here once cases are completed and archived.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white uppercase text-sm font-bold">
              <tr>
                <th className="px-6 py-4 text-left">Case Info</th>
                <th className="px-6 py-4 text-left">Stages</th>
                <th className="px-6 py-4 text-left">Archive Ref</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <TableRow key={c.id} caseData={c} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablet Cards */}
      <div className="hidden md:flex lg:hidden flex-col space-y-4">
        {cases.map((c) => (
          <Card key={c.id} caseData={c} />
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {cases.map((c) => (
          <Card key={c.id} caseData={c} />
        ))}
      </div>
    </div>
  );
};

export default ArchiveTable;
