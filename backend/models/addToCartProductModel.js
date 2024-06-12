const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const addToCartProductModel = mongoose.model("cart", addToCartSchema);

module.exports = addToCartProductModel;
