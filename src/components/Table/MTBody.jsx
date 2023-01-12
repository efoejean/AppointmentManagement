import { EditOutlined } from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
export default function TBody({
  data,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  return (
    <TableBody>
      {data.map((appointment) => (
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
      ))}
    </TableBody>
  );
}

TBody.propTypes = {
  data: PropTypes.array.isRequired,
  isEdit: PropTypes.string,
  editForm: PropTypes.object,
  handleEditChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
