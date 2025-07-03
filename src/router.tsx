import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import { ROUTES } from "./routes/routes";

const HomePage = lazy(() => import('./pages/homePage'));
const MainLayout = lazy(() => import('./layout/layout'));

const sSuspense = (Component: React.ReactNode) => (
  <Suspense
    fallback={
      <div style={{ padding: 100, textAlign: 'center' }}>
        <Spin tip="Загрузка..." size="large" />
      </div>
    }
  >
    {Component}
  </Suspense>
);

export const Router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: sSuspense(<MainLayout />),
    children: [
      {
        index: true,
        element: sSuspense(<HomePage />),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={Router} />;
}