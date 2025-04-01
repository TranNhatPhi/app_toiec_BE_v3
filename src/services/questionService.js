const Question = require("../models/question");

const QuestionService = {
    // 🟢 Lấy tất cả câu hỏi
    async getAllQuestions() {
        return await Question.findAll();
    },


    async getAllCountQuestion() {
        return await Question.count();
    },

    // 🟢 Lấy câu hỏi theo ID
    async getQuestionById(id) {
        return await Question.findByPk(id);
    },

    // 🟢 Lấy danh sách câu hỏi theo part_id
    async getQuestionsByPart(part_id) {
        return await Question.findAll({ where: { part_id } });
    },

    // 🟢 Tạo câu hỏi mới
    async createQuestion(data) {
        return await Question.create(data);
    },

    // 🟢 Cập nhật câu hỏi theo ID
    async updateQuestion(id, data) {
        const question = await Question.findByPk(id);
        if (!question) return null;
        await question.update(data);
        return question;
    },

    // 🔴 Xóa câu hỏi theo ID
    async deleteQuestion(id) {
        const question = await Question.findByPk(id);
        if (!question) return null;
        await question.destroy();
        return question;
    },

    // 🟢 Cập nhật ảnh cho câu hỏi
    async updateQuestionImage(id, image_filename) {
        const question = await Question.findByPk(id);
        if (!question) return null;
        await question.update({ image_filename });
        return question;
    }
};

module.exports = QuestionService;
