import { DialogTitle, Grid, IconButton, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import dialogStyles from "../../styles/dialogStyles";

function ClosableDialogTitle({ handleClose, label, content }:{handleClose: () => void, label?: string, content?: JSX.Element}) {
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
