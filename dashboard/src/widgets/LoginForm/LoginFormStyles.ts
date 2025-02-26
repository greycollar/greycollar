const LoginFormStyles = {
  mainBoxStyle: {
    width: { xs: "90%", sm: "50%", md: "33%" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "1px 1px 10px rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  iconBoxStyle: {
    width: { xs: "25%", sm: "25%", md: "20%" },
    borderRadius: "10px",
    margin: "1rem 0",
  },
  formBoxStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  signInButtonStyle: {
    margin: "1rem 0 2rem",
    width: "100%",
    color: "#f4f4f4",
  },
  githubButtonStyle: {
    margin: "0.5rem 0 ",
    width: "100%",
    color: "#f4f4f4",
    backgroundColor: "#333",
  },
  googleButtonStyle: {
    margin: "0.5rem 0",
    width: "100%",
    backgroundColor: "#fff",
    color: "#3C3C3C",
    borderColor: "#DB4437",
  },
  linkedinButtonStyle: {
    margin: "0.5rem 0 1rem",
    width: "100%",
    backgroundColor: "#0077b5",
    color: "#f4f4f4",
  },
};
export default LoginFormStyles;
