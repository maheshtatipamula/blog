import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const jwt_token = Cookies.get("jwt_token");
  return jwt_token !== undefined ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
