import { Op } from "sequelize";
import express from "express";
import Joi from "joi";
import Message from "../models/Message";
import schemas from "../schemas";
import message from "../functions/message";

const router = express.Router();

router.post("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { role, content, userId, command, knowledgeId, colleagueId, replyTo } =
    Joi.attempt(req.body, schemas.Message.create);

  const messageInstance = await message.create({
    role,
    colleagueId,
    content,
    userId,
    command,
    knowledgeId,
    teamId,
    replyTo,
  });

  res.json(messageInstance);
});

router.get("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { offset } = Joi.attempt(
    req.query,
    Joi.object({ offset: Joi.date().optional() })
  );

  const messageInstances = await message.list({ teamId, offset });

  res.json(messageInstances);
});

router.patch("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { offset } = Joi.attempt(
    req.query,
    Joi.object({ offset: Joi.date().required() })
  );
  const { status } = Joi.attempt(req.body, schemas.Message.patch);

  const date = new Date(offset);

  const where = {
    teamId,
    role: "USER",
    createdAt: {
      [Op.gt]: date,
    },
  };

  await Message.update({ status }, { where });

  res.end();
});

export default router;
