import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import MoviesDetailPage from "./pages/MovieDetailPage.tsx";
import TvSeriesDetailPage from "./pages/TvSeriesDetailPage.tsx";
import MoviesPage from "./pages/MoviesPage.tsx";
import TvSeriesPage from "./pages/TvSeriesPage.tsx";
import CelebritiesPage from "./pages/CelebritiesPage.tsx";
import CelebritieDetailPage from "./pages/CelebritieDetailPage.tsx";
import AuthCallBack from "./pages/AuthCallBack.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Not Found</h1>, // Hacer vista para página no encontrada
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movie/:id",
        element: <MoviesDetailPage />,
      },
      {
        path: "tv/:id",
        element: <TvSeriesDetailPage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "tv",
        element: <TvSeriesPage />,
      },
      {
        path: "celebrities",
        element: <CelebritiesPage />,
      },
      {
        path: "celebritie/:id",
        element: <CelebritieDetailPage />,
      },
      {
        path: "auth/callBack",
        element: <AuthCallBack />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
