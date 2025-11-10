import React, { useState, useMemo, useEffect } from "react";

import { Users, UserPlus, UserCheck, TrendingDown } from "lucide-react";
import UserStats from "../components/users/UserStats";
import UsersHeader from "../components/users/UsersHeader";
import UserTable from "../components/users/UserTable";
import UserForm from "../components/users/UserForm";
import ViewUserModal from "../components/users/ViewuserModal";
import UserDeleteModal from "../components/users/UserDeleteModal";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: "U-001", name: "Ahmed Ali", role: "Managing Director", email: "ahmed@lawfirm.com", phone: "+971501234567", status: "Active", assignedCases: 25, createdOn: "2024-01-01" },
    { id: "U-002", name: "Fatima Noor", role: "Secretary", email: "fatima@lawfirm.com", phone: "+971505556677", status: "Active", assignedCases: 40, createdOn: "2024-02-10" },
    { id: "U-003", name: "Mohamed Ragab", role: "Approving Lawyer", email: "ragab@lawfirm.com", phone: "+971509998877", status: "Active", assignedCases: 18, createdOn: "2024-03-05" },
    { id: "U-004", name: "Ali Hassan", role: "Lawyer", email: "ali@lawfirm.com", phone: "+971507776655", status: "Inactive", assignedCases: 12, createdOn: "2024-04-12" },
  ]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "Lawyer", password: "", confirmPassword: "" });
  const roles = ["Managing Director", "Secretary", "Lawyer", "Approving Lawyer (Ragab)"];


  
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
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const lawyers = users.filter(u => u.role.includes("Lawyer")).length;
    const approving = users.filter(u => u.role.includes("Approving")).length;
    const activeUsers = users.filter(u => u.status === "Active").length;
    return [
      { title: "Total Users", value: totalUsers, icon: <Users size={20} />, color: "from-[#162030] to-green-500" },
      { title: "Lawyers", value: lawyers, icon: <UserPlus size={20} />, color: "from-green-500 to-[#162030]" },
      { title: "Approving Lawyers", value: approving, icon: <UserCheck size={20} />, color: "from-[#162030] to-fuchsia-500" },
      { title: "Active Users", value: activeUsers, icon: <TrendingDown size={20} />, color: "from-rose-500 to-[#162030]" },
    ];
  }, [users]);

  const updateStatus = (id, status) => setUsers(users.map(u => u.id === id ? { ...u, status } : u));
  const handleDelete = (id) => { setSelectedUserId(id); setShowDeleteModal(true); };
  const handleAddUser = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match");
    setUsers([...users, { ...formData, id: `U-${users.length+1}`, assignedCases: 0, status: "Active", createdOn: new Date().toISOString().split("T")[0] }]);
    setShowAddModal(false);
    setFormData({ name: "", email: "", phone: "", role: "Lawyer", password: "", confirmPassword: "" });
  };
  const confirmDelete = () => { setUsers(users.filter(u => u.id !== selectedUserId)); setShowDeleteModal(false); };

  return (
     <div
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-25 
                 transition-all duration-300 ease-in-out mt-14 md:mt-0
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      <div className="text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
        Team Management
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
         Manage your team members, roles, and access permissions.
        </p>
      </div>
      <UserStats stats={stats} />
      <UsersHeader search={search} setSearch={setSearch} onAdd={()=>setShowAddModal(true)} />
      <UserTable users={filteredUsers} updateStatus={updateStatus} onView={setSelectedUser} onDelete={handleDelete} />

      <UserForm show={showAddModal} onClose={()=>setShowAddModal(false)} onSubmit={handleAddUser} formData={formData} setFormData={setFormData} roles={roles} />
      <ViewUserModal user={selectedUser} onClose={()=>setSelectedUser(null)} />
      <UserDeleteModal show={showDeleteModal} onClose={()=>setShowDeleteModal(false)} onDelete={confirmDelete} />
    </div>
  );
};

export default UsersPage;
