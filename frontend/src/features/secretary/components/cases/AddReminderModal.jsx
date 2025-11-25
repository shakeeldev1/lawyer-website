import React, { useState } from "react";
import { X, Bell, Calendar } from "lucide-react";
import { useCreateReminderMutation } from "../../api/secretaryApi";

const AddReminderModal = ({ isOpen, onClose, caseData }) => {
  const [formData, setFormData] = useState({
    reminderType: "Hearing",
    reminderDate: "",
    message: "",
  });

  const [createReminder, { isLoading }] = useCreateReminderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reminderDate) {
      alert("Please select a reminder date");
      return;
    }

    try {
      await createReminder({
        caseId: caseData._id,
        reminderType: formData.reminderType,
        reminderDate: formData.reminderDate,
        message:
          formData.message ||
          `${formData.reminderType} reminder for ${caseData.case.caseNumber}`,
      }).unwrap();

      alert("Reminder created successfully");
      onClose();
      setFormData({
        reminderType: "Hearing",
        reminderDate: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to create reminder:", error);
      alert(error?.data?.message || "Failed to create reminder");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-[#1C283C] to-[#2a3f5f] text-white p-6 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={24} />
            <div>
              <h2 className="text-2xl font-bold">Add Reminder</h2>
              <p className="text-sm text-gray-200 mt-1">
                Case: {caseData?.case?.caseNumber} - {caseData?.client?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Reminder Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reminder Type *
            </label>
            <select
              name="reminderType"
              value={formData.reminderType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe9a00] focus:border-transparent"
            >
              <option value="Hearing">Hearing</option>
              <option value="Submission">Submission</option>
            </select>
          </div>

          {/* Reminder Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reminder Date *
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                name="reminderDate"
                value={formData.reminderDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe9a00] focus:border-transparent"
              />
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Custom Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              placeholder="Enter a custom reminder message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe9a00] focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-linear-to-r from-[#fe9a00] to-[#ff8c00] text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Reminder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;
