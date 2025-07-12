import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import { ROUTES } from "./routes/routes";
const FavouritesPage = lazy(() => import('./pages/favPage'));
const CartPage = lazy(() => import('./pages/cartPage'));
const ProductPage = lazy(() => import('./pages/productPage'));
const NotFoundPage = lazy(() => import('./pages/nfoundPage'));
const HomePage = lazy(() => import('./pages/homePage'));
const LoginPage = lazy(() => import('./pages/loginPage'));
const SigninPage = lazy(() => import('./pages/signinPage'));
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
        path: ROUTES.PRODUCT,
        element: sSuspense(<ProductPage />),
      },
      {
        path: ROUTES.LOGIN,
        element: sSuspense(<LoginPage />),
      }
      ,
      {
        path: ROUTES.SIGNIN,
        element: sSuspense(<SigninPage />),
      }
      ,
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