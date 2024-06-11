const addToCartProductModel = require("../../models/addToCartProductModel");

const updateAddToCartCountController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;
    const quantity = req.body.quantity;

    const updateProductCount = await addToCartProductModel.updateOne(
      addToCartProductId,
      {
        ...(quantity && { quantity: quantity }),
      }
    );

    res.json({
      message: "Update Count Add To Cart",
      data: updateProductCount,
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

module.exports = updateAddToCartCountController;
