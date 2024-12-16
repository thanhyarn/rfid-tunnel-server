var express = require("express");
const router = express.Router();

const db = require("../App/controllers/categoryController.js"); // Thay thế với controller đúng của bạn

// Router cho Category

// Lấy tất cả danh mục
router.get("/fetch-all", db.fetchAllCategories);

// Lấy danh mục theo id
router.get("/get-category-by-id/:id", db.getCategoryById);

// Tìm kiếm danh mục theo tên
router.get("/search-category/:keyword", db.searchCategoryByKeyword);

// Thêm mới danh mục
router.post("/add-category", db.addCategory);

// Cập nhật thông tin danh mục
router.patch("/update-category/:id", db.updateCategory);

// Xóa danh mục theo id
router.delete("/delete-category/:id", db.deleteCategory);

module.exports = router;
