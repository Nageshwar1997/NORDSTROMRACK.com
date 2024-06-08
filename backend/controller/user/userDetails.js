const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
    try {
        // console.log("User id", req.userId);
        const user = await userModel.findById(req.userId);

        res.status(200).json({
          message: "User Details",
          data: user,
          error: false,
          success: true,
        });

        // console.log("User", user);
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
