import { Outlet, Navigate } from "react-router-dom";
import { PATHS } from "../router/paths";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  let auth = { token };
  const decodedToken = auth.token && decodeToken(auth.token);
  console.log(decodedToken);

  return auth.token ? <Outlet /> : <Navigate to={PATHS.ROOT} />;
};

export default PrivateRoute;
