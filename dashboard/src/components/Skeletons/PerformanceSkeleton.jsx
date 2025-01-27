import React from "react";

import { Box, Card, Skeleton } from "@mui/material";

const PerformanceSkeleton = () => {
  return (
    <Card
      elevation={6}
      sx={{ position: "relative", width: "100%", height: "100%" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: "52px", borderRadius: "10px" }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: "48px",
          }}
        >
          <Skeleton variant="text" sx={{ width: "8rem", height: "5rem" }} />
          <Skeleton variant="text" sx={{ width: "8rem", height: "5rem" }} />
        </Box>

        <Box
          sx={{
            p: 3,
            height: "25rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton
            variant="circular"
            sx={{
              display: "flex",
              height: "18rem",
              width: "18rem",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default PerformanceSkeleton;
