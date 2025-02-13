import Colleague from "../models/Colleague";
import Joi from "joi";
import Task from "../models/Task";
import express from "express";
import task from "../functions/task";
import knowledge from "../functions/knowledge";

const router = express.Router();

router.post("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { colleagueId, description } = Joi.attempt(
    req.body,
    Joi.object({
      colleagueId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required(),
      description: Joi.string().required(),
    })
  );

  const colleague = await Colleague.findByPk(colleagueId);

  if (!colleague) {
    return res.status(404).end();
  }

  if (colleague.teamId !== teamId) {
    return res.status(401).end();
  }

  const taskInstance = await task.create({ colleagueId, description });

  return res.status(200).json(taskInstance);
});

router.get("/", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { colleagueId } = Joi.attempt(
    req.query,
    Joi.object({
      colleagueId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required(),
    })
  );

  const tasks = await task.list({ colleagueId, teamId });

  return res.status(200).json(tasks);
});

router.get("/:taskId", async (req, res) => {
  const teamId = req.session.projectId;
  const { taskId } = req.params;

  const task = await Task.findOne({
    where: { id: taskId },
    include: [
      {
        model: Colleague,
        attributes: ["teamId"],
        required: true,
      },
    ],
  });

  if (!task) {
    return res.status(404);
  }

  if (task.Colleague.teamId !== teamId) {
    return res.status(401);
  }

  return res.status(200).json(task);
});

router.get("/:taskId/steps", async (req, res) => {
  const { projectId: teamId } = req.session;
  const { taskId } = req.params;

  const taskInstance = await Task.findOne({
    where: { id: taskId },
    include: [
      {
        model: Colleague,
        attributes: ["teamId"],
        required: true,
      },
    ],
  });

  if (!taskInstance) {
    return res.status(404);
  }

  if (taskInstance.Colleague.teamId !== teamId) {
    return res.status(401);
  }

  const steps = await task.listSteps({ taskId });

  return res.status(200).json(steps);
});

router.post("/:taskId/supervising", async (req, res) => {
  const { taskId } = req.params;
  const { text, addToKnowledgeBase, colleagueId } = Joi.attempt(
    req.body,
    Joi.object({
      text: Joi.string().required(),
      colleagueId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required(),
      addToKnowledgeBase: Joi.boolean().required(),
    })
  );

  await task.addStep({
    taskId,
    action: "SUPERVISED",
    comment: "Supervising: " + text,
    parameters: {
      message: text,
    },
  });

  if (addToKnowledgeBase) {
    await knowledge.create({
      colleagueId,
      knowledge: {
        type: "TASK",
        taskId,
      },
    });
  }

  return res.status(201).end();
});

export default router;
