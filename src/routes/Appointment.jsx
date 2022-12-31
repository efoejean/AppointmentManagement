import { Button, Paper, TableContainer, Toolbar } from "@mui/material";
import { useState } from "react";
import AppointmentModal from "../components/AppointmentModal";
import SearchBar from "../components/SearchBar";
import MTable from "../components/Table/MTable";
import useAppointments from "../hooks/useAppointments";
import { updateOneAppointment } from "../services/axios";
import { filterAppointments } from "../utils";

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
  const [appointments, setAppointments] = useAppointments();

  const [isOpen, setIsOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(null);

  const [editForm, setEditForm] = useState({
    clientName: "",
    clientPhoneNumber: "",
    deposit: "",
    service: "",
    price: "",
    appointment_date: "",
  });

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((PrevState) => ({
      ...PrevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (event, appointment) => {
    event.preventDefault();
    const formValues = {
      clientName: appointment.title,
      clientPhoneNumber: appointment.clientPhoneNumber,
      deposit: appointment.deposit,
      service: appointment.service,
      price: appointment.price,
      appointment_date: appointment.appointment_date,
    };
    setEditForm(formValues);
    setIsEdit(appointment.id);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    updateOneAppointment(isEdit, editForm).then((data) => {});

    setIsEdit(null);
  };

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
        <form onSubmit={handleEditSubmit}>
          <MTable
            headCells={headCells}
            editForm={editForm}
            isEdit={isEdit}
            handleEditChange={handleEditChange}
            handleEdit={handleEdit}
            data={appointments}
          />
        </form>
      </TableContainer>
    </div>
  );
}

// {/* <Table stickyHeader>
// <TblHead />
// <TableBody className="">
// {/* Take each appointment and create a TableRow */}
//   {appointments.map((appointment) => (
//     <Fragment key={appointment.id}>
//       {isEdit === appointment.id ? (
//         <EditableRow
//           editForm={editForm}
//           handleEditChange={handleEditChange}
//         />
//       ) : (
//         <ReadOnlyRow
//           key={appointment.id}
//           appointment={appointment}
//           handleEdit={handleEdit}
//         />
//       )}
//     </Fragment>
//   ))}
// </TableBody>
// </Table> */}/>
