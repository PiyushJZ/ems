import React from "react";
import ReverseAuthRoute from "../router/ReverseAuth";
import ProtectedRoute from "../router/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  CreateTasksPage,
  ErrorPage,
  LoginPage,
  TaskListPage,
  AdminPage,
  NotesPage,
  NotesListPage,
} from "../pages";
import { PATHS } from "../router/paths";

const AppLayout = () => {
  return (
    <>
      <Routes>
        {/* login route */}
        <Route element={<ReverseAuthRoute />}>
          <Route path={PATHS.login} element={<LoginPage />} />
        </Route>
        <Route path={PATHS.root} element={<Navigate to={PATHS.login} />} />
        {/* ____________________________________________________*/}

        <Route element={<ProtectedRoute />}>
          <Route path={PATHS.taskList} element={<TaskListPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={PATHS.createTasks} element={<CreateTasksPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={PATHS.adminPage} element={<AdminPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path={PATHS.adminPage + PATHS.taskList}
            element={<TaskListPage />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={PATHS.createNotes} element={<NotesPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={PATHS.notesList} element={<NotesListPage />} />
        </Route>

        {/* default route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AppLayout;
