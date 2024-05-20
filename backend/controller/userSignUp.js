const userModel = require("../models/userModel");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email) {
      throw new Error("Please Provide Valid Email");
    }
    if (!password) {
      throw new Error("Please Provide Valid Password");
    }
    if (!name) {
      throw new Error("Please Provide Valid Name");
    }

    const userData = new userModel(req.body);
  } catch (error) {
    res.json({
      message: error,
      error: true,
      success: false,
    });
  }
}
