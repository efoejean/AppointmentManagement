import { EditOutlined } from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";

export default function ReadOnlyRow({ appointment, handleEdit }) {
  return (
    <TableRow key={appointment.id}>
      <TableCell align="center">
        {new Date(appointment.appointment_date).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">{appointment.clientName}</TableCell>
      <TableCell align="center">{appointment.clientPhoneNumber}</TableCell>
      <TableCell align="center">{appointment.deposit}</TableCell>
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
  );
}

ReadOnlyRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  appointment: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
