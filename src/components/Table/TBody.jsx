import { TableBody } from "@mui/material";
import PropTypes from "prop-types";
import TR from "./TR";
export default function TBody({ data }) {
  return (
    <TableBody>
      {data.map((dataRow) => (
        <TR key={dataRow.id} dataRow={dataRow} id={dataRow.id} />
      ))}
    </TableBody>
  );
}

TBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
