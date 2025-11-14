import DashboardLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";
import FinalApprovals from "../../features/dashboard/pages/FinalApprovals";
import AllCases from "../../features/dashboard/pages/AllCases";
import RemindersPage from "../../features/dashboard/pages/RemindersPage";
import ReportsAndAnalytics from "../../features/dashboard/pages/ReportsAndAnalytics";
import UsersPage from "../../features/dashboard/pages/Users";
import Archive from "../../features/dashboard/pages/Archive";
import RoleProtectedRoute from "../middlewares/RoleProtectedRoute";

export const adminRoutes = {
    path: "director",
    element: (
        <RoleProtectedRoute allowedRoles={['director']}>
            <DashboardLayout />
        </RoleProtectedRoute>),
    children: [
        { index: true, element: <AdminDashboard /> },
        { path: "all-cases", element: <AllCases /> },
        { path: "final-approval", element: <FinalApprovals /> },
        { path: "archive", element: <Archive /> },
        { path: "reports", element: <ReportsAndAnalytics /> },
        { path: "reminders", element: <RemindersPage /> },
        { path: "team", element: <UsersPage /> },
    ],
};
