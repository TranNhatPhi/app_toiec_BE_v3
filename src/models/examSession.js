const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Exam = require("./exam");
const User = require("./user");

const ExamSession = sequelize.define("ExamSession", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "exams", key: "id" }
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Cho phép null
        references: { model: "users", key: "id" }
    },

    questions_json: {
        type: DataTypes.JSON,
        allowNull: false
    },

    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "exam_sessions",
    timestamps: false
});

// 🟢 Thiết lập quan hệ
Exam.hasMany(ExamSession, { foreignKey: "exam_id" });
ExamSession.belongsTo(Exam, { foreignKey: "exam_id" });

// Cập nhật quan hệ với User
// Nếu user_id có thể là null, bạn không cần quan hệ bắt buộc
User.hasMany(ExamSession, { foreignKey: "user_id" });
ExamSession.belongsTo(User, { foreignKey: "user_id", allowNull: true }); // Cho phép user_id là null

module.exports = ExamSession;
