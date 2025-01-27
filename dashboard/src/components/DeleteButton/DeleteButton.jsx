import DeleteIcon from "@mui/icons-material/Delete";
import { Fab } from "@mui/material";
import React from "react";
import styles from "./styles";

function DeleteButton({ onClickFunction }) {
  return (
    <Fab sx={styles.fab} onClick={() => onClickFunction()}>
      <DeleteIcon fontSize="large" />
    </Fab>
  );
}

export default DeleteButton;
