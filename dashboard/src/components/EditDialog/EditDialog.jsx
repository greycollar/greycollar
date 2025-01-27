import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function EditDialog({
  openEdit,
  setOpenEdit,
  selectedItem,
  selectedType,
  setSelectedItem,
  handleSave,
}) {
  const [formValues, setFormValues] = useState(selectedItem || {});

  useEffect(() => {
    setFormValues(selectedItem || {});
  }, [selectedItem]);

  const handleLocalInputChange = (prop, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [prop]: value }));
  };

  const handleLocalSave = () => {
    handleSave(formValues);
    setOpenEdit(false);
  };

  return (
    <Dialog fullWidth open={openEdit} onClose={() => setSelectedItem(null)}>
      <DialogTitle
        sx={{
          textAlign: "center",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {`Edit ${selectedType}`}
      </DialogTitle>
      <DialogContent
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        {selectedType === "TEXT" && (
          <>
            <TextField
              fullWidth
              label="Text"
              value={formValues.text}
              onChange={(e) => handleLocalInputChange("text", e.target.value)}
              sx={{ marginTop: 2 }}
              data-cy="edit-text"
            />
            <TextField
              fullWidth
              label="Status"
              value={formValues.status}
              disabled
              sx={{ marginTop: 2 }}
            />
            <TextField
              fullWidth
              label="Date"
              value={new Date(formValues.createdAt).toLocaleDateString()}
              disabled
              sx={{ marginTop: 2 }}
            />
          </>
        )}
        {selectedType === "QA" && (
          <>
            <TextField
              fullWidth
              label="Question"
              value={formValues.question}
              onChange={(e) =>
                handleLocalInputChange("question", e.target.value)
              }
              sx={{ marginTop: 2 }}
              data-cy="edit-question"
            />
            <TextField
              fullWidth
              label="Answer"
              value={formValues.answer}
              onChange={(e) => handleLocalInputChange("answer", e.target.value)}
              sx={{ marginTop: 2 }}
              data-cy="edit-answer"
            />
            <TextField
              fullWidth
              label="Status"
              value={formValues.status}
              disabled
              sx={{ marginTop: 2 }}
            />
            <TextField
              fullWidth
              label="Date"
              value={new Date(formValues.createdAt).toLocaleDateString()}
              disabled
              sx={{ marginTop: 2 }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedItem(null);
            setOpenEdit(false);
          }}
        >
          Cancel
        </Button>
        <Button
          data-cy="edit-save"
          variant="contained"
          onClick={handleLocalSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
