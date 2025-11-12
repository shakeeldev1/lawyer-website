import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectUserProfile } from "../../features/auth/authSlice";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const user = useSelector(selectUserProfile);
  const location = useLocation();

  console.log("user in middleware", user);

  if (user === null || user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "director":
        return <Navigate to="/director/overview" replace />;
      case "secretary":
        return <Navigate to="/secretary/dashboard" replace />;
      case "lawyer":
        return <Navigate to="/lawyer/dashboard" replace />;
      default:
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default RoleProtectedRoute;
