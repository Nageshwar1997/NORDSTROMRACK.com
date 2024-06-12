const userModel = require("../../models/userModel");

async function allUsersController(req, res) {
  try {
    console.log("User id", req.userId);

    // const user = await userModel.findById(req.userId);
    // console.log("User : ",user.name);

    const allUsers = await userModel.find({});

    // console.log(allUsers);

    res.status(200).json({
      message: "All Users",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsersController;
