import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";
import MainLayout from "../layouts/MainLayout";
import AllCases from "../../features/dashboard/components/dashboardCaseManagement/AllCases";
import CaseTimeline from '../../features/dashboard/components/dashboardCaseManagement/CaseTimeline';
import FinalApprovals from "../../features/dashboard/components/DashboardFinalApproval/Finalapprovals";
import ReportsAnalytics from "../../features/dashboard/components/DashboardReports/ReportsAnalytics";
import ArchivePage from "../../features/dashboard/components/DashboardArchive/ArchivePage";
import Reminders from "../../features/dashboard/components/DashboardReminders/Reminders";
import TeamManagement from "../../features/dashboard/components/DashboardTeamManagement/TeamManagement";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
    },
    {
        element: <AuthLayout />
    },
    {
        element: <DashboardLayout />,
        children:[
            {path:'/dashboard',element:<AdminDashboard />},
            {path:"/all-cases",element:<AllCases/>},
            {path:"/case-timeline",element:<CaseTimeline/>},
            {path:'/overview',element:<AdminDashboard />},
            {path: '/final-approval', element: <FinalApprovals/>},
            {path: '/archive', element: <ArchivePage/>},
            {path: '/reports', element: <ReportsAnalytics />},
            {path: '/reminders', element: <Reminders />},
            {path: '/team', element: <TeamManagement />}
            
        ]
    }
])

export default function AppRouter(){
    return <RouterProvider router={router} />
}