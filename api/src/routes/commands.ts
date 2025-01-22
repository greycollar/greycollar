import platform from "@nucleoidai/platform-express";
import express from "express";
import Joi from "joi";
import schemas from "../schemas";
import Command from "../models/Command";

const router = express.Router();

router.post("/", async (req, res) => {
  const teamId = req.session.projectId;
  const { body } = req;

  const validatedBody = Joi.attempt(body, schemas.Command.create);

  if (validatedBody.teamId !== teamId) {
    res.status(401).end();
  }

  const command = await Command.create(validatedBody);

  res.status(201).json(command);
});

router.get("/", async (req, res) => {
  const teamId = req.session.projectId;

  const commands = await Command.findAll({
    where: { teamId },
  });

  res.status(200).json(commands);
});

router.get("/:id", async (req, res) => {
  const teamId = req.session.projectId;
  const { id } = req.params;

  const validatedId = Joi.attempt(id, Joi.string().guid().required());
  const command = await Command.findByPk(validatedId);

  if (!command) {
    return res.status(404);
  }

  if (command.teamId === teamId) {
    return res.status(200).json(command);
  } else {
    return res.status(401);
  }
});

export default router;
