import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Authentication/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Authentication/Login";
import ServicesPage from "../pages/Services/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
    ],
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;
