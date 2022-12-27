/* eslint-disable react/jsx-no-duplicate-props */
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppointmentModal from "./AppointmentModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <BookOnlineIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            component={Link}
            to="/agenda"
          >
            Appointment App
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => setIsOpen(true)}>
              Create
            </Button>
            {isOpen && <AppointmentModal setIsOpen={setIsOpen} />}
            <Button color="inherit" component={Link} to="/appointment">
              Appointments
            </Button>
            <Button color="inherit">Clients</Button>
            <Button color="inherit">Login</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}
