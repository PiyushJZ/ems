import Login from "./components/Login";
import NavBar from "./components/Navbar";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import { useSelector } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { PATHS } from "./router/paths";
import Task from "./components/Task";
import { isAuthenticated } from "./utils/auth";
import ProtectedRoute from "./router/ProtectedRoute";
const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path={PATHS.root} element={<Login />} />
    </Routes>
  );
};

export default App;
