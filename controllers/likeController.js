const Like = require("../models/prismaClient").like;
const Post = require("../models/prismaClient").post;

const getLikes = async (req, res) => {
    try {
        const { id } = req.params;

        const likes = await Like.findMany({
            where: {
                postId: id
            }
        });

        const likedByUser = await Like.findFirst({
            where: {
                postId: id,
                userId: req.user.id
            }
        });

        return res.status(200).json({ message: "Likes retrieved successfully", likes, liked: likedByUser });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const postCreateLike = async (req, res) => {
    try {
        const { postId } = req.body;

        const newLike = await Like.create({
            data: {
                postId,
                userId: req.user.id
            }
        });

        const post = await Post.findUnique({
            where: {
                id: postId
            }
        });

        const newPost = await Post.update({
            where: {
                id: postId
            },
            data: {
                likeCount: post.likeCount + 1
            }
        });

        return res.status(201).json({ message: "Liked post successfully", liked: true, post: newPost });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const deleteLike = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLike = await Like.deleteMany({
            where: {
                postId: id,
                userId: req.user.id
            }
        });

        const post = await Post.findUnique({
            where: {
                id
            }
        })

        const newPost = await Post.update({
            where: {
                id
            },
            data: {
                likeCount: post.likeCount > 0 ? post.likeCount - 1 : 0
            }
        });

        return res.status(200).json({ message: "Like removed successfully", liked: false, post: newPost });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

module.exports = {
    getLikes,
    postCreateLike,
    deleteLike
}