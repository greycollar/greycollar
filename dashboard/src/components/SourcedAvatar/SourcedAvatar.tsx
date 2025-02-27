import { Avatar } from "@mui/material";
import React from "react";

function SourcedAvatar({
  name,
  source,
  sx,
  children,
  avatarUrl,
}: {
  name?: string;
  source?: string;
  sx?: any;
  children?: React.ReactNode;
  avatarUrl?: string;
}) {
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
