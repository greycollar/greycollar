import platform from "@nucleoidai/platform-express";
import { Op } from "sequelize";
import express from "express";
import Joi from "joi";
import Message from "../models/Message";
import Supervising from "../models/Supervising";
import Task from "../models/Task";
import Knowledge from "../models/Knowledge";
import schemas from "../schemas";
import Colleague from "../models/Colleague";
import ColleagueKnowledge from "../models/ColleagueKnowledge";

const router = express.Router();

router.post("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { role, content, userId, command, knowledgeId, colleagueId, replyTo } =
    Joi.attempt(req.body, schemas.Message.create);

  const message = await Message.create({
    role,
    colleagueId,
    content,
    userId,
    command,
    knowledgeId,
    teamId,
    replyTo,
  });

  res.json(message);
});

router.get("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { offset } = Joi.attempt(
    req.query,
    Joi.object({ offset: Joi.date().optional() })
  );

  const where = {
    teamId,
  } as {
    teamId: string;
    role: string;
    createdAt?: {
      [Op.gt]: Date;
    };
  };

  if (offset) {
    const date = new Date(offset);

    where.createdAt = {
      [Op.gt]: date,
    };
  }

  const messagePromise = Message.findAll({
    where: where,
    order: [["createdAt", "ASC"]],
    limit: 50,
  });

  const supervisingPromise = Supervising.findAll({
    include: [
      {
        model: Colleague,
        where: { teamId },
        attributes: [],
      },
    ],
  });

  const taskPromise = Task.findAll({
    include: [
      {
        model: Colleague,
        attributes: [],
        where: { teamId },
        required: true,
      },
    ],
  });

  const knowledgePromise = Knowledge.findAll({
    include: [
      {
        model: ColleagueKnowledge,
        where: { teamId },
      },
    ],
  });

  const [messages, supervisings, tasks, knowledges] = await Promise.all([
    messagePromise,
    supervisingPromise,
    taskPromise,
    knowledgePromise,
  ]);

  const allMessages = [
    ...messages,
    ...supervisings.map((supervising) => ({
      mode: "SUPERVISING",
      role: "SYSTEM",
      ...supervising.toJSON(),
    })),
    ...tasks.map((task) => ({
      mode: "TASK",
      role: "SYSTEM",
      ...task.toJSON(),
    })),
    ...knowledges.map((knowledge) => ({
      role: "SYSTEM",
      mode: "KNOWLEDGE",
      ...knowledge.toJSON(),
    })),
  ];

  res.json(allMessages);
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
