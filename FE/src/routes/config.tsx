import Home from "../component/Home";
import User from "../component/User";
import SignUp from "../component/SignUp";
import SignIn from "../component/SignIn";
import ConnectedDevices from "../component/ConnectedDevice";

import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";

import { Navigate } from "react-router-dom";
import QRCode from "../component/QRCode";


interface Route {
  path: string;
  element: JSX.Element;
  children?: Route[];
  label?: any;
}

const RouteConfig: Route[] = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <Navigate to="/auth/signin" replace /> }, // Redirect to signin by default
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        label: 'Home',
        element: <Home />
      },
      {
        path: "user",
        label: 'User',
        element: <User />,
      },
      {
        path: "device",
        label: 'Device',
        element: <ConnectedDevices />
      },
      {
        path: "qr",
        label: 'QRCode',
        element: <QRCode />,
      },
      {
        path: "cronjob",
        label: 'Cronjob',
        element: <User />
      },
      { path: "*", element: <Navigate to="/" replace /> }, // Redirect to home for any unknown route
    ],
  },
];
export default RouteConfig;
