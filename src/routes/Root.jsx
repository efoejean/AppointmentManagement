import { Outlet, useLoaderData, useParams, useSubmit } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  // useLoaderData() is a hook that returns the data - be sure to DESTRUCTURE it!
  const { AppointmentsData } = useLoaderData();

  // If we have this, we will populate the form with the data of the current user
  const { id } = useParams();

  const currentAppointment = AppointmentsData.find(
    (appointment) => appointment.id === id
  );

  const submit = useSubmit();

  // TODO: Refactor this to avoid as much clutter. Consider spread operator.
  const tableData = AppointmentsData.map(
    ({
      id,
      appointment_date,
      clientName,
      clientPhoneNumber,
      deposit,
      service,
      price,
      status,
    }) => ({
      id,
      appointment_date: new Date(appointment_date).toLocaleDateString(),
      clientName,
      clientPhoneNumber,
      deposit,
      service,
      price: `$${price}`,
      status,
    })
  );

  return (
    <>
      <Navbar />
      <main className="mx-8 mt-4 mb-8 flex flex-col gap-y-4 text-center text-3xl font-bold underline">
        {/* TODO: Is 'data' actually used or do we just need tableDAta? */}
        <Outlet context={{ data: AppointmentsData, tableData }} />
      </main>
    </>
  );
}
