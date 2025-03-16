const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Exam = sequelize.define("Exam", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false }, // ✅ Chuyển sang INTEGER
    total_questions: { type: DataTypes.INTEGER, defaultValue: 200 },
    audio: { type: DataTypes.STRING(255), allowNull: true }, // Thêm trường audio
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: "exams",
    timestamps: false
});

module.exports = Exam;
