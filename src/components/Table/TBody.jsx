import { Fragment } from "react";
import PropTypes from "prop-types";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

export default function TBody({
  data,
  isEdit,
  editForm,
  handleEditChange,
  handleEdit,
}) {
  return (
    <tableBody>
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
    </tableBody>
  );
}

TBody.propTypes = {
  data: PropTypes.array.isRequired,
  isEdit: PropTypes.number.isRequired,
  editForm: PropTypes.object.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
