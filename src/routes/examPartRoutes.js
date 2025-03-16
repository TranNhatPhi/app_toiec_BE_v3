const express = require("express");
const ExamPartController = require("../controllers/examPartController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExamParts
 *   description: Quản lý các phần của bài thi TOEIC
 */

/**
 * @swagger
 * /api/exam-parts:
 *   get:
 *     summary: Lấy danh sách tất cả các phần của bài thi
 *     tags: [ExamParts]
 *     responses:
 *       200:
 *         description: Trả về danh sách phần thi
 */
router.get("/", ExamPartController.getAllParts);

/**
 * @swagger
 * /api/exam-parts/{id}:
 *   get:
 *     summary: Lấy thông tin của một phần thi theo ID
 *     tags: [ExamParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phần thi cần lấy
 *     responses:
 *       200:
 *         description: Trả về phần thi theo ID
 *       404:
 *         description: Không tìm thấy phần thi
 */
router.get("/:id", ExamPartController.getPartById);

/**
 * @swagger
 * /api/exam-parts:
 *   post:
 *     summary: Tạo một phần thi mới
 *     tags: [ExamParts]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exam_id:
 *                 type: integer
 *                 example: 1
 *               part_number:
 *                 type: integer
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: "Reading Comprehension"
 *               total_questions:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: Phần thi đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.post("/", verifyToken, ExamPartController.createPart);

/**
 * @swagger
 * /api/exam-parts/{id}:
 *   put:
 *     summary: Cập nhật thông tin phần thi
 *     tags: [ExamParts]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phần thi cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exam_id:
 *                 type: integer
 *                 example: 1
 *               part_number:
 *                 type: integer
 *                 example: 4
 *               description:
 *                 type: string
 *                 example: "Listening Section"
 *               total_questions:
 *                 type: integer
 *                 example: 40
 *     responses:
 *       200:
 *         description: Phần thi đã được cập nhật
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       404:
 *         description: Không tìm thấy phần thi
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.put("/:id", verifyToken, ExamPartController.updatePart);

/**
 * @swagger
 * /api/exam-parts/{id}:
 *   delete:
 *     summary: Xóa phần thi theo ID
 *     tags: [ExamParts]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phần thi cần xóa
 *     responses:
 *       200:
 *         description: Phần thi đã được xóa thành công
 *       404:
 *         description: Không tìm thấy phần thi
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.delete("/:id", verifyToken, ExamPartController.deletePart);

module.exports = router;
