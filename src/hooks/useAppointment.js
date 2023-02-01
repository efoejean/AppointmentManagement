import { useLoaderData, useParams } from "react-router-dom";

export default function useAppointment() {
  const { AppointmentsData } = useLoaderData();
  const { id } = useParams();

  const appointment = AppointmentsData.find(
    (appointment) => appointment.id === id
  );
  const ids = AppointmentsData.map((appointment) => appointment.id);

  return { appointment, ids };
}
