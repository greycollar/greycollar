import React from "react";
import { Skeleton } from "@mui/material";

import { Box, Card, Divider, Stack } from "@mui/material";

const ColleagueSkeleton = () => {
  return (
    <Card sx={{ textAlign: "center", width: "300px", height: "550px" }}>
      <Box sx={{ position: "relative" }}>
        <Skeleton variant="rectangular" sx={{ height: "12rem" }} />
        <Skeleton
          variant="circular"
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -25,
          }}
        />
      </Box>
      <Stack sx={{ mt: 5, mb: 2, alignItems: "center" }}>
        <Skeleton
          variant="text"
          sx={{
            width: "50%",
          }}
        />
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack
        direction={"column"}
        sx={{ margin: 5, gap: 2, alignItems: "center" }}
      >
        <Stack
          direction="column"
          sx={{
            typography: "body2",
            padding: 1,
            borderRadius: 1,
            border: "dotted 1px gray",
            width: "200px",
            height: "100px",
            gap: 1,
          }}
        >
          <Stack direction="row" sx={{ gap: 1 }}>
            <Skeleton variant="text" sx={{ width: "10%", height: "110%" }} />
            <Skeleton variant="text" sx={{ width: "20%", height: "110%" }} />
          </Stack>
          <Skeleton variant="text" sx={{ width: "100%", height: "30%" }} />
        </Stack>
        <Stack
          direction="column"
          sx={{
            typography: "body2",
            padding: 1,
            borderRadius: 1,
            border: "dotted 1px gray",
            width: "200px",
            height: "100px",
            gap: 1,
          }}
        >
          <Stack direction="row" sx={{ gap: 1 }}>
            <Skeleton variant="text" sx={{ width: "10%", height: "110%" }} />
            <Skeleton variant="text" sx={{ width: "30%", height: "110%" }} />
          </Stack>
          <Skeleton variant="text" sx={{ width: "100%", height: "30%" }} />
        </Stack>
      </Stack>
      <Skeleton
        variant="circular"
        sx={{ width: 40, height: 40, position: "absolute", top: 8, right: 8 }}
      />
    </Card>
  );
};

export default ColleagueSkeleton;
