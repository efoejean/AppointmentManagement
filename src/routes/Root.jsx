import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAppointments } from "../services/axios";

export async function loader() {
  const Appointments = await getAppointments();

  const AppointmentsData = Appointments.map((appointment) => ({
    ...appointment,

    start: new Date(appointment.appointment_date),
    end: new Date(appointment.appointment_date),

    time: new Date(appointment.appointment_date).toLocaleTimeString(),
    stylist: appointment.stylistName,
    title: appointment.clientName + " / " + appointment.service,
  }));

  return { AppointmentsData };
}

export default function Root() {
  return (
    <>
      <Navbar />
      <main className="text-3ml mx-8 mt-4 mb-8 flex flex-col gap-y-4 pt-12 text-center font-bold ">
        <Outlet />
      </main>
      <footer className=" page-footer  bg-gray-800">
        <div>
          <p className="p-2 text-center text-white">
            © {new Date().getFullYear()} All Rights Reserved. Queen African Hair
            Braiding
          </p>
        </div>
      </footer>
    </>
  );
}
