import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Appoint from "./components/Appointment";
import { action as createEditAppointment } from "./components/CreateForm";
import ErrorPage from "./components/error-page";
import "./index.css";
import Appointments from "./routes/Appointments";
import Cancel from "./routes/Cancel";
import Complete from "./routes/Complete";
import Root, { loader as rootLoader } from "./routes/Root";
import Scheduler from "./routes/Scheduler";
import { updateOneAppointment } from "./services/axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: createEditAppointment,
    children: [
      {
        path: "/appointments",
        element: <Appointments />,
        loader: rootLoader,
        action: createEditAppointment,
      },
      {
        path: "/appointment/:id",
        element: <Appoint />,
        loader: rootLoader,
        action: createEditAppointment,
      },
      {
        path: "/agenda",
        element: <Scheduler />,
        loader: rootLoader,
        action: createEditAppointment,
      },
      {
        path: "Cancel/:id",
        element: <Cancel />,
        loader: rootLoader,
        action: async ({ params }) => {
          await updateOneAppointment(params.id, {
            status: "Canceled",
          });
          return redirect("/appointments");
        },
      },
      {
        path: "Complete/:id",
        element: <Complete />,
        loader: rootLoader,
        action: async ({ params }) => {
          await updateOneAppointment(params.id, {
            status: "Completed",
          });
          return redirect("/appointments");
        },
      },
    ],
  },

  {
    path: "*",
    element: redirect("/"),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
