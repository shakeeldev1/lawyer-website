import LawyerOverview from "../../features/lawyer/pages/LawyerOverview";
import MyCases from "../../features/lawyer/pages/MyCases";
import LawyerLayout from "../layouts/LawyerLayout";

export const LawyerRoutes = {
    path: 'lawyer',
    element: <LawyerLayout />,
    children: [
        { index: true, element: <LawyerOverview /> },
        { path: 'my-cases', element: <MyCases /> },

    ]
}