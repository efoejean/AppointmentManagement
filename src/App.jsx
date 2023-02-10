import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Appoint from "./components/Appointment";
import Table from "./components/Table/Table";
import Cancel from "./routes/Cancel";
import Complete from "./routes/Complete";
import Root from "./routes/Root";
import Scheduler from "./routes/Scheduler";
import ErrorPage from "./components/error-page";
import {
  createAppointment,
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
        ? await updateOneAppointment(createdEditedAppointment.id, {
            appointment_date: createdEditedAppointment.appointment_date,
            clientName: createdEditedAppointment.clientName,
            clientPhoneNumber: createdEditedAppointment.clientPhoneNumber,
            stylistName: createdEditedAppointment.stylistName,
            service: createdEditedAppointment.service,
            deposit: createdEditedAppointment.deposit,
            price: createdEditedAppointment.price,
          })
        : await createAppointment(createdEditedAppointment);

    // Must return a redirect action

    return redirect(`/appointment/${id}`);
  } catch (error) {
    // TODO: redirect to error page
    console.error(error);
  }
};
const loadUsersAppointments = async () => {
  const Appointments = await getAppointments();

  const AppointmentsData = Appointments.map((appointment) => ({
    ...appointment,

    start: new Date(appointment.appointment_date),
    end: new Date(appointment.appointment_date),

    stylist: appointment.stylistName,
    title: appointment.clientName + " / " + appointment.service,
  }));

  return { AppointmentsData };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loadUsersAppointments,
    action: createEditAppointment,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Table />,
      },
      {
        path: "/appointment/:id",

        element: <Appoint />,
        loader: loadUsersAppointments,
        action: createEditAppointment,
      },
      {
        path: "/agenda",
        element: <Scheduler />,
      },
      {
        path: "Cancel/:id",
        element: <Cancel />,
        loader: loadUsersAppointments,
        action: async ({ params }) => {
          await updateOneAppointment(params.id, {
            status: "Canceled",
          });
          return redirect("/");
        },
      },
      {
        path: "Complete/:id",
        element: <Complete />,
        loader: loadUsersAppointments,
        action: async ({ params }) => {
          await updateOneAppointment(params.id, {
            status: "Completed",
          });
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
