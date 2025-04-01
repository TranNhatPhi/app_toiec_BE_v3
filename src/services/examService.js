const ExamPart = require("../models/examPart"); // Add this import
const Exam = require("../models/exam");
const Question = require("../models/question");
const { Op } = require("sequelize");
const ExamSession = require("../models/examSession");

const ExamService = {
    // 🟢 Lấy danh sách câu hỏi của bài thi với phần và câu hỏi


    // async getExamQuestionsByExamId(examId) {
    //     try {
    //         // Query using Sequelize to fetch the Exam along with its ExamParts and Questions
    //         const examDetails = await Exam.findOne({
    //             where: {
    //                 id: examId // Filter by exam ID
    //             },
    //             attributes: ['id', 'title', 'duration', 'total_questions', 'audio'], // Lấy ID và tiêu đề bài thi
    //             include: [
    //                 {
    //                     model: ExamPart,
    //                     required: true, // Ensure this join returns results
    //                     attributes: ['id', 'part_number'], // Select part_id and part_number
    //                     order: [['part_number', 'ASC']],
    //                     include: [
    //                         {
    //                             model: Question,
    //                             required: true, // Ensure this join returns results
    //                             attributes: ['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'image_filename'], // Include all options
    //                             order: [['id', 'ASC']]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         });

    //         // Return the exam details in the requested format
    //         if (!examDetails) {
    //             throw new Error("Exam not found");
    //         }

    //         // Map the data to match the expected structure
    //         const result = {
    //             exam_id: examDetails.id,
    //             audio: examDetails.audio,
    //             title: examDetails.title,
    //             duration: examDetails.duration,
    //             parts: examDetails.ExamParts
    //                 .sort((a, b) => a.part_number - b.part_number)
    //                 .map(ep => ({
    //                     part_id: ep.id,
    //                     part_number: ep.part_number,
    //                     questions: ep.Questions.map(q => ({
    //                         question_text: q.question_text,
    //                         optionA: q.option_a, // Map option_a to optionA for consistency
    //                         optionB: q.option_b, // Map option_b to optionB
    //                         optionC: q.option_c, // Map option_c to optionC
    //                         optionD: q.option_d,  // Map option_d to optionD
    //                         image_filename: q.image_filename
    //                     }))
    //                 }))
    //         };

    //         return result;

    //     } catch (error) {
    //         console.error("Error fetching exam details:", error);
    //         throw error;
    //     }
    // },
    // 🟢 Lấy danh sách câu hỏi của bài thi với phần và câu hỏi
    // async getExamQuestionsByExamId(examId, isTimeExpired) {
    //     try {
    //         // Quy định số câu hỏi cho mỗi phần
    //         const partQuestionLimits = {
    //             1: 6,   // Part 1: 6 câu
    //             2: 25,  // Part 2: 25 câu
    //             3: 39,  // Part 3: 39 câu
    //             4: 30,  // Part 4: 30 câu
    //             5: 30,  // Part 5: 30 câu
    //             6: 16,  // Part 6: 16 câu
    //             7: 54   // Part 7: 54 câu
    //         };

    //         // Query to fetch the Exam along with its ExamParts and Questions
    //         const examDetails = await Exam.findOne({
    //             where: { id: examId },
    //             attributes: ['id', 'title', 'duration', 'total_questions', 'audio'],
    //             include: [
    //                 {
    //                     model: ExamPart,
    //                     required: true,
    //                     attributes: ['id', 'part_number'],
    //                     order: [['part_number', 'ASC']],
    //                     include: [
    //                         {
    //                             model: Question,
    //                             required: true,
    //                             attributes: ['id', 'exam_id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'image_filename'],
    //                             order: [['id', 'ASC']]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         });

    //         if (!examDetails) {
    //             throw new Error("Exam not found");
    //         }

    //         // Map the data to match the expected structure with random questions per part
    //         const result = {
    //             exam_id: examDetails.id,
    //             audio: examDetails.audio,
    //             title: examDetails.title,
    //             duration: examDetails.duration,
    //             parts: examDetails.ExamParts
    //                 .sort((a, b) => a.part_number - b.part_number)
    //                 .map(ep => {
    //                     const questionLimit = partQuestionLimits[ep.part_number] || 0;

    //                     let limitedQuestions = ep.Questions;

    //                     if (isTimeExpired) {
    //                         // Randomize the questions if time is expired
    //                         limitedQuestions = ep.Questions.sort(() => 0.5 - Math.random()).slice(0, questionLimit);
    //                     } else {
    //                         // Limit the number of questions without randomizing
    //                         limitedQuestions = ep.Questions.slice(0, questionLimit);
    //                     }

    //                     return {
    //                         part_id: ep.id,
    //                         part_number: ep.part_number,
    //                         questions: limitedQuestions.map(q => ({
    //                             question_text: q.question_text,
    //                             optionA: q.option_a,
    //                             optionB: q.option_b,
    //                             optionC: q.option_c,
    //                             optionD: q.option_d,
    //                             image_filename: q.image_filename
    //                         }))
    //                     };
    //                 })
    //         };

    //         return result;
    //     } catch (error) {
    //         console.error("Error fetching exam details:", error.message);
    //         throw error;
    //     }
    // },

    // 🟢 Lấy danh sách câu hỏi của bài thi với phần và câu hỏi
    // async getExamQuestionsByExamId(examId, isTimeExpired) {
    //     try {
    //         // Quy định số câu hỏi cho mỗi phần
    //         const partQuestionLimits = {
    //             1: 6,   // Part 1: 6 câu
    //             2: 25,  // Part 2: 25 câu
    //             3: 39,  // Part 3: 39 câu
    //             4: 30,  // Part 4: 30 câu
    //             5: 30,  // Part 5: 30 câu
    //             6: 16,  // Part 6: 16 câu
    //             7: 54   // Part 7: 54 câu
    //         };

    //         // Query to fetch the Exam along with its ExamParts and Questions
    //         const examDetails = await Exam.findOne({
    //             where: { id: examId },
    //             attributes: ['id', 'title', 'duration', 'total_questions', 'audio'],
    //             include: [
    //                 {
    //                     model: ExamPart,
    //                     required: true,
    //                     attributes: ['id', 'part_number'],
    //                     order: [['part_number', 'ASC']],
    //                     include: [
    //                         {
    //                             model: Question,
    //                             required: true,
    //                             attributes: ['id', 'exam_id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'image_filename'],
    //                             order: [['id', 'ASC']]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         });

    //         if (!examDetails) {
    //             throw new Error("Exam not found");
    //         }

    //         // Map the data to match the expected structure with random questions per part
    //         const result = {
    //             exam_id: examDetails.id,
    //             audio: examDetails.audio,
    //             title: examDetails.title,
    //             duration: examDetails.duration,
    //             parts: examDetails.ExamParts
    //                 .sort((a, b) => a.part_number - b.part_number)
    //                 .map(ep => {
    //                     const questionLimit = partQuestionLimits[ep.part_number] || 0;

    //                     let limitedQuestions = ep.Questions;

    //                     if (isTimeExpired) {
    //                         // Randomize the questions if time is expired
    //                         limitedQuestions = ep.Questions.sort(() => 0.5 - Math.random()).slice(0, questionLimit);
    //                     } else {
    //                         // Limit the number of questions without randomizing
    //                         limitedQuestions = ep.Questions.slice(0, questionLimit);
    //                     }

    //                     return {
    //                         part_id: ep.id,
    //                         part_number: ep.part_number,
    //                         questions: limitedQuestions.map(q => ({
    //                             question_text: q.question_text,
    //                             optionA: q.option_a,
    //                             optionB: q.option_b,
    //                             optionC: q.option_c,
    //                             optionD: q.option_d,
    //                             image_filename: q.image_filename
    //                         }))
    //                     };
    //                 })
    //         };

    //         return result;
    //     } catch (error) {
    //         console.error("Error fetching exam details:", error.message);
    //         throw error;
    //     }
    // },
    // 🟢 Lấy danh sách câu hỏi của bài thi với phần và câu hỏi
    async getExamQuestionsByExamId(examId, isTimeExpired) {
        try {
            const partQuestionLimits = {
                1: 6,
                2: 25,
                3: 39,
                4: 30,
                5: 30,
                6: 16,
                7: 54
            };

            const examDetails = await Exam.findOne({
                where: { id: examId },
                attributes: ['id', 'title', 'duration', 'total_questions', 'audio'],
                include: [
                    {
                        model: ExamPart,
                        required: true,
                        attributes: ['id', 'part_number'],
                        include: [
                            {
                                model: Question,
                                required: true,
                                attributes: ['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'image_filename'],
                                order: [['id', 'ASC']]
                            }
                        ]
                    }
                ]
            });

            if (!examDetails) throw new Error("Exam not found");

            const examResult = {
                exam_id: examDetails.id,
                audio: examDetails.audio,
                title: examDetails.title,
                duration: examDetails.duration,
                parts: examDetails.ExamParts
                    .sort((a, b) => a.part_number - b.part_number)
                    .map(ep => {
                        const limit = partQuestionLimits[ep.part_number] || 0;
                        const questions = isTimeExpired
                            ? ep.Questions.sort(() => 0.5 - Math.random()).slice(0, limit) // Random câu hỏi nếu expired
                            : ep.Questions.slice(0, limit);  // Giữ nguyên câu hỏi nếu không expired

                        return {
                            part_id: ep.id,
                            part_number: ep.part_number,
                            questions: questions.map(q => ({
                                question_id: q.id,
                                question_text: q.question_text,
                                optionA: q.option_a,
                                optionB: q.option_b,
                                optionC: q.option_c,
                                optionD: q.option_d,
                                image_filename: q.image_filename
                            }))
                        };
                    })
            };

            return examResult;

        } catch (error) {
            console.error("❌ Error getExamQuestionsByExamId:", error);
            throw error;
        }
    },
    // 🟢 Lấy danh sách câu hỏi của bài thi với phần và câu hỏi
    async getExamQuestionsByExamId(examId, isTimeExpired) {
        try {
            const partQuestionLimits = {
                1: 6,
                2: 25,
                3: 39,
                4: 30,
                5: 30,
                6: 16,
                7: 54
            };

            const examDetails = await Exam.findOne({
                where: { id: examId },
                attributes: ['id', 'title', 'duration', 'total_questions', 'audio'],
                include: [
                    {
                        model: ExamPart,
                        required: true,
                        attributes: ['id', 'part_number'],
                        include: [
                            {
                                model: Question,
                                required: true,
                                attributes: ['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'image_filename', 'order'],
                                // Sắp xếp câu hỏi theo 'order' để đảm bảo thứ tự
                                order: [['order', 'ASC']]
                            }
                        ]
                    }
                ]
            });

            if (!examDetails) throw new Error("Exam not found");

            const examResult = {
                exam_id: examDetails.id,
                audio: examDetails.audio,
                title: examDetails.title,
                duration: examDetails.duration,
                parts: await Promise.all(examDetails.ExamParts
                    .sort((a, b) => a.part_number - b.part_number)  // Sắp xếp phần thi theo 'part_number'
                    .map(async (ep) => {
                        const limit = partQuestionLimits[ep.part_number] || 0;
                        let questions;

                        if (isTimeExpired) {
                            // Lưu thứ tự câu hỏi gốc trước khi random
                            const originalOrder = ep.Questions.map(q => q.id);  // Lưu id câu hỏi gốc

                            // Randomize questions when expired is true
                            questions = ep.Questions.sort(() => 0.5 - Math.random()).slice(0, limit);

                            // Lưu lại thứ tự đã random vào cơ sở dữ liệu
                            await Promise.all(questions.map((q, index) => {
                                return Question.update(
                                    { order: index + 1 },  // Cập nhật lại thứ tự sau khi random
                                    { where: { id: q.id } }
                                );
                            }));

                            return {
                                part_id: ep.id,
                                part_number: ep.part_number,
                                questions: questions.map(q => ({
                                    question_id: q.id,
                                    question_text: q.question_text,
                                    optionA: q.option_a,
                                    optionB: q.option_b,
                                    optionC: q.option_c,
                                    optionD: q.option_d,
                                    image_filename: q.image_filename
                                })),
                                original_order: originalOrder  // Lưu thứ tự câu hỏi gốc
                            };
                        } else {
                            // Khi không random, lấy câu hỏi theo thứ tự đã lưu trong cơ sở dữ liệu (theo 'order')
                            questions = ep.Questions.sort((a, b) => a.order - b.order).slice(0, limit);

                            // Trả về thứ tự câu hỏi gốc
                            return {
                                part_id: ep.id,
                                part_number: ep.part_number,
                                questions: questions.map(q => ({
                                    question_id: q.id,
                                    question_text: q.question_text,
                                    optionA: q.option_a,
                                    optionB: q.option_b,
                                    optionC: q.option_c,
                                    optionD: q.option_d,
                                    image_filename: q.image_filename
                                })),
                                original_order: ep.Questions.map(q => q.id)  // Lưu thứ tự câu hỏi gốc
                            };
                        }
                    }))
            };

            return examResult;

        } catch (error) {
            console.error("❌ Error getExamQuestionsByExamId:", error);
            throw error;
        }
    },



    async getExamQuestionsByExamId1(examId, page = 1) {
        try {
            // 🟢 Kiểm tra `examId` hợp lệ
            if (!examId || isNaN(examId)) {
                throw new Error("examId không hợp lệ!");
            }

            // 🟢 Kiểm tra `page` hợp lệ
            if (!page || isNaN(page) || page < 1) {
                throw new Error("Số trang không hợp lệ!");
            }

            // 🟢 Tìm bài thi và lấy danh sách các phần thi theo `examId`
            const examDetails = await Exam.findOne({
                where: { id: examId },
                attributes: ['id', 'title', 'duration', 'total_questions', 'audio'],
                include: [
                    {
                        model: ExamPart,
                        required: true,
                        attributes: ['id', 'part_number'],
                        order: [['part_number', 'ASC']],
                        where: { part_number: page }, // 🔹 Lọc đúng `part_number` theo trang
                        include: [
                            {
                                model: Question,
                                required: true,
                                attributes: ['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'image_filename'],
                                order: [['id', 'ASC']]
                            }
                        ]
                    }
                ]
            });

            // 🟢 Kiểm tra nếu không có bài thi hoặc phần thi này không tồn tại
            if (!examDetails || examDetails.ExamParts.length === 0) {
                throw new Error(`Không tìm thấy phần thi ${page} trong bài thi với ID: ${examId}`);
            }

            // 🟢 Đếm tổng số phần thi để hỗ trợ pagination
            const totalParts = await ExamPart.count({ where: { exam_id: examId } });

            // 🟢 Format dữ liệu trả về
            return {
                exam_id: examDetails.id,
                audio: examDetails.audio,
                title: examDetails.title,
                duration: examDetails.duration,
                current_page: page,
                total_pages: totalParts, // Số trang = số phần thi
                parts: examDetails.ExamParts.map(ep => ({
                    part_id: ep.id,
                    part_number: ep.part_number,
                    questions: ep.Questions.map(q => ({
                        question_text: q.question_text,
                        optionA: q.option_a,
                        optionB: q.option_b,
                        optionC: q.option_c,
                        optionD: q.option_d,
                        image_filename: q.image_filename
                    }))
                }))
            };

        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách câu hỏi:", error);
            throw error;
        }
    },


    // 🟢 Lấy danh sách tất cả các bài thi
    async getAllExams() {
        return await Exam.findAll();
    },

    // 🟢 Lấy bài thi theo ID
    async getExamById(id) {
        return await Exam.findByPk(id);
    },

    // 🟢 Tạo bài thi mới
    async createExam(data) {
        try {
            // Chuyển đổi `duration` về kiểu số nguyên nếu cần
            data.duration = parseInt(data.duration, 10);
            if (isNaN(data.duration)) throw new Error("Duration phải là số nguyên");

            const newExam = await Exam.create(data);
            return newExam;
        } catch (error) {
            console.error("Lỗi khi tạo bài thi:", error);
            throw error;
        }
    },

    // 🟢 Cập nhật bài thi theo ID
    async updateExam(id, data) {
        const exam = await Exam.findByPk(id);
        if (!exam) return null;
        await exam.update(data);
        return exam;
    },

    // 🔴 Xóa bài thi theo ID
    async deleteExam(id) {
        const exam = await Exam.findByPk(id);
        if (!exam) return null;
        await exam.destroy();
        return exam;
    },

    // 🔄 API xử lý bất đồng bộ (tính năng mở rộng)
    async processExam(data) {
        console.log("🔄 Đang xử lý bài thi...");
        return "processId_123456"; // Giả lập một ID xử lý bất đồng bộ
    }
};

module.exports = ExamService;
