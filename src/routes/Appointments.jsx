import { Link, Outlet, useLoaderData } from "react-router-dom";

export default function Appointments() {
  const { appointmentsData } = useLoaderData();
  const tableData = appointmentsData.map((appointment) => {
    return {
      ...appointment,
      start: new Date(appointment.appointment_date),
      end: new Date(appointment.appointment_date),
      stylist: appointment.stylistName,
      title: appointment.clientName,
    };
  });

  return (
    <div>
      <h1>Appointments</h1>
      <Link to="new">New Appointment</Link>
      <Outlet context={{ data: appointmentsData, tableData }} />
    </div>
  );
}
