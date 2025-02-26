const styles = {
  paper: {
    top: "4rem",
    backgroundColor: "custom.sidebarBG",
    height: `calc(100% - 4rem)`,
    zIndex: 1,
    padding: "0 15px",

    color: "text.secondary",
  },
  list: { padding: "15px 0" },
  listItemButton: {
    color: "primary.contrastText",
    "&:hover": {
      bgcolor: "text.secondary",
      color: "primary.contrastText",
    },
  },
  box: {
    display: "flex",
    width: "100%",
  },
};

export default styles;
