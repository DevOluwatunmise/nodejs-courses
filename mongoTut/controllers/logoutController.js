// const { promises } = require("dns");
// const { decode } = require("jsonwebtoken");

const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) 
    {this.users = data;

    },
  };

  const fsPromises = require("fs").promises
  const path = require("path")

  
  const handleLogout = async(req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

    if(!foundUser) {
        res.clearCookies("jwt", {httpOnly: true});  // forbidden
    return res.sendStatus(204)
    }
     // Evaluate jwt
     

     const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
     const currentUser =  {...foundUser, refreshToken: ''}
     usersDB.setUsers([...otherUsers, foundUser])   
     
     
    await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users)
    )

    res.clearCookie("jwt", {httpOnly: true});
    return res.sendStatus(204);
}

  module.exports = {handleLogout}
