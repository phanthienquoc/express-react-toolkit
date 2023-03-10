const mongoose = require("mongoose");
const { Schema } = mongoose;

const authTokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "users",
  },
  accessToken: { type: String, default: null },
  refreshToken: { type: String, default: null },
});

module.exports = mongoose.model("authToken", authTokenSchema);
