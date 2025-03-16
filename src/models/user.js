const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Role = require("./role");

const User = sequelize.define(
    "User",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        fullname: { type: DataTypes.STRING(255), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
        address: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.STRING(15), allowNull: true },
        date_of_birth: { type: DataTypes.DATE, allowNull: true },
        role_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 2 },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

module.exports = User;
