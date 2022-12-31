/* eslint-disable react/forbid-prop-types */
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";

export default function useTable(newData, headCells) {
  // eslint-disable-next-line react/prop-types
  function TblContainer({ children }) {
    return <Table className="tbody">{children}</Table>;
  }
  function TblHead() {
    return (
      <TableHead className="thead">
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell align="center" key={headCell.id}>
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return {
    TblContainer,
    TblHead,
  };
}

useTable.propTypes = {
  records: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};
