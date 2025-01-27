import Joi from "joi";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  FormProvider,
  RHFTextField,
} from "@nucleoidai/platform/minimal/components";

function AddTaskDialog({ open, setOpen, createTask, colleagueId }) {
  const initialValues = {
    description: "",
  };

  const validationSchema = Joi.object({
    description: Joi.string().required().min(1).messages({
      "string.empty": "Description cannot be empty",
    }),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: joiResolver(validationSchema),
    mode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await createTask(data.description, colleagueId.colleagueId);
    setOpen(false);
    reset();
  });

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        reset();
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          textAlign: "center",
        }}
      >
        Add New Task
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFTextField
            name="description"
            label="Enter Task"
            multiline
            rows={"10"}
            data-cy="add-task-description"
            sx={{ mt: 1 }}
            autcomplete="off"
          />
          <DialogActions
            sx={{
              justifyContent: "flex-end",
              padding: "1rem",
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!isValid}
              data-cy="finish"
            >
              Create Task
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskDialog;
