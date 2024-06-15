const orderProductModel = require("../../models/orderProductModel");

const orderController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const orderList = await orderProductModel.find({
      userId: currentUserId,
    });
      
      console.log("Order List", orderList);

    res.status(200).json({
      message: "Order List",
      data: orderList,
      error: false,
      success: true,
    });
      
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = orderController