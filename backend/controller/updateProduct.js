const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission Denied");
    }
    
    const { _id, ...restBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, restBody);

    res.status(200).json({
      message: "Product Updated Successfully",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProductController;
