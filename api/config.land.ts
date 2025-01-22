const config = {
  project: {
    label: "Team",
    oauth: {
      jwt: {
        identifier: "id",
      },
      tokenUrl: "https://github.com/login/oauth/access_token",
      userUrl: "https://api.github.com/user",
      clientId: "c391f0f4f1ad600a20ef",
    },
  },
  postgres: {
    debug: true,
    sync: true,
  },
  dynamodb: {
    region: "us-east-1",
  },
};

export default config;
