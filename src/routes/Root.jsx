import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  // useLoaderData() is a hook that returns the data - be sure to DESTRUCTURE it!
  const { AppointmentsData } = useLoaderData();

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

      <main className="text-3ml mx-8 mt-4 mb-8 flex flex-col gap-y-4 text-center font-bold">
        {/* TODO: Is 'data' actually used or do we just need tableDAta? */}
        {useNavigation.state === "loading" ? (
          <div>Loading...</div>
        ) : (
          <Outlet context={{ data: AppointmentsData, tableData }} />
        )}
      </main>
    </>
  );
}
