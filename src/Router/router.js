import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Pages/MainLayout/MainLayout";
import MyProfile from "../Pages/MyProfile/MyProfile";
import SignIn from "../Pages/Sign In/SignIn";
import SignUp from "../Pages/Sign Up/SignUp";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
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
        element: <MyProfile />,
      },
    ],
  },
]);
