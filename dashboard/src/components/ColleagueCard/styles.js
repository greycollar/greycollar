const styles = {
  card: {
    position: "relative",
    minWidth: 290,
    padding: "0px",
    cursor: "pointer",
    boxShadow: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  },
  menuButton: {
    position: "absolute",
    top: 5,
    right: 5,
    color: "primary.contrastText",
  },
  avatar: {
    width: 60,
    height: 60,
    bgcolor: "primary.main",
    color: "text.secondary",
  },

  deleteButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    "&:hover": { backgroundColor: "error.light" },
  },
  editButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  name: {
    color: "primary.main",
    fontWeight: "bold",
  },
};

export default styles;
