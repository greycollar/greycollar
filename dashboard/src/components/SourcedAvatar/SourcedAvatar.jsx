import { Avatar } from "@mui/material";
import React from "react";

function SourcedAvatar({ name, source, sx, children, avatarUrl }) {
  return (
    <Avatar
      alt={name}
      src={
        source === "MINIMAL"
          ? `https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_${avatarUrl?.replace(
              /:/g,
              ""
            )}.jpg`
          : source
      }
      sx={sx}
    >
      {children}
    </Avatar>
  );
}

export default SourcedAvatar;
