import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import MoviesDetailPage from "./pages/MoviesDetailPage.tsx";
import TvSeriesDetailPage from "./pages/TvSeriesDetailPage.tsx";

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
        element: <TvSeriesDetailPage />
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
