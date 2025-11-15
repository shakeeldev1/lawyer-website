// LawyerCasePage.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  FiX,
  FiFileText,
  FiDownload,
  FiEdit2,
  FiUpload,
  FiSend,
  FiClock,
  FiUserCheck,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";

/**
 * Professional Lawyer Cases Page (full workflow simulation)
 * - Tailwind classes assume Tailwind is configured.
 * - Accent color: orange '#fe9a00' (used inline).
 * - Primary text color uses 'text-slate-800'.
 */

/* -------------------------
   Dummy dataset (multiple cases)
-------------------------*/
const initialCases = [
  {
    id: "C-2024-001",
    caseNumber: "C-2024-001",
    clientName: "Johnathan Davis Corporation",
    caseType: "Commercial Litigation",
    assignedStage: "Appeal", // Main / Appeal / Cassation
    assignedDate: "2025-10-10",
    status: "Pending Lawyer Review", // general status
    assignedTo: "lawyer1",
    documents: {
      Main: [
        { id: 1, title: "Client ID.pdf", uploadedAt: "2025-10-10 10:12", url: "#" },
        { id: 2, title: "ContractAgreement.pdf", uploadedAt: "2025-10-10 10:15", url: "#" },
        { id: 3, title: "PowerOfAttorney.jpg", uploadedAt: "2025-10-10 10:18", url: "#" },
      ],
      Appeal: [{ id: 4, title: "AppealDocs.pdf", uploadedAt: "2025-10-11 11:00", url: "#" }],
      Cassation: [],
    },
    memorandum: {
      Main: null,
      Appeal: {
        status: "Draft", // Draft // SentToRagab // ModificationRequested // Approved
        content: "<p>Initial draft of the appeal memorandum...</p>",
        lastUpdated: "2025-10-11 09:30",
        ragabFeedback: null,
        history: [{ actor: "Lawyer", action: "Created draft", timestamp: "2025-10-11T09:30:00" }],
      },
      Cassation: null,
    },
    stages: {
      Main: { completed: true, date: "2024-12-05" },
      Appeal: { completed: false, date: "2025-10-10" },
      Cassation: { completed: false, date: null },
    },
    hearing: {
      nextHearing: "2025-11-20T10:00:00", // ISO string
      courtroom: "Courtroom 5",
      reminderSet: true,
    },
    activityLog: [
      { actor: "Secretary", action: "Created client file and uploaded initial docs", timestamp: "2025-10-10T10:20:00" },
      { actor: "System", action: "Assigned to lawyer1", timestamp: "2025-10-10T10:25:00" },
    ],
    archived: false,
  },
  {
    id: "C-2024-014",
    caseNumber: "C-2024-014",
    clientName: "Ahmed Ali",
    caseType: "Civil",
    assignedStage: "Main",
    assignedDate: "2025-10-12",
    status: "Under Revision by Ragab",
    assignedTo: "lawyer1",
    documents: {
      Main: [
        { id: 1, title: "CivilForm.pdf", uploadedAt: "2025-10-12 09:05", url: "#" },
        { id: 2, title: "Evidence.zip", uploadedAt: "2025-10-12 09:10", url: "#" },
        { id: 3, title: "POA.png", uploadedAt: "2025-10-12 09:15", url: "#" },
      ],
      Appeal: [],
      Cassation: [],
    },
    memorandum: {
      Main: {
        status: "SentToRagab",
        content: "<p>Memorandum ready for Ragab review.</p>",
        lastUpdated: "2025-10-13T15:00:00",
        ragabFeedback: { comments: "Clarify para 2 and add citations.", timestamp: "2025-10-14T11:00:00" },
        history: [
          { actor: "Lawyer", action: "Sent to Ragab", timestamp: "2025-10-13T15:00:00" },
          { actor: "Ragab", action: "Requested modifications", timestamp: "2025-10-14T11:00:00" },
        ],
      },
      Appeal: null,
      Cassation: null,
    },
    stages: { Main: { completed: false, date: null }, Appeal: { completed: false, date: null }, Cassation: { completed: false, date: null } },
    hearing: { nextHearing: null, courtroom: null, reminderSet: false },
    activityLog: [{ actor: "Secretary", action: "Assigned to lawyer1", timestamp: "2025-10-12T09:20:00" }],
    archived: false,
  },
];

