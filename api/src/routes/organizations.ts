import platform from "@nucleoidai/platform-express";
import express from "express";
const router = express.Router();
import Colleague from "../models/Colleague";
import { Project } from "@nucleoidai/platform-express/models";

router.get("/:id", async (req, res) => {
  const { organizationId } = req.session;
  const { id } = req.params;

  if (organizationId !== id) {
    return res.status(401).end();
  }

  const colleagues = await Project.findAll({
    where: { organizationId: id },
    include: [
      {
        model: Colleague,
        as: "colleagues",
      },
    ],
  });

  if (!colleagues) {
    return res.status(404);
  }

  res.json(colleagues);
});

export default router;
