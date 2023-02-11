import { Alert, Snackbar } from "@mui/material";
import { useValue } from "../hooks/contextProvider";

export default function Notification() {
  const {
    state: { alert },
    dispatch,
  } = useValue();

  // eslint-disable-next-line no-unused-vars
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } else {
      dispatch({ type: "CLOSE_ALERT", payload: { ...alert, open: false } });
    }

    return (
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    );
  };
}
