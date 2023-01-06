import {
  Table as MuiTable,
  TableCell,
  TableFooter,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import usePagination from "../../hooks/usePagination";
import TBody from "./MTBody";
import Thead from "./Thead";

export default function MTable({
  headCells,
  data,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  const { currentData, maxPage, dispatchPagination } = usePagination(data);

  console.log("Data", data);
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
            <label htmlFor="page" className="sr-only">
              Page
            </label>
            <input
              id="page"
              className="w-24 font-medium text-sky-700"
              type="number"
              placeholder="1"
              onInput={() => {
                const page = Number(event.target.value);
                if (page >= 1 && page <= maxPage) {
                  dispatchPagination({ payload: page });
                }
              }}
            />
            &nbsp;/&nbsp;{maxPage}
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
