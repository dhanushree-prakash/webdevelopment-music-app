import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import PageNotFound from "../Pages/PageNotFound";
import Home from "../Pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";
import UserLayout from "../Components/user/UserLayout";
import UserAccount from "../Components/user/UserAccount";
import UpdatePassword from "../Components/user/UpdatePassword";
import UpdatePicture from "../Components/user/UpdatePicture";
import UpdateProfile from "../Components/user/UpdateProfile";
import AdminLayout from "../Components/admin/AdminLayout";
import AdminDashboard from "../Components/admin/AdminDashboard";
import AddAblum from "../Components/admin/AddAblum";
import DeleteUser from "../Components/user/DeleteUser";
import Dashboard from "../Components/Home/Dashboard";
import AlbumDetails from "../Components/Home/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true, // default route for home
            element: <Dashboard />,
          },
          {
            path: "album-details",
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: "auth/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "auth/forget-password",
        element: (
          <PublicRoutes>
            <ForgetPassword />
          </PublicRoutes>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <AdminRoutes>
              <AdminLayout />
            </AdminRoutes>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true, // default route for admin
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                  <AdminDashboard />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
          {
            path: "add-album",
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                  <AddAblum />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
        ],
      },

      {
        path: "user-profile",
        element: (
          <ProtectedRoutes>
            <UserLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true, //default
            element: (
              <ProtectedRoutes>
                <UserAccount />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-picture",
            element: (
              <ProtectedRoutes>
                <UpdatePicture />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-profile",
            element: (
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-password",
            element: (
              <ProtectedRoutes>
                <UpdatePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "delete-user",
            element: (
              <ProtectedRoutes>
                <DeleteUser />
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
]);
export default routes;
