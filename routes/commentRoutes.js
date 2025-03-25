const { Router } = require("express");
const commentController = require("../controllers/commentController");
const isLoggedIn = require("../middleware/isLoggedIn");

const commentRoutes = Router();

commentRoutes.get("/posts/:id", commentController.getComments);
commentRoutes.get("/:id", commentController.getReplies);
commentRoutes.post("/", isLoggedIn, commentController.postCreateComment);
commentRoutes.put("/:id", isLoggedIn, commentController.putUpdateComment);
commentRoutes.delete("/:id", isLoggedIn, commentController.deleteComment);

module.exports = commentRoutes;