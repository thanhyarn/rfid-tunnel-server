const category = require("./category");
const product = require("./product.js");
const epc = require("./epc.js");

function route(app) {
  app.use("/api/category", category);
  app.use("/api/product", product)
  app.use("/api/epc", epc);
}

module.exports = route;
