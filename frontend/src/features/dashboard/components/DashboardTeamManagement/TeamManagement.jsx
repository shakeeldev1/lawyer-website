import { useState } from "react";
import { Eye, Edit, Trash, Plus } from "lucide-react";

const TeamManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Ali Raza", role: "Lawyer", email: "ali@lawfirm.com", status: "Active" },
        { id: 2, name: "Mariam Tariq", role: "Secretary", email: "mariam@lawfirm.com", status: "Active" },
        { id: 3, name: "Sara Ahmed", role: "Ragab", email: "sara@lawfirm.com", status: "Inactive" },
    ]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isAddOpen, setAddOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", role: "", email: "", status: "Active" });

    // Handle add new user
    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: Date.now() }]);
        setNewUser({ name: "", role: "", email: "", status: "Active" });
        setAddOpen(false);
    };

    // Handle edit user
    const handleEditUser = () => {
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
        setEditOpen(false);
    };

    // Handle delete user
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="p-6 mt-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Team Management</h2>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
                    onClick={() => setAddOpen(true)}
                >
                    <Plus size={18} /> Add User
                </button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 font-medium text-slate-600">Name</th>
                            <th className="p-3 font-medium text-slate-600">Role</th>
                            <th className="p-3 font-medium text-slate-600">Email</th>
                            <th className="p-3 font-medium text-slate-600">Status</th>
                            <th className="p-3 font-medium text-slate-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-slate-200">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 flex items-center gap-2">
                                    <button
                                        className="flex items-center gap-1 px-3 py-1 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                                        onClick={() => { setSelectedUser(user); setViewOpen(true); }}
                                    >
                                        <Eye size={16} /> View
                                    </button>
                                    <button
                                        className="flex items-center gap-1 px-3 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
                                        onClick={() => { setSelectedUser(user); setEditOpen(true); }}
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button
                                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <Trash size={16} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {isViewOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
                        <h3 className="text-xl font-bold mb-4">User Details</h3>
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Status:</strong> {selectedUser.status}</p>
                        <button
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-800 font-bold"
                            onClick={() => setViewOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
                        <h3 className="text-xl font-bold mb-4">Edit User</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={selectedUser.name}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={selectedUser.role}
                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={selectedUser.email}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        />
                        <select
                            value={selectedUser.status}
                            onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => setEditOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400"
                                onClick={handleEditUser}
                            >
                                Save
                            </button>
                        </div>
                        <button
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-800 font-bold"
                            onClick={() => setEditOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
                        <h3 className="text-xl font-bold mb-4">Add New User</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        />
                        <select
                            value={newUser.status}
                            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                            className="w-full mb-3 p-2 border rounded-lg"
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => setAddOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400"
                                onClick={handleAddUser}
                            >
                                Add
                            </button>
                        </div>
                        <button
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-800 font-bold"
                            onClick={() => setAddOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManagement;
