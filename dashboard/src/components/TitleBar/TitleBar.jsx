import React from "react";
import styles from "./styles";

import { Box, Typography } from "@mui/material";

function TitleBar({ bgColor, color, title, barHeight }) {
  return (
    <Box
      className="handle"
      sx={{
        ...styles.titleBar,
        display: "flex",
        alignItems: "center",
        bgcolor: bgColor === undefined ? "primary.main" : `${bgColor}`,
        color: color === undefined ? "background.default" : `${color}`,
        height: barHeight === undefined ? "fit-content" : `${barHeight}`,
      }}
    >
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
}

export default TitleBar;
