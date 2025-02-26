import styles from "./styles";

import { Box, Typography } from "@mui/material";

function TextFieldWithTitle({ textTitle, textField }) {
  return (
    <>
      <Typography sx={styles.textTitle}>{textTitle}</Typography>
      <Box sx={styles.textField}>
        <Typography
          variant="body2"
          sx={{
            color: "text.primary",
          }}
        >
          {textField}
        </Typography>
      </Box>
    </>
  );
}

export default TextFieldWithTitle;
