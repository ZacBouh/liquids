import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}