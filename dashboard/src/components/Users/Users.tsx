import React from "react";
import { alpha } from "@mui/material/styles";

import { Avatar, Box, Typography } from "@mui/material";

const User = React.memo(({ name }: { name: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "0.4rem 0.01rem",
      }}
    >
      <Avatar sx={{ width: 31, height: 31, marginRight: "0.6rem" }}></Avatar>
      <Typography>{name}</Typography>
    </Box>
  );
});

const Users = React.memo(
  ({
    users,
  }: {
    users: {
      map: any;
      id: "";
      name: "";
    };
  }) => {
    return (
      <Box
        key={users.id}
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: (theme) => alpha(theme.palette.grey[800], 0.8),
          color: "#ffffff",
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        {users?.map((user) => (
          <User key={user.user_id} {...user} />
        ))}
      </Box>
    );
  }
);

export default Users;
