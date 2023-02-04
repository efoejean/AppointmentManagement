import { Link, useOutletContext, useParams, useSubmit } from "react-router-dom";
import Dialog from "../components/Dialog";

export default function Delete() {
  const { id } = useParams();
  const { data } = useOutletContext();
  const submit = useSubmit();

  const appointmentToDelete = data.find((appointment) => appointment.id === id);

  return (
    <Dialog>
      <h2 className="text-2xl font-bold" id="dialogTitle">
        Delete Appointment
      </h2>
      <strong id="dialogDesc">
        <p>Are you sure you want to delete this Appointment?</p>
        <p className="italic">{appointmentToDelete.clientName}</p>
      </strong>
      <div className="flex justify-end">
        <button
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
          type="button"
          onClick={() => {
            submit(null, { method: "OPTION" });
          }}
        >
          Delete
        </button>
        <Link
          to="/"
          className="ml-2 rounded-lg bg-gray-500 px-4 py-2 text-white"
          onClick={() => {}}
        >
          Cancel
        </Link>
      </div>
    </Dialog>
  );
}
