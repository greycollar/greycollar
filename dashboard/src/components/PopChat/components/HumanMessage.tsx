import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { memo } from "react";

import { Stack, Typography } from "@mui/material";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HumanMessage = memo(
  ({
    message,
    selectedId,
    messageRef,
  }: {
    message: { id: string; content: string };
    selectedId: string;
    messageRef: React.RefObject<HTMLDivElement>;
  }) => (
    <Stack
      ref={messageRef}
      sx={{
        p: 2,
        height: 50,
        m: 1,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: message?.id === selectedId ? 8 : 0,
        borderRadius: "5px 15px 15px 5px",
        borderStyle:
          message?.id === selectedId ? "none solid none none" : "none",
        borderColor: (theme) =>
          message?.id === selectedId
            ? theme.palette.warning.main
            : "transparent",
        backgroundColor: (theme) =>
          message?.id === selectedId
            ? alpha(theme.palette.warning.main, 0.3)
            : 0,
        animation: message?.id === selectedId ? `${pulse} 1.2s` : "none",
      }}
    >
      <Typography variant="body1" textAlign="end">
        {message.content}
      </Typography>
    </Stack>
  )
);

export { HumanMessage };
