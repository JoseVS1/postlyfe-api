const Profile = require("../models/prismaClient").profile;

const putUpdateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, gender, bio, profilePictureUrl} = req.body;
        let birthDate = req.body.birthDate;

        if (birthDate) {
            birthDate = new Date(birthDate);
        };

        const newProfile = await Profile.update({
            where: {
                id
            },
            data: {
                firstName,
                lastName,
                birthDate,
                gender,
                bio,
                profilePictureUrl
            }
        });

        return res.status(200).json({ message: "Profile updated successfully", profile: newProfile });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    };
};

module.exports = {
    putUpdateProfile
}