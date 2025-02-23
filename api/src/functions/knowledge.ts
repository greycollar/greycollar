import Colleague from "../models/Colleague";
import ColleagueKnowledge from "../models/ColleagueKnowledge";
import Knowledge from "../models/Knowledge";
import { Op } from "sequelize";
import { Project } from "@nucleoidai/platform-express/models";
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
  teamId: string;
  colleagueId?: string;
  type?: string;
  options?: { includeSteps?: boolean };
}) {
  const knowledgeWhere = {} as {
    type?: string;
  };

  if (type) {
    knowledgeWhere.type = type;
  }

  type WhereClauseType = {
    colleagueId?: string | null;
    teamId?: string | null;
    organizationId?: string;
  };

  const whereClause: WhereClauseType[] = [];

  const project = await Project.findOne({
    where: { id: teamId },
    attributes: ["organizationId"],
  });

  const organizationId = project?.organizationId;

  if (colleagueId) {
    const colleague = await Colleague.findOne({
      where: { id: colleagueId, teamId },
      attributes: ["teamId"],
    });

    if (!colleague) {
      throw new Error("INVALID_COLLEAGUE");
    }

    whereClause.push({ colleagueId });

    if (teamId) {
      whereClause.push({ teamId, colleagueId: null });
    }

    if (organizationId) {
      whereClause.push({ organizationId, colleagueId: null });
    }

    whereClause.push({ teamId: null, colleagueId: null });
  } else {
    if (teamId) {
      whereClause.push({ teamId, colleagueId: null });
    }

    if (organizationId) {
      whereClause.push({ organizationId, colleagueId: null });
    }

    whereClause.push({ teamId: null, colleagueId: null });
  }

  const knowledge = await Knowledge.findAll({
    where: knowledgeWhere,
    include: [
      {
        model: ColleagueKnowledge,
        where: {
          [Op.or]: whereClause,
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
    const { ColleagueKnowledge, ...knowledgeData } = entry.toJSON();

    let returnTeamId: string | null = null;
    let returnColleagueId: string | null = null;
    let returnOrganizationId: string | null = null;

    if (ColleagueKnowledge?.organizationId) {
      returnOrganizationId = ColleagueKnowledge.organizationId;
    } else if (ColleagueKnowledge?.teamId) {
      returnTeamId = ColleagueKnowledge.teamId;
    } else if (ColleagueKnowledge?.colleagueId) {
      returnColleagueId = ColleagueKnowledge.colleagueId;
    }

    return {
      ...knowledgeData,
      colleagueId: returnColleagueId,
      teamId: returnTeamId,
      organizationId: returnOrganizationId,
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
