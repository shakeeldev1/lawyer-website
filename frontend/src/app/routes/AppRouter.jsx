import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";
import MainLayout from "../layouts/MainLayout";
import AllCases from "../../features/dashboard/components/dashboardCaseManagement/AllCases";
import CaseTimeline from '../../features/dashboard/components/dashboardCaseManagement/CaseTimeline';

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
        ]
    }
])

export default function AppRouter(){
    return <RouterProvider router={router} />
}