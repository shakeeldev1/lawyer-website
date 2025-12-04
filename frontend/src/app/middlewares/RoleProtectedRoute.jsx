import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectUserProfile } from "../../features/auth/authSlice";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const user = useSelector(selectUserProfile);
  const location = useLocation();
  const navigate = useNavigate();

  if (user === null || user === undefined) {
    return (
      <div className="relative flex items-center justify-center min-h-screen h-screen">
        <img
          src="./home.jpeg"
          alt="home"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            You are not logged in
          </h1>

          <p className="text-gray-200 text-lg mb-6">
            Please login to access this page
          </p>

          <Link
            to="/login"
            className="
            inline-block px-8 py-3 
            bg-white text-black font-semibold
            rounded-full shadow-lg
            transition-all duration-300 ease-in-out
            hover:bg-gray-200 hover:shadow-xl
          "
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "director":
        return navigate("/director");
      case "secretary":
        return navigate("/secretary");
      case "lawyer":
        return navigate("/lawyer");
      case "approvedlawyer":
        return navigate("/approvedlawyer");
      default:
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default RoleProtectedRoute;
