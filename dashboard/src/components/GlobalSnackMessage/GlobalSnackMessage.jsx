import MuiAlert from "@mui/material/Alert";
import React from "react";
import Snackbar from "@mui/material/Snackbar";

import { publish, useEvent } from "@nucleoidjs/synapses";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function GlobalSnackMessage() {
  const [globalMessage] = useEvent("GLOBAL_MESSAGE_POSTED", {
    status: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    publish("GLOBAL_MESSAGE_POSTED", {
      status: false,
    });
  };

  if (globalMessage.status) {
    return (
      <Snackbar
        sx={{ zIndex: 999999999 }}
        open={true}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={globalMessage.severity}
          sx={{ width: "100%" }}
        >
          {globalMessage.message}
        </Alert>
      </Snackbar>
    );
  } else {
    return null;
  }
}
