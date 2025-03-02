const styles = {
  dialogTitle: {
    bgcolor: (theme) => theme.palette.background.paper,
    py: "1rem",
    px: "2rem",
    textTransform: "capitalize",
  },
  dialogContent: {
    bgcolor: (theme) => theme.palette.background.paper,
    px: "2rem",
    py: "1rem",
  },
  textField: {
    mt: "1rem",
  },
  dialogActions: {
    bgcolor: (theme) => theme.palette.background.paper,

    pr: "2rem",
    pb: "1rem",
  },
  cancelButton: {
    textTransform: "capitalize",
  },
  saveButton: {
    bgcolor: (theme) => theme.palette.primary.dark,
    textTransform: "capitalize",
    ml: "1rem",
    "&:hover": {
      bgcolor: (theme) => theme.palette.primary.light,
    },
  },
  iconTitle: { marginTop: "20px", textTransform: "capitalize" },
  iconDivider: {
    height: "0.4px",
  },
  iconBox: {
    flexDirection: "row",
    display: "flex",
    marginTop: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  iconPreview: {
    display: "flex",
    justifyContent: "center",
    height: "170px",
    width: "170px",
    marginRight: "30px",
    flexDirection: "column",
    alignItems: "center",
  },
  iconName: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "20px",
    textTransform: "capitalize",
  },
  iconButton: {
    flexDirection: "column",
    width: "30%",
    height: "100%",
    fontSize: "12px",
    bgcolor: (theme) => theme.palette.primary.dark,
    "&:hover": {
      bgcolor: (theme) => theme.palette.primary.light,
    },
  },
};

export default styles;
