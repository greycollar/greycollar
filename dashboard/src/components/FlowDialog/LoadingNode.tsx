import AnimatedNode from "./AnimatedNode";

import { Card, CircularProgress, Typography } from "@mui/material";

const LoadingNode = ({ visible, delay }) => (
  <AnimatedNode visible={visible} delay={delay}>
    <Card
      sx={{
        p: 2,
        width: "180px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <CircularProgress size={24} />
      <Typography
        variant="caption"
        sx={{
          textAlign: "center",
          fontSize: "0.5rem",
          color: "text.secondary",
        }}
      >
        Loading...
      </Typography>
    </Card>
  </AnimatedNode>
);

export default LoadingNode;
