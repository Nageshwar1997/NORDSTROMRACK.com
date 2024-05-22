const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImages: [],
    description: String,
    originalPrice: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
