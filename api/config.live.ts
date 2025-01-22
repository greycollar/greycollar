const config = {
  project: {
    label: "Team",
    oauth: {
      jwt: {
        identifier: "id",
      },
      tokenUrl: "https://oauth2.googleapis.com/token",
      userUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
      clientId:
        "613607639127-0fig8ok2bbm9mumju29hr534rorl3c2n.apps.googleusercontent.com",
    },
  },
  postgres: {
    debug: true,
    sync: false,
  },
  dynamodb: {
    region: "us-east-1",
  },
};

export default config;
