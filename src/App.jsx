import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Appoint from "./components/Appointment";
import Table from "./components/Table/Table";
import Cancel from "./routes/Cancel";
import Delete from "./routes/Delete";
import Root from "./routes/Root";
import {
  createAppointment,
  deleteOneAppointment,
  getAppointments,
  updateOneAppointment,
} from "./services/axios";

import "./index.css";

const createEditAppointment = async ({ request }) => {
  const fd = await request.formData();
  const createdEditedAppointment = Object.fromEntries(fd.entries());

  try {
    const { id } =
      // 'id' may or may not be defined depending on whether we are creating or updating
      createdEditedAppointment.id
        ? await updateOneAppointment(
            createdEditedAppointment.id,
            createdEditedAppointment
          )
        : await createAppointment(createdEditedAppointment);

    // Must return a redirect action
    return redirect(`/${id}`);
  } catch (error) {
    // TODO: redirect to error page
    console.error(error);
  }
};

const loadUsersAppointments = async () => {
  const AppointmentsData = await getAppointments();

  return { AppointmentsData };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loadUsersAppointments,
    action: createEditAppointment,
    children: [
      {
        path: "",
        element: <Table />,
      },
      {
        path: ":id",
        element: <Appoint />,
      },
      {
        path: "Cancel/:id",
        element: <Cancel />,
        action: async ({ params }) => {
          await updateOneAppointment(params.id, { status: "cancelled" });
          return redirect("/");
        },
      },
      {
        path: "Delete/:id",
        element: <Delete />,
        action: async ({ params }) => {
          console.log(params.id);
          await deleteOneAppointment(params.id);
          return redirect("/");
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
