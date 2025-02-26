import ColleagueAvatar from "../ColleagueAvatar/ColleagueAvatar";
import { React } from "react";

import { AvatarGroup, Typography } from "@mui/material";

function AvatarGroupWithText({ group, handleClickOpen, groupName }) {
  return (
    <>
      <AvatarGroup max={3} onClick={handleClickOpen}>
        {group &&
          group.map((group) => (
            <ColleagueAvatar
              key={group.id}
              colleague={group}
              size={"teamCard"}
            />
          ))}
      </AvatarGroup>
      <Typography variant="body1" color="text.secondary">
        {group ? group.length : 0} {groupName}
      </Typography>
    </>
  );
}

export default AvatarGroupWithText;
