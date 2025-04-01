const User = require("../models/user");

const UserService = {
    async countUsers() {
        return await User.count();
    },
};

module.exports = UserService;
