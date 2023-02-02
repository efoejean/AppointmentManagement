import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAppointments } from "../services/axios";

export async function loader() {
  const Appointments = await getAppointments();

  const AppointmentsData = Appointments.map((appointment) => ({
    ...appointment,

    start: new Date(appointment.appointment_date),
    end: new Date(appointment.appointment_date),

    stylist: appointment.stylistName,
    title: appointment.clientName + " / " + appointment.service,
  }));

  return { AppointmentsData };
}

export default function Root() {
  // useLoaderData() is a hook that returns the data - be sure to DESTRUCTURE it!
  // const { AppointmentsData } = useLoaderData();

  // // TODO: Refactor this to avoid as much clutter. Consider spread operator.
  // const tableData = AppointmentsData.map(
  //   ({
  //     id,
  //     appointment_date,
  //     clientName,
  //     clientPhoneNumber,
  //     deposit,
  //     service,
  //     price,
  //     status,
  //   }) => ({
  //     id,
  //     appointment_date: new Date(appointment_date).toLocaleDateString(),
  //     clientName,
  //     clientPhoneNumber,
  //     deposit,
  //     service,
  //     price: `$${price}`,
  //     status,
  //   })
  // );

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
