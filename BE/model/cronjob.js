const mongoose = require("mongoose");

const cronJobSchema = new mongoose.Schema({
  name: { type: String, default: null },
  cron: { type: String, default: null },
  command: { type: String },
});

module.exports = mongoose.model("cronjob", cronJobSchema);
