import { useOutletContext, useParams } from "react-router-dom";

export default function useAppointment() {
  const { data } = useOutletContext();
  const { appointmentId } = useParams();

  const appointment = data.find(
    (appointment) => appointment.id === appointmentId
  );
  const ids = data.map((appointment) => appointment.id);

  return { appointment, ids };
}
