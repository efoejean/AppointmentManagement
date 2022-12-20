/* eslint-disable react/forbid-prop-types */
import {
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export default function useTable(newData, headCells) {
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => {
    <TablePagination
      component="div"
      page={page}
      count={newData.length}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />;
  };

  const dataAfterPagingAndSorting = () =>
    newData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return {
    TblContainer,
    TblHead,
    TblPagination,
    dataAfterPagingAndSorting,
  };
}

useTable.propTypes = {
  records: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};
