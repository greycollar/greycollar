const config = {
  appId: "10b7bc8c-a49c-4002-b0ec-63599e4b5210",
  name: "GreyCollar",
  base: "/dashboard",
  beta: true,
  api: "http://localhost:3000",
  project: {
    github: {
      authUrl: "https://github.com/login/oauth/authorize",
      clientId: "0c2844d3d19dc9293fc5",
      redirectUri: "http://localhost:3000/dashboard/callback",
      userUrl: "https://api.github.com/user",
      scope: "user",
      response_type: "code",
    },
  },
};

export default config;
