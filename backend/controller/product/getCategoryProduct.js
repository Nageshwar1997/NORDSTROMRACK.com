const productModel = require("../../models/productModel");

const getCategoryProductController = async (req, res) => {
  try {
      const productCategory = await productModel.distinct("category");
      
    //   Array to store 1 product from each category
      const productByCategory = [];

      for(const category of productCategory) {
          const product = await productModel.findOne({category});
          if (product) {
              productByCategory.push(product);
          }
      }

      res.status(200).json({
        message: "Product Category",
        data: productByCategory,
        error: false,
        success: true,
      });

      console.log("Product By Category", productByCategory);

    console.log("Product Category", productCategory);
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProductController;
