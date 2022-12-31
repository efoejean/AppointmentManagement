import { Table as MuiTable } from "@mui/material";
import PropTypes from "prop-types";
import TBody from "./TBody";
import Thead from "./Thead";
import usePagination from "../../hooks/usePagination";

export default function Table({
  data,
  headCells,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  return (
    <MuiTable className="tbody">
      <Thead headCells={headCells} />
      <TBody
        isEdit={isEdit}
        editForm={editForm}
        handleEditChange={handleEditChange}
        handleEdit={handleEdit}
        data={data}
      />
    </MuiTable>
  );
}
Table.propTypes = {
  data: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  isEdit: PropTypes.number.isRequired,
  editForm: PropTypes.object.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
