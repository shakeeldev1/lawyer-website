import { useEffect, useState } from "react";
import RemindersTable from "../components/DashboardReminders/RemindersTable";
import RemindersConfirmationModal from "../components/DashboardReminders/RemindersConfirmationModal";
import RemindersHeader from "../components/DashboardReminders/RemindersHeader";
import AddReminderModal from "../components/DashboardReminders/AddReminderModal";

const RemindersPage = () => {
  const [search, setSearch] = useState("");
  const [reminders, setReminders] = useState([
    {
      id: 1,
      caseName: "Ali vs Ahmed",
      stage: "Main Case",
      type: "Before Hearing",
      lawyer: "Ragab",
      date: "2025-11-10",
      status: "Pending",
    },
    {
      id: 2,
      caseName: "Global Co. Appeal",
      stage: "Appeal",
      type: "Before Submission",
      lawyer: "Sara",
      date: "2025-11-08",
      status: "Sent",
    },
  ]);

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

  const [modal, setModal] = useState({ show: false, message: "", type: "info" });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAction = (action, reminder) => {
    if (action === "View") {
      setModal({
        show: true,
        message: `Case: ${reminder.caseName}\nLawyer: ${reminder.lawyer}\nDate: ${reminder.date}\nStatus: ${reminder.status}`,
        type: "info",
      });
    } else if (action === "Resend") {
      setReminders((prev) =>
        prev.map((r) => (r.id === reminder.id ? { ...r, status: "Sent" } : r))
      );
      setModal({
        show: true,
        message: `Reminder for "${reminder.caseName}" has been resent successfully.`,
        type: "success",
      });
    } else if (action === "Mark Done") {
      setReminders((prev) =>
        prev.map((r) => (r.id === reminder.id ? { ...r, status: "Completed" } : r))
      );
      setModal({
        show: true,
        message: `"${reminder.caseName}" has been marked as completed.`,
        type: "success",
      });
    }
  };

  const handleAddReminder = (newReminder) => {
    setReminders((prev) => [
      ...prev,
      { id: prev.length + 1, status: "Pending", ...newReminder },
    ]);
    setShowAddModal(false);
    setModal({
      show: true,
      message: `New reminder "${newReminder.caseName}" added successfully.`,
      type: "success",
    });
  };

  const filteredReminders = reminders.filter(
    (r) =>
      r.caseName.toLowerCase().includes(search.toLowerCase()) ||
      r.lawyer.toLowerCase().includes(search.toLowerCase())
  );

  return (
     <div
      className={`min-h-screen
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                  ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      {/* Header */}
      <RemindersHeader
        search={search}
        setSearch={setSearch}
        onAddClick={() => setShowAddModal(true)}
      />

      {/* Table */}
      <RemindersTable reminders={filteredReminders} onAction={handleAction} />

      {/* Modals */}
      {showAddModal && (
        <AddReminderModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddReminder}
        />
      )}

      {modal.show && (
        <RemindersConfirmationModal
          message={modal.message}
          type={modal.type}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </div>
  );
};

export default RemindersPage;
