import { useState } from "react";
import { Plus, Check, Trash } from "lucide-react";

const Reminders = () => {
    const [reminders, setReminders] = useState([
        { id: 1, title: "Client Meeting - Ahmed Khan", date: "2025-11-06", completed: false },
        { id: 2, title: "Submit Case Documents - Sara Ahmed", date: "2025-11-07", completed: false },
        { id: 3, title: "Court Hearing Reminder - Ali Raza", date: "2025-11-08", completed: false },
    ]);

    const [newReminder, setNewReminder] = useState({ title: "", date: "" });
    const [showModal, setShowModal] = useState(false);

    const addReminder = () => {
        if (newReminder.title && newReminder.date) {
            setReminders([
                ...reminders,
                { id: Date.now(), title: newReminder.title, date: newReminder.date, completed: false },
            ]);
            setNewReminder({ title: "", date: "" });
            setShowModal(false);
        }
    };

    const toggleComplete = (id) => {
        setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    };

    const deleteReminder = (id) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    return (
        <div className="p-6 mt-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Reminders</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
                >
                    <Plus size={16} /> Add Reminder
                </button>
            </div>

            {/* Reminders Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 font-medium text-slate-600">#</th>
                            <th className="p-3 font-medium text-slate-600">Title</th>
                            <th className="p-3 font-medium text-slate-600">Date</th>
                            <th className="p-3 font-medium text-slate-600">Status</th>
                            <th className="p-3 font-medium text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reminders.map((r, index) => (
                            <tr key={r.id} className="border-b border-slate-200">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{r.title}</td>
                                <td className="p-3">{r.date}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${r.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                                    >
                                        {r.completed ? "Completed" : "Pending"}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => toggleComplete(r.id)}
                                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white transition ${r.completed ? "bg-gray-500 hover:bg-gray-600" : "bg-amber-500 hover:bg-amber-400"}`}
                                    >
                                        <Check size={16} /> {r.completed ? "Undo" : "Done"}
                                    </button>
                                    <button
                                        onClick={() => deleteReminder(r.id)}
                                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
                                    >
                                        <Trash size={16} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Reminder Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-96">
                        <h3 className="text-xl font-semibold mb-4">Add New Reminder</h3>
                        <input
                            type="text"
                            placeholder="Reminder Title"
                            value={newReminder.title}
                            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                            className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <input
                            type="date"
                            value={newReminder.date}
                            onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                            className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addReminder}
                                className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reminders;
