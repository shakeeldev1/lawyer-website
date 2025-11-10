import DashboardLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";
import ArchivePage from "../../features/dashboard/components/DashboardArchive/ArchivePage";
import FinalApprovals from "../../features/dashboard/pages/FinalApprovals";
import AllCases from "../../features/dashboard/pages/AllCases";
import RemindersPage from "../../features/dashboard/pages/RemindersPage";
import ReportsAndAnalytics from "../../features/dashboard/pages/ReportsAndAnalytics";
import UsersPage from "../../features/dashboard/pages/Users";


export const adminRoutes = {
    path: "director",
    element: <DashboardLayout />,
    children: [
        { path: "overview", element: <AdminDashboard /> },
       {path:"all-cases",element:<AllCases/>},
        { path: "final-approval", element: <FinalApprovals /> },
        { path: "archive", element: <ArchivePage /> },
        { path: "reports", element: <ReportsAndAnalytics /> },
        { path: "reminders", element: <RemindersPage /> },
        { path: "team", element: <UsersPage /> },
    ],
};
