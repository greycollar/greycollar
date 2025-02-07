import * as platform from "@nucleoidai/platform-express";

import Colleague from "../models/Colleague";
import ColleagueKnowledge from "../models/ColleagueKnowledge";
import Joi from "joi";
import Knowledge from "../models/Knowledge";
import { Op } from "sequelize";
import express from "express";
import schemas from "../schemas";
import knowledge from "../functions/knowledge";

const router = express.Router();

router.post("/", async (req, res) => {
  const { body } = req;
  const { projectId: teamId } = req.session;

  const {
    colleagueId,
    teamId: knowledgeTeamId,
    ...knowledgeBody
  } = Joi.attempt(body, schemas.Knowledge.create);

  if (knowledgeTeamId) {
    if (knowledgeTeamId !== teamId) {
      return res.status(401).end();
    }
  } else {
    const colleague = await Colleague.findOne({
      where: {
        teamId,
        id: colleagueId,
      },
    });

    if (!colleague) {
      return res.status(401).end();
    }
  }

  await knowledge.create({
    teamId,
    colleagueId,
    knowledge: knowledgeBody,
  });

  res.status(201).json(knowledge);
});

router.get("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { colleagueId, type } = req.query as {
    colleagueId?: string;
    type?: string;
  };

  const knowledgeList = await knowledge.list({ teamId, colleagueId, type });
  res.json(knowledgeList);
});

router.get("/:id", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { id } = req.params;

  const knowledge = await Knowledge.findAll({
    where: { id },
    include: [
      {
        model: ColleagueKnowledge,
        where: {
          [Op.or]: [{ teamId }, { teamId: null }],
        },
        attributes: ["teamId", "colleagueId"],
        include: [
          {
            model: Colleague,
            required: false,
          },
        ],
      },
    ],
  });

  const colleagueKnowledge = knowledge.map((knowledge) =>
    knowledge.dataValues.ColleagueKnowledges.map(
      (colleagueKnowledge) => colleagueKnowledge.dataValues
    )
  );

  if (colleagueKnowledge[0] && colleagueKnowledge[0][0].teamId) {
    if (colleagueKnowledge[0][0].teamId !== teamId) {
      res.status(401).end();
      return;
    }
  } else {
    const colleaguesTeamId = colleagueKnowledge.flatMap((colleague) =>
      colleague.map((item) => item.Colleague.dataValues.teamId)
    );

    if (colleaguesTeamId.length === 0) {
      res.status(404).end();
      return;
    }

    if (!colleaguesTeamId.some((teamId) => teamId === teamId)) {
      res.status(401).end();
      return;
    }
  }
  //eslint-disable-next-line
  const { ColleagueKnowledges, ...knowledgeData } = knowledge[0].dataValues;

  const colleagueId = ColleagueKnowledges[0].dataValues.colleagueId;

  if (colleagueId) {
    res.json({ ...knowledgeData, colleagueId });
  } else if (teamId) {
    res.json({ ...knowledgeData, teamId });
  }
});

router.patch("/:id", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { id } = req.params;
  const { body } = req;
  const validatedBody = Joi.attempt(body, schemas.Knowledge.update);

  const knowledge = await Knowledge.findAll({
    where: { id },
    include: [
      {
        model: ColleagueKnowledge,
        where: {
          [Op.or]: [{ teamId }, { teamId: null }],
        },
        attributes: ["teamId", "colleagueId"],
        include: [
          {
            model: Colleague,
            required: false,
          },
        ],
      },
    ],
  });

  const colleagueKnowledge = knowledge.map((knowledge) =>
    knowledge.dataValues.ColleagueKnowledges.map(
      (colleagueKnowledge) => colleagueKnowledge.dataValues
    )
  );

  if (colleagueKnowledge[0][0].teamId) {
    if (colleagueKnowledge[0][0].teamId !== teamId) {
      res.status(401).end();
      return;
    }
  } else {
    const colleaguesTeamId = colleagueKnowledge.flatMap((colleague) =>
      colleague.map((item) => item.Colleague.dataValues.teamId)
    );

    if (!colleaguesTeamId.some((teamId) => teamId === teamId)) {
      res.status(401).end();
      return;
    }
  }

  await Knowledge.update(validatedBody, { where: { id } });

  res.status(204).end();
});

router.delete("/:id", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { id } = req.params;

  const knowledge = await Knowledge.findAll({
    where: { id },
    include: [
      {
        model: ColleagueKnowledge,
        where: {
          [Op.or]: [{ teamId }, { teamId: null }],
        },
        attributes: ["teamId", "colleagueId"],
        include: [
          {
            model: Colleague,
            required: false,
          },
        ],
      },
    ],
  });

  const colleagueKnowledge = knowledge
    .map((knowledge) => knowledge.dataValues)
    .map((knowledge) =>
      knowledge.ColleagueKnowledges.map(
        (colleagueKnowledge) => colleagueKnowledge.dataValues
      )
    );

  if (colleagueKnowledge[0][0].teamId) {
    if (colleagueKnowledge[0][0].teamId !== teamId) {
      res.status(401).end();
      return;
    }
  } else {
    const colleaguesTeamId = colleagueKnowledge.flatMap((colleague) =>
      colleague.map((item) => item.Colleague.dataValues.teamId)
    );

    if (!colleaguesTeamId.some((teamId) => teamId === teamId)) {
      res.status(401).end();
      return;
    }
  }
  await Knowledge.destroy({ where: { id } });

  res.status(204).end();
});

export default router;
