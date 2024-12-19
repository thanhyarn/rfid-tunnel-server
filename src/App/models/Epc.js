const mongoose = require("mongoose");

// Định nghĩa schema cho EPC
const epcSchema = new mongoose.Schema(
  {
    epc: {
      type: String,
      required: true,
      unique: true, // Mỗi EPC là duy nhất
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Liên kết với Product
    },
    status: {
      type: String,
      enum: ["unassigned", "assigned"], // Trạng thái EPC
      default: "unassigned", // Mặc định là chưa gán
    },
    assignedAt: {
      type: Date,
      default: null, // Thời gian gán EPC (null nếu chưa gán)
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Tạo model từ schema
const EPC = mongoose.model("EPC", epcSchema);

module.exports = EPC;
