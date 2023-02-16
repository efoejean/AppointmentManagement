import {
  Link,
  redirect,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import Dialog from "../components/Dialog";

export default function Complete() {
  const { id } = useParams();
  const { AppointmentsData } = useLoaderData();
  const submit = useSubmit();

  const appointmentToComplete = AppointmentsData.find(
    (appointment) => appointment.id === id
  );

  return (
    <Dialog>
      <strong id="dialogDesc">
        <p className="px-8">
          Are you sure you want to mark this appointment as Completed
        </p>
        <p className="italic">{appointmentToComplete.clientName}</p>
        <p>on</p>
        <p className="italic">
          {new Date(
            appointmentToComplete.appointment_date
          ).toLocaleDateString()}
        </p>
        <p>at</p>
        <p className="italic">
          {new Date(
            appointmentToComplete.appointment_date
          ).toLocaleTimeString()}
        </p>
      </strong>
      <div className="flex justify-end">
        <button
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
          type="submit"
          onClick={() => {
            if (appointmentToComplete.status === "Completed") {
              window.alert("Appointment already completed");

              redirect(`/appointment/${id}`);
            }
            submit(null, { method: "post" });
          }}
        >
          Complete
        </button>
        <Link
          to={`/appointment/${id}`}
          className="ml-2 rounded-lg bg-gray-500 px-4 py-2 text-white"
          onClick={() => {}}
        >
          Back to Appointments
        </Link>
      </div>
    </Dialog>
  );
}
