import { TableBody } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import EditableRow from "../EditableRow";
import ReadOnlyRow from "../ReadOnlyRow";
export default function TBody({
  data,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  return (
    <TableBody>
      {data.map((dataRow) => (
        <Fragment key={dataRow.id}>
          {isEdit === dataRow.id ? (
            <EditableRow
              editForm={editForm}
              handleEditChange={handleEditChange}
            />
          ) : (
            <ReadOnlyRow
              key={dataRow.id}
              appointment={dataRow}
              handleEdit={handleEdit}
            />
          )}
        </Fragment>
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
