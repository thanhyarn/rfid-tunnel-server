const Category = require("../models/Category");

class categoryController {
  // Lấy tất cả danh mục
  async fetchAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories", error });
    }
  }

  // Lấy danh mục theo id
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category", error });
    }
  }

  // Tìm kiếm danh mục theo tên
  async searchCategoryByKeyword(req, res) {
    try {
      const { keyword } = req.params;
      const categories = await Category.find({
        name: { $regex: keyword, $options: "i" },
      });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error searching categories", error });
    }
  }

  // Thêm mới danh mục
  async addCategory(req, res) {
    try {
      const { name, description } = req.body;
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: "Error adding category", error });
    }
  }

  // Cập nhật thông tin danh mục
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description, updatedAt: Date.now() },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Error updating category", error });
    }
  }

  // Xóa danh mục theo id
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting category", error });
    }
  }
}

module.exports = new categoryController();
