const QuestionService = require("../services/questionService");
const fs = require("fs");
const path = require("path");
const {
    successResponse,
    createdResponse,
    notFoundResponse,
    serverErrorResponse
} = require("../utils/responseHelper");

const QuestionController = {
    // 🟢 Lấy danh sách tất cả câu hỏi
    async getAllQuestions(req, res) {
        try {
            const questions = await QuestionService.getAllQuestions();
            return successResponse(res, "Lấy danh sách câu hỏi thành công", questions);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống");
        }
    },
    async getTotalQuestionCount(req, res) {
        try {
            const count = await QuestionService.getAllCountQuestion();
            return successResponse(res, "Tổng số câu hỏi", count);

        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi đếm tổng số câu hỏi");
        }
    },

    // 🟢 Lấy câu hỏi theo ID
    async getQuestionById(req, res) {
        try {
            const { id } = req.params;
            const question = await QuestionService.getQuestionById(Number(id));
            if (!question) return notFoundResponse(res, "Câu hỏi không tồn tại");

            return successResponse(res, "Lấy câu hỏi thành công", question);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống", error);
        }
    },

    // 🟢 Lấy câu hỏi theo `part_id`
    async getQuestionsByPart(req, res) {
        try {
            const { part_id } = req.params;
            const questions = await QuestionService.getQuestionsByPart(Number(part_id));
            if (!questions || questions.length === 0) return notFoundResponse(res, "Không tìm thấy câu hỏi");

            return successResponse(res, "Lấy danh sách câu hỏi thành công", questions);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống");
        }
    },



    // 🟢 Tạo câu hỏi mới
    async createQuestion(req, res) {
        try {
            const newQuestion = await QuestionService.createQuestion(req.body);
            return createdResponse(res, "Câu hỏi đã được tạo", newQuestion);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi tạo câu hỏi", error);
        }
    },

    // 🟢 Cập nhật câu hỏi theo ID
    async updateQuestion(req, res) {
        try {
            const { id } = req.params;
            const updatedQuestion = await QuestionService.updateQuestion(Number(id), req.body);
            if (!updatedQuestion) return notFoundResponse(res, "Câu hỏi không tồn tại");

            return successResponse(res, "Câu hỏi đã được cập nhật", updatedQuestion);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi cập nhật câu hỏi");
        }
    },

    // 🔴 Xóa câu hỏi theo ID
    async deleteQuestion(req, res) {
        try {
            const { id } = req.params;
            const deletedQuestion = await QuestionService.deleteQuestion(Number(id));
            if (!deletedQuestion) return notFoundResponse(res, "Câu hỏi không tồn tại");

            return successResponse(res, "Câu hỏi đã được xóa", deletedQuestion);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi xóa câu hỏi");
        }
    },

    // 🟢 Upload ảnh cho câu hỏi
    async uploadQuestionImage(req, res) {
        try {
            const { id } = req.params;
            if (!req.file) return res.status(400).json({ error: "Vui lòng chọn ảnh!" });

            const updatedQuestion = await QuestionService.updateQuestionImage(Number(id), req.file.filename);
            if (!updatedQuestion) return notFoundResponse(res, "Câu hỏi không tồn tại");

            return successResponse(res, "Ảnh đã được upload thành công", updatedQuestion);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi upload ảnh");
        }
    },

    // 🔴 Xóa ảnh câu hỏi
    async removeQuestionImage(req, res) {
        try {
            const { id } = req.params;
            const question = await QuestionService.getQuestionById(Number(id));
            if (!question || !question.image_filename) return notFoundResponse(res, "Không có ảnh để xóa");

            // Xóa file ảnh
            const imagePath = path.join("uploads/questions", question.image_filename);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

            // Cập nhật DB
            await QuestionService.updateQuestionImage(Number(id), null);
            return successResponse(res, "Ảnh đã được xóa thành công");
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi xóa ảnh");
        }
    }
};

module.exports = QuestionController;
