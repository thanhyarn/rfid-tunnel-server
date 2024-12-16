const mongoose = require("mongoose");
const Category = require("./Category"); // Liên kết với model Category

// Định nghĩa schema cho Product
const productSchema = new mongoose.Schema({
  name: {
    type: String,    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  barcode: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Liên kết với Category model
    required: true,
  },
  tags: {
    type: [String],
    required: false, // Tùy chọn, bạn có thể thêm hoặc bỏ tùy nhu cầu
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model từ schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
