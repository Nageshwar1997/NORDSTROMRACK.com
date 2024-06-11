const productModel = require("../../models/productModel");

const searchProductController = async (req, res) => {
  try {
    const query = req?.query?.q;

    const regex = new RegExp(query, "i", "g");

    const product = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
        {
          brandName: regex,
        },
      ],
    });

    res.json({
      message: "Search Product List",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = searchProductController;
