const { Router } = require("express");
const profileController = require("../controllers/profileController");
const isLoggedIn = require("../middleware/isLoggedIn");

const profileRoutes = Router();

profileRoutes.put("/:id", isLoggedIn, profileController.putUpdateProfile);

module.exports = profileRoutes;