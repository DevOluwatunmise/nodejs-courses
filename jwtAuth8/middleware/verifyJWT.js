const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.header.authorization;
  if (!authHeader?.startsWith("bearer")) return res.sendStatus(401);
  console.log(authHeader); //bearer token
  const token = authHeader.split(" ")[1]; // split method of the String class is used to divide a string into an array of substrings.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT
