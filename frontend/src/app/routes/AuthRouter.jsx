import Login from "../../features/auth/pages/Login";
import Signup from "../../features/auth/pages/Signup";
import VerifyAccount from "../../features/auth/pages/VerifyAccount";
import MyProfilePage from './../../MyProfilePage';

export const authRoutes = {
    path: "/",
    children: [
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'verify-account', element: <VerifyAccount /> },
        { path: 'my-profile', element: <MyProfilePage /> },
        
    ]
}