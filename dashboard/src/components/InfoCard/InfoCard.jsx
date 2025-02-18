import React from "react";

import { Card, FormControl, FormLabel, Typography } from "@mui/material";

export const InfoCard = ({ label, value, sx = {} }) => (
  <Card sx={{ mb: 2, p: 2, ...sx }}>
    <FormControl fullWidth>
      <FormLabel>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>
      </FormLabel>
      {typeof value === "string" ? (
        <Typography variant="body1">{value}</Typography>
      ) : (
        value
      )}
    </FormControl>
  </Card>
);
