import React, { useEffect, useState } from "react";
import { Bell, Calendar, FilePlus, Archive, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useGetRemindersQuery } from "../api/secretaryApi";

const SecretaryReminders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Fetch reminders from API
  const { data: remindersData, isLoading, error } = useGetRemindersQuery();

  // Sample reminders for fallback (if no API data)
  const fallbackReminders = [
    {
      type: "Submission Pending",
      caseName: "Client Ahmed Ali",
      stage: "Appeal",
      dueDate: "12 Nov 2025",
      message: "Memorandum approved by Ragab. Ready for your final review.",
      color: "bg-yellow-100 text-yellow-800",
      icon: <FilePlus size={18} />,
    },
    {
      type: "Upcoming Hearing",
      caseName: "Client Hassan",
      stage: "Main Case",
      dueDate: "15 Nov 2025",
      message: "Hearing in 3 days at Court 2, 9:00 AM",
      color: "bg-blue-100 text-blue-800",
      icon: <Calendar size={18} />,
    },
    {
      type: "Overdue / Action Required",
      caseName: "Client Fatima Khan",
      stage: "Cassation",
      dueDate: "10 Nov 2025",
      message: "Deposit summary not uploaded. Submission overdue.",
      color: "bg-red-100 text-red-800",
      icon: <AlertCircle size={18} />,
    },
    {
      type: "New Case Assignment",
      caseName: "Client Omar",
      stage: "Main Case",
      dueDate: "12 Nov 2025",
      message: "New client file needs to be created and documents uploaded.",
      color: "bg-green-100 text-green-800",
      icon: <FilePlus size={18} />,
    },
    {
      type: "Archiving Reminder",
      caseName: "Client Ahmed Ali",
      stage: "Appeal",
      dueDate: "14 Nov 2025",
      message: "All stages completed. Please archive the case.",
      color: "bg-purple-100 text-purple-800",
      icon: <Archive size={18} />,
    },
  ];

  // Use API data or fallback to sample data
  const reminders = remindersData?.data || fallbackReminders;

  // ✅ Sync with sidebar state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      // Listen for sidebar state changes from the sidebar component
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check sidebar state periodically (you can use a better state management approach)
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
      className={`min-h-screen  mt-20
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}`}
    >
      {/* Title & Subtitle */}
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight flex items-center justify-center md:justify-start gap-2">
          <Bell className="text-[#fe9a00]" /> Secretary Reminders
        </h2>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          All pending tasks, upcoming hearings, and action-required alerts
        </p>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#fe9a00]"></div>
        </div>
      )}
      {error && (
        <div className="text-center py-10 text-red-600">
          Error loading reminders:{" "}
          {error?.data?.message || "Something went wrong"}
        </div>
      )}

      {!isLoading && (
        <div className="space-y-4">
          {reminders.map((reminder, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl ${reminder.color} shadow-sm border-l-4 border-[#fe9a00] flex items-start gap-3`}
            >
              <div>{reminder.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {reminder.caseName}
                  </h3>
                  <span className="text-sm flex items-center gap-1">
                    <Calendar size={14} /> {reminder.dueDate}
                  </span>
                </div>
                <p className="text-sm mt-1">{reminder.message}</p>
                <p className="text-xs mt-1 italic">
                  {reminder.type} - Stage: {reminder.stage}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SecretaryReminders;
