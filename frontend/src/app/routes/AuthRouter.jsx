import Signup from "../../features/auth/pages/Signup";

export const authRoutes = {
    path:"/auth",
    children: [
        { path: 'signup',element: <Signup /> }
    ]
}