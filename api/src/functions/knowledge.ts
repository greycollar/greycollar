import ColleagueKnowledge from "../models/ColleagueKnowledge";
import Knowledge from "../models/Knowledge";

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

export default { list };
