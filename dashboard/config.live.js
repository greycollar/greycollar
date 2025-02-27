const config = {
  appId: "10b7bc8c-a49c-4002-b0ec-63599e4b5210",
  name: "GreyCollar",
  base: "/dashboard",
  beta: true,
  api: "",
  project: {
    google: {
      authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      clientId:
        "613607639127-0fig8ok2bbm9mumju29hr534rorl3c2n.apps.googleusercontent.com",
      redirectUri: "http://localhost:5173/callback",
      scope: "https://www.googleapis.com/auth/userinfo.profile",
      response_type: "code",
      userUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
    },
  },
};

export default config;
