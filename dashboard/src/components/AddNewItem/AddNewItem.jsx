import Label from "../../src/components/label";
import React from "react";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";

export default function AddNewItem() {
  return (
    <Stack direction="row" alignItems="center" fullWidth>
      <Label
        fullWidth
        sx={{
          width: "100%",
          height: "3rem",
          px: 0.75,
          fontSize: 18,
          color: "text.secondary",
          "&:hover": {
            borderRadius: 1,
            borderColor: (theme) => theme.palette.primary.main,
            backgroundColor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.hoverOpacity
              ),
          },
        }}
      >
        Add New Item
      </Label>
    </Stack>
  );
}
