async function userLogoutController(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout Successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogoutController;
