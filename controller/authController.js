const bcrypt=require('bcryptjs')
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
// router.use(cookieParser());
const userModel = require('../models/user-model');
const {generateToken}=require("../utils/generateToken")


module.exports.registerUser = async function(req, res){
  try {
    let { username, password, email } = req.body;

    let user = await userModel.findOne({ email: email });

    if (user) {
      req.flash("error", "bhai apka account pehle se hai to jao login kro");
      return res.redirect("/");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({
      username,
      password: hashedPassword,
      email,
    });

    let token = generateToken(createdUser);
    res.cookie("token", token);

    req.flash("success", "Account created successfully!");
    res.redirect("/");
  } catch (err) {
    console.error("Signup error:", err.message);
    req.flash("error", "Server error");
    res.redirect("/");
  }
};

module.exports.loginUser = async function(req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, function(err, result) {
    if (err) {
      req.flash("error", "Server error");
      return res.redirect("/");
    }

    if (!result) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/");
    }

    let token = generateToken(user);
    res.cookie("token", token);

    req.flash("success", "✅ Welcome To Your Own shop ");
    res.redirect("/shop");
  });
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: '/' // important for matching cookie
  });

  req.flash("success", "Logged out successfully");
  res.redirect("/");
};




