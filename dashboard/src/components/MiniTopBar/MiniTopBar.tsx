import React from "react";
import config from "../../../config";
import styles from "./styles";

import { AppBar, Box, Slide, Toolbar } from "@mui/material";

function MiniTopBar() {
  return (
    <Slide in={true} direction="right" timeout={500}>
      <AppBar position="absolute" sx={styles.appBar} variant="dense">
        <Toolbar>
          <Box component="img" src={config.login.icon} sx={styles.logo} />
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default MiniTopBar;
