const Follow = require("../models/prismaClient").follow;

const getFollowersStatus = async (req, res) => {
    try {
        const followersStatus = await Follow.findMany({
            where: {
                followerId: req.user.id
            }
        });

        return res.status(200).json({ message: "Followers status retrieved successfully", followersStatus });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const getFollowStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const followStatus = await Follow.findUnique({
            where: {
                userId: id,
                followerId: req.user.id
            }
        });

        if (!followStatus) {
            return res.status(404).json({ message: "No status" });
        };

        return res.status(200).json({ message: "Follower status retrieved successfully", followStatus });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const postCreateFollow = async (req, res) => {
    try {
        const { id } = req.body;

        const newFollow = await Follow.create({
            data: {
                userId: id,
                followerId: req.user.id,
                status: "pending"
            }
        });

        return res.status(200).json({ message: "Follow status created successfully", followStatus: newFollow });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

const putUpdateFollow = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const followStatus = await Follow.findUnique({
            where: {
                id
            }
        });

        if (!followStatus) {
            return res.status(404).json({ message: "Follow status not found" });
        }

        const newFollow = await Follow.update({
            where: {
                id
            },
            data: {
                status
            }
        });

        return res.status(200).json({ message: "Follow status updated successfully", followStatus: newFollow });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

module.exports = {
    getFollowersStatus,
    getFollowStatus,
    postCreateFollow,
    putUpdateFollow
}