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
        submit(null, { method: "POST" });
      }}
    >
      <p>Are you sure you want to cancel this appointment?</p>
      <strong id="dialogDesc">
        <p>Are you sure you want to delete this user?</p>
        <p className="italic">{appointmentToCancel.clientName}</p>
      </strong>
      <p>
        <Link to="/appointments">Go back</Link>
      </p>
    </Dialog>
  );
}
