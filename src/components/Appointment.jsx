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
          <Link to="/">
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
            <Link to={`/complete/${id}`}>
              <button className="primaryBtn mr-12" type="submit">
                Complete
              </button>
            </Link>
          </div>
        </div>
      </div>

      <figure className="container mx-auto flex flex-row gap-y-4 rounded-md border bg-sky-700 px-8 py-8 text-zinc-50 shadow-xl">
        <div className="flex flex-row justify-center gap-5">
          <div className=" px-8 text-2xl">
            <div className="... mr-10 flex gap-5">
              <h2 className=" ">Client :</h2>
              <p className="font-bold text-black">{appointment.clientName}</p>
            </div>
            <div className="... mr-10 flex justify-center gap-1">
              <h2 className="mr-10"> Service: </h2>
              <p className="font-bold text-black">{appointment.service}</p>
            </div>
            <div className="... mr-10 flex justify-center gap-3">
              <h2 className=" mr-6"> Fees:</h2>
              <p className="font-bold text-black">
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(appointment.price)}
              </p>
            </div>
            <div className="... mr-10 flex  justify-center gap-6">
              <h2 className=" ">Status:</h2>
              <blockquote className=" italic">
                &quot;{appointment.status}&quot;
              </blockquote>
            </div>
          </div>

          <div className=" px-8 text-2xl">
            <div className="... ml-10 flex  justify-center gap-5">
              <h2 className=" mr-10"> Date:</h2>
              <p className="font-bold text-black">
                {new Date(appointment.appointment_date).toLocaleDateString()}
              </p>
            </div>
            <div className="... ml-10 flex  justify-center gap-5">
              <h2>Time:</h2>
              <p className="ml-10 font-bold text-black">
                {new Date(appointment.appointment_date).toLocaleTimeString()}
              </p>
            </div>
            <div className="... ml-10 flex justify-center gap-5">
              <h2>Phone Number:</h2>
              <p className=" ml-10 font-bold text-black">
                {appointment.clientPhoneNumber}
              </p>
            </div>
            <div className="... ml-10 flex justify-center gap-5">
              <h2>Date Created:</h2>
              <p className=" ml-10 font-bold text-black">
                {new Date(appointment.created_at).toLocaleDateString()}
              </p>
            </div>
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
