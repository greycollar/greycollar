import platform from "@nucleoidai/platform-express";
import express from "express";
import Joi from "joi";
import schemas from "../schemas";
import Session from "../models/Session";
import Colleague from "../models/Colleague";
import Conversation from "../models/Conversation";
import sessions from "../functions/sessions";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { projectId: teamId } = req.session;

  const { type, colleagueId, content } = Joi.attempt(
    req.body,
    schemas.Session.schema
  );

  const newSession = await sessions.create({
    id,
    teamId,
    type,
    colleagueId,
    content,
  });
  return res.status(201).json(newSession);
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
