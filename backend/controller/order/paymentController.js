const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    console.log("Cart Items", cartItems);

    const user = await userModel.findOne({ _id: req?.userId });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: [
        "card",
        // "p24",
        // "ideal",
        // "sofort",
        // "bancontact",
        // "eps",
        // "giropay",
        // "przelewy24",
        // "mybank",
        // "fpx",
        // "ach",
        // "sepa",
      ],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1PQx2oLyW1KBitgiUGJln7i0" }],
      customer_email: user?.email,
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId?.productName,
              images: item.productId?.productImages,
              metadata: {
                productId: item.productId?._id,
              },
            },
            unit_amount: item.productId?.sellingPrice,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/canceled`,
    };

    const session = await stripe.checkout.sessions.create(params);

    res.status(303).json(session);
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;