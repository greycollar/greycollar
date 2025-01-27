import React from "react";
import { Skeleton } from "@mui/material";

const CircularSkeleton = () => {
  return (
    <Skeleton
      variant="circular"
      sx={{
        display: "flex",
        height: 56,
        width: 56,
      }}
    />
  );
};

export default CircularSkeleton;
