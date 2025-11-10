import React from "react";

const UserTable = ({ users, updateStatus, onView, onDelete }) => {
  return (
    <div className="bg-white text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
              <tr className="text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Assigned Cases</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id} className={`${idx % 2 === 0 ? "bg-[#E1E1E2]" : "bg-white"} hover:bg-slate-100 transition`}>
                  <td className="py-3 px-4 font-semibold">{u.name}</td>
                  <td className="py-3 px-4">{u.role}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">{u.phone}</td>
                  <td className="py-3 px-4">
                    <select value={u.status} onChange={(e)=>updateStatus(u.id, e.target.value)} className="border rounded px-2 py-1 text-sm">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-center">{u.assignedCases}</td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <button onClick={()=>onView(u)} className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-slate-800 transition text-sm">View</button>
                    <button onClick={()=>onDelete(u.id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile / Tablet Card View */}
      <div className="lg:hidden flex flex-col gap-4 p-4">
        {users.map(u => (
          <div key={u.id} className="bg-[#E1E1E2] rounded-xl p-4 shadow-md flex flex-col gap-2">
            <p className="font-semibold text-lg">{u.name}</p>
            <p><strong>Role:</strong> {u.role}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Phone:</strong> {u.phone}</p>
            <div className="flex items-center justify-between mt-2">
              <select value={u.status} onChange={(e)=>updateStatus(u.id, e.target.value)} className="border rounded px-2 py-1 text-sm">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex gap-2">
                <button onClick={()=>onView(u)} className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-slate-800 transition text-sm">View</button>
                <button onClick={()=>onDelete(u.id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
