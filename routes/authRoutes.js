const { Router } = require("express");
const authController = require("../controllers/authController");
const isLoggedIn = require("../middleware/isLoggedIn");

const authRoutes = Router();

authRoutes.get("/status", authController.getStatus);
authRoutes.post("/signup", authController.postSignup);
authRoutes.post("/login", authController.postLogin);
authRoutes.get("/logout", authController.logout);

module.exports = authRoutes;