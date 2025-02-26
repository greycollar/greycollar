import { Avatar } from "@mui/material";
import React from "react";

function SourcedAvatar({ name, source, sx, children, avatarUrl }) {
  return (
    <Avatar
      alt={name}
      src={
        source === "MINIMAL"
          ? `https://cdn.nucleoid.com/greycollar/avatars/${avatarUrl?.replace(
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
