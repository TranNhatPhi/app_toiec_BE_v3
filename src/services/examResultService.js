const ExamResult = require("../models/examResults");
const User = require("../models/user");
const Exam = require("../models/exam");
const Detail = require("../models/detail");
const Question = require("../models/question");
const { Op, fn, col, literal } = require("sequelize");
const ExamResultService = {
    // 🟢 Lấy tất cả kết quả bài thi
    async getAllExamResults() {
        try {
            const examResults = await ExamResult.findAll({
                order: [['id', 'DESC']]  // Sắp xếp kết quả theo cột id giảm dần (DESC) 
            });
            return examResults;
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
            return await ExamResult.findAll({ where: { user_id: userId }, order: [['id', 'DESC']] });
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
    // async submitExamAnswers(user_id, exam_id, answers, completedTime) {
    //     try {
    //         // 🔹 Kiểm tra dữ liệu hợp lệ
    //         if (!user_id || !exam_id || !answers || !Array.isArray(answers)) {
    //             throw new Error("Dữ liệu đầu vào không hợp lệ!");
    //         }

    //         // 🔹 Kiểm tra xem user_id và exam_id có hợp lệ không
    //         const userExists = await User.findByPk(user_id);
    //         if (!userExists) {
    //             throw new Error(`User ID ${user_id} không tồn tại!`);
    //         }

    //         const examExists = await Exam.findByPk(exam_id);
    //         if (!examExists) {
    //             throw new Error(`Exam ID ${exam_id} không tồn tại!`);
    //         }

    //         // 🔹 Kiểm tra xem kết quả bài thi đã tồn tại chưa
    //         let examResult = await ExamResult.findOne({
    //             where: { user_id, exam_id }
    //         });

    //         if (!examResult) {
    //             examResult = await ExamResult.create({
    //                 user_id,
    //                 exam_id,
    //                 score: 0,
    //                 correct_answers: 0,
    //                 wrong_answers: 0,
    //                 unanswered_questions: 0,
    //                 total_questions: answers.length,
    //                 completed_time: completedTime,
    //                 status: "IN_PROGRESS"
    //             });
    //         }

    //         let correctCount = 0;
    //         let wrongCount = 0;
    //         let totalScore = 0;

    //         for (const answer of answers) {
    //             const { question_id, selected_answer } = answer;
    //             const question = await Question.findByPk(question_id);
    //             if (!question) continue;

    //             const isCorrect = selected_answer && selected_answer === question.correct_answer;

    //             await Detail.create({
    //                 exam_result_id: examResult.id,
    //                 question_id,
    //                 selected_answer,
    //                 correct_answer: question.correct_answer,
    //                 score: isCorrect ? 5 : 0
    //             });

    //             if (isCorrect) {
    //                 correctCount++;
    //                 totalScore += 5; // ✅ TOEIC: Mỗi câu đúng 5 điểm
    //             } else {
    //                 wrongCount++;
    //             }
    //             // 🔹 Tính số câu chưa trả lời
    //             let unansweredCount = 200 - correctCount - wrongCount;
    //         }


    //         // 🔹 Cập nhật kết quả bài thi
    //         await ExamResult.update(
    //             {
    //                 correct_answers: correctCount,
    //                 wrong_answers: wrongCount,
    //                 unanswered_questions: unansweredCount,
    //                 score: totalScore,
    //                 completed_time: completedTime,
    //                 status: "COMPLETED",
    //                 completed_at: new Date()
    //             },
    //             { where: { id: examResult.id } }
    //         );

    //         return {
    //             message: "Nộp bài thành công!",
    //             correct_answers: correctCount,
    //             wrong_answers: wrongCount,
    //             unanswered_questions: unansweredCount,
    //             total_score: totalScore,
    //             completed_time: completedTime,
    //             completed_at: Date.now()
    //         };
    //     } catch (error) {
    //         console.error("❌ Lỗi khi xử lý bài thi:", error);
    //         throw new Error(error.message || "Lỗi hệ thống khi nộp bài!");
    //     }
    // },
    // 🟢 Tạo kết quả bài thi và tính toán điểm số
    // 🟢 Tạo kết quả bài thi và tính toán điểm số
    async submitExamAnswers(user_id, exam_id, answers, completedTime) {
        try {
            // 🔹 Kiểm tra dữ liệu hợp lệ
            if (!user_id || !exam_id || !answers || !Array.isArray(answers)) {
                throw new Error("Dữ liệu đầu vào không hợp lệ!");
            }

            const userExists = await User.findByPk(user_id);
            if (!userExists) throw new Error(`User ID ${user_id} không tồn tại!`);

            const examExists = await Exam.findByPk(exam_id);
            if (!examExists) throw new Error(`Exam ID ${exam_id} không tồn tại!`);

            let correctCount = 0;
            let wrongCount = 0;
            let unansweredCount = 0;
            let totalScore = 0;

            // 🔹 Tính toán điểm
            for (const answer of answers) {
                const { question_id, selected_answer } = answer;
                const question = await Question.findByPk(question_id);
                if (!question) continue;

                const isCorrect = selected_answer === question.correct_answer;

                if (isCorrect) {
                    correctCount++;
                    totalScore += 5;
                } else if (selected_answer) {
                    wrongCount++;
                }
            }

            unansweredCount = examExists.total_questions - correctCount - wrongCount;

            // 🔹 Tạo bản ghi kết quả bài thi
            const newExamResult = await ExamResult.create({
                user_id,
                exam_id,
                score: totalScore,
                correct_answers: correctCount,
                wrong_answers: wrongCount,
                unanswered_questions: unansweredCount,
                total_questions: answers.length,
                completed_time: completedTime,
                status: "COMPLETED",
                completed_at: new Date(),
                detail: examExists.title // 🆕 Lưu chi tiết bài thi
            });

            // 🔹 Lưu chi tiết từng câu trả lời
            for (const answer of answers) {
                const { question_id, selected_answer } = answer;
                const question = await Question.findByPk(question_id);
                if (!question) continue;

                const isCorrect = selected_answer === question.correct_answer;

                await Detail.create({
                    exam_result_id: newExamResult.id,
                    question_id,
                    selected_answer,
                    correct_answer: question.correct_answer,
                    score: isCorrect ? 5 : 0
                });
            }

            return {
                message: "✅ Nộp bài thành công!",
                correct_answers: correctCount,
                wrong_answers: wrongCount,
                unanswered_questions: unansweredCount,
                total_score: totalScore,
                completed_time: completedTime,
                completed_at: new Date()
            };
        } catch (error) {
            console.error("❌ Lỗi khi xử lý bài thi:", error);
            throw new Error(error.message || "Lỗi hệ thống khi nộp bài!");
        }
    },
    // 📊 Thống kê số lượt thi mỗi ngày trong tháng hiện tại
    async getDailyExamAttempts() {
        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

            const results = await ExamResult.findAll({
                attributes: [
                    [fn('DATE', col('completed_at')), 'date'],
                    [fn('COUNT', col('id')), 'count']
                ],
                where: {
                    completed_at: {
                        [Op.between]: [startOfMonth, endOfMonth],
                    },
                    status: 'COMPLETED'
                },
                group: [fn('DATE', col('completed_at'))],
                order: [[literal('date'), 'ASC']]
            });

            return results.map(result => ({
                date: result.getDataValue('date'),
                count: result.getDataValue('count')
            }));
        } catch (error) {
            console.error("❌ Lỗi khi thống kê số lượt thi mỗi ngày:", error);
            throw new Error("Không thể thống kê số lượt thi theo ngày");
        }
    },
    async getAverageScoreLast7Days() {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const result = await ExamResult.findOne({
                attributes: [[fn("AVG", col("score")), "average_score"]],
                where: {
                    completed_at: {
                        [Op.gte]: sevenDaysAgo,
                    },
                    status: "COMPLETED",
                    score: { [Op.ne]: null }, // Đảm bảo có điểm
                },
                raw: true,
            });

            const avg = result?.average_score;
            if (!avg) return 0;

            return parseFloat(parseFloat(avg).toFixed(2));
        } catch (error) {
            console.error("❌ Lỗi khi tính điểm trung bình:", error);
            throw new Error("Lỗi khi lấy điểm trung bình trong 7 ngày gần đây");
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
