const userModel = require("../../models/userModel");
async function updateUserController(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body;

    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    const user = await userModel.findById(sessionUser);

    // console.log("User Role :", user.role);

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);

    res.status(200).json({
      message: "User Updated Successfully",
      data: updateUser,
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

module.exports = updateUserController;
