import React, { useEffect, useState } from "react";
import { Bell, CheckCircle, Edit3, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ApprovedLawyerNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Your original notification content (unchanged)
  const notifications = [
    {
      id: 1,
      type: "new_memo",
      caseName: "Ahmed vs Ali",
      stage: "Main Case",
      message: "A new memorandum has been submitted for your approval.",
      date: "2025-11-14 09:45",
      read: false,
    },
    {
      id: 2,
      type: "modified_memo",
      caseName: "Hassan vs Karim",
      stage: "Appeal",
      message: "The lawyer responded to your modification request.",
      date: "2025-11-12 13:10",
      read: true,
    },
    {
      id: 3,
      type: "reminder",
      caseName: "Saad vs Ministry",
      stage: "Cassation",
      message:
        "Reminder: Memorandum approval pending. Secretary and Director notified.",
      date: "2025-11-10 17:20",
      read: false,
    },
  ];

  // Notification styling config (icons/colors)
  const typeConfig = {
    new_memo: {
      label: "New Memorandum",
      icon: <CheckCircle size={18} />,
      color: "bg-blue-100 text-blue-800",
    },
    modified_memo: {
      label: "Modification Reply",
      icon: <Edit3 size={18} />,
      color: "bg-yellow-100 text-yellow-800",
    },
    reminder: {
      label: "Reminder",
      icon: <AlertCircle size={18} />,
      color: "bg-red-100 text-red-800",
    },
  };

  // Sync sidebar state exactly like your SecretaryReminders file
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen mt-20
      px-3 sm:px-4 md:px-6 lg:px-2
      py-3 sm:py-4 md:py-5 
      transition-all duration-300 ease-in-out
      ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}`}
    >
      {/* Title */}
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight flex items-center justify-atart md:justify-start gap-2">
          <Bell className="text-indigo-600 hidden md:block" /> Approved Lawyer Notifications
        </h2>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Memorandums, modification replies, and approval reminders
        </p>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl shadow-sm border-l-4 
            flex items-start gap-3 
            ${typeConfig[n.type].color} 
            ${n.read ? "opacity-80" : "border-indigo-500"}`}
          >
            {/* Icon */}
            <div className="mt-1">{typeConfig[n.type].icon}</div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{n.caseName}</h3>
                <span className="text-sm text-gray-700">{n.date}</span>
              </div>

              <p className="text-sm mt-1">{n.message}</p>

              <p className="text-xs mt-1 italic">
                {typeConfig[n.type].label} — Stage: {n.stage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {notifications.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No notifications found.
        </p>
      )}
    </motion.div>
  );
}
