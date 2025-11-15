import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectUserProfile } from "../../features/auth/authSlice";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const user = useSelector(selectUserProfile);
  const location = useLocation();
  const navigate = useNavigate();

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
        return navigate("/director");
      case "secretary":
        return navigate("/");
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
