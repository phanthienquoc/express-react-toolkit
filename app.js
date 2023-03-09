require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const auth = require("./routes/auth");
const users = require("./routes/user");
const qrCode = require("./routes/qrCode");
const cronjobs = require("./routes/cronjob");
const swagger = require("./services/swagger");

const app = express();

app.use(express.json());
app.use("/auth", auth);

app.use("/swagger", swagger);

app.use("/api", users);
app.use("/api", cronjobs);
app.use("/api", qrCode);

module.exports = app;
