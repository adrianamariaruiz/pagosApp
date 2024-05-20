import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../routes/PublicRoute";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import NotFound from "../pages/NotFound";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
    ],
  },
]);