import React from "react";

import { Card, FormControl, FormLabel, Typography } from "@mui/material";

const InfoCard = ({
  label,
  value,
  sx,
}: {
  label: string;
  value: string | React.ReactNode;
  sx?: any;
}) => (
  <Card sx={{ mb: 2, p: 2, ...sx }}>
    <FormControl fullWidth>
      <FormLabel sx={{ color: "#637381!important" }}>
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

export default InfoCard;
