import platform from "@nucleoidai/platform-express";
import express from "express";
import Joi from "joi";
import TeamDetails from "../models/TeamDetails";
import schemas from "../schemas";

const router = express.Router();

router.get("/", async (req, res) => {
  const { projectId: id } = req.session;

  const team = await TeamDetails.findOne({ where: { id } });

  res.json(team);
});

router.patch("/", async (req, res) => {
  const { projectId: id } = req.session;

  const validatedBody = Joi.attempt(req.body, schemas.Team.update);

  const team = await TeamDetails.update(validatedBody, {
    where: { id },
  });

  res.json(team);
});

export default router;
