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
import Navbar from "./components/navbar/Navbar";
import Del from "./components/table/Del";
const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path={PATHS.root} element={<Login />} />
      <Route path={PATHS.taskList} element={<TaskList />} />
      <Route path={PATHS.createTasks} element={<CreateTask />} />
      <Route path="/del" element={<Del />} />
    </Routes>
  );
};

export default App;
