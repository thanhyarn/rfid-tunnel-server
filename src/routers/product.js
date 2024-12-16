var express = require("express");
const router = express.Router();

const db = require("../App/controllers/productController.js"); // Thay thế với controller đúng của bạn

// Router cho Product

// Lấy tất cả sản phẩm
router.get("/fetch-all", db.fetchAllProducts);

// Lấy sản phẩm theo id
router.get("/get-product-by-id/:id", db.getProductById);

// Tìm kiếm sản phẩm theo tên hoặc barcode
router.get("/search-product/:keyword", db.searchProductByKeyword);

// Thêm mới sản phẩm
router.post("/add-product", db.addProduct);

// Cập nhật thông tin sản phẩm
router.patch("/update-product/:id", db.updateProduct);

// Xóa sản phẩm theo id
router.delete("/delete-product/:id", db.deleteProduct);

module.exports = router;
