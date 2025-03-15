const Post = require("../models/prismaClient").post;

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findMany();

        return res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findUnique({
            where: {
                id
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        };

        return res.status(200).json({ message: "Post retrieved successfully", post});
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

const postCreatePost = async (req, res) => {
    try {
        const { content } = req.body;

        const newPost = await Post.create({
            data: {
                userId: req.user.id,
                content
            }
        });

        return res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

const putUpdatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, isDeleted } = req.body;

        const post = await Post.findUnique({
            where: {
                id
            }
        });

        if (post.userId !== req.user.id) {
            return res.status(401).json({ message: "Post belongs to another user" });
        };

        const newPost = await Post.update({
            where: {
                id
            },
            data: {
                content,
                isDeleted
            }
        });

        return res.status(200).json({ message: "Post updated successfully", post: newPost });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    getPosts,
    getPost,
    postCreatePost,
    putUpdatePost
}