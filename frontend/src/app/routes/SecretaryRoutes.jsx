import CaseManagement from "../../features/secretary/pages/CaseManagement"
import ClientsPage from "../../features/secretary/pages/ClientsPage"
import SecretaryArchiveCases from "../../features/secretary/pages/SecretaryArchiveCases"
import SecretaryDashboard from "../../features/secretary/pages/SecretaryDashboard"
import SecretaryReminders from "../../features/secretary/pages/SecretaryReminders"
import SecretaryLayout from "../layouts/SecretaryLayout"
import RoleProtectedRoute from "../middlewares/RoleProtectedRoute"

export const SecretaryRoutes = {
    path: '',
    element: (
        // <RoleProtectedRoute allowedRoles={['secretary']}>
            <SecretaryLayout />
        // </RoleProtectedRoute>
    ),
    children: [
        { index: true, element: <ClientsPage /> },
        { path: "clients", element: <ClientsPage /> },
        { path: 'case-management', element: <CaseManagement /> },
        { path:"clients" , element: <ClientsPage /> },
        { path: 'case-management', element: <CaseManagement /> },
        { path: 'reminders', element: <SecretaryReminders /> },
        { path: 'archive-cases', element: <SecretaryArchiveCases /> }
    ]
}