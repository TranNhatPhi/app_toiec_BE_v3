const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || "apptoiecv3",
    process.env.MYSQL_USER || "root",
    process.env.MYSQL_PASSWORD || "123456",
    {
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT || 3307,
        dialect: "mysql",
        logging: false, // Ẩn log SQL
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Kết nối MySQL thành công!");
    } catch (error) {
        console.error("❌ Lỗi kết nối MySQL:", error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
