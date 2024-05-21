const User = require("../model/User")

  

  
  const handleLogout = async(req, res) => {
    //On client, also delete the accessToken

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204) // No content

    const refreshToken = cookies.jwt
    
    // is refreshToken in DB?
    const foundUser = await  User.findOne({refreshToken}).exec()

    if(!foundUser) {
        res.clearCookies("jwt", {httpOnly: true, sameSite: "none", secure: true});  // forbidden
    return res.sendStatus(204) // no content
    }
     
    //  Delete refreshToken in DB

    foundUser.refreshToken = ""    // delete refreshToken
    const result = await foundUser.save()
    console.log(result);
     

    res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true}); // Secure: true- only serves on https
    return res.sendStatus(204);
}

  module.exports = {handleLogout}
