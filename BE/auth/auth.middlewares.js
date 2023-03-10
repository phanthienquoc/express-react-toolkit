const authMethod = require("./auth.methods");
const User = require("../model/user");

exports.isAuth = async (req, res, next) => {
  const accessToken = req.headers.x_authorization;
  if (!accessToken) {
    return res.status(401).send("Không tìm thấy access token!");
  }
  const verified = await authMethod.verifyAccessToken(accessToken);
  if (!verified) {
    return res.status(401).send("Bạn không có quyền truy cập vào tính năng này!");
  }

  const user = await User.findOne({ email: verified.email });
  req.user = user;

  return next();
};
