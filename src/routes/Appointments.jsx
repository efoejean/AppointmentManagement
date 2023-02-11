import usePagination from "@/hooks/usePagination";
import {
  Table as MuiTable,
  TableCell as TCell,
  TableFooter as TFooter,
  TableRow as TRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link, useLoaderData } from "react-router-dom";
import Notification from "../components/Notification";
import TBody from "../components/Table/TBody";
import TH from "../components/Table/TH";
export default function Appointments({ notify, setNotify }) {
  const { AppointmentsData } = useLoaderData();

  const tableData = AppointmentsData.map(
    ({
      id,
      appointment_date,
      clientName,
      clientPhoneNumber,
      deposit,
      service,
      price,
      status,
    }) => ({
      id,
      appointment_date: new Date(appointment_date).toLocaleDateString(),
      clientName,
      clientPhoneNumber,
      deposit,
      service,
      price: `$${price}`,
      status,
    })
  );
  const { currentData, maxPage, dispatchPagination } = usePagination(tableData);

  const headCells = [
    // TODO: 'id' header has been resolved. Need to reconcile the data to not show the 'id' data.
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

  return (
    <>
      <MuiTable className="TableAppoint">
        <TH headCells={headCells} />

        <TBody data={currentData} />

        <TFooter>
          <TRow>
            <TCell
              colSpan={headCells.length}
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
            </TCell>
          </TRow>
        </TFooter>
      </MuiTable>
      <div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
}

Appointments.propTypes = {
  notify: PropTypes.bool.isRequired,
  setNotify: PropTypes.func.isRequired,
};
