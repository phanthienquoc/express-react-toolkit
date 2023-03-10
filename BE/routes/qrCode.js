const QR = require("qrcode");
const express = require("express");
const jwt = require("jsonwebtoken");

const QRCode = require("../model/qrCode");
const User = require("../model/user");
const ConnectedDevice = require("../model/connectedDevice");
const { REQUEST_STATUS_CODE } = require("../constants/request");

const router = express.Router();

router.post("/qr/generate", async (req, res) => {
  try {
    const { user_id: userId } = req.body;

    if (!userId) {
      res.status(REQUEST_STATUS_CODE[400]).send("User Id is required");
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(REQUEST_STATUS_CODE[400]).send("User not found");
    }
    const qrExist = await QRCode.findOne({ userId });

    if (!qrExist) {
      await QRCode.create({ userId });
    } else {
      await QRCode.findOneAndUpdate({ userId }, { $set: { disabled: true } });
      await QRCode.create({ userId });
    }

    const encryptData = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRED_DAY,
      }
    );
    console.log(encryptData);

    const dataImage = await QR.toDataURL(encryptData);

    res.status(200).json({ dataImage });
  } catch (error) {
    res.status(REQUEST_STATUS_CODE[400]).send(error);
  }
});

router.post("/qr/scan", async (req, res) => {
  try {
    const { token, device_information: deviceInformation } = req.body;

    if (!token && !deviceInformation) {
      res.status(REQUEST_STATUS_CODE[400]).send("Token and device information required");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const qrCode = await QRCode.findOne({
      userId: decoded.userId,
      disabled: false,
    });

    if (!qrCode) {
      res.status(REQUEST_STATUS_CODE[400]).send("QRcode not found");
    }

    const connectedDeviceData = {
      userId: decoded.userId,
      qrCodeId: qrCode._id,
      deviceName: deviceInformation.deviceName,
      deviceModel: deviceInformation.deviceModel,
      deviceOS: deviceInformation.deviceOS,
      deviceVersion: deviceInformation.deviceVersion,
    };
    console.log("=====>connectedDeviceData");
    const connectedDevice = await ConnectedDevice.create(connectedDeviceData);

    await QRCode.findOneAndUpdate(
      {
        _id: qrCode._id,
      },
      {
        isActive: true,
        connectedDeviceId: connectedDevice._id,
        lastUsedDate: new Date(),
      }
    );

    // Find user
    const user = await User.findById(decoded.userId);
    console.log("=====>user");

    // Create token
    const authToken = jwt.sign({ user_id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRED,
    });

    // Return token
    return res.status(200).json({ token: authToken });
  } catch (error) {
    res.status(500).send("Something wrong with request", error);
  }
});

module.exports = router;
