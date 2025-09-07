const bcrypt=require('bcryptjs')
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
// router.use(cookieParser());
const userModel = require('../models/user-model');
const {generateToken}=require("../utils/generateToken")

module.exports.registerUser=async function(req, res){
    try {
  let { username, password, email } = req.body;

  let user = await userModel.findOne({ email: email });

  if (user) {
    return res.status(400).send("bhai apka account pehle se hai to jao login kro");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createdUser = await userModel.create({
    username,
    password: hashedPassword,
    email,
  });
    let token=generateToken(user);
    res.cookie("token",token);

  res.status(201).send(createdUser);
} catch (err) {
  console.error("Signup error:", err.message);
  res.status(500).send("Server error");
}


};


module.exports.loginUser = async function(req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).send('email or password is incorrect');
  }

  bcrypt.compare(password, user.password, function(err, result) {
    if (err) {
      return res.status(500).send('Server error');
    }

    if (!result) {
      return res.status(400).send('email or password is incorrect');
    }

    // Password matches
    let token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.send("✅ You can login now");
  });
};