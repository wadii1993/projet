const config = require("config");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = config.get("secret");

exports.verifyAuth = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    var decoded = jwt.verify(token, secret);
    if (!decoded) return res.status(400).json({ msg: "invalid token" });
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ msg: "unathorized" });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
