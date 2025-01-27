import AvatarGroupWithText from "../AvatarGroupWithText/AvatarGroupWithText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./styles";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const TeamCard = ({
  team,
  onTeamClick,
  onColleagueClick,
  onDelete,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ width: 390 }}>
      <Card sx={styles.card}>
        <Box sx={styles.box}>
          <Typography variant="h5" onClick={onTeamClick} sx={styles.title}>
            {team.name}
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                onEdit();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                onDelete(team.id);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
        <CardContent sx={styles.content}>
          <Box sx={styles.logoBox}>
            <Box
              component="img"
              src={team.src}
              sx={{ height: "120px", marginBottom: "30px" }}
            />
          </Box>
          <AvatarGroupWithText
            group={team.members}
            groupName={"colleagues"}
            handleClickOpen={() => handleClickOpen()}
          />
        </CardContent>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle
            sx={{
              backgroundColor: "primary.main",
              color: "background.default",
            }}
          >
            {team.name}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "background.paper" }}>
            <Box sx={styles.dialogContentBox}>
              {team.members &&
                team.members.map((member) => (
                  <Box
                    key={member.id}
                    component="div"
                    onClick={() => onColleagueClick(member.id)}
                    sx={styles.cardActionBox}
                  >
                    <Avatar sx={{ mr: 1, ...styles.avatar }}>
                      <Typography sx={styles.avatarText}>
                        {member.name ? member.name[0].toUpperCase() : ""}
                      </Typography>
                    </Avatar>
                    <Typography
                      sx={{ color: "text.secondary" }}
                      variant="body1"
                    >
                      {member.name}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </DialogContent>
        </Dialog>
      </Card>
    </Container>
  );
};

export default TeamCard;
