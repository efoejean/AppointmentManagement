import { Link, useOutletContext, useParams, useSubmit } from "react-router-dom";
import Dialog from "../components/Dialog";

export default function Cancel() {
  const { id } = useParams();
  const { data } = useOutletContext();
  const submit = useSubmit();

  const appointmentToCancel = data.find((appointment) => appointment.id === id);

  return (
    <Dialog
      title="Cancel Appointment"
      onConfirm={() => {
        submit({
          method: "POST",
          body: JSON.stringify({
            id: appointmentToCancel.id,
            appointment_date: appointmentToCancel.appointment_date,
            clientName: appointmentToCancel.clientName,
            clientPhoneNumber: appointmentToCancel.clientPhoneNumber,
            deposit: appointmentToCancel.deposit,
            service: appointmentToCancel.service,
            price: appointmentToCancel.price,
            status: "Cancelled",
          }),
        });
      }}
    >
      <p>Are you sure you want to cancel this appointment?</p>
      <p>
        <Link to="/appointments">Go back</Link>
      </p>
    </Dialog>
  );
}
