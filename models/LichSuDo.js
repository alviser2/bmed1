const { DataTypes } = require('sequelize');
const db = require('../config/database');

const LichSuDo = db.define('LichSuDo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    khoi_luong_hien_tai: {
        type: DataTypes.FLOAT, // Thể tích còn lại trong bình
        allowNull: false
    },
    thoi_gian_con_lai: {
        type: DataTypes.INTEGER, // Tính bằng phút
        allowNull: false
    },
    muc_canh_bao: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false // True nếu nước sắp hết hoặc chảy bất thường
    }
}, {
    tableName: 'lich_su_do',
    timestamps: true // Tự động lưu thời điểm đo (createdAt)
});

module.exports = LichSuDo;
