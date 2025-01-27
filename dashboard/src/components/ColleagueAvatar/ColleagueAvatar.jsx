import CustomAvatar from "../CustomAvatar/CustomAvatar";
import { Typography } from "@mui/material";
import styles from "./styles";

import React, { useEffect, useState } from "react";

function ColleagueAvatar({ colleague, sizeFor }) {
  const [size, setSize] = useState({});

  useEffect(() => {
    switch (sizeFor) {
      case "teamCard":
        setSize(styles.teamCard);
        break;
      case "colleagueCard":
        setSize(styles.colleagueCard);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomAvatar
      name={colleague.name}
      sx={{
        ...styles.avatar,
        width: size.width,
        height: size.height,
      }}
    >
      <Typography sx={{ fontSize: size.fontSize }}>
        {colleague.name ? colleague.name[0].toUpperCase() : ""}
      </Typography>
    </CustomAvatar>
  );
}

export default ColleagueAvatar;
