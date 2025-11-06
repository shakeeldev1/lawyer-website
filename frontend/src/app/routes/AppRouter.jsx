import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import { adminRoutes } from "./DirectorRoutes";
import { SecretaryRoutes } from "./SecretaryRoutes";
import { LawyerRoutes } from "./LawyerRoutes";
import AllCases from "../../features/dashboard/components/dashboardCaseManagement/AllCases";
import CaseTimeline from '../../features/dashboard/components/dashboardCaseManagement/CaseTimeline';
import ReportsAnalytics from "../../features/dashboard/components/DashboardReports/ReportsAnalytics";
import ArchivePage from "../../features/dashboard/components/DashboardArchive/ArchivePage";
import Reminders from "../../features/dashboard/components/DashboardReminders/Reminders";
import TeamManagement from "../../features/dashboard/components/DashboardTeamManagement/TeamManagement";
import FinalApprovals from "../../features/dashboard/pages/FinalApprovals";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
    },
    {
        element: <AuthLayout />
    },
    adminRoutes,
    SecretaryRoutes,
    LawyerRoutes
])

export default function AppRouter() {
    return <RouterProvider router={router} />
}