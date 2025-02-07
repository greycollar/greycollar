import { alpha } from "@mui/material/styles";

const styles = {
  defaultColors: {
    bar: "#323a40",
    title: "#e0e0e0",
    chatBubble: "#",
    background: "#e0e0e0",
    reciverColor: "#0f9d47",
    sourceColor: "#949494",
    buttonColor: "#e0e0e0",
  },
  readOnlyBoxHeader: {
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    alignItems: "center",
    height: "600px",
    width: "450px",
    right: "15px",
    bottom: "10px",
  },
  boxHeader: {
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 99999,
    right: "75px",
    bottom: "10px",
    height: "650px",
    width: "500px",
  },
  header: {
    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    p: 1,
    width: "100%",
    height: "40px",
    cursor: "move",
    boxShadow: 20,
  },
};

export default styles;
