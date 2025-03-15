const { Router } = require("express");
const userController = require("../controllers/userController");

const userRoutes = Router();

userRoutes.get("/", userController.getUsers);
userRoutes.get("/:id", userController.getUser);

module.exports = userRoutes;