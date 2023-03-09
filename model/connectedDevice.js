const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectedDeviceSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "users",
  },
  qrCodeId: {
    type: Schema.Types.ObjectId,
    ref: "qrCodes",
  },
  deviceName: { type: String, default: null },
  deviceModel: { type: String, default: null },
  deviceOS: { type: String, default: null },
  disabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("connectedDevice", connectedDeviceSchema);
