const styles = {
  largeButton: {
    height: "100%",
    width: "120%",
    minWidth: "15rem",
    minHeight: "17.7rem",
    borderRadius: "20px",
    marginLeft: "-10%",
  },
  wideButton: {
    width: "100%",
    height: "100%",
    minHeight: "20rem",
    minWidth: 200,
  },
  default: {
    cursor: "pointer",
    boxShadow: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    transition: "none",
    color: "text.secondary",
    ":hover": {
      bgcolor: "text.disabled",
      color: "background.default",
    },
  },
};

export default styles;
