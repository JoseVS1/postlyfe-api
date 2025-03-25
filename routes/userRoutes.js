const { Router } = require("express");
const userController = require("../controllers/userController");
const isLoggedIn = require("../middleware/isLoggedIn");

const userRoutes = Router();

userRoutes.get("/", isLoggedIn, userController.getUsers);
userRoutes.get("/:id", userController.getUser);
userRoutes.get("/:id/posts", userController.getUserPosts);

module.exports = userRoutes;