const Comment = require("../models/prismaClient").comment;

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.findMany({
            where: {
                postId: id
            }
        });

        return res.status(200).json({ message: "Post comments retrieved successfully", comments });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const postCreateComment = async (req, res) => {
    try {
        const { text, postId } = req.body;

        const newComment = await Comment.create({
            data: {
                text,
                userId: req.user.id,
                postId
            }
        });

        return res.status(201).json({ message: "Comment created successfully", comment: newComment });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const putUpdateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

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

module.exports = {
    getComments,
    postCreateComment,
    putUpdateComment
}