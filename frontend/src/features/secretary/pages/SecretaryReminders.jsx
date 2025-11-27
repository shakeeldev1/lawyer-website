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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen pt-16
                 px-2 sm:px-3
                 py-3 sm:py-4
                 transition-all duration-300 ease-in-out mt-8
                 ${sidebarOpen ? "md:ml-52" : "md:ml-14"}`}
    >
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-1.5">
          Reminders
        </h2>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Upcoming hearings and action-required alerts
        </p>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-xs text-slate-500 mt-2">Loading reminders...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
          <h3 className="text-xs font-semibold text-red-800 mb-1">
            Error Loading Reminders
          </h3>
          <p className="text-[10px] text-red-600">
            {error?.data?.message ||
              "Unable to fetch reminders. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-[10px] hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && reminders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-300 mb-3">
            <Bell size={40} className="mx-auto" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">
            No Reminders
          </h3>
          <p className="text-[10px] text-slate-500">
            Reminders will appear here when hearings or submissions are
            scheduled.
          </p>
        </div>
      )}

      {!isLoading && !error && reminders.length > 0 && (
        <div className="space-y-2">
          {reminders.map((reminder) => (
            <motion.div
              key={reminder._id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2.5 rounded bg-white shadow-sm border-l-2 ${
                reminder.isOverdue ? "border-red-500" : "border-blue-500"
              } flex items-start gap-2 hover:shadow-md transition`}
            >
              <div
                className={`mt-0.5 ${
                  reminder.isOverdue ? "text-red-600" : "text-blue-600"
                }`}
              >
                {getIcon(reminder.reminderType, reminder.isOverdue)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs text-slate-800 flex items-center gap-1 flex-wrap">
                      <span className="truncate">{reminder.caseName}</span>
                      {reminder.isToday && (
                        <span className="text-[9px] bg-orange-500 text-white px-1 py-0.5 rounded shrink-0 font-medium">
                          TODAY
                        </span>
                      )}
                      {reminder.isOverdue && (
                        <span className="text-[9px] bg-red-500 text-white px-1 py-0.5 rounded shrink-0 font-medium">
                          OVERDUE
                        </span>
                      )}
                    </h3>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      {reminder.caseNumber} • {reminder.caseType}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteReminder(reminder._id)}
                    disabled={isDeleting}
                    className="p-1 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition shrink-0 ml-2"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <p className="text-[10px] mt-1 text-slate-700">
                  {reminder.message}
                </p>

                <div className="flex items-center justify-between mt-1.5 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 text-slate-600">
                      <Calendar size={10} /> {reminder.dueDate}
                    </span>
                    <span
                      className={`flex items-center gap-0.5 ${
                        reminder.isOverdue
                          ? "text-red-600 font-medium"
                          : "text-slate-600"
                      }`}
                    >
                      <Clock size={10} />
                      {reminder.isOverdue
                        ? `${reminder.daysUntil}d overdue`
                        : reminder.isToday
                        ? "Today"
                        : `${reminder.daysUntil}d left`}
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] font-medium text-slate-700">
                    {reminder.type}
                  </span>
                </div>

                {reminder.stage && (
                  <p className="text-[9px] mt-1 text-slate-500">
                    Stage: {reminder.stage}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SecretaryReminders;
