import {
  Link,
  redirect,
  useOutletContext,
  useParams,
  useSubmit,
} from "react-router-dom";
import Dialog from "../components/Dialog";

export default function Cancel() {
  const { id } = useParams();
  const { data } = useOutletContext();
  const submit = useSubmit();

  const appointmentToCancel = data.find((appointment) => appointment.id === id);


  return (
    <Dialog>
      <p>Are you sure you want to cancel this appointment?</p>
      <strong id="dialogDesc">
        <p>Are you sure you want to delete this user?</p>
        <p className="italic">{appointmentToCancel.clientName}</p>
      </strong>
      <div className="flex justify-end">
        <button
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
          type="button"
          onClick={() => {
            submit(null, { method: "POST" });
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
