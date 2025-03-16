const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user");
const Exam = require("./exam");

const ExamResult = sequelize.define("ExamResult", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" }
    },
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Exam, key: "id" }
    },
    score: { type: DataTypes.DECIMAL(5, 2), allowNull: true }, // Tổng điểm
    listening_score: { type: DataTypes.INTEGER, allowNull: true }, // 🆕 Điểm phần Listening
    reading_score: { type: DataTypes.INTEGER, allowNull: true }, // 🆕 Điểm phần Reading
    correct_answers: { type: DataTypes.INTEGER, allowNull: true },
    wrong_answers: { type: DataTypes.INTEGER, allowNull: true }, // 🆕 Số câu sai
    unanswered_questions: { type: DataTypes.INTEGER, allowNull: true }, // 🆕 Số câu không trả lời
    total_questions: { type: DataTypes.INTEGER, allowNull: true },
    completed_time: { type: DataTypes.INTEGER, allowNull: true }, // 🆕 Thời gian hoàn thành (phút)
    status: {
        type: DataTypes.ENUM("IN_PROGRESS", "COMPLETED", "CANCELLED"),
        allowNull: false,
        defaultValue: "IN_PROGRESS"
    },
    completed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: "exam_results",
    timestamps: false
});

// 🟢 Thiết lập quan hệ
User.hasMany(ExamResult, { foreignKey: "user_id" });
Exam.hasMany(ExamResult, { foreignKey: "exam_id" });
ExamResult.belongsTo(User, { foreignKey: "user_id" });
ExamResult.belongsTo(Exam, { foreignKey: "exam_id" });

module.exports = ExamResult;
