import { App } from "@slack/bolt";
import { colleagueSelect } from "./actions/colleagueSelect";
import { handleLearnType } from "./actions/handleLearnType";
import { learn } from "./commands/learn";
import { selectLearnType } from "./actions/selectLearnType";
import { submitLearnInfo } from "./actions/submitLearnInfo";
import { teamSelect } from "./actions/teamSelect";

const createApp = () => {
  const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
  });

  app.command("/learn", learn);
  app.action("team_select", teamSelect);
  app.action("colleague_select", colleagueSelect);
  app.action("select_learn_type", selectLearnType);
  app.action(/^learn_type_/, handleLearnType);
  app.action("submit_learn_info", submitLearnInfo);

  return app;
};

export { createApp };