var express = require("express");
const router = express.Router();

const db = require("../App/controllers/epcController.js"); // Controller tương ứng cho EPC

// Router cho EPC

// Lấy tất cả EPC
router.get("/fetch-all", db.fetchAllEPCs);

// Lấy thông tin EPC theo ID
router.get("/get-epc-by-id/:id", db.getEPCById);

// Lấy danh sách EPC theo sản phẩm
router.get("/get-epcs-by-product/:productId", db.getEPCsByProductId);

// Thêm mới EPC và gán cho sản phẩm
router.post("/add-epc", db.addEPC);

// Cập nhật thông tin EPC
router.patch("/update-epc/:id", db.updateEPC);

// Xóa EPC theo ID
router.delete("/delete-epc/:id", db.deleteEPC);

module.exports = router;
