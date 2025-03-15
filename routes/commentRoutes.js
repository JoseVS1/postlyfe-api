const { Router } = require("express");
const commentController = require("../controllers/commentController");
const isLoggedIn = require("../middleware/isLoggedIn");

const commentRoutes = Router();

commentRoutes.get("/:id", commentController.getComments);
commentRoutes.post("/", isLoggedIn, commentController.postCreateComment);
commentRoutes.put("/:id", isLoggedIn, commentController.putUpdateComment);

module.exports = commentRoutes;