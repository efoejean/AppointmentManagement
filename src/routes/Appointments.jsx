import { EditOutlined } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Appointments() {
  const { AppointmentsData } = useLoaderData();
  const [filteredData, setFilteredData] = useState(AppointmentsData);

  function showAll() {
    setFilteredData(AppointmentsData);
  }

  function showUpcoming() {
    const today = new Date();
    const filterData = filteredData
      .filter((appointment) => {
        const date = new Date(appointment.appointment_date);
        return date >= today;
      })
      .filter((appointment) => {
        return appointment.status === "Scheduled";
      });
    setFilteredData(filterData);
  }

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    {
      field: "appointment_date",
      type: "date",
      headerName: "Date",
      width: 150,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    { field: "time", headerName: "Time", width: 150 },
    { field: "clientName", headerName: "Name", width: 150 },
    {
      field: "clientPhoneNumber",
      headerName: "Phone Number",
      width: 150,
      valueFormatter: (params) => {
        return params.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      },
    },
    { field: "deposit", headerName: "Deposit", width: 100 },
    { field: "service", headerName: "Service", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      valueFormatter: (params) => {
        return "$" + params.value;
      },
    },
    { field: "status", headerName: "Status", width: 125 },
    {
      field: "actionEdit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        return (
          <Link to={`/appointment/${params.row.id}`}>
            <Button>
              <EditOutlined fontSize="small" />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "actionsCancel",
      headerName: "Cancel",
      width: 80,
      renderCell: (params) => {
        return (
          <Link to={`/cancel/${params.row.id}`}>
            <Button>
              <CloseOutlinedIcon fontSize="small" style={{ color: "red" }} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "actionsComplete",
      headerName: "Complete",
      width: 100,
      renderCell: (params) => {
        return (
          <Link to={`/complete/${params.row.id}`}>
            <Button>
              <CheckIcon fontSize="small" style={{ color: "green" }} />
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <h1>Appointments</h1>
      <div className="container">
        <Button
          variant="contained"
          color="primary"
          onClick={() => showUpcoming()}
        >
          Upcoming Appointments
        </Button>
        <Button variant="contained" color="primary" onClick={() => showAll()}>
          Show All
        </Button>
      </div>
      <Box sx={{ height: 500, width: 1 }}>
        <DataGrid
          rows={filteredData}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </>
  );
}
