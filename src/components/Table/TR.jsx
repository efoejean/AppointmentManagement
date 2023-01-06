import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function TR({ dataRow, id }) {
  return (
    <tr>
      {Object.values(dataRow).map((item, index) => (
        <td key={index}>
          <Link to={id}>
            {item.length > 20 ? item.slice(0, 20) + "..." : item}
          </Link>
        </td>
      ))}
      <td>Cancel</td>
    </tr>
  );
}

TR.propTypes = {
  dataRow: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
