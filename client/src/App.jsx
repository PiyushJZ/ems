import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./router/paths";
import { CreateTasksPage, LoginPage, ErrorPage, TaskListPage } from "./pages";
import ReverseAuthRoute from "./router/ReverseAuth";
import ProtectedRoute from "./router/ProtectedRoute";
import { Navbar } from "./components";

const App = () => {
  // const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* login route */}
      <Route element={<ReverseAuthRoute />}>
        <Route path={PATHS.login} element={<LoginPage />} />
      </Route>
      <Route path={PATHS.root} element={<Navigate to={PATHS.login} />} />
      {/* _______________________________________________________ */}

      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.taskList} element={<TaskListPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.createTasks} element={<CreateTasksPage />} />
      </Route>

      {/* default route */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
