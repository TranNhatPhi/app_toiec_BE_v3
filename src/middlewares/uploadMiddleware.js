const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// 🟢 Cấu hình lưu trữ file ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/questions/";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// 🟢 Bộ lọc file (chỉ chấp nhận ảnh)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("File không hợp lệ! Chỉ chấp nhận .jpg, .jpeg, .png"), false);
    }
};

// 🟢 Middleware xử lý upload
const upload = multer({ storage, fileFilter }).single("image");

// 🟢 Middleware tối ưu ảnh (giảm dung lượng)
const optimizeImage = async (req, res, next) => {
    if (!req.file) return next();

    const filePath = req.file.path;
    const optimizedPath = filePath.replace(/\.(jpg|jpeg|png)$/, "-optimized.jpg");

    try {
        await sharp(filePath)
            .resize({ width: 600 })
            .toFormat("jpeg")
            .jpeg({ quality: 80 })
            .toFile(optimizedPath);

        fs.unlinkSync(filePath); // Xóa file gốc
        req.file.path = optimizedPath; // Cập nhật path file mới
        req.file.filename = path.basename(optimizedPath);

        next();
    } catch (error) {
        console.error("Lỗi tối ưu ảnh:", error);
        return res.status(500).json({ error: "Lỗi khi xử lý ảnh!" });
    }
};

module.exports = { upload, optimizeImage };
