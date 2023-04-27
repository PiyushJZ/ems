import { useSelector } from "react-redux";

export const isAuthenticated = () => {
  const { token } = useSelector((x) => x.auth);
  console.log(token);
  const authToken = localStorage.getItem("authToken");
  return authToken !== null && token !== undefined;
};
