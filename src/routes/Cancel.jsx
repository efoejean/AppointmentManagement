import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Dialog from "../components/Dialog";
import { updateOneAppointment } from "../services/axios";

export default function Cancel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useOutletContext();

  const appointmentToCancel = data.find((appointment) => appointment.id === id);

  function cancelAppointment(id) {
    updateOneAppointment(id, {
      status: "cancelled",
    });
    return navigate("/");
  }
  console.log(appointmentToCancel);

  return (
    <Dialog>
      <strong id="dialogDesc">
        <p>Are you sure you want to cancel this appointment?</p>
        <p className="italic">{appointmentToCancel.clientName}</p>
      </strong>
      <div className="flex justify-end">
        <button
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
          type="submit"
          onClick={() => {
            cancelAppointment(id);
          }}
        >
          Cancel
        </button>
        <Link
          to={`/appointment/${id}`}
          className="ml-2 rounded-lg bg-gray-500 px-4 py-2 text-white"
          onClick={() => {}}
        >
          Back
        </Link>
      </div>
    </Dialog>
  );
}
