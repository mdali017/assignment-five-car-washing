import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Authentication/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Authentication/Login";
import ServicesPage from "../pages/Services/Services";
import ServiceDetailsPage from "../pages/ServicesDetails/SercicesDetails";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import BookingPage from "../pages/Booking/BookingPage";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import AllServices from "../pages/Dashboard/AdminDashboard/Services/AllServices/AllServices";
import CreateService from "../pages/Dashboard/AdminDashboard/Services/CreateService/CreateService";
import AllSlots from "../pages/Dashboard/AdminDashboard/Slots/AllSlots/AllSlots";
import CreateSlot from "../pages/Dashboard/AdminDashboard/Slots/CreateSlot/CreateSlot";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import Reviews from "../pages/Reviews/Reviews";

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
      {
        path: "/services/:id",
        element: <ServiceDetailsPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/all-services",
        element: <AllServices />,
      },
      {
        path: "/dashboard/create-services",
        element: <CreateService />,
      },
      {
        path: "/dashboard/all-slots",
        element: <AllSlots />,
      },
      {
        path: "/dashboard/create-slots",
        element: <CreateSlot />,
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
  {
    path: "user_dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        path: "/user_dashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);

export default router;
