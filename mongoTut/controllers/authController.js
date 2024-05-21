//Authentication and authorization are critical components of any security framework, ensuring
//that only legitimate users gain access to systems and that their actions are controlled according to their permissions.

//Authentication=> purpose is to confirm the identity of a user or system while
//Authorization=> control access to resources and define what authenticated users can do.

const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required!!!" }); //Username & password error message

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser) return res.sendStatus(401); // unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.role).filter(Boolean);

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Saving refresh token with curent user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result);
    console.log(roles);

    // Create secure cookie  with fresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,       // only webSever can have access to the site only
       secure:true, sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user

    res.json({roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
};
