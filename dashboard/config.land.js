const config = {
  appId: "10b7bc8c-a49c-4002-b0ec-63599e4b5210",
  name: "GreyCollar",
  base: "/greycollar",
  beta: true,
  api: "localhost:3000/api",
  project: {
    github: {
      redirectUri: "https://nuc.land/callback/greycollar",
      authUrl: "https://github.com/login/oauth/authorize",
      userUrl: "https://api.github.com/user",
      clientId: "c391f0f4f1ad600a20ef",
      scope: "user",
      response_type: "code",
    },
  },
};

export default config;
