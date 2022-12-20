import {
  Paper,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import useTable from "../hooks/useTable";

import { getAppointments } from "../services/axios";
import { organizeAppointments } from "../utils";

// Keep this out of component as it is not a tracked piece of state - no need for any reload/re-rendering
const headCells = [
  { id: "title", label: "Name" },
  { id: "clientPhone", label: "Phone Number" },
  { id: "deposit", label: "Deposit" },
  { id: "service", label: "Service" },
  { id: "price", label: "Price" },
  { id: "start", label: "Date" },
  { id: "status", label: "Status" },
];

const pages = [25];

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const { TblContainer, TblHead } = useTable(appointments, headCells);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  useEffect(
    () => {
      getAppointments().then((data) => {
        setAppointments(organizeAppointments(data));
      });
    },

    // Dep Array - leave empty to this only runs on the first side effect (browser render)
    []
  );

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Paper>
        <TblContainer>
          <TblHead />
          <TableBody className="">
            {/* Take each appointment and create a TableRow */}
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell align="center">{appointment.title}</TableCell>
                <TableCell align="center">
                  {appointment.clientPhoneNumber}
                </TableCell>
                <TableCell align="center">{appointment.deposit}</TableCell>
                <TableCell align="center">{appointment.service}</TableCell>
                <TableCell align="center">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(appointment.price)}
                </TableCell>
                <TableCell align="center">
                  {new Date(appointment.start).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{appointment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TablePagination
          component="div"
          page={page}
          // Total count of number of points
          count={appointments.length}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
        />
      </Paper>
    </div>
  );
}
