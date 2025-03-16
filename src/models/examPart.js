const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Exam = require("./exam");

const ExamPart = sequelize.define("ExamPart", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Exam, key: "id" }
    },
    part_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 7 } // TOEIC có 7 phần
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    total_questions: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: "exam_parts",
    timestamps: false
});

// 🟢 Thiết lập quan hệ
Exam.hasMany(ExamPart, { foreignKey: "exam_id" });
ExamPart.belongsTo(Exam, { foreignKey: "exam_id" });

module.exports = ExamPart;
