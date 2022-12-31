import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import Home from "../Pages/Home/Home";
import MainLayout from "../Pages/MainLayout/MainLayout";
import MyProfile from "../Pages/MyProfile/MyProfile";
import SignIn from "../Pages/Sign In/SignIn";
import SignUp from "../Pages/Sign Up/SignUp";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
