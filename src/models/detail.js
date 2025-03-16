const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Question = require("./question");
const ExamResult = require("./examResults");

const Detail = sequelize.define("Detail", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Question, key: "id" },
        onDelete: "CASCADE"
    },
    exam_result_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: ExamResult, key: "id" },
        onDelete: "CASCADE"
    },
    selected_answer: {
        type: DataTypes.ENUM("A", "B", "C", "D"),
        allowNull: true // 🆕 Câu trả lời của user
    },
    correct_answer: {
        type: DataTypes.ENUM("A", "B", "C", "D"),
        allowNull: false // 🆕 Đáp án đúng
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // 🆕 1 nếu đúng, 0 nếu sai
    }
}, {
    tableName: "details",
    timestamps: false
});

// 🟢 Thiết lập quan hệ
Question.hasOne(Detail, { foreignKey: "question_id" });
Detail.belongsTo(Question, { foreignKey: "question_id" });

ExamResult.hasMany(Detail, { foreignKey: "exam_result_id" });
Detail.belongsTo(ExamResult, { foreignKey: "exam_result_id" });

module.exports = Detail;
