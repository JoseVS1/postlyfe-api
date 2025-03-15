const { Router } = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const profileRoutes = require("./profileRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const followRoutes = require("./followRoutes");
const likeRoutes = require("./likeRoutes");

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/users", userRoutes);
apiRoutes.use("/profiles", profileRoutes);
apiRoutes.use("/posts", postRoutes);
apiRoutes.use("/comments", commentRoutes);
apiRoutes.use("/follows", followRoutes);
apiRoutes.use("/likes", likeRoutes);

module.exports = apiRoutes;