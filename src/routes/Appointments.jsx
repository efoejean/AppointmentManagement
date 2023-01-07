import { Link, Outlet, useLoaderData } from "react-router-dom";
import Table from "../components/Table/Table";
import { getAppointments } from "../services/axios";

export function loaderData() {
  const resultData = getAppointments();
  return { resultData };
}

export default function Appointments() {
  const { uh } = useLoaderData();

  const tableData = uh.map(
    ({ id, title, start, end, client, description, createdAt, updatedAt }) => {
      return {
        id,
        title,
        start,
        end,
        client,
        description,
        createdAt,
        updatedAt,
      };
    }
  );

  return (
    <div>
      <h1>Appointments</h1>
      <Link to="new">New Appointment</Link>
      <Table tableData={tableData} />
      <Outlet context={{ data: uh, tableData }} />
    </div>
  );
}
