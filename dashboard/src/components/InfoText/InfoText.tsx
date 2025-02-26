import React from "react";
import styles from "./styles";

import { Container, Typography } from "@mui/material";

function InfoText({ colleague }) {
  return (
    <Container sx={styles.container}>
      <Typography variant="h6" sx={styles.name}>
        {colleague?.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={styles.mail}>
        {colleague?.email}
      </Typography>
      <Typography variant="body2" color="secondary.main">
        {colleague?.phone}
      </Typography>
    </Container>
  );
}

export default InfoText;
