const jwt = require("jsonwebtoken");
const AuthenToken = require("../model/authenToken");

const signAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
};

const verifyAccessToken = async (accessToken) => {
  try {
    return await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};

const signRefreshToken = (params) => {
  return jwt.sign(params, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    return await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};

const refreshToken = async (currentRefreshToken) => {
  try {
    let user = await verifyRefreshToken(currentRefreshToken);
    if (user) {
      const token = signAccessToken({ user_id: user._id, email: user.email });
      const refreshToken = signRefreshToken({ user_id: user._id, email: user.email });
      return { user, token, refreshToken };
    } else {
      throw Error("Invalid ");
    }
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};

const updateUserTokenData = async (tokenData) => {
  const { user } = tokenData;
  await AuthenToken.findOneAndUpdate({ userId: user._id }, { $set: tokenData });
};

const decodeToken = async (token, secretKey) => {
  try {
    return await jwt.verify(token, secretKey, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};

const verifyToken = async (token, secretKey) => {
  try {
    console.log("verifyToken", token, secretKey);
    return await jwt.verify(token, secretKey);
  } catch (error) {
    console.log(`Error in verify token:  + ${error}`);
    return null;
  }
};

module.exports = {
  refreshToken,
  signRefreshToken,
  signAccessToken,
  verifyRefreshToken,
  verifyAccessToken,
  decodeToken,
  updateUserTokenData,
};
