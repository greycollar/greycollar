import CloseIcon from "@mui/icons-material/Close";
import dialogStyles from "../../styles/dialogStyles";

import { DialogTitle, Grid, IconButton, Typography } from "@mui/material";

function ClosableDialogTitle({ handleClose, label, content }) {
  return (
    <DialogTitle sx={dialogStyles.dialogTitle}>
      <Grid container sx={dialogStyles.content}>
        {label ? <Typography variant="h6">{label}</Typography> : content}
        <IconButton
          onClick={handleClose}
          sx={dialogStyles.iconButton}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </DialogTitle>
  );
}

export default ClosableDialogTitle;
