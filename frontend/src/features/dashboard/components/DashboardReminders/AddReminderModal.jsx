// src/components/DashboardReminders/AddReminderModal.jsx
import React, { useState } from "react";

const AddReminderModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    caseName: "",
    stage: "Main Case",
    type: "Before Hearing",
    lawyer: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.caseName || !form.lawyer || !form.date) return;
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 lg:top-14">
      <div className="bg-[#E1E1E2] text-[#162030] p-6 rounded-xl shadow-2xl w-[90%] sm:w-[400px] border border-[#fe9a00]/30">
        <h3 className="text-lg font-semibold text-[#fe9a00] mb-4">Add New Reminder</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="caseName"
            placeholder="Case Name"
            value={form.caseName}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white border border-[#fe9a00]/30 focus:outline-none"
          />
          <input
            type="text"
            name="lawyer"
            placeholder="Lawyer"
            value={form.lawyer}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white border border-[#fe9a00]/30 focus:outline-none"
          />
          <select
            name="stage"
            value={form.stage}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white border border-[#fe9a00]/30 focus:outline-none"
          >
            <option>Main Case</option>
            <option>Appeal</option>
            <option>Cassation</option>
          </select>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white border border-[#fe9a00]/30 focus:outline-none"
          >
            <option>Before Hearing</option>
            <option>Before Submission</option>
            <option>Before Judgment</option>
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white border border-[#fe9a00]/30 focus:outline-none"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#fe9a00] hover:bg-[#e68a00] rounded-lg text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;
