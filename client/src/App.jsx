import Login from "./components/Login";
import NavBar from "./components/Navbar";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import { useSelector } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={!isLoggedIn ? <Login /> : <TaskList />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/all-tasks" element={<TaskList />} />
    </Routes>
  );
};

export default App;
