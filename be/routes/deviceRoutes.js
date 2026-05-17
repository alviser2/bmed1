const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/DeviceController'); // Gọi não bộ ra

// =========================================================
// PHÂN HỆ 1: ĐÓN DỮ LIỆU TỪ MẠCH ESP32 / SIMULATOR
// =========================================================

// Hứng cả link cũ lẫn link mới để bảo đảm thiết bị ảo không bị mất kết nối
router.post('/du-lieu-esp', DeviceController.nhanDuLieuESP);
router.post('/update', DeviceController.capNhatDuLieu);
router.post('/register', DeviceController.dangKyThietBi);
router.get('/heartbeat', DeviceController.nhipTim);

// =========================================================
// PHÂN HỆ 2: ĐÓN SỰ KIỆN NÚT BẤM TỪ GIAO DIỆN WEB BÁC SĨ
// =========================================================

// Cánh cửa quyết định để giải quyết lỗi 404 của các nút bấm trên giao diện Web
router.post('/web/action', DeviceController.xuLyCanhBaoWeb);

module.exports = router;