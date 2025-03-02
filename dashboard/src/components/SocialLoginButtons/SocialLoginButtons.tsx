import { Button } from "@mui/material";
import React from "react";
import styles from "../../widgets/LoginForm/LoginFormStyles";
import { GitHub, Google, LinkedIn } from "@mui/icons-material";

const SocialLoginButtons = ({
  googleEnable,
  onGoogle,
  githubEnable,
  onGithub,
  linkedinEnable,
  onLinkedin,
}) => {
  return (
    <>
      {githubEnable && (
        <Button
          startIcon={<GitHub />}
          variant="contained"
          color="primary"
          sx={styles.githubButtonStyle}
          onClick={onGithub}
        >
          Continue with GitHub
        </Button>
      )}

      {googleEnable && (
        <Button
          startIcon={<Google style={{ color: "#DB4437" }} />}
          variant="contained"
          color="primary"
          sx={styles.googleButtonStyle}
          onClick={onGoogle}
        >
          Continue with Google
        </Button>
      )}
      {linkedinEnable && (
        <Button
          startIcon={<LinkedIn />}
          variant="contained"
          sx={styles.linkedinButtonStyle}
          onClick={onLinkedin}
        >
          Continue with LinkedIn
        </Button>
      )}
    </>
  );
};

export default SocialLoginButtons;
