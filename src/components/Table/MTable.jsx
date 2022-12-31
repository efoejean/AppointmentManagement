import { Table as MuiTable } from "@mui/material";
import PropTypes from "prop-types";
import TBody from "./TBody";
import Thead from "./Thead";

export default function MTable({
  data,
  headCells,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  return (
    <MuiTable stickyHeader>
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
MTable.propTypes = {
  data: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  isEdit: PropTypes.string,
  editForm: PropTypes.object,
  handleEditChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
