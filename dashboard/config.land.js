const config = {
  appId: "10b7bc8c-a49c-4002-b0ec-63599e4b5210",
  name: "GreyCollar",
  base: "/greycollar",
  beta: true,
  api: "https://api-greycollar-ai-land.gentleflower-99ef02e0.eastus.azurecontainerapps.io",
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
