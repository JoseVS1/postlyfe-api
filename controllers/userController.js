const User = require("../models/prismaClient").user;

const getUsers = async (req, res) => {
    try {
        const users = await User.findMany({
            include: {
                profile: true
            }
        });

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

module.exports = {
    getUsers,
    getUser
}