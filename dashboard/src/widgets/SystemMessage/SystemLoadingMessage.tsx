import { CircularProgress, Stack, Typography } from "@mui/material";

function SystemLoadingMessage({ message }) {
  return (
    <Stack>
      <Stack
        sx={{
          p: 1.5,
          minWidth: 48,
          maxWidth: 450,
          minHeight: 48,
          borderRadius: 1,
          typography: "body2",
          color: "grey.800",
          background: (theme) => theme.palette.background.default,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          my: 2,
        }}
      >
        <Typography variant="body2" color="grey.500">
          Learning {message?.command}...
        </Typography>
        <CircularProgress
          size={24}
          thickness={4}
          color="success"
          sx={{ ml: 2, display: "flex", justifySelf: "end" }}
        />
      </Stack>
    </Stack>
  );
}

export default SystemLoadingMessage;
