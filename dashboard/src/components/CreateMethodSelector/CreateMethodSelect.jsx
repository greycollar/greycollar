import React from "react";

import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";

export default function CreateMethodSelect({
  setDisabledAI,
  disabledAI,
  AICreate,
  setCreateManually,
}) {
  return (
    <>
      <DialogContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          padding: 3,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <DialogTitle>Select Create Method</DialogTitle>
        <Stack sx={{ margin: 2 }} spacing={1}>
          <TextField
            fullWidth
            multiline
            rows={10}
            placeholder="Specify the colleague you have in mind"
            onChange={() => setDisabledAI(false)}
          />
          <Button
            data-cy="method-select-ai-button"
            disabled={disabledAI}
            onClick={AICreate}
            sx={{ border: "solid 0.5px" }}
          >
            Create with AI
          </Button>
        </Stack>
        <Divider>or</Divider>

        <Button
          data-cy="method-select-manual-button"
          onClick={() => setCreateManually(true)}
          sx={{ height: "10%", border: "solid 0.5px", margin: 2 }}
        >
          Create Manually
        </Button>
      </DialogContent>
    </>
  );
}
