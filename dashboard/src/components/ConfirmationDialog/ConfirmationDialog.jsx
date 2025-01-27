import React from "react";
import styles from "./styles";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    PaperProps={{ sx: { borderRadius: "10px" } }}
  >
    <DialogTitle id="alert-dialog-title" sx={styles.dialogTitle}>
      {title}
    </DialogTitle>
    <DialogContent sx={{ backgroundColor: "background.paper" }}>
      <DialogContentText
        sx={styles.dialogContentText}
        id="alert-dialog-description"
      >
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={styles.dialogActions}>
      <Button
        data-cy="confirm"
        onClick={onConfirm}
        color={"secondary"}
        variant="contained"
      >
        Confirm
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
