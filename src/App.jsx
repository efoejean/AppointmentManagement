import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page";
import Appointment from "./routes/Appointment";
import Contact from "./routes/contact";
import Root, { loader as rootLoader } from "./routes/Root";
import Scheduler from "./routes/Scheduler";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,

    // children: [
    //   {
    //     path: "contacts/:contactId",
    //     element: <Contact />,
    //   },
    //   {
    //     path: "/agenda",
    //     element: <Schedule />,
    //   },
    //   {
    //     path: "/appointments",
    //     element: <Appointments />,
    //     loader: loaderAppointment,
    //   },
    // ],

    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "/agenda",
        element: <Scheduler />,
        loader: rootLoader,
      },
      {
        path: "/appointments",
        element: <Appointment />,
        loader: rootLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
