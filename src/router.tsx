import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import { ROUTES } from "./routes/routes";
import FavouritesPage from './pages/favPage';
import CartPage from './pages/cartPage';
import NotFoundPage from './pages/nfoundPage';

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
      {
        path: ROUTES.CART,
        element: sSuspense(<CartPage />),
      },
      {
        path: ROUTES.FAVOURITES,
        element: sSuspense(<FavouritesPage />),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={Router} />;
}