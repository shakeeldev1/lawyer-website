import CaseManagement from "../../features/secretary/pages/CaseManagement"
import SecretaryDashboard from "../../features/secretary/pages/SecretaryDashboard"
import SecretaryLayout from "../layouts/SecretaryLayout"

export const SecretaryRoutes = {
    path: 'secretary',
    element: <SecretaryLayout />,
    children: [
        { index: true, element: <SecretaryDashboard /> },
        { path: 'case-management', element: <CaseManagement /> }
    ]
}