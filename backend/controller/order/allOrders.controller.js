const orderProductModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrdersController = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (user.role !== "ADMIN") {
      return res.status(500).json({
        message: "Unauthorized Access",
      });
    }
    const allOrders = await orderProductModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All Orders",
      data: allOrders,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = allOrdersController;