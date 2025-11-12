import LawyerArchieve from "../../features/lawyer/pages/LawyerArchieve";
import LawyerNotifications from "../../features/lawyer/pages/Lawyernotifications";
import LawyerOverview from "../../features/lawyer/pages/LawyerOverview";
import MyCases from "../../features/lawyer/pages/MyCases";
import LawyerLayout from "../layouts/LawyerLayout";

export const LawyerRoutes = {
    path: 'lawyer',
    element: <LawyerLayout />,
    children: [
        { index: true, element: <LawyerOverview /> },
        { path: 'my-cases', element: <MyCases /> },
        { path: 'archieve', element: <LawyerArchieve /> },
        { path: 'notifications', element: <LawyerNotifications /> },

    ]
}