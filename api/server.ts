import * as platform from "@nucleoidai/platform-express";
import models from "./src/models";
import config from "./config";

platform.init(config).then(() => {
  const app = require("./src/app").default;
  models.init();
  app.listen(process.env.PORT || 3000);
});

