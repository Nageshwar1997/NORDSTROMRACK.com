const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    //   console.log("req.body", req.body);

    const user = await userModel.findOne({ email });

    // console.log("User", user);

    if (user) {
      throw new Error("User email is already exists");
    }

    if (!email) {
      throw new Error("Please Provide Valid Email");
    }
    if (!password) {
      throw new Error("Please Provide Valid Password");
    }
    if (!name) {
      throw new Error("Please Provide Valid Name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong while hashing password");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
