import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  FilePlus,
  AlertCircle,
  Trash2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  useGetRemindersQuery,
  useDeleteReminderMutation,
} from "../api/secretaryApi";

const SecretaryReminders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Fetch reminders from API with auto-refresh
  const {
    data: remindersData,
    isLoading,
    error,
    refetch,
  } = useGetRemindersQuery(undefined, {
    pollingInterval: 60000, // Refresh every 60 seconds
    skipPollingIfUnfocused: true,
  });

  // Delete reminder mutation
  const [deleteReminder, { isLoading: isDeleting }] =
    useDeleteReminderMutation();

  // Use API data
  const reminders = remindersData?.data || [];

  // Handle delete reminder
  const handleDeleteReminder = async (id) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      try {
        await deleteReminder(id).unwrap();
        alert("Reminder deleted successfully");
      } catch (error) {
        alert("Failed to delete reminder");
        console.error("Delete error:", error);
      }
    }
  };

  // Get icon based on reminder type
  const getIcon = (reminderType, isOverdue) => {
    if (isOverdue) return <AlertCircle size={18} />;
    if (reminderType === "Hearing") return <Calendar size={18} />;
    if (reminderType === "Submission") return <FilePlus size={18} />;
    return <Bell size={18} />;
  };

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
          <p className="text-gray-600 mt-4">Loading reminders...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Reminders
          </h3>
          <p className="text-red-600">
            {error?.data?.message ||
              "Unable to fetch reminders. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && reminders.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Bell size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Reminders
          </h3>
          <p className="text-gray-500">
            You have no upcoming reminders. They will appear here when hearings
            or submissions are scheduled.
          </p>
        </div>
      )}

      {!isLoading && !error && reminders.length > 0 && (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <motion.div
              key={reminder._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${
                reminder.color
              } shadow-sm border-l-4 ${
                reminder.isOverdue ? "border-red-500" : "border-[#fe9a00]"
              } flex items-start gap-3 hover:shadow-md transition-shadow`}
            >
              <div className="mt-1">
                {getIcon(reminder.reminderType, reminder.isOverdue)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      {reminder.caseName}
                      {reminder.isToday && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                          TODAY
                        </span>
                      )}
                      {reminder.isOverdue && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                          OVERDUE
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Case: {reminder.caseNumber} • {reminder.caseType}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteReminder(reminder._id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                    title="Delete reminder"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-sm mt-2 text-gray-700">{reminder.message}</p>

                <div className="flex items-center justify-between mt-3 text-xs">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Calendar size={13} /> {reminder.dueDate}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Clock size={13} />
                      {reminder.isOverdue
                        ? `${reminder.daysUntil} days overdue`
                        : reminder.isToday
                        ? "Today"
                        : `${reminder.daysUntil} days left`}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-white/50 rounded-md font-medium">
                    {reminder.type}
                  </span>
                </div>

                <p className="text-xs mt-2 text-gray-500 italic">
                  Stage: {reminder.stage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SecretaryReminders;
