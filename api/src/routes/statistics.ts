import Dashboard from "../models/Statistics";
import express from "express";
import platform from "@nucleoidai/platform-express";

const router = express.Router();

router.get("/", async (req, res) => {
  const { projectId: teamId } = req.session;

  const statistics = await Dashboard.findAll({ where: { teamId } });

  res.status(200).json(statistics);
});

export default router;
