const { Router } = require("express");
const authController = require("../controllers/authController");
const isLoggedIn = require("../middleware/isLoggedIn");

const authRoutes = Router();

authRoutes.post("/signup", authController.postSignup);
authRoutes.post("/login", authController.postLogin);
authRoutes.get("/logout", isLoggedIn, authController.logout);

module.exports = authRoutes;