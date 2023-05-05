import React from "react";
import ReverseAuthRoute from "../router/ReverseAuth";
import ProtectedRoute from "../router/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorPage, LoginPage } from "../pages";
import { PATHS } from "../router/paths";
import { routesMap } from "../router/routeMaps";

const AppLayout = () => {
  return (
    <>
      <Routes>
        <Route element={<ReverseAuthRoute />}>
          <Route path={PATHS.login} element={<LoginPage />} />
        </Route>
        <Route path={PATHS.root} element={<Navigate to={PATHS.login} />} />
        {/* protected routes mapping */}
        {/* ____________________________________________________*/}
        {routesMap.map(({ id, isProtected, path, Element }) => {
          return (
            <Route key={id} element={isProtected && <ProtectedRoute />}>
              <Route path={path} element={<Element />} />
            </Route>
          );
        })}

        {/* default error route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AppLayout;
