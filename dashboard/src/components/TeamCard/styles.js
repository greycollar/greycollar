const styles = {
  card: {
    p: 2,
    boxShadow: 3,
    flexDirection: "column",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "20px",
    transition: "0.3s",
    height: "25rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    px: 2,
    py: 3,
  },
  title: {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.6rem",
    textAlign: "left",
    flexGrow: 1,
    color: "primary.main",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    px: 2,
    py: 1,
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardActionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    my: 1,
    color: "secondary.main",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: "1rem",
    bgcolor: "primary.main",
  },

  avatarText: {
    color: "text.secondary",
  },

  dialogContentBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 2,
  },

  moreVertIcon: {
    color: "primary.main",
  },

  dialogTitle: {
    color: "primary.main",
  },
};

export default styles;
