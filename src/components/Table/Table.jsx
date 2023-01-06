import { useOutletContext } from "react-router-dom";
import TBody from "./TBody";
import TH from "./TH";

export default function Table() {
  const { tableData } = useOutletContext();
  const headers = Object.keys(tableData[0]);
  return (
    <table className="w-full">
      <TH headers={headers} />
      <TBody data={tableData} />
    </table>
  );
}
