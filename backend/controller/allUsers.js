const userModel = require("../models/userModel");

async function allUsersController(req, res) {
  try {
    // console.log("User id", req.userId);

    const allUsers = await userModel.find()

    res.status(200).json({
      message: "All Users",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsersController;
