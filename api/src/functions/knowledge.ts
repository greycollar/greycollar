import ColleagueKnowledge from "../models/ColleagueKnowledge";
import Knowledge from "../models/Knowledge";
import scrapper from "../actions/scrapper";
import { publish } from "../lib/Event";

async function create({
  teamId,
  colleagueId,
  knowledge,
}: {
  teamId?: string;
  colleagueId?: string;
  knowledge: {
    type: string;
    url?: string;
    text?: string;
    question?: string;
    answer?: string;
    content?: string;
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
    knowledge.content = await scrapper.run({ url: knowledge.url });
  }

  const knowledgeInstance = await Knowledge.create(knowledge);

  await ColleagueKnowledge.create({
    knowledgeId: knowledgeInstance.id,
    colleagueId,
    teamId,
  });

  publish();

  return knowledgeInstance;
}

async function list({
  teamId,
  colleagueId,
  type,
}: {
  teamId?: string;
  colleagueId?: string;
  type?: string;
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
        where: knowledgeWhere,
      },
    ],
  });

  return colleagueKnowledge.map(({ Knowledge }) => Knowledge);
}

export default { create, list };
