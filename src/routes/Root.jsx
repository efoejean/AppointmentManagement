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
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
