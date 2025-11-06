import { useState } from "react";
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
    <div className="p-6 min-h-screen text-white">
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
