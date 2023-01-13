import { useOutletContext, useParams } from "react-router-dom";

export default function useAppointment() {
  const { data } = useOutletContext();
  const { id } = useParams();

  const appointment = data.find((appointment) => appointment.id === id);
  const ids = data.map((appointment) => appointment.id);

  return { appointment, ids };
}
