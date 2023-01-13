import { Link } from "react-router-dom";
import useAppointment from "../hooks/useAppointment";
import { getNavIds } from "../utils/pagination";

export default function Appoint() {
  const { appointment, ids } = useAppointment();
  const { prevId, nextId } = getNavIds(ids, appointment.id);
  return (
    <figure className="container mx-auto flex flex-col gap-y-4 rounded-md border bg-zinc-900 px-8 py-8 text-zinc-50 shadow-xl">
      <div className="flex items-center gap-x-4">
        <img
          src={appointment.clientName}
          alt={appointment.deposit}
          className="h-32 w-32 rounded-full"
        />
        <figcaption>
          <h2 className="text-2xl font-bold text-indigo-700">
            {appointment.clientPhoneNumber}
          </h2>
          <small>{appointment.appointment_date}</small>
          <blockquote className="italic">
            &quot;{appointment.price}&quot;
          </blockquote>
        </figcaption>
      </div>
      <footer className="self-center text-xl">
        <Link to={"/" + prevId} className="mr-4 text-indigo-500">
          ⬅️ Prev
        </Link>
        <Link to={"/" + nextId} className="text-indigo-500">
          Next ➡️
        </Link>
      </footer>
    </figure>
  );
}
