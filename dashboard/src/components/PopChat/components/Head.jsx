import { Iconify } from "@nucleoidai/platform/minimal/components";
import styles from "../styles";

import { Box, IconButton } from "@mui/material";
import React, { memo } from "react";

const Head = memo(({ title, mute, changeMute, handleClose, readOnly }) => (
  <Box sx={styles.header}>
    <Box sx={{ marginRight: "auto", color: "white" }}>{title}</Box>
    {!readOnly && (
      <IconButton onClick={changeMute}>
        <Iconify
          icon={
            mute
              ? "solar:volume-cross-bold-duotone"
              : "solar:volume-loud-bold-duotone"
          }
          sx={{ width: 22, height: 22 }}
        />
      </IconButton>
    )}
    <IconButton onClick={handleClose}>
      <Iconify
        icon="solar:close-circle-line-duotone"
        sx={{ width: 26, height: 26 }}
      />
    </IconButton>
  </Box>
));

export { Head };
