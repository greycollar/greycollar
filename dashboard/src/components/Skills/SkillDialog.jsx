import ClosableDialogTitle from "./ClosableDialogTitle";
import { Icon } from "@iconify/react";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import NumberOne from "/media/number-one.png";
import NumberThree from "/media/number-two.png";
import NumberTwo from "/media/number-three.png";
import SourcedAvatar from "../SourcedAvatar/SourcedAvatar";
// eslint-disable-next-line no-unused-vars
import styless from "../../styles/connectButton.css";

import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const SkillDialog = ({ open, handleClose, skill, team, colleagues }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  useEffect(() => {
    if (skill.acquired) {
      setSelectedOption(team.name);
      setIsSwitchChecked(true);
    }
  }, [skill, team]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsSwitchChecked(event.target.checked);
  };

  if (!skill) return null;

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
          <Icon icon={skill.logo} width="20" height="20" />
          <Typography variant="h4" sx={{ mt: 1 }}>
            {skill.title}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>{skill.description}</Box>
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
              <ListItemText primary="Integrate app with your device" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={NumberTwo}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Make the desired changes" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={NumberThree}></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Use automation with joy" />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ mt: 3 }} />

        <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <FormControl fullWidth sx={{ mr: 2 }}>
            <InputLabel id="select-label">Select Option</InputLabel>
            <Select
              labelId="select-label"
              value={selectedOption}
              onChange={handleChange}
              label="Select Option"
            >
              <MenuItem value={team.name}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Iconify
                    icon={team.icon.replace(/^:|:$/g, "")}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box sx={{ ml: 1 }}>{team.name}</Box>
                </Box>
              </MenuItem>

              {colleagues.map((colleague) => (
                <MenuItem key={colleague.name} value={colleague.name}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SourcedAvatar
                      source={"MINIMAL"}
                      avatarUrl={colleague.avatar}
                    />
                    <Box sx={{ ml: 1 }}>{colleague.name}</Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <label className="switch">
            <input
              type="checkbox"
              checked={isSwitchChecked}
              onChange={handleSwitchChange}
            />
            <span></span>
          </label>
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

export default SkillDialog;
