const addToCartProductModel = require("../../models/addToCartProductModel");

const countAddToCartController = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await addToCartProductModel.countDocuments({
      userId: userId,
    });

    res.json({
      message: "Count Add To Cart",
      data: { count: count },
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartController;
