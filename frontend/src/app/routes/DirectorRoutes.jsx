import DashboardLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";
import AllCases from "../../features/dashboard/components/dashboardCaseManagement/AllCases";
import CaseTimeline from "../../features/dashboard/components/dashboardCaseManagement/CaseTimeline";
import ReportsAnalytics from "../../features/dashboard/components/DashboardReports/ReportsAnalytics";

import Reminders from "../../features/dashboard/components/DashboardReminders/Reminders";
import TeamManagement from "../../features/dashboard/components/DashboardTeamManagement/TeamManagement";
import FinalApprovals from "../../features/dashboard/pages/FinalApprovals";
import Archive from "../../features/dashboard/pages/Archive";

export const adminRoutes = {
    path: "director",
    element: <DashboardLayout />,
    children: [
        { path: "overview", element: <AdminDashboard /> },
        { path: "all-cases", element: <AllCases /> },
        { path: "case-timeline", element: <CaseTimeline /> },
        { path: "final-approval", element: <FinalApprovals /> },
        { path: "archive", element:<Archive/>},
        { path: "reports", element: <ReportsAnalytics /> },
        { path: "reminders", element: <Reminders /> },
        { path: "team", element: <TeamManagement /> },
    ],
};
