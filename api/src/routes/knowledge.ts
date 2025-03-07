import * as platform from "@nucleoidai/platform-express";

import Colleague from "../models/Colleague";
import Joi from "joi";
import Knowledge from "../models/Knowledge";
import colleague from "../functions/colleague";
import express from "express";
import knowledge from "../functions/knowledge";
import schemas from "../schemas";

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
  const {
    colleagueId,
    type,
    teamId: queryTeamId,
  } = req.query as {
    teamId?: string;
    colleagueId?: string;
    type?: string;
  };

  if (queryTeamId && queryTeamId !== teamId) {
    return res.status(401).end();
  }

  if (colleagueId) {
    const colleagueInstance = await colleague.get({ colleagueId });

    if (colleagueInstance.teamId !== teamId) {
      return res.status(401).end();
    }
  }

  const knowledgeList = await knowledge.list({
    colleagueId,
    teamId: queryTeamId,
    type,
  });

  res.json(knowledgeList);
});

router.get("/:id", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { id } = req.params;

  const knowledgeItem = await knowledge.get({
    knowledgeId: id,
    withOwner: true,
  });

  const { ColleagueKnowledge } = knowledgeItem;

  const hasAccess =
    ColleagueKnowledge.teamId === teamId ||
    ColleagueKnowledge.Colleague?.teamId === teamId;

  if (!hasAccess) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const { colleagueId } = ColleagueKnowledge;

  const knowledgeData = knowledgeItem.toJSON();
  delete knowledgeData.ColleagueKnowledge;

  const responseData = {
    ...knowledgeData,
    ...(colleagueId ? { colleagueId, teamId } : { teamId }),
  };

  return res.json(responseData);
});

router.delete("/:id", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { id } = req.params;

  const knowledgeItem = await knowledge.get({
    knowledgeId: id,
    withOwner: true,
  });

  const { ColleagueKnowledge } = knowledgeItem;

  const hasAccess =
    ColleagueKnowledge.teamId === teamId ||
    ColleagueKnowledge.Colleague?.teamId === teamId;

  if (!hasAccess) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  await Knowledge.destroy({ where: { id } });

  res.status(204).end();
});

export default router;
