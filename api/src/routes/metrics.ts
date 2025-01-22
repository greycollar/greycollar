import platform from "@nucleoidai/platform-express";
import express from "express";
const router = express.Router();
import os from "os";

router.get("/", (req, res) => {
  res.json({
    free: os.freemem(),
    total: os.totalmem(),
  });
});

export default router;
