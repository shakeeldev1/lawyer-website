import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/AdminLayout";
import AdminDashboard from "../../features/dashboard/pages/AdminDashboard";
import MainLayout from "../layouts/MainLayout";

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
            {path:'/dashboard',element:<AdminDashboard />}
        ]
    }
])

export default function AppRouter(){
    return <RouterProvider router={router} />
}