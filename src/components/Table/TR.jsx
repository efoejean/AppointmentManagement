import { EditOutlined } from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function TR({ dataRow, id }) {
  return (
    <TableRow>
      {Object.values(dataRow).map((item, index) => (
        <TableCell key={index} className="truncate px-4 first:text-blue-500">
          <Link to={`/appointment/${id}`}>
            {" "}
            {item.length > 24 ? item.substring(0, 24) + "..." : item}
          </Link>
        </TableCell>
      ))}
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

TR.propTypes = {
  dataRow: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
