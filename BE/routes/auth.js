const express = require("express");
const router = express.Router();

const app = require("../app");
const User = require("../model/user");
const authMethod = require("../auth/auth.methods");
const AuthenToken = require("../model/authenToken");

const qrcode = require("qrcode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Get a list of all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful operation
 */

// Register
router.post("/signup", async (req, res) => {
  // Our register logic starts here

  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRED,
    });

    const userToken = await AuthenToken.create({
      userId: user._id,
      access_token: token, // sanitize: convert email to lowercase
      refresh_token: token,
    });

    // return new user
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Get a list of all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.post("/signin", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const accessToken = authMethod.signAccessToken({ user_id: user._id, email });
      const refreshToken = authMethod.signRefreshToken({ user_id: user._id, email });

      await AuthenToken.findOneAndUpdate(
        { userId: user._id },
        { $set: { accessToken: accessToken, refreshToken: refreshToken } }
      );

      // user
      return res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log("Login", err);
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) {
      res.status(400).send("refreshToken is required");
    }
    const refreshData = await authMethod.refreshToken(refreshToken);
    if (refreshData) {
      await authMethod.updateUserTokenData(refreshData);
      res.status(200).send(refreshData);
    } else {
      throw Error("xxx");
    }
  } catch (error) {
    console.log("refresh-token", error);
    res.status(404).send("Error on init refresh token");
  }
});

module.exports = router;
