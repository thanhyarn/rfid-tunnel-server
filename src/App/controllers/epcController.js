const Epc = require("../models/Epc");
const Product = require("../models/Product");

class EpcController {
  // Lấy tất cả EPC
  async fetchAllEPCs(req, res) {
    try {
      const epcs = await Epc.find().populate("product");
      res.status(200).json(epcs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching EPCs", error });
    }
  }

  // Lấy EPC theo ID
  async getEPCById(req, res) {
    try {
      const { id } = req.params;
      const epc = await Epc.findById(id).populate("product");
      if (!epc) {
        return res.status(404).json({ message: "EPC not found" });
      }
      res.status(200).json(epc);
    } catch (error) {
      res.status(500).json({ message: "Error fetching EPC by ID", error });
    }
  }

  // Lấy danh sách EPC theo Product ID
  async getEPCsByProductId(req, res) {
    try {
      const { productId } = req.params;
      const epcs = await Epc.find({ product: productId }).populate("product");
      res.status(200).json(epcs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching EPCs by product ID", error });
    }
  }

  // Thêm mới EPC
  async addEPC(req, res) {
    try {
      const { epc, productId } = req.body;

      // Kiểm tra sản phẩm tồn tại
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Kiểm tra EPC trùng lặp
      const existingEPC = await Epc.findOne({ epc });
      if (existingEPC) {
        return res.status(400).json({ message: "EPC already exists" });
      }

      // Thêm EPC mới
      const newEPC = new Epc({ epc, product: productId });
      await newEPC.save();
      res.status(201).json(newEPC);
    } catch (error) {
      res.status(500).json({ message: "Error adding EPC", error });
    }
  }

  // Cập nhật EPC
  async updateEPC(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedEPC = await Epc.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedEPC) {
        return res.status(404).json({ message: "EPC not found" });
      }

      res.status(200).json(updatedEPC);
    } catch (error) {
      res.status(500).json({ message: "Error updating EPC", error });
    }
  }

  // Xóa EPC
  async deleteEPC(req, res) {
    try {
      const { id } = req.params;

      const deletedEPC = await Epc.findByIdAndDelete(id);
      if (!deletedEPC) {
        return res.status(404).json({ message: "EPC not found" });
      }

      res.status(200).json({ message: "EPC deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting EPC", error });
    }
  }
}

module.exports = new EpcController();
