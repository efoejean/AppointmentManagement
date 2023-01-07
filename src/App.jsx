import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Appointments from "./routes/Appointments";
import Root from "./routes/Root";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/appointments",
        element: <Appointments />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
