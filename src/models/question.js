const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ExamPart = require("./examPart");
const Exam = require("./exam");

const Question = sequelize.define("Question", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: ExamPart, key: "id" },
        onDelete: "CASCADE"
    },
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Không thể null vì mỗi câu hỏi sẽ liên kết với một bài thi
        references: { model: "exams", key: "id" },
        onDelete: "CASCADE"
    },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    option_a: { type: DataTypes.TEXT, allowNull: false },
    option_b: { type: DataTypes.TEXT, allowNull: false },
    option_c: { type: DataTypes.TEXT, allowNull: false },
    option_d: { type: DataTypes.TEXT, allowNull: true },
    correct_answer: {
        type: DataTypes.ENUM("A", "B", "C", "D"),
        allowNull: false
    },
    image_filename: { type: DataTypes.STRING(255), allowNull: true }, // 🆕 Hỗ trợ ảnh
    order: {  // Thêm trường order để lưu thứ tự câu hỏi
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: "questions",
    timestamps: false
});

// 🟢 Thiết lập quan hệ
ExamPart.hasMany(Question, { foreignKey: "part_id" });
Question.belongsTo(ExamPart, { foreignKey: "part_id" });

// Thiết lập quan hệ giữa Question và Exam
Exam.hasMany(Question, { foreignKey: "exam_id" });
Question.belongsTo(Exam, { foreignKey: "exam_id" });

module.exports = Question;
