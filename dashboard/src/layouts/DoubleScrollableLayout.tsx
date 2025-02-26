import React from "react";

import { Box, Grid } from "@mui/material";

function SingleScorllableLayout({ leftPanel, rightPanel }) {
  return (
    <Box>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "10px",
          justifyContent: "center",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        <Grid item xs={12} md={8}>
          {leftPanel}
        </Grid>
        <Grid item xs={12} md={4}>
          {rightPanel}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SingleScorllableLayout;
