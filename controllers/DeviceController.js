// Hàm xử lý khi ESP32 gửi dữ liệu lên
const nhanDuLieuESP = (req, res) => {
    // 1. Bóc tách dữ liệu từ gói JSON mà ESP32 gửi
    const { mac_address, khoi_luong } = req.body;

    // 2. In ra màn hình đen (Terminal) để bạn (người làm Backend) nhìn thấy
    console.log(`[CẢNH BÁO] Máy ${mac_address} vừa gửi báo cáo: Còn ${khoi_luong} ml`);

    // (Tương lai: Chỗ này chúng ta sẽ gọi Models để lưu vào Database)
    let trang_thai = "Bình thường";
    if (khoi_luong < 50) {
        trang_thai = "Cấp bách - Sắp hết dịch!";
    }

    // 3. Trả kết quả về cho ESP32 (để mạch cứng biết là đã gửi thành công)
    res.status(200).json({
        tin_nhan: "Backend đã nhận được số liệu",
        thong_tin_nhan_duoc: {
            mac: mac_address,
            the_tich: khoi_luong,
            canh_bao: trang_thai
        }
    });
};

module.exports = { nhanDuLieuESP };