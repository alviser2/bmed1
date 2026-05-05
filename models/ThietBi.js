const { DataTypes } = require('sequelize');
const db = require('../config/database');

// Khai báo khuôn (Model) cho Thiết Bị ESP32
const ThietBi = db.define('ThietBi', {
    mac_address: {
        type: DataTypes.STRING,
        primaryKey: true, // Khóa chính là mã MAC của ESP32
        allowNull: false
    },
    ten_hien_thi: {
        type: DataTypes.STRING, // Ví dụ: "Máy đếm giọt số 01"
        allowNull: false
    },
    trang_thai_hoat_dong: {
        type: DataTypes.BOOLEAN, // True: đang dùng, False: đang rảnh
        defaultValue: false
    }
}, {
    tableName: 'thiet_bi',
    timestamps: false
});

module.exports = ThietBi;