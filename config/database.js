//dùng thư viện Sequelize để kết nối mysql
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Gọi người cầm chìa khóa mở két sắt .env

// Lấy thông tin từ két sắt ra để kết nối MySQL
const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', // Khai báo rõ loại DB là MySQL
        logging: false    // Tắt các dòng log lộn xộn để màn hình terminal sạch sẽ
    }
);
//xuất object này ra để server.js và các file khác dùng chung một kết nối duy nhất.
module.exports = db;