const addToCartProductModel = require("../../models/addToCartProductModel");

const deleteProductFromCartController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const cartProductId = req.body._id;

    const deleteProduct = await addToCartProductModel.deleteOne({
      _id: cartProductId,
    });

    res.json({
      message: "Product Removed From Cart",
      success: true,
      error: false,
      data: deleteProduct,
    });
  } catch (error) {
    res.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteProductFromCartController;
