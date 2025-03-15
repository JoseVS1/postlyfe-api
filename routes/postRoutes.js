const { Router } = require("express");
const postController = require("../controllers/postController");
const isLoggedIn = require("../middleware/isLoggedIn");

const postRoutes = Router();

postRoutes.get("/", postController.getPosts);
postRoutes.get("/:id", postController.getPost);
postRoutes.post("/", isLoggedIn, postController.postCreatePost);
postRoutes.put("/:id", isLoggedIn, postController.putUpdatePost);

module.exports = postRoutes;