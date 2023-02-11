import { Alert, Snackbar } from "@mui/material";
import propTypes from "prop-types";

export default function Notification({ notify, setNotify }) {
  return (
    <Snackbar
      open={notify?.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={notify?.severity}
        sx={{ width: "100%" }}
        variant="filled"
        elevation={6}
      >
        {notify?.message}
      </Alert>
    </Snackbar>
  );
}

Notification.propTypes = {
  notify: propTypes.object.isRequired,
  setNotify: propTypes.func.isRequired,
};
