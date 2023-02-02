import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Appoint from "./components/Appointment";
import ErrorPage from "./components/error-page";
import "./index.css";
import Appointments from "./routes/Appointments";
import Root, { loader as rootLoader } from "./routes/Root";
import { createAppointment, updateOneAppointment } from "./services/axios";

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

// const loadUsersAppointments = async () => {
//   const Appointments = await getAppointments();

//   const AppointmentsData = Appointments.map((appointment) => ({
//     ...appointment,

//     start: new Date(appointment.appointment_date),
//     end: new Date(appointment.appointment_date),

//     stylist: appointment.stylistName,
//     title: appointment.clientName + " / " + appointment.service,
//   }));

//   return { AppointmentsData };
// };

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
