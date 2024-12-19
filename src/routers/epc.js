const express = require("express");
const router = express.Router();

const epcController = require("../App/controllers/epcController.js");

router.get("/get-epcs", epcController.getEpcs);
router.get("/check-assign/:epc", epcController.checkAssign);
router.post("/assign", epcController.assign);
router.post("/send-and-broadcast", epcController.sendAndBroadcast);

module.exports = router;
