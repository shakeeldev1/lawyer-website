import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import { adminRoutes } from "./DirectorRoutes";
import { SecretaryRoutes } from "./SecretaryRoutes";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
    },
    {
        element: <AuthLayout />
    },
    adminRoutes,
    SecretaryRoutes
])

export default function AppRouter() {
    return <RouterProvider router={router} />
}