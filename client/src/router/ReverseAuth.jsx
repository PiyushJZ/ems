import { Outlet, Navigate, useLocation } from "react-router-dom";
import { PATHS } from "./paths";

const ReverseAuthRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (location.pathname === "/login" && token) {
    return <Navigate to={PATHS.createTasks} />;
  }
  return <Outlet />;
};

export default ReverseAuthRoute;
