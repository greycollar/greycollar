import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import Stack from "@mui/material/Stack";
import styles from "./styles";
import { useEvent } from "@nucleoidai/react-event";

function Loading() {
  const [linearProgress] = useEvent("LOADED", {
    loading: false,
    progress: 0,
  });
  if (linearProgress.loading) {
    return (
      <Stack sx={styles.stack} spacing={2}>
        <LinearProgress color="inherit" sx={styles.loading} />
      </Stack>
    );
  } else {
    return null;
  }
}

export default Loading;
