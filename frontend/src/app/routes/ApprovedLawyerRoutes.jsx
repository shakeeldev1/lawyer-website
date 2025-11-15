import ApprovedLawyerPage from "../../features/approvedlawyer/pages/ApprovedLawyerPage";
import ApprovedLawyerLayout from "../layouts/ApprovedLawyerLayout";


export const ApprovedLawyerRoutes = {
    path: 'lawyer',
    element: (
        // <RoleProtectedRoute allowedRoles={['lawyer']}>
            <ApprovedLawyerLayout />
        // </RoleProtectedRoute>
    ),
    children: [
        { index: true, element: <ApprovedLawyerPage /> },
     
    ]
}