const jwt = require("jsonwebtoken");
const User = require('../models/userModels')
const bcrypt = require('bcryptjs')
const JWT_SECRET = "SECRET_KEY"

exports.loginController = async (req, res) => {
  try{
    if (!req.body) {
      res.status(404).end("Error")
      return
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean()
    if (!user) {
      res.json({ status: 'error', error: 'invalid username/password' })
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign({
        id: user._id,
        username: user.username
      }, JWT_SECRET,  { expiresIn: "10h" })
      res.cookie("token", token);
      res.status(200).json({message:"logging successfull"})
    }
  }catch(err){
    res.status(400).json({err:err})
  }

};

exports.signupController = async (req, res) => {
  res.status(200).json("Sign up")
}

exports.logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ "message": "Logged Out" });
}

exports.registerController = async (req, res) => {
  if (!req.body) {
    res.status(404).end("Error")
    return
  }
  const { username, email, password: plaintextpass } = req.body
  const password = await bcrypt.hash(plaintextpass, 10)
  try {
    const user = await User.create({
      username,
      password
    });
    res.status(201).json({ message: 'User Created' })
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      res.status(406).json({ error: 'Username already taken' })
    }
    res.status(400).json({ error: err })
  }

}