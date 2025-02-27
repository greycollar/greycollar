import { Box } from "@mui/material";
import React from "react";

import { Skeleton, Stack } from "@mui/material";

const TeamSkeleton = () => {
  return (
    <Stack
      sx={{
        m: 4,
        mt: 0,
        p: 2,
        boxShadow: 3,
        borderColor: "divider",
        borderRadius: "20px",
        height: "25rem",
        display: `flex`,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Skeleton
        animation="wave"
        sx={{
          margin: "5%",
          marginRight: "20%",
          width: "70%",
          height: "7%",
          display: "flex",
        }}
      />
      <Skeleton
        sx={{
          display: "flex",
          height: "45%",
          width: "60%",
          borderRadius: "20px",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Skeleton
          variant="circular"
          sx={{
            display: "flex",
            width: "3rem",
            height: "3rem",
          }}
        />
        <Skeleton
          variant="circular"
          sx={{
            display: "flex",
            width: "3rem",
            height: "3rem",
          }}
        />
        <Skeleton
          variant="circular"
          sx={{
            display: "flex",
            width: "3rem",
            height: "3rem",
          }}
        />
      </Box>
      <Skeleton variant="text" />
    </Stack>
  );
};

export default TeamSkeleton;
