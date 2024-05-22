const productModel = require("../models/productModel");

const getProductController = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All Products Retrieved",
      error: false,
      success: true,
      data: allProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
