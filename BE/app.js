require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const cors = require("cors");
const auth = require("./routes/auth");
const users = require("./routes/user");
const qrCode = require("./routes/qrCode");
const cronjobs = require("./routes/cronjob");
const connectedDevice = require("./routes/connectedDevice");
const swagger = require("./services/swagger");

const app = express();
// enable all CORS requests
app.use(cors());
app.use(express.json());
app.use("/auth", auth);

app.use("/swagger", swagger);

app.use("/api", users);
app.use("/api", qrCode);
app.use("/api", cronjobs);
app.use("/api", connectedDevice);

module.exports = app;
