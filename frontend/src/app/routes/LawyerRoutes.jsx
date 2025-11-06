import LawyerDashboard from "../../features/lawyer/pages/LawyerDashboard";
import MyCases from "../../features/lawyer/pages/MyCases";
import LawyerLayout from "../layouts/LawyerLayout";

export const LawyerRoutes = {
    path: 'lawyer',
    element: <LawyerLayout />,
    children: [
        { index: true, element: <LawyerDashboard /> },
        { path: 'my-cases', element: <MyCases /> }
    ]
}