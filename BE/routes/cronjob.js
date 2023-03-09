const express = require("express");
const router = express.Router();

const CronJob = require("../model/cronjob");

router.post("/cronjobs", async (req, res) => {
  const { name, cron, command } = req.body;
  const job = await CronJob.create({ name, cron, command });
  // await job.save();
  //   const scheduledJob = cron.schedule(cron, function () {
  //     console.log(`Running job ${name}: ${command}`);
  //     // execute the command here
  //   });
  res.json({ message: "Job created", data: req.body });
});

router.get("/cronjobs", async (req, res) => {
  const jobs = await CronJob.find();
  res.json(jobs);
});

module.exports = router;
