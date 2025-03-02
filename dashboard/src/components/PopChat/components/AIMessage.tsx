import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import React, { memo } from "react";

const AIMessage: React.FC<{
  content: string;
  messageRef?: React.RefObject<HTMLDivElement>;
}> = memo(({ content, messageRef }) => (
  <Stack
    ref={messageRef}
    sx={{
      p: 2,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: (theme) => alpha(theme.palette.primary.dark, 0.5),
      borderRadius: 1,
      height: "auto",
      mt: 1,
    }}
  >
    <Typography variant="body1" textAlign="start">
      {content}
    </Typography>
  </Stack>
));

export { AIMessage };
