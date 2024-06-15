const addToCartProductModel = require("../../models/addToCartProductModel");

const addToCartViewController = async (req, res) => {
  try {
    const currentUser = req.userId;
    const cartAllProducts = await addToCartProductModel
      .find({
        userId: currentUser,
      })
      .populate("productId");

    res.json({
      message: "Cart All Products",
      data: cartAllProducts,
      success: true,
      error: false,
    });

    // console.log("cartAllProducts", cartAllProducts);
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartViewController;
