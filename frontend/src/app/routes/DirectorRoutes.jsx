import DashboardLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";
import ReportsAnalytics from "../../features/dashboard/components/DashboardReports/ReportsAnalytics";
import ArchivePage from "../../features/dashboard/components/DashboardArchive/ArchivePage";
import TeamManagement from "../../features/dashboard/components/DashboardTeamManagement/TeamManagement";
import FinalApprovals from "../../features/dashboard/pages/FinalApprovals";
import AllCases from "../../features/dashboard/pages/AllCases";
import RemindersPage from "../../features/dashboard/pages/RemindersPage";


export const adminRoutes = {
    path: "director",
    element: <DashboardLayout />,
    children: [
        { path: "overview", element: <AdminDashboard /> },
       {path:"all-cases",element:<AllCases/>},
        { path: "final-approval", element: <FinalApprovals /> },
        { path: "archive", element: <ArchivePage /> },
        { path: "reports", element: <ReportsAnalytics /> },
        { path: "reminders", element: <RemindersPage /> },
        { path: "team", element: <TeamManagement /> },
    ],
};
