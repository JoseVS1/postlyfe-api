const Comment = require("../models/prismaClient").comment;
const Post = require("../models/prismaClient").post;

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.findMany({
            where: {
                postId: id,
                parentCommentId: null
            }
        });

        return res.status(200).json({ message: "Post comments retrieved successfully", comments });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const getReplies = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findUnique({
            where: {
                id
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        };

        const replies = await Comment.findMany({
            where: {
                parentCommentId: id
            }
        });

        return res.status(200).json({ message: "Comment replies retrieved successfully", replies });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

const postCreateComment = async (req, res) => {
    try {
        const { text, postId, parentCommentId } = req.body;

        const newComment = await Comment.create({
            data: {
                text,
                userId: req.user.id,
                postId,
                parentCommentId: parentCommentId || undefined
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
                commentCount: post.commentCount + 1
            }
        });

        return res.status(201).json({ message: "Comment created successfully", comment: newComment, post: newPost });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const putUpdateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const comment = await Comment.findUnique({
            where: {
                id
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        };

        if (req.user.id !== comment.userId) {
            return res.status(401).json({ message: "Comment belongs to another user" });
        };

        const newComment = await Comment.update({
            where: {
                id
            },
            data: {
                text
            }
        });

        return res.status(200).json({ message: "Comment updated successfully", comment: newComment });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findUnique({
            where: {
                id
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        };

        if (req.user.id !== comment.userId) {
            return res.status(401).json({ message: "Comment belongs to another user" });
        };

        const deletedComment = await Comment.delete({
            where: {
                id
            }
        });

        const post = await Post.findUnique({
            where: {
                id: comment.postId
            }
        });

        const newPost = await Post.update({
            where: {
                id: comment.postId
            },
            data: {
                commentCount: post.commentCount > 0 ? post.commentCount - 1 : 0
            }
        });

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    getComments,
    getReplies,
    postCreateComment,
    putUpdateComment,
    deleteComment
}