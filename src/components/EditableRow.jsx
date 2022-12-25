import { TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";

export default function EditableRow({ handleEditChange, editForm }) {
  return (
    <TableRow>
      <TableCell align="center">
        <input
          type="text"
          name="clientName"
          placeholder="Name"
          className="form--input"
          value={editForm.clientName}
          onChange={handleEditChange}
        />
      </TableCell>
      <TableCell align="center">
        <input
          type="text"
          name="clientPhoneNumber"
          placeholder="Phone Number"
          className="form--input "
          value={editForm.clientPhoneNumber}
          onChange={handleEditChange}
        />
      </TableCell>
      <TableCell align="center">
        <select
          type="text"
          name="deposit"
          placeholder="Deposit"
          className="form--input "
          value={editForm.deposit}
          onChange={handleEditChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </TableCell>
      <TableCell align="center">
        <select
          id="service"
          name="service"
          className="form--input"
          value={editForm.service}
          onChange={handleEditChange}
        >
          <option value="">Select a Service</option>
          <option value="twist">Twist</option>
          <option value="braid">Braid</option>
          <option value="weave">Weave</option>
          <option value="Senegalese">Senegalese</option>
          <option value="cut">Cut</option>
        </select>
      </TableCell>
      <TableCell align="center">
        <input
          type="text"
          name="price"
          placeholder="Service Fee"
          className="form--input "
          value={editForm.price}
          onChange={handleEditChange}
        />
      </TableCell>
      <TableCell align="center">
        <input
          type="datetime-local"
          name="appointment_date"
          className="form--input"
          placeholder="Date"
          value={editForm.appointment_date}
          onChange={handleEditChange}
        />
      </TableCell>
      <TableCell align="center">
        <button type="submit" className="btn btn--primary">
          Cancel
        </button>
      </TableCell>
      <TableCell>
        <button type="submit" className="btn btn--primary">
          Save
        </button>
      </TableCell>
    </TableRow>
  );
}

EditableRow.propTypes = {
  handleEditChange: PropTypes.func.isRequired,
  editForm: PropTypes.shape({
    clientName: PropTypes.string.isRequired,
    clientPhoneNumber: PropTypes.string.isRequired,
    deposit: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    appointment_date: PropTypes.string.isRequired,
  }).isRequired,
};
