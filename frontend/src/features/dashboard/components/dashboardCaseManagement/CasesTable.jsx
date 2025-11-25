import { Eye, Trash2 } from "lucide-react";

const CasesTable = ({ cases, onView, onDelete }) => {
  return (
    <div className="bg-white text-[#24344f] shadow-md rounded-2xl border border-[#fe9a00]/20 overflow-hidden">
      {/* ===== Desktop Table ===== */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 text-left">Case #</th>
                <th className="px-6 py-4 text-left">Client</th>
                <th className="px-6 py-4 text-left">Lawyer</th>
                <th className="px-6 py-4 text-left">Stage</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Last Updated</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cases.map((c) => (
                <tr key={c._id} className="border-t whitespace-nowrap border-[#fe9a00]/10 hover:bg-[#E1E1E2] transition-all duration-200">
                  <td className="px-6 py-4">{c.caseNumber}</td>
                  <td className="px-6 py-4">{c.clientName}</td>
                  <td className="px-6 py-4">{c.lawyer}</td>
                  <td className="px-6 py-4">{c.stage}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${c.status === "Submitted" ? "bg-green-500/20 text-green-800 border border-green-500/30"
                      : c.status === "Awaiting Approval" ? "bg-yellow-500/20 text-yellow-800 border border-yellow-500/30"
                      : "bg-blue-500/20 text-blue-800 border border-blue-500/30"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{c.lastUpdated}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button onClick={() => onView(c)} className="flex items-center gap-2 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/80 px-3 py-1.5 rounded-full font-medium">
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button onClick={() => onDelete(c)} className="flex items-center gap-2 text-red-600 hover:text-white hover:bg-red-600/80 px-3 py-1.5 rounded-full font-medium">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Mobile / Tablet Cards ===== */}
      <div className="block lg:hidden p-4 space-y-4">
        {cases.map((c) => (
          <div key={c._id} className="border border-[#fe9a00]/30 rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-[#24344f]">Case #{c.caseNumber}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${c.status === "Submitted" ? "bg-green-500/20 text-green-800 border border-green-500/30"
                : c.status === "Awaiting Approval" ? "bg-yellow-500/20 text-yellow-800 border border-yellow-500/30"
                : "bg-blue-500/20 text-blue-800 border border-blue-500/30"}`}>
                {c.status}
              </span>
            </div>
            <div className="space-y-1 text-sm text-[#24344f]">
              <p><span className="font-medium">Client:</span> {c.clientName}</p>
              <p><span className="font-medium">Lawyer:</span> {c.lawyer}</p>
              <p><span className="font-medium">Stage:</span> {c.stage}</p>
              <p><span className="font-medium">Last Updated:</span> {c.lastUpdated}</p>
            </div>
            <div className="mt-3 flex justify-end gap-3">
              <button onClick={() => onView(c)} className="flex items-center gap-2 text-[#fe9a00] border border-[#fe9a00] hover:bg-[#fe9a00] hover:text-white px-3 py-1.5 rounded-full font-medium">
                <Eye className="w-4 h-4" /> View
              </button>
              <button onClick={() => onDelete(c)} className="flex items-center gap-2 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-full font-medium">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00]" />
    </div>
  );
};

export default CasesTable;
