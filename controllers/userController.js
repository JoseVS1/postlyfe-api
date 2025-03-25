const User = require("../models/prismaClient").user;
const Post = require("../models/prismaClient").post;
const Follow = require("../models/prismaClient").follow;

const getUsers = async (req, res) => {
    try {
        let pending = req.query.pending || null;
        let notFollowing = req.query.notFollowing || null;
        let accepted = req.query.accepted || null;

        const users = await User.findMany({
            where: {
                NOT: {
                    id: req.user.id
                }
            },
            include: {
                profile: true
            }
        });

        if (pending === "true") {
            const followersStatus = await Follow.findMany({
                where: {
                    followerId: req.user.id,
                    status: "pending"
                }
            });

            let pendingUsers = [];
            const followedUsersIds = followersStatus.map((u) => u.userId);


            if (followedUsersIds.length > 0) {
                pendingUsers = users.filter(u => followedUsersIds.includes(u.id));
            };

            return res.status(200).json({ message: "Users with a pending status retrieved successfully", users: pendingUsers });
        };

        if (notFollowing === "true") {
            const followersStatus = await Follow.findMany({
                where: {
                    followerId: req.user.id,
                }
            });

            let notFollowingUsers = users;
            const followedUsersIds = followersStatus.map((u) => u.userId);


            if (followedUsersIds.length > 0) {
                notFollowingUsers = users.filter(u => !followedUsersIds.includes(u.id));
            };

            return res.status(200).json({ message: "Not followed users retrieved successfully", users: notFollowingUsers });
        };

        if (accepted === "true") {
            const followersStatus = await Follow.findMany({
                where: {
                    OR: [
                        {
                            followerId: req.user.id,
                            status: "accepted"
                        },
                        {
                            userId: req.user.id,
                            status: "accepted"
                        }
                    ]
                }
            });

            let acceptedUsers = [];
            const acceptedUsersIds = followersStatus.map((u) => u.userId);


            if (acceptedUsersIds.length > 0) {
                acceptedUsers = users.filter(u => acceptedUsersIds.includes(u.id));
            };

            return res.status(200).json({ message: "Users with a pending status retrieved successfully", users: pendingUsers });
        }
    

        return res.status(200).json({
            message: "All users retrieved successfully",
            users
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findUnique({
            where: {
                id
            },
            include: {
                profile: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User retrieved successfully", user });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;

        const posts = await Post.findMany({
            where: {
                userId: id,
                isDeleted: false
            }
        });

        return res.status(200).json({ message: "User posts retrieved successfully", posts });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

module.exports = {
    getUsers,
    getUser,
    getUserPosts
}