// src/pages/LawyerNotificationsPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Search, CheckCircle, Circle, FileText } from "lucide-react";


// Dummy notifications (covering all types and stages)
const dummyNotifications = [
  {
    id: 1,
    caseId: 1,
    caseNumber: "C123",
    clientName: "John Doe",
    caseType: "Civil Litigation",
    stage: "Main",
    type: "New Assignment",
    message: "New client case assigned for your review.",
    status: "unread",
    timestamp: "2025-11-05T10:00:00Z",
  },
  {
    id: 2,
    caseId: 1,
    caseNumber: "C123",
    clientName: "John Doe",
    caseType: "Civil Litigation",
    stage: "Appeal",
    type: "Upload Reminder",
    message: "Upload memorandum for Appeal stage.",
    status: "unread",
    timestamp: "2025-11-10T12:00:00Z",
  },
  {
    id: 3,
    caseId: 2,
    caseNumber: "C124",
    clientName: "Jane Smith",
    caseType: "Corporate Law",
    stage: "Main",
    type: "Ragab Feedback",
    message: "Ragab approved your memorandum for Main stage.",
    status: "read",
    timestamp: "2025-11-03T09:30:00Z",
  },
  {
    id: 4,
    caseId: 3,
    caseNumber: "C125",
    clientName: "Ali Khan",
    caseType: "Criminal Law",
    stage: "Main",
    type: "Hearing Reminder",
    message: "Hearing for Main stage in 3 days.",
    status: "unread",
    timestamp: "2025-11-17T08:00:00Z",
  },
  {
    id: 5,
    caseId: 2,
    caseNumber: "C124",
    clientName: "Jane Smith",
    caseType: "Corporate Law",
    stage: "Appeal",
    type: "Upload Reminder",
    message: "Upload memorandum for Appeal stage.",
    status: "unread",
    timestamp: "2025-11-12T11:00:00Z",
  },
  {
    id: 6,
    caseId: 1,
    caseNumber: "C123",
    clientName: "John Doe",
    caseType: "Civil Litigation",
    stage: "Appeal",
    type: "Ragab Feedback",
    message: "Ragab requested changes to your Appeal memorandum.",
    status: "unread",
    timestamp: "2025-11-09T15:00:00Z",
  },
  {
    id: 7,
    caseId: 1,
    caseNumber: "C123",
    clientName: "John Doe",
    caseType: "Civil Litigation",
    stage: "Main",
    type: "Hearing Reminder",
    message: "Hearing for Main stage in 3 days.",
    status: "read",
    timestamp: "2025-11-12T07:00:00Z",
  },
];

export default function LawyerNotifications() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");
 const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    // ✅ Sync with sidebar state
    useEffect(() => {
      const handleResize = () => {
        const desktop = window.innerWidth >= 1024;
        setSidebarOpen(desktop);
      };
  
      const handleSidebarToggle = () => {
        // Listen for sidebar state changes from the sidebar component
        const sidebar = document.querySelector('aside');
        if (sidebar) {
          const isOpen = sidebar.classList.contains('w-64');
          setSidebarOpen(isOpen);
        }
      };
  
      window.addEventListener('resize', handleResize);
      
      // Check sidebar state periodically (you can use a better state management approach)
      const interval = setInterval(handleSidebarToggle, 100);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(interval);
      };
    }, []);
  

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((n) => {
        const matchesSearch =
          n.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.caseType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter ? n.type === typeFilter : true;
        const matchesStage = stageFilter ? n.stage === stageFilter : true;
        return matchesSearch && matchesType && matchesStage;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [notifications, searchTerm, typeFilter, stageFilter]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );
  };

  return (
   <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      <h1 className="text-2xl font-bold mb-6 mt-20">Notifications</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by case, client, or type"
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/6"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="New Assignment">New Assignment</option>
          <option value="Upload Reminder">Upload Reminder</option>
          <option value="Hearing Reminder">Hearing Reminder</option>
          <option value="Ragab Feedback">Ragab Feedback</option>
        </select>

        <select
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/6"
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
        >
          <option value="">All Stages</option>
          <option value="Main">Main</option>
          <option value="Appeal">Appeal</option>
          <option value="Cassation">Cassation</option>
        </select>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-lg border flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-sm hover:shadow-md transition ${
                n.status === "unread" ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <span className="font-semibold">{n.caseNumber}</span>
                <span className="text-gray-700">{n.clientName}</span>
                <span className="text-gray-600 text-sm">{n.caseType}</span>
                <span className="text-sm font-medium px-2 py-1 bg-gray-200 rounded">{n.stage}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <p className="text-gray-800 text-sm">{n.message}</p>
                <span className="text-gray-500 text-xs">{new Date(n.timestamp).toLocaleString()}</span>
                {n.status === "unread" && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark Read
                  </button>
                )}
              
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-600">No notifications</h3>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      )}

     
    </div>
  );
}