/* -------------------------
   Utility helpers
-------------------------*/
const nowISO = () => new Date().toISOString();
const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString();
};
const threeDaysBefore = (iso) => {
  if (!iso) return false;
  const d = new Date(iso);
  const diff = d - new Date();
  return diff > 0 && diff <= 3 * 24 * 60 * 60 * 1000;
};

/* -------------------------
   Small UI atoms
-------------------------*/
function StatusPill({ status }) {
  const map = {
    "Pending Lawyer Review": { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200" },
    "Under Revision by Ragab": { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
    "Needs Modification": { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" },
    Approved: { bg: "bg-green-50", text: "text-green-800", border: "border-green-200" },
    Submitted: { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200" },
  };
  const st = map[status] || { bg: "bg-gray-50", text: "text-slate-800", border: "border-gray-200" };
  return <span className={`px-2 py-1 text-xs rounded-full border ${st.bg} ${st.text} ${st.border}`}>{status}</span>;
}

function IconButton({ children, className = "", ...rest }) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded shadow-sm transition ${className}`}
    >
      {children}
    </button>
  );
}

/* -------------------------
   Rich Editor (basic yet usable)
-------------------------*/
function RichEditor({ html, onChange }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current && html !== ref.current.innerHTML) ref.current.innerHTML = html || "";
  }, [html]);
  const exec = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    onChange(ref.current.innerHTML);
  };
  return (
    <div className="border rounded">
      <div className="flex gap-1 bg-slate-50 p-2 border-b">
        <button onClick={() => exec("bold")} className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 font-medium">B</button>
        <button onClick={() => exec("italic")} className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 font-medium">I</button>
        <button onClick={() => exec("insertUnorderedList")} className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800">• List</button>
        <button onClick={() => exec("createLink", prompt("Enter URL"))} className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800">Link</button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[200px] p-4 text-slate-800"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
}

/* -------------------------
   Main Component
-------------------------*/
export default function LawyerCasePage() {
  // Simulate current user role and id
  const currentRole = "lawyer"; // change to "ragab", "secretary", "director" to simulate different actions
  const currentUserId = "lawyer1";

  const [cases, setCases] = useState(initialCases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");
  const [editorContent, setEditorContent] = useState(""); // used when editing a memo
  const [selectedStage, setSelectedStage] = useState("Appeal"); // which stage memo we're editing in modal
  const [docViewer, setDocViewer] = useState(null);

  // open case modal and set default tab & stage
  const openCase = (c, stage = c.assignedStage) => {
    setSelectedCase(c);
    setActiveTab("Details");
    setSelectedStage(stage);
    // preload editor content if memo exists
    const mem = c.memorandum && c.memorandum[stage] ? c.memorandum[stage].content : "";
    setEditorContent(mem || "<p></p>");
    // scroll top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeCase = () => {
    setSelectedCase(null);
    setEditorContent("");
    setDocViewer(null);
  };

  const updateCase = (id, updater) => {
    setCases((prev) => prev.map((c) => (c.id === id ? updater(c) : c)));
    if (selectedCase && selectedCase.id === id) {
      setSelectedCase((prev) => (prev ? updater(prev) : prev));
    }
  };

  /* -------------------------
     Memo actions (lawyer)
  -------------------------*/
  const saveDraft = (caseId, stage) => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      const prevMemo = c.memorandum[stage] || { history: [] };
      const newMemo = {
        ...prevMemo,
        content: editorContent,
        status: "Draft",
        lastUpdated: time,
        history: [...(prevMemo.history || []), { actor: "Lawyer", action: "Saved draft", timestamp: time }],
      };
      return { ...c, memorandum: { ...c.memorandum, [stage]: newMemo }, activityLog: [...c.activityLog, { actor: "Lawyer", action: `Saved ${stage} draft`, timestamp: time }] };
    });
    alert("Draft saved (simulated).");
  };

  const uploadMemorandumFile = (caseId, stage, file) => {
    const time = nowISO();
    // simulate adding a doc to that stage
    updateCase(caseId, (c) => {
      const nextDoc = { id: Date.now(), title: file.name, uploadedAt: formatDate(time), url: "#" };
      const docs = { ...c.documents, [stage]: [...(c.documents[stage] || []), nextDoc] };
      return { ...c, documents: docs, activityLog: [...c.activityLog, { actor: currentRole === "lawyer" ? "Lawyer" : "User", action: `Uploaded memorandum file (${file.name}) for ${stage}`, timestamp: time }] };
    });
    alert(`Uploaded ${file.name} (simulated)`);
  };

  const sendToRagab = (caseId, stage) => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      const prev = c.memorandum[stage] || { history: [] };
      const newMemo = { ...prev, content: editorContent, status: "SentToRagab", lastUpdated: time, history: [...(prev.history || []), { actor: "Lawyer", action: "Sent to Ragab", timestamp: time }] };
      return { ...c, memorandum: { ...c.memorandum, [stage]: newMemo }, status: "Under Revision by Ragab", activityLog: [...c.activityLog, { actor: "Lawyer", action: `Sent ${stage} memo to Ragab`, timestamp: time }] };
    });
    alert("Memorandum sent to Ragab (simulated).");
  };

  /* -------------------------
     Ragab actions (simulated)
  -------------------------*/
  const ragabRequestModification = (caseId, stage, comments) => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      const prev = c.memorandum[stage] || { history: [] };
      const newMemo = { ...prev, status: "ModificationRequested", ragabFeedback: { comments, timestamp: time }, lastUpdated: time, history: [...(prev.history || []), { actor: "Ragab", action: "Requested modifications", timestamp: time }] };
      return { ...c, memorandum: { ...c.memorandum, [stage]: newMemo }, status: "Needs Modification", activityLog: [...c.activityLog, { actor: "Ragab", action: `Requested modification for ${stage}`, timestamp: time }] };
    });
    alert("Ragab requested modifications (simulated).");
  };

  const ragabApprove = (caseId, stage) => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      const prev = c.memorandum[stage] || { history: [] };
      const newMemo = { ...prev, status: "Approved", ragabFeedback: null, lastUpdated: time, history: [...(prev.history || []), { actor: "Ragab", action: "Approved memorandum", timestamp: time }] };
      return { ...c, memorandum: { ...c.memorandum, [stage]: newMemo }, status: "Approved", activityLog: [...c.activityLog, { actor: "Ragab", action: `Approved ${stage} memorandum`, timestamp: time }] };
    });
    alert("Ragab approved memorandum (simulated).");
  };

  /* -------------------------
     Secretary & Director flows (simulated)
  -------------------------*/
  const secretaryFinalizeAndSendToDirector = (caseId, stage) => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      return { ...c, status: "Awaiting Director Signature", activityLog: [...c.activityLog, { actor: "Secretary", action: `Prepared ${stage} for Director signature`, timestamp: time }] };
    });
    alert("Prepared for director's signature (simulated).");
  };

  const directorSign = (caseId, stage) => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      return { ...c, status: "Director Signed", activityLog: [...c.activityLog, { actor: "Director", action: `Provided digital signature for ${stage}`, timestamp: time }] };
    });
    alert("Director signed (simulated).");
  };

  const submitToCourt = (caseId, stage, depositSummary = "Deposit summary (simulated)") => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      const newActivities = [...c.activityLog, { actor: "Secretary", action: `Submitted ${stage} to court (${depositSummary})`, timestamp: time }];
      const newStages = { ...c.stages, [stage]: { ...(c.stages[stage] || {}), submittedAt: time, completed: false } };
      return { ...c, status: "Submitted", stages: newStages, activityLog: newActivities };
    });
    alert("Submitted to court (simulated).");
  };

  /* -------------------------
     Reminders & Hearing helpers
  -------------------------*/
  const setHearingReminder = (caseId, iso) => {
    const time = nowISO();
    updateCase(caseId, (c) => {
      const newHearing = { ...c.hearing, nextHearing: iso, reminderSet: true };
      return { ...c, hearing: newHearing, activityLog: [...c.activityLog, { actor: "User", action: `Set hearing ${formatDate(iso)}`, timestamp: time }] };
    });
    alert("Hearing reminder set (simulated).");
  };

  /* -------------------------
     UI pieces: Case Table & Modal
  -------------------------*/
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">My Assigned Cases</h1>
            <p className="text-sm text-slate-600">Workspace for lawyers — review documents, prepare memorandums, and manage workflow.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-700">Role: <span className="font-medium">{currentRole}</span></div>
            <button onClick={() => alert("Create case - simulated")} className="px-3 py-2 rounded text-sm border bg-white hover:bg-slate-50">Create Case</button>
          </div>
        </header>

        {/* Cases table */}
        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="p-3">Case Number</th>
                <th className="p-3">Client</th>
                <th className="p-3">Type</th>
                <th className="p-3">Stage</th>
                <th className="p-3">Hearing</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.filter(c => c.assignedTo === currentUserId).map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50 transition">
                  <td className="p-3 font-medium">{c.caseNumber}</td>
                  <td className="p-3">{c.clientName}</td>
                  <td className="p-3">{c.caseType}</td>
                  <td className="p-3">{c.assignedStage}</td>
                  <td className="p-3">
                    {c.hearing.nextHearing ? (
                      <div className="flex flex-col">
                        <span className="text-xs">{formatDate(c.hearing.nextHearing)}</span>
                        {threeDaysBefore(c.hearing.nextHearing) && (
                          <span className="text-xs text-orange-600 flex items-center gap-1"><FiClock /> 3-day reminder active</span>
                        )}
                      </div>
                    ) : <span className="text-xs text-slate-500">—</span>}
                  </td>
                  <td className="p-3"><StatusPill status={c.status} /></td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <IconButton
                        onClick={() => openCase(c)}
                        className="bg-slate-800 text-white hover:opacity-95"
                      >
                        <FiChevronRight /> Open
                      </IconButton>

                      <IconButton
                        onClick={() => alert("Download case summary (simulated)")}
                        className="border bg-white text-slate-800"
                      >
                        <FiDownload /> Summary
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
              {cases.filter(c => c.assignedTo === currentUserId).length === 0 && (
                <tr><td colSpan={7} className="p-6 text-center text-slate-500">No cases assigned to you.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal: case workspace */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div>
                  <div className="text-slate-800 font-semibold text-lg">Case: {selectedCase.caseNumber}</div>
                  <div className="text-sm text-slate-600">{selectedCase.clientName} • {selectedCase.caseType}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-600">Stage:</div>
                  <select
                    value={selectedStage}
                    onChange={(e) => {
                      const stage = e.target.value;
                      setSelectedStage(stage);
                      const mem = selectedCase.memorandum && selectedCase.memorandum[stage] ? selectedCase.memorandum[stage].content || "" : "";
                      setEditorContent(mem);
                    }}
                    className="px-3 py-2 rounded border text-sm"
                  >
                    {["Main", "Appeal", "Cassation"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <div style={{ background: "#fe9a00" }} className="text-white px-3 py-2 rounded text-sm font-medium">Primary</div>
                    <button onClick={closeCase} className="p-2 rounded hover:bg-slate-50"><FiX /></button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 py-4 border-b">
                <div className="flex gap-4">
                  {["Details", "Documents", "Memorandum", "Timeline", "Hearing", "Activity"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`pb-2 text-sm ${activeTab === t ? "border-b-2 border-slate-800 text-slate-800 font-medium" : "text-slate-600"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-auto">
                {activeTab === "Details" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div><strong className="text-slate-800">Case Number:</strong> {selectedCase.caseNumber}</div>
                      <div><strong className="text-slate-800">Client:</strong> {selectedCase.clientName}</div>
                      <div><strong className="text-slate-800">Case Type:</strong> {selectedCase.caseType}</div>
                      <div><strong className="text-slate-800">Assigned Stage:</strong> {selectedCase.assignedStage}</div>
                      <div><strong className="text-slate-800">Assigned Date:</strong> {selectedCase.assignedDate}</div>
                      <div><strong className="text-slate-800">Status:</strong> <StatusPill status={selectedCase.status} /></div>
                    </div>

                    <div className="space-y-3">
                      <div><strong className="text-slate-800">Stage Summary</strong></div>
                      {Object.entries(selectedCase.stages).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <div className="text-sm font-medium">{k}</div>
                            <div className="text-xs text-slate-500">{v.date || "—"}</div>
                          </div>
                          <div>
                            {v.completed ? <span className="text-sm text-green-700">Completed</span> : <span className="text-sm text-slate-600">Pending</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Documents" && (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-sm text-slate-700">Documents for <span className="font-medium">{selectedStage}</span></div>

                      <label className="inline-flex items-center gap-2 bg-white border px-3 py-2 rounded text-sm cursor-pointer">
                        <FiUpload />
                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && uploadMemorandumFile(selectedCase.id, selectedStage, e.target.files[0])} />
                        Upload
                      </label>
                    </div>

                    <div className="space-y-3">
                      {(selectedCase.documents[selectedStage] || []).map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <FiFileText className="text-slate-700" />
                            <div>
                              <div className="font-medium">{doc.title}</div>
                              <div className="text-xs text-slate-500">{doc.uploadedAt}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setDocViewer(doc)} className="px-3 py-1 rounded border text-sm">View</button>
                            <button onClick={() => alert("Download simulated")} className="px-3 py-1 rounded border text-sm">Download</button>
                          </div>
                        </div>
                      ))}

                      {(selectedCase.documents[selectedStage] || []).length === 0 && (
                        <div className="p-4 text-slate-500">No documents uploaded for this stage yet.</div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "Memorandum" && (
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">Memorandum - <span className="text-slate-600">{selectedStage}</span></div>
                        <div className="text-xs text-slate-500">Last updated: {selectedCase.memorandum[selectedStage]?.lastUpdated || "—"}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => saveDraft(selectedCase.id, selectedStage)} className="px-3 py-2 rounded border text-sm">Save Draft</button>

                        <label className="inline-flex items-center gap-2 px-3 py-2 border rounded cursor-pointer text-sm">
                          <FiUpload />
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && uploadMemorandumFile(selectedCase.id, selectedStage, e.target.files[0])} />
                          Upload File
                        </label>

                        {currentRole === "lawyer" && (
                          <button onClick={() => sendToRagab(selectedCase.id, selectedStage)} className="px-3 py-2 text-white rounded" style={{ background: "#fe9a00" }}>
                            <FiSend /> Send to Ragab
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editor */}
                    <RichEditor html={editorContent} onChange={setEditorContent} />

                    {/* Ragab feedback + history */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-slate-800">Ragab Feedback</h4>
                        {selectedCase.memorandum[selectedStage]?.ragabFeedback ? (
                          <div className="p-3 border-l-4 border-red-300 bg-red-50 rounded">
                            <div className="text-slate-700">{selectedCase.memorandum[selectedStage].ragabFeedback.comments}</div>
                            <div className="text-xs text-slate-500 mt-2">{formatDate(selectedCase.memorandum[selectedStage].ragabFeedback.timestamp)}</div>
                          </div>
                        ) : (
                          <div className="text-slate-500">No feedback yet.</div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-800">Memorandum History</h4>
                        <ul className="mt-2 space-y-2 text-sm text-slate-700">
                          {(selectedCase.memorandum[selectedStage]?.history || []).slice().reverse().map((h, i) => (
                            <li key={i} className="border rounded p-2">
                              <div className="font-medium">{h.actor}</div>
                              <div>{h.action}</div>
                              <div className="text-xs text-slate-500">{formatDate(h.timestamp)}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Ragab controls (if currentRole is ragab) */}
                    {currentRole === "ragab" && (
                      <div className="mt-4 flex gap-2">
                        <button onClick={() => ragabRequestModification(selectedCase.id, selectedStage, prompt("Enter modification comments:"))} className="px-3 py-2 border rounded text-sm">Request Modifications</button>
                        <button onClick={() => ragabApprove(selectedCase.id, selectedStage)} className="px-3 py-2 bg-green-600 text-white rounded text-sm">Approve</button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "Timeline" && (
                  <div>
                    <div className="flex items-center gap-6">
                      {Object.entries(selectedCase.stages).map(([k, v], idx) => (
                        <div key={k} className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${v.completed ? "bg-green-100 text-green-700" : k === selectedStage ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-700"}`}>
                            {idx + 1}
                          </div>
                          <div>
                            <div className="font-medium">{k}</div>
                            <div className="text-xs text-slate-500">{v.date || "—"}</div>
                            <div className="text-xs text-slate-500">{v.completed ? "Completed" : "Open"}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium">Stage Links</h4>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {["Main", "Appeal", "Cassation"].map((s) => (
                          <div key={s} className="p-3 border rounded flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{s}</div>
                              <div className="text-xs text-slate-500">{(selectedCase.documents[s] || []).length} docs</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setSelectedStage(s); setActiveTab("Documents"); }} className="px-3 py-1 border rounded text-sm">Open Docs</button>
                              <button onClick={() => { setSelectedStage(s); setActiveTab("Memorandum"); const mem = selectedCase.memorandum[s]?.content || "<p></p>"; setEditorContent(mem); }} className="px-3 py-1 border rounded text-sm">Open Memo</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Hearing" && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded">
                        <div className="text-sm text-slate-700">Next Hearing</div>
                        <div className="text-lg font-medium mt-2">{selectedCase.hearing.nextHearing ? formatDate(selectedCase.hearing.nextHearing) : "No hearing set"}</div>
                        <div className="text-sm text-slate-500 mt-1">Courtroom: {selectedCase.hearing.courtroom || "—"}</div>
                        {threeDaysBefore(selectedCase.hearing.nextHearing) && <div className="text-sm text-orange-600 mt-2 flex items-center gap-2"><FiClock /> 3 days reminder active</div>}
                      </div>

                      <div className="p-4 border rounded">
                        <div className="text-sm font-medium">Set / Update Hearing</div>
                        <form onSubmit={(e) => { e.preventDefault(); const iso = e.target.hdate.value; setHearingReminder(selectedCase.id, iso); }}>
                          <input name="hdate" type="datetime-local" className="w-full px-3 py-2 border rounded mt-2" />
                          <div className="flex gap-2 mt-3">
                            <button type="submit" className="px-3 py-2 bg-slate-800 text-white rounded">Set Reminder</button>
                            <button type="button" onClick={() => { setHearingReminder(selectedCase.id, null); alert("Cleared (simulated)"); }} className="px-3 py-2 border rounded">Clear</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Activity" && (
                  <div>
                    <h4 className="font-medium mb-3">Activity Log</h4>
                    <ul className="space-y-3 text-sm">
                      {selectedCase.activityLog.slice().reverse().map((a, i) => (
                        <li key={i} className="p-3 border rounded">
                          <div className="font-medium">{a.actor}</div>
                          <div>{a.action}</div>
                          <div className="text-xs text-slate-500">{formatDate(a.timestamp)}</div>
                        </li>
                      ))}
                    </ul>

                    {/* Secretary / Director actions */}
                    <div className="mt-4 flex gap-2">
                      {currentRole === "secretary" && (
                        <button onClick={() => secretaryFinalizeAndSendToDirector(selectedCase.id, selectedStage)} className="px-3 py-2 border rounded">Finalize & Send to Director</button>
                      )}
                      {currentRole === "director" && (
                        <>
                          <button onClick={() => directorSign(selectedCase.id, selectedStage)} className="px-3 py-2 bg-slate-800 text-white rounded">Digital Sign</button>
                          <button onClick={() => submitToCourt(selectedCase.id, selectedStage)} className="px-3 py-2 bg-indigo-600 text-white rounded">Submit to Court</button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer / actions */}
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-slate-600">Case workspace — all actions are simulated (dummy data).</div>

                <div className="flex items-center gap-2">
                  <button onClick={() => { saveDraft(selectedCase.id, selectedStage); }} className="px-3 py-2 border rounded">Save Draft</button>
                  {currentRole === "lawyer" && <button onClick={() => sendToRagab(selectedCase.id, selectedStage)} className="px-3 py-2" style={{ background: "#fe9a00", color: "#fff", borderRadius: 8 }}>Send to Ragab</button>}
                  <button onClick={closeCase} className="px-3 py-2 border rounded">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document Viewer Modal */}
        {docViewer && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white w-full max-w-3xl rounded-lg p-4 shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="font-medium">{docViewer.title}</div>
                <button onClick={() => setDocViewer(null)} className="p-2 rounded hover:bg-slate-50"><FiX /></button>
              </div>
              <div className="min-h-[300px] border rounded p-4 text-slate-600">
                Document preview simulated. Integrate PDF/image viewer for real files.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
