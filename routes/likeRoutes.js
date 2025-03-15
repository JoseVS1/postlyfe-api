const { Router } = require("express");
const likeController = require("../controllers/likeController");
const isLoggedIn = require("../middleware/isLoggedIn");

const likeRoutes = Router();

likeRoutes.get("/:id", isLoggedIn, likeController.getLikes);
likeRoutes.post("/", isLoggedIn, likeController.postCreateLike);
likeRoutes.delete("/:id", isLoggedIn, likeController.deleteLike);

module.exports = likeRoutes;