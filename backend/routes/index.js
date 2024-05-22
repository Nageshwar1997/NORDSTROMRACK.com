const express = require("express");
const router = express.Router();
const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutController = require("../controller/userLogout");
const allUsersController = require("../controller/allUsers");
const updateUserController = require("../controller/updateUser");
const uploadProductController = require("../controller/uploadProduct");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", authToken, userLogoutController);

// Admin Panel Routes
router.get("/all-users", authToken, allUsersController);
router.post("/update-user", authToken, updateUserController);


// Product
router.post("/upload-product", authToken, uploadProductController);
module.exports = router;
