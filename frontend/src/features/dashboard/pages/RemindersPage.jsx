import { useEffect, useState } from "react";
import RemindersTable from "../components/DashboardReminders/RemindersTable";
import RemindersConfirmationModal from "../components/DashboardReminders/RemindersConfirmationModal";
import RemindersHeader from "../components/DashboardReminders/RemindersHeader";
import AddReminderModal from "../components/DashboardReminders/AddReminderModal";

import { useGetAllRemindersQuery } from "../api/directorApi";

const RemindersPage = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetAllRemindersQuery();

  const reminders = data?.data || [];

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);

    const checkSidebar = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        setSidebarOpen(sidebar.classList.contains("w-64"));
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(checkSidebar, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const [modal, setModal] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const [showAddModal, setShowAddModal] = useState(false);

  // Local view action (no API required)
  const handleAction = (action, reminder) => {
    if (action === "View") {
      setModal({
        show: true,
        message: `Case: ${reminder.caseName}\nLawyer: ${reminder.lawyer}\nDate: ${reminder.date}\nStatus: ${reminder.status}`,
        type: "info",
      });
    }
  };

  // Local add reminder (no backend)
  const handleAddReminder = (newReminder) => {
    setModal({
      show: true,
      message: `New reminder "${newReminder.caseName}" added.`,
      type: "success",
    });
    setShowAddModal(false);
  };

  // Apply search filtering locally
  const filteredReminders = reminders.filter(
    (r) =>
      r.caseName.toLowerCase().includes(search.toLowerCase()) ||
      r.lawyer.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading)
    return <p className="text-center mt-20">Loading reminders...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 mt-20">
        Failed to load reminders.
      </p>
    );

  return (
    <div
      className={`min-h-screen
        px-3 sm:px-4 md:px-6 lg:px-2
        py-3 sm:py-4 md:py-5
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-15"}
      `}
    >
      {/* Header */}
      <RemindersHeader
        search={search}
        setSearch={setSearch}
        onAddClick={() => setShowAddModal(true)}
      />

      {/* Table */}
      <RemindersTable
        reminders={filteredReminders}
        onAction={handleAction}
      />

      {/* Add Reminder Modal */}
      {showAddModal && (
        <AddReminderModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddReminder}
        />
      )}

      {/* Confirmation Modal */}
      {modal.show && (
        <RemindersConfirmationModal
          message={modal.message}
          type={modal.type}
          onClose={() =>
            setModal((prev) => ({ ...prev, show: false }))
          }
        />
      )}
    </div>
  );
};

export default RemindersPage;
