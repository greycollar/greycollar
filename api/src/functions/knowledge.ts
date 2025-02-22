import Colleague from "../models/Colleague";
import ColleagueKnowledge from "../models/ColleagueKnowledge";
import Knowledge from "../models/Knowledge";
import { Op } from "sequelize";
import Step from "../models/Step";
import Task from "../models/Task";
import scrapper from "../actions/scrapper";

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
  const knowledgeWhere = {} as {
    type?: string;
  };

  if (type) {
    knowledgeWhere.type = type as string;
  }

  let colleagueTeamId;
  if (colleagueId) {
    const colleague = await Colleague.findOne({
      where: { id: colleagueId },
      attributes: ["teamId"],
    });
    colleagueTeamId = colleague?.teamId;
  }

  const knowledge = await Knowledge.findAll({
    where: knowledgeWhere,
    include: [
      {
        model: ColleagueKnowledge,
        where: {
          [Op.or]: [
            ...(colleagueId
              ? [{ colleagueId }, { teamId: colleagueTeamId }]
              : [{ teamId }, { teamId: null }]),
          ],
        },
        include: [
          {
            model: Colleague,
            required: false,
          },
        ],
      },
      {
        model: Task,
        required: false,
        include: options.includeSteps
          ? {
              model: Step,
              as: "steps",
            }
          : [],
      },
    ],
  });

  return knowledge.map((entry) => {
    const { ColleagueKnowledges, ...knowledgeData } = entry.toJSON();
    const colleagueKnowledge = ColleagueKnowledges?.[0];

    return {
      ...knowledgeData,
      colleagueId: colleagueKnowledge?.colleagueId || null,
      teamId: colleagueKnowledge?.colleagueId
        ? null
        : colleagueKnowledge?.teamId || teamId,
      Task: knowledgeData.Task && {
        ...knowledgeData.Task,
        steps:
          knowledgeData.Task.steps &&
          knowledgeData.Task.steps.map((step) => ({
            ...step,
            result: step.result && step.result.toString(),
          })),
      },
    };
  });
}

export default { create, list };
