const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Role = sequelize.define("Role", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
}, {
    tableName: "roles",
    timestamps: false,
});

module.exports = Role;
