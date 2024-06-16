const express = require("express");
const router = express.Router();

// User Controllers
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const userLogoutController = require("../controller/user/userLogout");
const allUsersController = require("../controller/user/allUsers");
const updateUserController = require("../controller/user/updateUser");
const addToCartController = require("../controller/user/addToCart");
const countAddToCartController = require("../controller/user/countAddToCart");
const addToCartViewController = require("../controller/user/addToCartView");

// // Product Controllers
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductController = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProductController = require("../controller/product/getCategoryWiseProduct");
const getProductDetailsController = require("../controller/product/getProductDetails");

// Middleware
const authToken = require("../middleware/authToken");
const updateAddToCartCountController = require("../controller/user/updateCountAddToCart");
const deleteProductFromCartController = require("../controller/user/deleteFromCart");
const searchProductController = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webHookController = require("../controller/order/webhook");
const orderController = require("../controller/order/order.controller");
const allOrdersController = require("../controller/order/allOrders.controller");

// User Routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", authToken, userLogoutController);

// Admin Panel Routes
router.get("/all-users", authToken, allUsersController);
router.post("/update-user", authToken, updateUserController);
router.get("/all-orders", authToken, allOrdersController);

// Product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-products", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductController);
router.post("/category-product", getCategoryWiseProductController);
router.post("/product-details", getProductDetailsController);
router.get("/search", searchProductController);
router.post("/filter-product", filterProductController);

// User Add To Cart
router.post("/add-to-cart", authToken, addToCartController);
router.get("/count-add-to-cart", authToken, countAddToCartController);
router.get("/user-cart", authToken, addToCartViewController);
router.post(
  "/update-count-add-to-cart",
  authToken,
  updateAddToCartCountController
);
router.post("/delete-cart-product", authToken, deleteProductFromCartController);

// Payment & Order Routes
router.post("/payment", authToken, paymentController);
router.post("/webhook", webHookController); // backendUrl/api/webhook
router.get("/order-list", authToken, orderController);



module.exports = router;
