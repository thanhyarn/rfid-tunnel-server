const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { echo, broadcastData } = require("./src/config/wsConfig"); // Import thêm broadcastData
const http = require("http");
const route = require("./src/routers");
const db = require("./src/config/dbConfig");

db.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
echo.installHandlers(server, { prefix: "/echo" });

route(app);

const PORT = 3003;
const WS_PORT = 8090;

// Tạo API POST để nhận dữ liệu EPC từ client
app.post("/send-epc", (req, res) => {
  let { epc } = req.body; // Lấy dữ liệu EPC từ body của request

  // Loại bỏ tất cả các dấu cách trong chuỗi EPC
  epc = epc.replace(/\s+/g, "");

  console.log(epc);

  if (!epc) {
    return res.status(400).send({ message: "EPC is required" });
  }

  // Gửi EPC đến tất cả các client đã kết nối thông qua SockJS
  broadcastData({ epc });

  return res.status(200).send({ message: "EPC has been sent to clients" });
});

app.listen(PORT, () => console.log(`HTTP server listening on port ${PORT}`));
server.listen(WS_PORT, () =>
  console.log(`SockJS server running on port ${WS_PORT}`)
);
