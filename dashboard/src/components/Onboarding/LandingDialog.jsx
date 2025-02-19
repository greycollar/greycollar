import ClosableDialogTitle from "../Skills/ClosableDialogTitle";
import CodeImage from "/media/image.png";
import NumberOne from "/media/number-one.png";
import NumberThree from "/media/number-three.png";
import NumberTwo from "/media/number-two.png";
import { storage } from "@nucleoidjs/webstorage";
import { useState } from "react";

import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const LandingDialog = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    storage.set("landingLevel", 1);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={"sm"}
      onClose={(event) => (event.key === "Escape" ? handleClose() : null)}
    >
      <ClosableDialogTitle grey handleClose={handleClose} />
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ mt: 1 }}>
            Greycollar AI Agent
          </Typography>
          <Box sx={{ mt: 3 }}>
            GreyCollar is a Supervised AI Agent for your organization
          </Box>
        </Box>

        <Divider sx={{ mt: 3 }} />
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <h2>How it works?</h2>
        </Box>
        <Box sx={styles.listRoot}>
          <List sx={styles.list}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={NumberOne}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Write your business logic in TypeScript" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={NumberTwo}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nucleoid renders your codes with AI" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={NumberThree}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Creates APIs with built-in datastore" />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box sx={styles.footer}>
          <img
            src={CodeImage}
            alt={"Code"}
            width={100}
            style={{ marginBottom: "1rem" }}
          />
          <br />
          Happy coding!
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

const styles = {
  dialog: {
    bgcolor: "custom.darkDialogBg",
    zIndex: 2147483647,
  },
  welcome: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    pb: 1,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  howItWorks: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listRoot: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    textAlign: "center",
  },
};

export default LandingDialog;
