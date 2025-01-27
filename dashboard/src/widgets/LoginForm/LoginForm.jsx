import NucleoidLoginForm from "../../components/NucleoidLoginForm";
import SocialLoginButtons from "../../components/SocialLoginButtons";
import config from "../../../config";
import styles from "./LoginFormStyles";

import { Box, Divider, Link as MuiLink, Typography } from "@mui/material";
import React, { useState } from "react";

const handleOAuthLogin = ({ authUrl, clientId, redirectUri, scope }) => {
  window.location.href = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
};

function LoginForm({ icon, name }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      sx={{
        ...styles.mainBoxStyle,
        backgroundColor: "#141616",
      }}
    >
      <Box component="img" src={icon} alt={name} sx={styles.iconBoxStyle} />

      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          width: "100%",
          color: "primary.contrastText",
        }}
      >
        Sign in to your account
      </Typography>
      {!!config.login.nucleoid && (
        <>
          <NucleoidLoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            // TODO: Add function for login without Oauth 2.0
            onSubmit={() => handleOAuthLogin(config.login.nucleoid)}
          />
          <Typography
            variant="body2"
            sx={{ width: "100%", textAlign: "center" }}
          >
            Don&apos;t have an account?
            <MuiLink href="/console/login2" variant="body2">
              Sign Up Now
            </MuiLink>
          </Typography>

          <Divider sx={{ width: "100%", margin: "1rem 0" }}>
            <Box sx={{ px: 2 }}>or</Box>
          </Divider>
        </>
      )}

      <SocialLoginButtons
        googleEnable={!!config.login.google}
        onGoogle={() => handleOAuthLogin({ ...config.login.google })}
        githubEnable={!!config.login.github}
        onGithub={() => handleOAuthLogin({ ...config.login.github })}
        linkedinEnable={!!config.login.linkedin}
        onLinkedin={() => handleOAuthLogin({ ...config.login.linkedin })}
      />
    </Box>
  );
}
export default LoginForm;
