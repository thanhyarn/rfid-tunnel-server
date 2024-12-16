const Product = require("../models/Product");

class productController {
  // Lấy tất cả sản phẩm
  async fetchAllProducts(req, res) {
    try {
      const products = await Product.find().populate("category");
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  }

  // Lấy sản phẩm theo id
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate("category");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error });
    }
  }

  // Tìm kiếm sản phẩm theo tên hoặc barcode
  async searchProductByKeyword(req, res) {
    try {
      const { keyword } = req.params;
      const products = await Product.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { barcode: { $regex: keyword, $options: "i" } },
        ],
      }).populate("category");
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error searching products", error });
    }
  }

  // Thêm mới sản phẩm
  async addProduct(req, res) {
    try {
      const { name, description, barcode, category, tags } = req.body;
      const newProduct = new Product({
        name,
        description,
        barcode,
        category,
        tags,
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Error adding product", error });
    }
  }

  // Cập nhật thông tin sản phẩm
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, barcode, category, tags } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, barcode, category, tags, updatedAt: Date.now() },
        { new: true }
      ).populate("category");
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
    }
  }

  // Xóa sản phẩm theo id
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error });
    }
  }
}

module.exports = new productController();
