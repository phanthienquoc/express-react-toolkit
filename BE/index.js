const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const cron = require("node-cron"); // add this line to require node-cron

const CronJob = require("./model/cronjob");
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

async function loadCronJobs() {
  const jobs = await CronJob.find();
  jobs.forEach((job) => {
    cron.schedule(cron, function () {
      console.log(`Running job ${name}: ${command}`);
      // execute the command here
    });
    // cron.schedule(job.cron, function () {
    //   console.log(`Running job ${job.name}: ${job.command}`);
    //   // execute the command here
    // });
  });
}

// server listening
server.listen(port, () => {
  // loadCronJobs();
  console.log(`Server running on port http://localhost:${port}`);
});
