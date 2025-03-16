const { sequelize } = require("../config/db");
const User = require("./user");
const Exam = require("./exam");
const ExamPart = require("./examPart");
const ExamResult = require("./examResults");
const Question = require("./question");
const Role = require("./role");
const Detail = require("./detail")

const initDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("✅ Database đã được đồng bộ!");

        // 🟢 Kiểm tra nếu bảng roles chưa có dữ liệu thì thêm mới
        const roles = ["Admin", "User", "Moderator"];
        for (let i = 0; i < roles.length; i++) {
            await Role.findOrCreate({ where: { id: i + 1 }, defaults: { name: roles[i] } });
        }
        console.log("✅ Dữ liệu roles đã được thêm!");

        console.log("🎉 Database sẵn sàng!");
    } catch (error) {
        console.error("❌ Lỗi khi khởi tạo database:", error);
    }
};

// Chạy khởi tạo database
initDatabase();
