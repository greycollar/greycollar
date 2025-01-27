import React from "react";

import { Box, Grid, Typography } from "@mui/material";

function SingleScorllableLayout({ title, children }) {
  return (
    <>
      <Typography sx={{ textAlign: "center", fontSize: "3rem", marginTop: 4 }}>
        {title}
      </Typography>
      <Box sx={{ padding: 10 }}>
        <Grid container spacing={4} sx={{ display: "flex" }}>
          {children}
        </Grid>
      </Box>
    </>
  );
}

export default SingleScorllableLayout;
