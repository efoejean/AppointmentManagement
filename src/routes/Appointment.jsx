import { Button, Paper, TableContainer, Toolbar } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AppointmentModal from "../components/AppointmentModal";
import SearchBar from "../components/SearchBar";
import MTable from "../components/Table/MTable";
import useAppointments from "../hooks/useAppointments";
import { getAppointments } from "../services/axios";
import { filterAppointments } from "../utils";

export async function loader({ params }) {
  return getAppointments(params.id);
}

// Keep this out of component as it is not a tracked piece of state - no need for any reload/re-rendering
const headCells = [
  { id: "start", label: "Date" },

  { id: "title", label: "Name" },
  { id: "clientPhone", label: "Phone Number" },
  { id: "deposit", label: "Deposit" },
  { id: "service", label: "Service" },
  { id: "price", label: "Price" },
  { id: "status", label: "Status" },
  { id: "actionEdit", label: "Edit" },
  { id: "actionsCancel", label: "Cancel" },
];

export default function Appointment() {
  const { appointmentsData } = useLoaderData();

  const appoint = useLoaderData();
  console.log("appoint", appoint);

  const [appointments, setAppointments] = useAppointments();

  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    setAppointments(filterAppointments(appointments, e.target.value));
  };

  return (
    <div>
      <Toolbar>
        <SearchBar onChange={handleSearch} />{" "}
        <Button
          style={{ marginLeft: "auto" }}
          variant="contained"
          onClick={() => setIsOpen(true)}
        >
          + Add New
        </Button>
        {isOpen && <AppointmentModal setIsOpen={setIsOpen} />}
      </Toolbar>
      <TableContainer component={Paper} sx={{ maxHeight: "" }}>
        <MTable headCells={headCells} data={appointmentsData} />
      </TableContainer>
    </div>
  );
}
