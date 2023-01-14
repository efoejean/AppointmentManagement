import usePagination from "@/hooks/usePagination";
import {
  Table as MuiTable,
  TableCell,
  TableFooter,
  TableRow,
} from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";
import TBody from "./TBody";
import TH from "./TH";
export default function Table() {
  const { tableData } = useOutletContext();
  const { currentData, maxPage, dispatchPagination } = usePagination(tableData);

  const headCells = [
    { id: "id", label: "ID" },
    { id: "start", label: "Date" },

    { id: "title", label: "Name" },
    { id: "clientPhone", label: "Phone Number" },
    { id: "deposit", label: "Deposit" },
    { id: "service", label: "Service" },
    { id: "price", label: "Price" },
    { id: "status", label: "Status" },
    { id: "actionEdit", label: "Edit" },
    { id: "actionsCancel", label: "Cancel" },
  ];
  const headers = Object.keys(tableData[0]);

  return (
    <MuiTable className="TableAppoint">
      <TH headCells={headCells} />
      <TBody data={currentData} />
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={headers.length}
            className="text-center [&>*]:mx-4"
          >
            <label htmlFor="page" className="sr-only">
              Page
            </label>
            <Link to={"/"} className="white mr-4">
              ⬅️ Prev
            </Link>
            <Link to={"/"} className="white">
              Next ➡️
            </Link>
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
