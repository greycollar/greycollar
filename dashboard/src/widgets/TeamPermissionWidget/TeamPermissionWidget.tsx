import CancelIcon from "@mui/icons-material/Cancel";
import TitleBar from "../../components/TitleBar/TitleBar";
import useSettingsState from "../../hooks/useSettingsState";

import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";

function TeamPermissionWidget({ teamId }) {
  const [activateAddUser, setActivateAddUser] = React.useState();
  const [newUserId, setNewUserId] = React.useState();
  const {
    settingsState,
    fetchPermissionData,
    addPermission,
    removePermission,
  } = useSettingsState();

  const handleUserInputChange = (e) => {
    const user = e.target.value;
    setNewUserId(user);
  };

  const handleUserInputSubmit = (e) => {
    if (e.key === "Enter") {
      addNewUser();
    }
  };

  function deleteUser(permissionId) {
    deletePermission(permissionId);
  }
  const addNewUser = () => {
    addNewPermission(newUserId);
  };

  const deletePermission = useCallback(
    async (permissionId) => {
      await removePermission(permissionId, teamId);
    },
    [removePermission, teamId]
  );

  const addNewPermission = useCallback(
    async (newUserId) => {
      await addPermission(newUserId, teamId);
    },
    [addPermission, teamId]
  );

  const fetchPermissions = useCallback(async () => {
    await fetchPermissionData(teamId);
  }, [fetchPermissionData, teamId]);

  React.useEffect(() => {
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        borderWidth: "0.09rem",
        borderColor: "black",
        borderStyle: " none solid none none",
        height: "100vh",
        backgroundColor: "background.paper",
      }}
    >
      <List>
        <TitleBar barHeight={"4rem"} bgColor={""} title={""} color={""} />
        <ListItem
          sx={{
            display: "flex",
            marginTop: "3.5rem",
            width: "100%",
            justifyContent: "center",
            backgroundColor: "custom.popUpBg",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              fontSize: "1.2rem",
              justifyContent: "center",
            }}
          >
            Users
          </Typography>
        </ListItem>
        {settingsState.permissionData?.map((user, id) => (
          <>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => deleteUser(user.id)}
                  sx={{
                    "&:hover": {
                      border: "white",
                      color: "red",
                    },
                  }}
                >
                  <CancelIcon />
                </IconButton>
              }
            >
              <ListItemText>{user.userId}</ListItemText>
            </ListItem>
          </>
        ))}
        <Divider sx={{ borderBottomWidth: 2 }} />
        <ListItem sx={{ marginTop: "1rem" }}>
          <ListItemButton
            sx={{
              display: activateAddUser ? "none" : "flex",
              height: "3rem",
              alignContent: "center",
              justifyContent: "center",
              borderStyle: "solid",
              borderColor: "green",
              borderWidth: "0.1rem",
              borderRadius: "0.2rem",
              "&:hover": {
                border: "white",
                color: "white",
                backgroundColor: "green",
              },
            }}
            onClick={() => setActivateAddUser((prevstate) => !prevstate)}
          >
            Add New User
          </ListItemButton>
          <TextField
            onChange={(e) => handleUserInputChange(e)}
            onKeyDown={(e) => handleUserInputSubmit(e)}
            label="User"
            sx={{
              display: !activateAddUser ? "none" : "flex",
              width: "90%",
            }}
          />
          <Button
            sx={{
              display: !activateAddUser ? "none" : "flex",
              width: "10%",
              height: "3rem",
              backgroundColor: "green",
              color: "white",
            }}
            onClick={() => addNewUser()}
          >
            Add
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}

export default TeamPermissionWidget;
