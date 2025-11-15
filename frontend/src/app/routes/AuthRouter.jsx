import Login from "../../features/auth/pages/Login";
import Signup from "../../features/auth/pages/Signup";
import VerifyAccount from "../../features/auth/pages/VerifyAccount";

export const authRoutes = {
    path: "/",
    children: [
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'verify-account', element: <VerifyAccount /> }
    ]
}