import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Appointment from "./routes/Appointment";
import Root from "./routes/Root";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/appointment",
        element: <Appointment />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
