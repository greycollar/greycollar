import React from "react";

import {
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";

const TaskResultDialog = ({ open, setOpen, task }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
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
        {`Task details`}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Box>
          <Card sx={{ mb: 2, p: 2 }}>
            <FormControl fullWidth>
              <FormLabel>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Comment
                </Typography>
              </FormLabel>
              <Typography variant="body1">{task.comment}</Typography>
            </FormControl>
          </Card>
          <Card sx={{ mb: 2, p: 2 }}>
            <FormControl fullWidth>
              <FormLabel>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Status
                </Typography>
              </FormLabel>
              <Typography variant="body1">
                {task.status === "IN_PROGRESS" ? "In Progress" : "Done"}
              </Typography>
            </FormControl>
          </Card>

          <Card sx={{ mb: 2, p: 2 }}>
            <FormControl fullWidth>
              <FormLabel>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Created At
                </Typography>
              </FormLabel>
              <Typography variant="body1">
                {new Date(task.createdAt).toLocaleTimeString()}
              </Typography>
            </FormControl>
          </Card>

          <Card sx={{ mb: 2, p: 2 }}>
            <FormControl fullWidth>
              <FormLabel>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Result
                </Typography>
              </FormLabel>
              <Typography variant="body1">
                {task.result?.replace(/\\n/g, "").replace(/\\/g, "")}
              </Typography>
            </FormControl>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskResultDialog;
