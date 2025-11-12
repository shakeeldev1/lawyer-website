import CaseManagement from "../../features/secretary/pages/CaseManagement"
import ClientsPage from "../../features/secretary/pages/ClientsPage"
import SecretaryArchiveCases from "../../features/secretary/pages/SecretaryArchiveCases"
import SecretaryDashboard from "../../features/secretary/pages/SecretaryDashboard"
import SecretaryReminders from "../../features/secretary/pages/SecretaryReminders"
import SecretaryLayout from "../layouts/SecretaryLayout"

export const SecretaryRoutes = {
    path: 'secretary',
    element: <SecretaryLayout />,
    children: [
        { index: true, element: <SecretaryDashboard /> },
        { path:"clients" , element: <ClientsPage /> },
        { path: 'case-management', element: <CaseManagement /> },
        { path: 'reminders', element: <SecretaryReminders /> },
        { path: 'archive-cases', element: <SecretaryArchiveCases /> }
    ]
}