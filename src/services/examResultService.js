const ExamResult = require("../models/examResults");
const User = require("../models/user");
const Exam = require("../models/exam");
const Detail = require("../models/detail");
const Question = require("../models/question");

const ExamResultService = {
    // 🟢 Lấy tất cả kết quả bài thi
    async getAllExamResults() {
        try {
            return await ExamResult.findAll();
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách kết quả bài thi:", error);
            throw new Error("Không thể lấy danh sách kết quả bài thi");
        }
    },

    // 🟢 Lấy kết quả bài thi theo ID
    async getExamResultById(resultId) {
        try {
            return await ExamResult.findByPk(resultId);
        } catch (error) {
            console.error("❌ Lỗi khi lấy kết quả bài thi:", error);
            throw new Error("Không thể lấy kết quả bài thi");
        }
    },

    // 🟢 Lấy tất cả kết quả của một người dùng
    async getExamResultsByUserId(userId) {
        try {
            return await ExamResult.findAll({ where: { user_id: userId } });
        } catch (error) {
            console.error("❌ Lỗi khi lấy kết quả bài thi của user:", error);
            throw new Error("Không thể lấy kết quả bài thi của user");
        }
    },

    // 🟢 Tạo kết quả bài thi (nếu chưa có)
    async createExamResult(data) {
        try {
            return await ExamResult.create(data);
        } catch (error) {
            console.error("❌ Lỗi khi tạo kết quả bài thi:", error);
            throw new Error("Không thể tạo kết quả bài thi");
        }
    },

    // 🔥 **Nộp bài thi và tính toán điểm số**
    async submitExamAnswers(user_id, exam_id, answers, completedTime) {
        try {
            // 🔹 Kiểm tra dữ liệu hợp lệ
            if (!user_id || !exam_id || !answers || !Array.isArray(answers)) {
                throw new Error("Dữ liệu đầu vào không hợp lệ!");
            }

            // 🔹 Kiểm tra xem user_id và exam_id có hợp lệ không
            const userExists = await User.findByPk(user_id);
            if (!userExists) {
                throw new Error(`User ID ${user_id} không tồn tại!`);
            }

            const examExists = await Exam.findByPk(exam_id);
            if (!examExists) {
                throw new Error(`Exam ID ${exam_id} không tồn tại!`);
            }

            // 🔹 Kiểm tra xem kết quả bài thi đã tồn tại chưa
            let examResult = await ExamResult.findOne({
                where: { user_id, exam_id }
            });

            if (!examResult) {
                examResult = await ExamResult.create({
                    user_id,
                    exam_id,
                    score: 0,
                    correct_answers: 0,
                    wrong_answers: 0,
                    unanswered_questions: 0,
                    total_questions: answers.length,
                    completed_time: completedTime,
                    status: "IN_PROGRESS"
                });
            }

            let correctCount = 0;
            let wrongCount = 0;
            let unansweredCount = 0;
            let totalScore = 0;

            for (const answer of answers) {
                const { question_id, selected_answer } = answer;
                const question = await Question.findByPk(question_id);
                if (!question) continue;

                const isCorrect = selected_answer && selected_answer === question.correct_answer;

                await Detail.create({
                    exam_result_id: examResult.id,
                    question_id,
                    selected_answer,
                    correct_answer: question.correct_answer,
                    score: isCorrect ? 5 : 0
                });

                if (!selected_answer) {
                    unansweredCount++;
                } else if (isCorrect) {
                    correctCount++;
                    totalScore += 5; // ✅ TOEIC: Mỗi câu đúng 5 điểm
                } else {
                    wrongCount++;
                }
            }

            // 🔹 Cập nhật kết quả bài thi
            await ExamResult.update(
                {
                    correct_answers: correctCount,
                    wrong_answers: wrongCount,
                    unanswered_questions: unansweredCount,
                    score: totalScore,
                    completed_time: completedTime,
                    status: "COMPLETED",
                    completed_at: new Date()
                },
                { where: { id: examResult.id } }
            );

            return {
                message: "Nộp bài thành công!",
                correct_answers: correctCount,
                wrong_answers: wrongCount,
                unanswered_questions: unansweredCount,  
                total_score: totalScore,
                completed_time: completedTime,
                completed_at: Date.now()
            };
        } catch (error) {
            console.error("❌ Lỗi khi xử lý bài thi:", error);
            throw new Error(error.message || "Lỗi hệ thống khi nộp bài!");
        }
    },

    // 🟢 Kiểm tra dữ liệu đầu vào
    validateData(data) {
        if (!data.user_id || !data.exam_id) {
            throw new Error("Thiếu user_id hoặc exam_id");
        }

        if (data.correct_answers < 0 || data.wrong_answers < 0 || data.unanswered_questions < 0) {
            throw new Error("Số câu trả lời không thể là số âm");
        }

        if (data.score < 0 || data.score > 990) {
            throw new Error("Điểm số phải từ 0 đến 990");
        }

        if (data.completed_time < 0) {
            throw new Error("Thời gian hoàn thành không hợp lệ!");
        }
    }
};

module.exports = ExamResultService;
