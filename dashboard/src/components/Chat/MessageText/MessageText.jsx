import CustomAvatar from "../../CustomAvatar/CustomAvatar";
import React from "react";

import { Box, Typography } from "@mui/material";

const MessageText = ({ user, team, message }) => {
  const { name, avatar_url } = user;
  const isUser = message?.user;
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", m: 1, my: 2 }}>
      <CustomAvatar
        source={isUser && avatar_url}
        name={isUser ? name : team?.name}
        sx={{ width: 31, height: 31, marginLeft: -1 }}
      />

      <Box sx={{ ml: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", mr: 1, color: "white" }}
          >
            {message.user === true ? name : team?.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.8rem", color: "#a0a0a0" }}
          >
            {"1.1.1"}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 0.5, color: "white" }}>
          {message.message}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageText;
