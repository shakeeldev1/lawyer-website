
import ApprovedLawyerNotifications from "../../features/approvedlawyer/pages/ApprovedLawyerNotifications";
import ApprovedLawyerPage from "../../features/approvedlawyer/pages/ApprovedLawyerPage";
import ApprovedLawyerLayout from "../layouts/ApprovedLawyerLayout";
import RoleProtectedRoute from "../middlewares/RoleProtectedRoute";


export const ApprovedLawyerRoutes = {
    path: 'approvedlawyer',
    element: (
        <RoleProtectedRoute allowedRoles={['lawyer']}>
            <ApprovedLawyerLayout />
    </RoleProtectedRoute>
    ),
    children: [
        { index: true, element: <ApprovedLawyerPage /> },
        { path: "notifications", element: <ApprovedLawyerNotifications /> },
     
    ]
}