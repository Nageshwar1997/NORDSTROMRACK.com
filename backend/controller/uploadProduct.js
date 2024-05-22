const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission Denied");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    return res.status(200).json({
      message: "Product Upload Successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadProductController;
