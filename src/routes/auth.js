const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sequelize } = require("../config/db");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Quản lý xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               retype_password:
 *                 type: string
 *                 example: "123456"
 *               address:
 *                 type: string
 *                 example: "Hà Nội, Việt Nam"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi dữ liệu đầu vào (Mật khẩu không khớp, email đã tồn tại, v.v.)
 *       500:
 *         description: Lỗi hệ thống
 */
router.post("/register", async (req, res) => {
    const { fullname, email, password, retype_password, address, phone, date_of_birth } = req.body;

    if (password !== retype_password) {
        return res.status(400).json({ error: "Mật khẩu không khớp!" });
    }

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email đã tồn tại" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            address,
            phone,
            date_of_birth,
            role_id: 2, // Mặc định role là User
        });

        // Tạo token JWT
        const token = jwt.sign({ userId: newUser.id, email: newUser.email, role: newUser.role_id }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.status(201).json({ message: "Đăng ký thành công", token });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "phivt1234@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng nhập thành công"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       400:
 *         description: Sai email hoặc mật khẩu
 *       500:
 *         description: Lỗi hệ thống
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Email không tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Mật khẩu không đúng" });
        }

        // Tạo token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        console.log("Generated Token:", token); // ✅ Kiểm tra token sau khi tạo

        res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
});


module.exports = router;
