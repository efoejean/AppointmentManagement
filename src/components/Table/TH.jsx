import { TableCell, TableHead, TableRow } from "@mui/material";
import startCase from "lodash.startcase";
import PropTypes from "prop-types";

export default function TH({ headCells }) {
  return (
    <TableHead className="thead">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell align="center" key={headCell.id}>
            {startCase(headCell.label)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TH.propTypes = {
  headCells: PropTypes.array.isRequired,
};
