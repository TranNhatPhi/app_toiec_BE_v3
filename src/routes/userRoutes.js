const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
/**
 * @swagger
 * /api/users/count:
 *   get:
 *     summary: Lấy tổng số người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Tổng số người dùng được trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 100
 *       500:
 *         description: Lỗi máy chủ
 */

router.get("/count", UserController.countUsers);

module.exports = router;
