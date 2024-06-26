const User = require("../model/User") //replace the code below


// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const fsPromises = require("fs").promises;
// const path = require("path");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const duplicate = await User.findOne({username: user}).exec();   // Check for duplicate username
  if (duplicate) return res.status(409); //meaning conflict

  try {
    // encrypting the password
    const hashedPwd = await bcrypt.hash(pwd, 10);      // The number 10 indicates the cost factor, which determines how computationally intensive the hashing process is. Higher values increase the security but also require more processing time.

    //create and store the new user
    const result = await User.create({
      "username": user,
      "password": hashedPwd
    });

    console.log(result)

    //storing new user
    // const newUser = { username: user, roles: {"user":2001}, password: hashedPwd };

    // usersDB.setUsers([...usersDB.users, newUser]);      // Add new user
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );
    // console.log(usersDB.users);
    res.status(201).json({ success: `New User ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
