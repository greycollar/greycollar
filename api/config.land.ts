const config = {
  project: {
    label: "Team",
    oauth: {
      jwt: {
        identifier: "id",
      },
      tokenUrl: "https://github.com/login/oauth/access_token",
      userUrl: "https://api.github.com/user",
      clientId: "Ov23liDUwCkj5NPpApo7",
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
