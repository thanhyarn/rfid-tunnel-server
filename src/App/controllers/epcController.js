const Epc = require("../models/Epc");
const Product = require("../models/Product");
const { broadcastData } = require("../../config/wsConfig");

class EpcController {
  // GET /get-epcs
  async getEpcs(req, res) {
    try {
      const epcs = await Epc.find().populate("product", "name description");
      res.status(200).json(epcs);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching EPCs", error: err.message });
    }
  }

  // GET /check-assign/:epc
  async checkAssign(req, res) {
    try {
      const { epc } = req.params;

      const foundEpc = await Epc.findOne({ epc }).populate(
        "product",
        "name description"
      );
      if (!foundEpc) {
        return res.status(404).json({ message: "EPC not found" });
      }

      res.status(200).json({
        epc: foundEpc.epc,
        isAssigned: !!foundEpc.product,
        product: foundEpc.product || null,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error checking EPC assignment", error: err.message });
    }
  }

  // POST /assign
  async assign(req, res) {
    try {
      const { epc, productId } = req.body;

      if (!epc || !productId) {
        return res
          .status(400)
          .json({ message: "EPC and Product ID are required" });
      }

      // Kiểm tra sản phẩm có tồn tại không
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Kiểm tra EPC có tồn tại không
      let epcRecord = await Epc.findOne({ epc });
      if (epcRecord) {
        if (epcRecord.product) {
          return res.status(400).json({
            message: "EPC is already assigned to a product",
            product: epcRecord.product,
          });
        }
        // Cập nhật EPC đã tồn tại
        epcRecord.product = productId;
        epcRecord.assignedAt = new Date();
        epcRecord.status = "assigned";
      } else {
        // Tạo EPC mới
        epcRecord = new Epc({
          epc,
          product: productId,
          assignedAt: new Date(),
          status: "assigned",
        });
      }

      await epcRecord.save();

      res.status(200).json({
        message: "EPC successfully assigned to product",
        epc: epcRecord,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error assigning EPC", error: err.message });
    }
  }

  async sendAndBroadcast(req, res) {
    try {
      const { epc } = req.body;

      if (!epc) {
        return res.status(400).json({ message: "EPC is required" });
      }

      // Tìm thông tin EPC trong database
      const epcData = await Epc.findOne({ epc }).populate(
        "product",
        "name description"
      );

      let dataToSend;

      if (epcData) {
        // Nếu EPC tồn tại trong database
        dataToSend = {
          epc: epcData.epc,
          isAssigned: !!epcData.product,
          product: epcData.product || null,
          assignedAt: epcData.assignedAt,
        };
      } else {
        // Nếu EPC không tồn tại trong database
        dataToSend = {
          epc: epc,
          isAssigned: false,
          product: null,
          assignedAt: null,
        };
      }

      // Sử dụng broadcastData để gửi dữ liệu qua WebSocket
      broadcastData(dataToSend);

      // Phản hồi client
      res.status(200).json({
        message: epcData
          ? "EPC data successfully broadcasted to clients"
          : "EPC not found in the database, broadcasting unassigned EPC",
        data: dataToSend,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error processing EPC", error: err.message });
    }
  }
}

module.exports = new EpcController();
