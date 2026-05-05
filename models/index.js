//Tạo Khóa Ngoại - Foreign Keys
//File này đóng vai trò như một bảng mạch chủ (Mainboard)
//  cắm tất cả 5 khuôn kia vào và nối dây chúng lại.
const db = require('../config/database');

// 1. Nhập khẩu (Import) toàn bộ 5 khuôn vừa đúc
const TaiKhoan = require('./TaiKhoan');
const BenhNhan = require('./BenhNhan');
const ThietBi = require('./ThietBi');
const PhienTruyenDich = require('./PhienTruyenDich');
const LichSuDo = require('./LichSuDo');

// 2. Đi dây (Khai báo mối quan hệ)

// A. Một Bệnh nhân có thể có nhiều Phiên truyền dịch
BenhNhan.hasMany(PhienTruyenDich, { foreignKey: 'ma_bn' });
PhienTruyenDich.belongsTo(BenhNhan, { foreignKey: 'ma_bn' });

// B. Một Thiết bị có thể phục vụ nhiều Phiên truyền dịch
ThietBi.hasMany(PhienTruyenDich, { foreignKey: 'mac_address' });
PhienTruyenDich.belongsTo(ThietBi, { foreignKey: 'mac_address' });

// C. Một Phiên truyền dịch sẽ sinh ra nhiều Lịch sử đo (ESP32 gửi liên tục)
PhienTruyenDich.hasMany(LichSuDo, { foreignKey: 'phien_id' });
LichSuDo.belongsTo(PhienTruyenDich, { foreignKey: 'phien_id' });

// 3. Đóng gói bo mạch chủ này lại để mang ra server xài
module.exports = {
    db,
    TaiKhoan,
    BenhNhan,
    ThietBi,
    PhienTruyenDich,
    LichSuDo
};