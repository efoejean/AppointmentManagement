import PropTypes from "prop-types";
import TBody from "./TBody";
import TH from "./TH";

export default function Table({ data, headers }) {
  return (
    <table className="w-full">
      <TH headers={headers} />
      <TBody data={data} />
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};
