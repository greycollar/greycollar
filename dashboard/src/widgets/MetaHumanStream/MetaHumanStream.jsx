import { Paper } from "@mui/material";
import React from "react";
import styles from "./styles";
import vd from "../../../public/media/metahuman.mp4";
const MetaHumanStream = () => {
  return (
    <Paper elevation={6} sx={styles.metaHumanBox}>
      <video width={"100%"} height={"auto"} src={vd} autoPlay loop muted />
    </Paper>
  );
};

export default MetaHumanStream;
