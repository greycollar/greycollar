import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DeleteConfirmation({
  openDeleteDialog,
  setOpenDeleteDialog,
  selectedItem,
  handleDelete,
}) {
  return (
    <Dialog
      fullWidth
      open={openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
    >
      <DialogTitle
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        {"Confirm Delete"}
      </DialogTitle>
      <DialogContent
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        <DialogContentText>
          {selectedItem
            ? `Are you sure you want to delete ${selectedItem.type}?`
            : "Are you sure you want to delete this item?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleDelete(selectedItem);
            setOpenDeleteDialog(false);
          }}
          autoFocus
          data-cy="confirmation-delete"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmation;
