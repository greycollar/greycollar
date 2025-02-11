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

const TaskStepDialog = ({ open, setOpen, results }) => {
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
        {`Step details`}
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
              <Typography variant="body1">{results.comment}</Typography>
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
                {results.status === "IN_PROGRESS" ? "In Progress" : "Done"}
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
                {new Date(results.createdAt).toLocaleTimeString()}
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
                {results.result?.replace(/\\n/g, "").replace(/\\/g, "")}
              </Typography>
            </FormControl>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskStepDialog;
