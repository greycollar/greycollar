import platform from "@nucleoidai/platform-express";
import express from "express";
import Joi from "joi";
import schemas from "../schemas";
import Session from "../models/Session";
import Colleague from "../models/Colleague";
import Conversation from "../models/Conversation";
import Supervising from "../models/Supervising";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { projectId: teamId } = req.session;

  const { type, colleagueId, content } = Joi.attempt(
    req.body,
    schemas.Session.schema
  );

  const session = await Session.findByPk(id);

  if (session) {
    const colleague = await Colleague.findByPk(session.colleagueId);

    if (!colleague) {
      return res.status(400).json({ error: "INVALID_COLLEAGUE" });
    }

    if (colleague.teamId !== teamId) {
      return res.status(401).end();
    }

    const newConversation = await Conversation.create({
      content,
      role: "USER",
      sessionId: id,
    });

    if (content.toLowerCase().includes("hello")) {
      setTimeout(async () => {
        await Conversation.create({
          content: "Hello, how can I help you?",
          role: "ASSISTANT",
          sessionId: id,
        });
      }, 1000);
    }

    if (
      content.toLowerCase().includes("pinocchio") &&
      content.toLowerCase().includes("who")
    ) {
      setTimeout(async () => {
        await Conversation.create({
          content:
            "Pinocchio is a fictional character and the protagonist of the children's novel The Adventures of Pinocchio (1883) by Italian writer Carlo Collodi.",
          role: "ASSISTANT",
          sessionId: id,
        });
      }, 1000);
    }

    if (
      content.toLowerCase().includes("pinocchio") &&
      content.toLowerCase().includes("what")
    ) {
      setTimeout(async () => {
        await Conversation.create({
          content: "Pinocchio is made of pine wood.",
          role: "ASSISTANT",
          sessionId: id,
        });
      }, 1000);
    }

    if (
      content.toLowerCase().includes("pinocchio") &&
      content.toLowerCase().includes("nose")
    ) {
      setTimeout(async () => {
        await Supervising.create({
          question: content,
          conversationId: newConversation.id,
          sessionId: id,
          colleagueId: colleague.id,
        });
      }, 1000);
    }

    if (
      content.toLowerCase().includes("C3PO") &&
      content.toLowerCase().includes("who")
    ) {
      setTimeout(async () => {
        await Conversation.create({
          content: "C-3PO is a protocol droid from the Star Wars universe.",
          role: "ASSISTANT",
          sessionId: id,
        });
      }, 1000);
    }

    if (
      content.toLowerCase().includes("where") &&
      content.toLowerCase().includes("parking")
    ) {
      setTimeout(async () => {
        await Conversation.create({
          content: "It is down the street.",
          role: "ASSISTANT",
          sessionId: id,
        });
      }, 1000);
    }

    if (
      content.toLowerCase().includes("C3PO") &&
      content.toLowerCase().includes("obey")
    ) {
      setTimeout(async () => {
        await Supervising.create({
          question: content,
          conversationId: newConversation.id,
          sessionId: id,
          colleagueId: colleague.id,
        });
      }, 1000);
    }

    return res.status(201).json(newConversation);
  } else {
    const colleague = await Colleague.findByPk(colleagueId);

    if (!colleague) {
      return res.status(400).json({ error: "INVALID_COLLEAGUE" });
    }

    if (colleague.teamId !== teamId) {
      return res.status(401).end();
    }

    const newSession = await Session.create({ id, type, colleagueId });
    return res.status(201).json(newSession);
  }
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
