async function init() {
  const { Project } = require("@nucleoidai/platform-express/models");

  const Task = require("./Task");
  const Command = require("./Command");
  const Colleague = require("./Colleague");
  const ColleagueKnowledge = require("./ColleagueKnowledge");
  const TeamDetails = require("./TeamDetails");
  const Message = require("./Message");
  const Session = require("./Session");
  const Conversation = require("./Conversation");
  const Supervising = require("./Supervising");
  const Knowledge = require("./Knowledge");
  const AIEngine = require("./AIEngine");
  const Step = require("./Step");

  Project.hasMany(Colleague, {
    foreignKey: "teamId",
  });

  Colleague.belongsTo(Project, {
    foreignKey: "teamId",
  });

  Project.hasMany(Colleague, { foreignKey: "teamId", as: "colleagues" });
  Colleague.belongsTo(Project, { foreignKey: "teamId", as: "colleagues" });

  Project.hasMany(Command, { foreignKey: "teamId" });
  Command.belongsTo(Project, { foreignKey: "teamId" });

  Project.belongsToMany(ColleagueKnowledge, { through: "ColleagueKnowledge" });
  ColleagueKnowledge.belongsToMany(Project, { through: "ColleagueKnowledge" });

  Session.hasMany(Conversation, { foreignKey: "sessionId" });
  Conversation.belongsTo(Session, { foreignKey: "sessionId" });

  Session.belongsToMany(Supervising, {
    through: "SessionSupervising",
    foreignKey: "sessionId",
  });

  Supervising.belongsTo(Conversation, { foreignKey: "conversationId" });

  Supervising.belongsTo(Colleague, { foreignKey: "colleagueId" });

  Colleague.hasMany(Supervising, { foreignKey: "colleagueId" });

  Task.belongsTo(Colleague, { foreignKey: "colleagueId", onDelete: "CASCADE" });

  Colleague.hasMany(Task, { foreignKey: "colleagueId", onDelete: "CASCADE" });

  Project.hasMany(Colleague, { foreignKey: "teamId" });
  Colleague.belongsTo(Project, { foreignKey: "teamId" });

  Colleague.belongsToMany(ColleagueKnowledge, {
    through: "ColleagueKnowledge",
  });

  ColleagueKnowledge.belongsTo(Colleague, { foreignKey: "colleagueId" });
  Colleague.hasMany(ColleagueKnowledge, { foreignKey: "colleagueId" });
  Knowledge.hasMany(ColleagueKnowledge, { foreignKey: "knowledgeId" });
  ColleagueKnowledge.belongsTo(Knowledge, { foreignKey: "knowledgeId" });

  AIEngine.hasMany(Colleague, { foreignKey: "aiEngineId" });
  Colleague.belongsTo(AIEngine, { foreignKey: "aiEngineId" });

  Task.hasMany(Step, { foreignKey: "taskId", as: "steps" });
  Step.belongsTo(Task, { foreignKey: "taskId", as: "task" });

  Project.addHook("beforeDestroy", async (project) => {
    await Colleague.destroy({
      where: {
        teamId: project.id,
      },
    });
    await ColleagueKnowledge.destroy({
      where: {
        teamId: project.id,
      },
    });
    await TeamDetails.destroy({
      where: {
        teamId: project.id,
      },
    });
  });

  Colleague.addHook("beforeDestroy", async (colleague) => {
    await Supervising.destroy({
      where: {
        colleagueId: colleague.id,
      },
    });
    await ColleagueKnowledge.destroy({
      where: {
        colleagueId: colleague.id,
      },
    });
  });

  Message.addHook("beforeCreate", async (message) => {
    if (message.role === "USER") {
      message.status = "READ";
    } else if (message.role === "ASSISTANT") {
      message.status = null;
    }
  });

  Supervising.addHook("afterCreate", async (supervising) => {
    await Conversation.create({
      content:
        "I couldn't find a suitable answer to this question, so I forwarded it to my supervisor.",
      role: "ASSISTANT",
      sessionId: supervising.sessionId,
    });
  });
}

export default { init };
