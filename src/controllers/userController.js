const UserService = require("../services/userService");

const UserController = {
    async countUsers(req, res) {
        try {
            const totalUsers = await UserService.countUsers();
            res.status(200).json({ total: totalUsers });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi đếm số người dùng", error });
        }
    },
};

module.exports = UserController;
