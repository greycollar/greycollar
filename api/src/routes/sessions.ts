import Colleague from "../models/Colleague";
import Conversation from "../models/Conversation";
import Joi from "joi";
import Session from "../models/Session";
import express from "express";
import schemas from "../schemas";
import session from "../functions/session";

const router = express.Router();

router.post("/", async (req, res) => {
  const { projectId: teamId } = req.session;

  const { type, colleagueId } = Joi.attempt(
    req.body,
    Joi.object({
      type: Joi.string().valid("CHAT", "EMAIL").required(),
      colleagueId: Joi.string().uuid().required(),
    })
  );

  const colleague = await Colleague.findByPk(colleagueId);

  if (!colleague || colleague.teamId !== teamId) {
    return res.status(401).end();
  }

  const sessionInstance = await session.create({
    type,
    colleagueId,
  });

  return res.status(200).json(sessionInstance);
});

router.post("/:sessionId", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { sessionId } = req.params;

  const { content } = Joi.attempt(
    req.body,
    Joi.object({
      content: Joi.object().required(),
    })
  );

  const session = await Session.findOne({
    include: [{ model: Colleague, where: { teamId } }],
    where: { id: sessionId },
  });

  if (!session) {
    return res.status(404).end();
  }

  const conversation = await session.addConversation({
    sessionId,
    role: "USER",
    colleagueId: session.colleagueId,
    content,
  });

  return res.status(200).json(conversation);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const teamId = req.session.projectId;

  const session = await Session.findByPk(id);

  if (!session) {
    return res.status(404).end();
  }

  const colleague = await Colleague.findByPk(session.colleagueId);

  if (colleague.teamId !== teamId) {
    return res.status(401).end();
  }

  const sessionConversations = await Conversation.findAll({
    where: { sessionId: session.id },
    order: [["createdAt", "ASC"]],
  });

  return res.json(sessionConversations);
});

export default router;
