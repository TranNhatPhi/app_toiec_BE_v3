const ExamPartService = require("../services/examPartService");
const {
    successResponse,
    createdResponse,
    notFoundResponse,
    serverErrorResponse
} = require("../utils/responseHelper");

const ExamPartController = {
    // 🟢 Lấy danh sách tất cả Exam Parts
    async getAllParts(req, res) {
        try {
            const parts = await ExamPartService.getAllParts();
            return successResponse(res, "Lấy danh sách Exam Parts thành công", parts);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống");
        }
    },

    // 🟢 Lấy Exam Part theo ID
    async getPartById(req, res) {
        try {
            const { id } = req.params;
            const part = await ExamPartService.getPartById(Number(id));
            if (!part) return notFoundResponse(res, "Exam Part không tồn tại");

            return successResponse(res, "Lấy Exam Part thành công", part);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống", error);
        }
    },

    // 🟢 Tạo Exam Part mới
    async createPart(req, res) {
        try {
            const newPart = await ExamPartService.createPart(req.body);
            return createdResponse(res, "Exam Part đã được tạo", newPart);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi tạo Exam Part", error);
        }
    },

    // 🟢 Cập nhật Exam Part theo ID
    async updatePart(req, res) {
        try {
            const { id } = req.params;
            const updatedPart = await ExamPartService.updatePart(Number(id), req.body);
            if (!updatedPart) return notFoundResponse(res, "Exam Part không tồn tại");

            return successResponse(res, "Exam Part đã được cập nhật", updatedPart);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi cập nhật Exam Part");
        }
    },

    // 🔴 Xóa Exam Part theo ID
    async deletePart(req, res) {
        try {
            const { id } = req.params;
            const deletedPart = await ExamPartService.deletePart(Number(id));
            if (!deletedPart) return notFoundResponse(res, "Exam Part không tồn tại");

            return successResponse(res, "Exam Part đã được xóa", deletedPart);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi xóa Exam Part");
        }
    }
};

module.exports = ExamPartController;
