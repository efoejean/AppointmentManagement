import {
  Button,
  Table as MuiTable,
  TableCell,
  TableFooter,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import usePagination from "../../hooks/usePagination";
import TBody from "./TBody";
import Thead from "./Thead";

export default function MTable({
  headCells,
  data,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  const { currentData, currentPage, maxPage, dispatchPagination } =
    usePagination(data);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === maxPage;

  return (
    <MuiTable stickyHeader>
      <Thead headCells={headCells} />
      <TBody
        isEdit={isEdit}
        editForm={editForm}
        handleEditChange={handleEditChange}
        handleEdit={handleEdit}
        data={currentData}
      />
      <TableFooter>
        <TableRow>
          <TableCell colSpan={headCells.length}>
            <Button
              className={isFirstPage ? "text-gray-500" : "text-blue-500"}
              disabled={isFirstPage}
              onClick={() => dispatchPagination({ type: "PREV" })}
            >
              Previous
            </Button>
            <Button
              className={isLastPage ? "text-gray-500" : "text-blue-500"}
              disabled={isLastPage}
              onClick={() => dispatchPagination({ type: "NEXT" })}
            >
              Next
            </Button>
            <span>
              {currentPage} / {maxPage}
            </span>
          </TableCell>
        </TableRow>
      </TableFooter>
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
