import { EditOutlined } from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Button,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Thead from "./Thead";

export default function MTable({
  headCells,
  data,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  console.log("Data", data);
  return (
    <MuiTable stickyHeader className="TableAppoint">
      <Thead headCells={headCells} />

      <TableBody>
        {data.map((appointment) => (
          <TableRow
            as={Link}
            to={`/appointments/${appointment.id}`}
            className="truncate px-4 first:text-blue-500"
            key={appointment.id}
          >
            <TableCell>
              {new Date(appointment.appointment_date).toLocaleDateString()}
            </TableCell>
            <TableCell align="center mr-10">{appointment.clientName}</TableCell>
            <TableCell align="center">
              {appointment.clientPhoneNumber}
            </TableCell>
            <TableCell>{appointment.deposit}</TableCell>
            <TableCell align="center">{appointment.service}</TableCell>
            <TableCell align="center">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(appointment.price)}
            </TableCell>
            <TableCell align="center">{appointment.status}</TableCell>

            <TableCell align="center">
              <Button>
                <EditOutlined
                  fontSize="small"
                  onClick={(event) => handleEdit(event, appointment)}
                />
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button>
                <CloseOutlinedIcon fontSize="small" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
}

MTable.defaultProps = {
  isEdit: "",
  editForm: {},
  data: [],
};

MTable.propTypes = {
  data: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  isEdit: PropTypes.string,
  editForm: PropTypes.object,
  handleEditChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
