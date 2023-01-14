import { Link } from "react-router-dom";
import useAppointment from "../hooks/useAppointment";
import { getNavIds } from "../utils/pagination";

export default function Appoint() {
  const { appointment, ids } = useAppointment();
  const { prevId, nextId } = getNavIds(ids, appointment.id);
  return (
    <figure className="container mx-auto flex flex-col gap-y-4 rounded-md border bg-sky-700 px-8 py-8 text-zinc-50 shadow-xl">
      <div>
        <div className="flex items-center gap-x-4">
          <figcaption>
            <h2 className="text-2xl font-bold text-black">
              {appointment.clientName}
            </h2>
            <small>{appointment.service}</small>
            <blockquote className="italic">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(appointment.price)}
            </blockquote>
          </figcaption>
        </div>
        <div className="flex items-center gap-x-4">
          <figcaption>
            <h2 className="text-2xl font-bold text-black">
              {new Date(appointment.appointment_date).toLocaleDateString()}
            </h2>
            <small>{appointment.clientPhoneNumber}</small>
            <blockquote className="italic">
              &quot;{appointment.status}&quot;
            </blockquote>
          </figcaption>
        </div>
      </div>

      <footer className="self-center text-xl">
        <Link to={"/" + prevId} className="white mr-4">
          ⬅️ Prev
        </Link>
        <Link to={"/" + nextId} className="white">
          Next ➡️
        </Link>
      </footer>
    </figure>
  );
}
// id,
//       appointment_date,
//       clientName,
//       clientPhoneNumber,
//       deposit,
//       service,
//       price,
//       status,
