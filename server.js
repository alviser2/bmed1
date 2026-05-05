//viết bằng C
// File khởi động của toàn bộ backend. 
// Có nhiệm vụ bật cổng mạng (Port), gọi kết nối Database, kích hoạt các Middleware và Routes để hệ thống sẵn sàng đón luồng dữ liệu từ React và ESP32.
//bật công tắc tổng (server.js)
// 1. Gọi các thư viện vừa cài đặt
const express = require('express');  // gọi thư viện express tạo khung web server
const cors = require('cors'); // cho phép React (dù chạy trên Port khác) đc gọi vào

//  GỌI DATABASE LÊN ---
const db = require('./config/database');

// Khởi tạo app (Bệnh viện Node.js)
const app = express();

// 2. Cấu hình bảo vệ và Lễ tân
app.use(cors()); // Mở cửa cho React gọi vào
app.use(express.json()); // Dặn Lễ tân chuẩn bị nhận gói JSON từ ESP32

// KÍCH HOẠT LỄ TÂN 
const deviceRoutes = require('./routes/deviceRoutes');
app.use('/api', deviceRoutes); // Mọi đường link sẽ tự động có chữ /api ở đầu
// -------------------------------------------

//  TEST KẾT NỐI ---
db.authenticate()
    .then(() => console.log('[Thành công] Đã cắm ống vào Kho MySQL!'))
    .catch((err) => console.log('[Thất bại] Lỗi nối DB:', err.message));

// 3. Viết thử một đường link (Route) cơ bản để test
app.get('/api/test', (req, res) => {
    res.status(200).json({
        thong_bao: "Bệnh viện Node.js đã mở cửa đón bệnh nhân!",
        trang_thai: "OK"
    });
});

// 4. Bật công tắc tổng ở cổng 8000
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`[Thành công] Backend đang chạy tại: http://localhost:${PORT}`);
});
