const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    // console.log("Token :", token);
    if (!token) {
      return res.status(200).json({
        message: "Please Login First",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
      // console.log("Error :", error);
      // console.log("Decoded user :", decoded);

      if (error) {
        console.log("Auth error :", error);
      }

      req.userId = decoded?._id;

      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
