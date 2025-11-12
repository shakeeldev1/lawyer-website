import CaseManagement from "../../features/secretary/pages/CaseManagement"
import ClientsPage from "../../features/secretary/pages/ClientsPage"
import SecretaryDashboard from "../../features/secretary/pages/SecretaryDashboard"
import SecretaryLayout from "../layouts/SecretaryLayout"
import RoleProtectedRoute from "../middlewares/RoleProtectedRoute"

export const SecretaryRoutes = {
    path: 'secretary',
    element: (
        <RoleProtectedRoute allowedRoles={['secretary']}>
            <SecretaryLayout />
        </RoleProtectedRoute>
    ),
    children: [
        { index: true, element: <SecretaryDashboard /> },
        { path: "clients", element: <ClientsPage /> },
        { path: 'case-management', element: <CaseManagement /> }
    ]
}