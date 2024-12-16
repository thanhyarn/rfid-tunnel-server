const mongoose = require("mongoose");

// Định nghĩa schema cho EPC
const epcSchema = new mongoose.Schema({
  epc: {
    type: String,
    required: true,
    unique: true, // Mỗi EPC là duy nhất
    trim: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Liên kết với Product
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now, // Thời gian gán EPC
  },
});

// Tạo model từ schema
const EPC = mongoose.model("EPC", epcSchema);

module.exports = EPC;