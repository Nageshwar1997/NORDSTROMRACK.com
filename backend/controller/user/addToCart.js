const addToCartProductModel = require("../../models/addToCartProductModel");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUserId = req.userId;

    const isProductExist = await addToCartProductModel.findOne({
      productId,
      userId: currentUserId,
    });

    // console.log("isProductExist", isProductExist);

    if (isProductExist) {
      return res.json({
        message: "Product Already Exist in Cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUserId,
    };

    const newAddToCart = new addToCartProductModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      message: "Product Added Successfully in Cart",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
