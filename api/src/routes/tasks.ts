import Colleague from "../models/Colleague";
import Joi from "joi";
import Progress from "../models/Progress";
import { Project } from "@nucleoidai/platform-express/models";
import Task from "../models/Task";
import express from "express";
import platform from "@nucleoidai/platform-express";

const router = express.Router();

router.post("/", async (req, res) => {
  const teamId = req.session.projectId;
  const { status, description, colleagueId } = req.body;

  const task = await Task.create({
    status,
    description,
    colleagueId,
    teamId,
  });

  return res.status(201).json(task);
});

router.get("/", async (req, res) => {
  const teamId = req.session.projectId;

  const team = await Project.findByPk(teamId);

  if (!team) {
    return res.status(401);
  }

  const tasks = await Task.findAll({
    include: [
      {
        model: Colleague,
        attributes: [],
        where: { teamId },
        required: true,
      },
    ],
  });

  return res.status(200).json(tasks);
});

router.get("/:id", async (req, res) => {
  const teamId = req.session.projectId;
  const { id } = req.params;

  const validatedId = Joi.attempt(id, Joi.string().guid().required());
  const task = await Task.findOne({ where: { id: validatedId } });

  if (!task) {
    return res.status(404);
  }

  if (task.colleagueId) {
    const colleague = await Colleague.findOne({
      teamId,
      id: task.colleagueId,
    });

    if (!colleague) {
      return res.status(401);
    }

    return res.status(200).json(task);
  }

  return res.status(200).json(task);
});

router.get("/:id/progresses", async (req, res) => {
  const teamId = req.session.projectId;
  const { id } = req.params;

  const validatedId = Joi.attempt(id, Joi.string().guid().required());

  const task = await Task.findOne({
    where: { id: validatedId },
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

  const progresses = await Progress.findAll({ where: { referenceId: id } });

  return res.status(200).json(progresses);
});

export default router;
