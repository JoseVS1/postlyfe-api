const { Router } = require("express");
const followController = require("../controllers/followController");
const isLoggedIn = require("../middleware/isLoggedIn");

const followRoutes = Router();

followRoutes.get("/", isLoggedIn, followController.getFollowersStatus);
followRoutes.get("/:id", isLoggedIn, followController.getFollowStatus);
followRoutes.post("/", isLoggedIn, followController.postCreateFollow);
followRoutes.put("/:id", isLoggedIn, followController.putUpdateFollow);

module.exports = followRoutes;