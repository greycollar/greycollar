import ColleagueKnowledge from "../models/ColleagueKnowledge";
import Knowledge from "../models/Knowledge";
import scrapper from "../actions/scrapper";
import Task from "../models/Task";
import Step from "../models/Step";

async function create({
  teamId,
  colleagueId,
  knowledge,
}: {
  teamId?: string;
  colleagueId?: string;
  knowledge: {
    type: "QA" | "URL" | "TEXT" | "TASK";
    url?: string;
    text?: string;
    question?: string;
    answer?: string;
    content?: string;
    taskId?: string;
  };
}) {
  if (!teamId && !colleagueId) {
    throw new Error("INVALID_TEAM_OR_COLLEAGUE");
  }

  if (knowledge.type === "QA" && (!knowledge.question || !knowledge.answer)) {
    throw new Error("INVALID_QA_KNOWLEDGE");
  }

  if (knowledge.type === "URL" && !knowledge.url && knowledge.content) {
    throw new Error("INVALID_URL_KNOWLEDGE");
  }

  if (knowledge.type === "TEXT" && !knowledge.text) {
    throw new Error("INVALID_TEXT_KNOWLEDGE");
  }

  if (knowledge.type === "URL" && knowledge.url) {
    knowledge.content = await scrapper.run({
      parameters: { url: knowledge.url },
    });
  }

  if (knowledge.type === "TASK" && !knowledge.taskId) {
    throw new Error("INVALID_TASK_KNOWLEDGE");
  }

  if (knowledge.type === "TASK") {
    const taskKnowledgeInstance = await Knowledge.findOne({
      where: {
        type: "TASK",
        taskId: knowledge.taskId,
      },
    });

    if (taskKnowledgeInstance) {
      return taskKnowledgeInstance.toJSON();
    }
  }

  const knowledgeInstance = await Knowledge.create(knowledge);
  await ColleagueKnowledge.create({
    knowledgeId: knowledgeInstance.id,
    colleagueId,
    teamId,
  });

  return knowledgeInstance;
}

async function list({
  teamId,
  colleagueId,
  type,
  options = { includeSteps: false },
}: {
  teamId?: string;
  colleagueId?: string;
  type?: string;
  options?: { includeSteps?: boolean };
}) {
  const where = {} as {
    colleagueId?: string;
    teamId?: string;
  };
  const knowledgeWhere = {} as {
    type?: string;
  };

  if (colleagueId) {
    where.colleagueId = colleagueId as string;
  } else {
    where.teamId = teamId;
  }

  if (type) {
    knowledgeWhere.type = type as string;
  }

  const colleagueKnowledge = await ColleagueKnowledge.findAll({
    where,
    include: [
      {
        model: Knowledge,
        required: false,
        where: knowledgeWhere,
        include: {
          model: Task,
          required: false,
          include: options.includeSteps
            ? {
                model: Step,
                as: "steps",
              }
            : [],
        },
      },
    ],
  });

  return colleagueKnowledge
    .map(({ Knowledge }) => Knowledge.toJSON())
    .map((knowledge) => ({
      ...knowledge,
      Task: knowledge.Task && {
        ...knowledge.Task,
        steps:
          knowledge.Task.steps &&
          knowledge.Task.steps.map((step) => ({
            ...step,
            result: step.result && step.result.toString(),
          })),
      },
    }));
}

export default { create, list };
