const ExamPart = require("../models/examPart");

const ExamPartService = {
    // 🟢 Lấy tất cả Exam Parts
    async getAllParts() {
        return await ExamPart.findAll();
    },

    // 🟢 Lấy Exam Part theo ID
    async getPartById(id) {
        return await ExamPart.findByPk(id);
    },

    // 🟢 Tạo Exam Part mới
    async createPart(data) {
        return await ExamPart.create(data);
    },

    // 🟢 Cập nhật Exam Part theo ID
    async updatePart(id, data) {
        const part = await ExamPart.findByPk(id);
        if (!part) return null;
        await part.update(data);
        return part;
    },

    // 🔴 Xóa Exam Part theo ID
    async deletePart(id) {
        const part = await ExamPart.findByPk(id);
        if (!part) return null;
        await part.destroy();
        return part;
    }
};

module.exports = ExamPartService;
