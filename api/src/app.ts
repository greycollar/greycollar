import * as platform from "@nucleoidai/platform-express";
import colleagues from "./routes/colleagues";
import commands from "./routes/commands";
import engines from "./routes/engines";
import knowledges from "./routes/knowledge";
import messages from "./routes/messages";
import metrics from "./routes/metrics";
import organizations from "./routes/organizations";
import sessions from "./routes/sessions";
import supervisings from "./routes/supervisings";
import tasks from "./routes/tasks";
import teamDetails from "./routes/teamDetails";
import { publish, subscribe } from "./lib/Event";

import "express";
import agent from "./functions/agent";

declare module "express-serve-static-core" {
  interface Request {
    session: {
      organizationId: string;
      projectId: string;
    };
  }
}

const { authorization } = platform;

const app = platform.express();

app.use("/metrics", metrics);

app.use(authorization.verify);
app.use(authorization.authorize("ADMIN"));

app.use("/teams/details", teamDetails);
app.use("/colleagues", colleagues);
app.use("/knowledge", knowledges);
app.use("/messages", messages);
app.use("/sessions", sessions);
app.use("/supervisings", supervisings);
app.use("/commands", commands);
app.use("/tasks", tasks);
app.use("/engines", engines);
app.use("/organizations", organizations);

subscribe(
  "SESSION",
  "USER_MESSAGED",
  ({ colleagueId, sessionId, conversationId, content }) =>
    agent.chat({
      colleagueId,
      sessionId,
      conversationId,
      content,
    })
);

export default app;
