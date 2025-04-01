const express = require("express");
const ExamResultController = require("../controllers/examResultController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExamResults
 *   description: Quản lý kết quả bài thi TOEIC
 */

/**
 * @swagger
 * /api/exam-results:
 *   get:
 *     summary: Lấy danh sách tất cả kết quả bài thi
 *     tags: [ExamResults]
 *     responses:
 *       200:
 *         description: Trả về danh sách kết quả bài thi
 */
router.get("/", ExamResultController.getAllExamResults);

/**
 * @swagger
 * /api/exam-results/{id}:
 *   get:
 *     summary: Lấy thông tin kết quả bài thi theo ID
 *     tags: [ExamResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của kết quả bài thi cần lấy
 *     responses:
 *       200:
 *         description: Trả về kết quả bài thi theo ID
 *       404:
 *         description: Không tìm thấy kết quả bài thi
 */
router.get("/:id", ExamResultController.getExamResultById);

/**
 * @swagger
 * /api/exam-results/user/{user_id}:
 *   get:
 *     summary: Lấy danh sách kết quả bài thi theo User ID
 *     tags: [ExamResults]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng cần lấy kết quả bài thi
 *     responses:
 *       200:
 *         description: Trả về danh sách kết quả bài thi của người dùng
 *       404:
 *         description: Không tìm thấy kết quả bài thi nào cho người dùng này
 */
router.get("/user/:user_id", ExamResultController.getExamResultsByUserId);

/**
 * @swagger
 * /api/exam-results/details/{id}:
 *   get:
 *     summary: Lấy chi tiết kết quả bài thi (bao gồm thông tin user & bài thi)
 *     tags: [ExamResults]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của kết quả bài thi cần lấy
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết kết quả bài thi
 *       404:
 *         description: Không tìm thấy kết quả bài thi
 */
router.get("/details/:id", ExamResultController.getExamResultWithDetails);

/**
 * @swagger
 * /api/exam-results:
 *   post:
 *     summary: Thêm kết quả bài thi mới
 *     tags: [ExamResults]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               exam_id:
 *                 type: integer
 *                 example: 3
 *               score:
 *                 type: number
 *                 example: 850.5
 *               correct_answers:
 *                 type: integer
 *                 example: 170
 *               incorrect_answers:
 *                 type: integer
 *                 example: 30
 *               unanswered_questions:
 *                 type: integer
 *                 example: 0
 *               total_questions:
 *                 type: integer
 *                 example: 200
 *               completion_time:
 *                 type: integer
 *                 example: 45
 *     responses:
 *       201:
 *         description: Kết quả bài thi đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.post("/", verifyToken, ExamResultController.createExamResult);

/**
 * @swagger
 * /api/exam-results/submit:
 *   post:
 *     summary: Nộp bài thi & tính kết quả
 *     tags: [ExamResults]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exam_id
 *               - answers
 *               - completed_time
 *             properties:
 *               exam_id:
 *                 type: integer
 *                 example: 1  # Example exam_id
 *               completed_time:
 *                 type: integer
 *                 description: "Thời gian hoàn thành bài thi (tính bằng phút)"
 *                 example: 45  # Example completed_time
 *               answers:
 *                 type: array
 *                 description: "Danh sách câu trả lời của người dùng"
 *                 items:
 *                   type: object
 *                   properties:
 *                     question_id:
 *                       type: integer
 *                       description: "ID của câu hỏi"
 *                       example: 1  # Example question_id
 *                     selected_answer:
 *                       type: string
 *                       description: "Đáp án do người dùng chọn (A, B, C, D hoặc null nếu không làm)"
 *                       example: "A"  # Example selected_answer
 *             example:
 *               exam_id: 1
 *               completed_time: 45
 *               answers:
 *                 - question_id: 1
 *                   selected_answer: "A"
 *                 - question_id: 2
 *                   selected_answer: "B"
 *                 - question_id: 3
 *                   selected_answer: "C"
 *                 - question_id: 4
 *                   selected_answer: "A"
 *                 - question_id: 5
 *                   selected_answer: "D"
 *                 - question_id: 6
 *                   selected_answer: "A"
 *                 - question_id: 7
 *                   selected_answer: "B"
 *                 - question_id: 8
 *                   selected_answer: "C"
 *                 - question_id: 9
 *                   selected_answer: "A"
 *                 - question_id: 10
 *                   selected_answer: "D"
 *                 - question_id: 11
 *                   selected_answer: "A"
 *                 - question_id: 12
 *                   selected_answer: "B"
 *     responses:
 *       200:
 *         description: Bài thi đã được nộp thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bài thi đã được nộp thành công!"
 *                 correct_answers:
 *                   type: integer
 *                   description: "Số câu trả lời đúng"
 *                   example: 75
 *                 wrong_answers:
 *                   type: integer
 *                   description: "Số câu trả lời sai"
 *                   example: 25
 *                 unanswered_questions:
 *                   type: integer
 *                   description: "Số câu không làm"
 *                   example: 0
 *                 total_score:
 *                   type: integer
 *                   description: "Điểm tổng (TOEIC scale)"
 *                   example: 850
 *                 completed_time:
 *                   type: integer
 *                   description: "Thời gian hoàn thành bài thi"
 *                   example: 45
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ (thiếu trường bắt buộc hoặc format sai)
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 *       403:
 *         description: Người dùng không có quyền nộp bài thi này
 *       500:
 *         description: Lỗi hệ thống khi xử lý bài thi
 */

router.post("/submit", verifyToken, ExamResultController.submitExamAnswers);


/**
 * @swagger
 * /api/exam-results/{id}:
 *   delete:
 *     summary: Xóa kết quả bài thi theo ID
 *     tags: [ExamResults]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của kết quả bài thi cần xóa
 *     responses:
 *       200:
 *         description: Kết quả bài thi đã được xóa thành công
 *       404:
 *         description: Không tìm thấy kết quả bài thi
 */
router.delete("/:id", verifyToken, ExamResultController.deleteExamResult);


/**
 * @swagger
 * /api/exam-results/stats/daily-attempts:
 *   get:
 *     summary: Thống kê số lượt thi mỗi ngày trong tháng
 *     tags: [ExamResults]
 *     responses:
 *       200:
 *         description: Trả về danh sách lượt thi theo từng ngày
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 2025-03-01
 *                   count:
 *                     type: integer
 *                     example: 5
 */
router.get("/stats/daily-attempts", ExamResultController.getDailyExamAttempts);

/**
 * @swagger
 * /api/exam-results/stats/avg-score-last-7-days:   
 *   get:
 *     summary: Thống kê điểm trung bình trong 7 ngày gần đây
 *     tags: [ExamResults]
 *     responses:
 *       200:
 *         description: Trả về điểm trung bình trong 7 ngày gần đây
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  avg_score:
 *                    type: number
 */
router.get("/stats/avg-score-last-7-days", ExamResultController.getAverageScoreLast7Days);

module.exports = router;
