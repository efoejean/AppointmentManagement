import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAppointment from "../hooks/useAppointment";
import { getNavIds } from "../utils/pagination";
import AppointmentModal from "./AppointmentModal";

export default function Appoint() {
  const [isOpen, setIsOpen] = useState(false);
  const { appointment, ids } = useAppointment();
  const { prevId, nextId } = getNavIds(ids, appointment.id);

  const { id } = useParams();

  return (
    <>
      <div>
        <div className="mb-10 flex justify-center">
          <Link to="/appointments">
            <button color="blue">Back to Appointments</button>
          </Link>
        </div>
        <div className="... flex flex-row justify-center gap-10">
          <div className="">
            <button
              className="editBtn mr-12"
              type="submit"
              onClick={() => setIsOpen(true)}
            >
              Edit
            </button>
            {isOpen && <AppointmentModal setIsOpen={setIsOpen} />}
          </div>
          <div className="">
            <Link to={`/cancel/${id}`}>
              <button className="cancelBtn mr-12" type="submit">
                Cancel
              </button>
            </Link>
          </div>
          <div className="">
            <button className="primaryBtn mr-12" type="submit">
              Complete
            </button>
          </div>
        </div>
      </div>

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
          <Link to={`/appointment/${prevId}`} className="white mr-4">
            ⬅️ Prev
          </Link>
          <Link to={`/appointment/${nextId}`} className="white">
            Next ➡️
          </Link>
        </footer>
      </figure>
    </>
  );
}
