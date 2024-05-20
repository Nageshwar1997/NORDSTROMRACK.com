const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please Provide Valid Email");
    }
    if (!password) {
      throw new Error("Please Provide Valid Password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User Not Found...!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    // console.log("Check Password", checkPassword);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login Successfully...!",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Wrong password please check your password...!");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
