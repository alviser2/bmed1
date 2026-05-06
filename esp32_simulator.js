// File: esp32_simulator.js

const API_URL = "http://localhost:8000/api/du-lieu-esp";
const SESSION_ID = "3a5198d7-46df-11f1-8d28-6018953db4d6"; // Copy 1 cái session_id thật từ Database dán vào đây

// Giả lập thông số ban đầu của bình truyền dịch
let current_weight = 500; // Bắt đầu với bình dịch 500 gram

console.log("🚀 Bắt đầu khởi động Mạch ESP32 Giả lập...");
console.log(`Đang bắn dữ liệu liên tục lên: ${API_URL}`);

// Hàm setInterval sẽ lặp đi lặp lại việc gửi data mỗi 3 giây
setInterval(async () => {
    // 1. Giả lập nhiễu cảm biến: Tốc độ nhỏ giọt dao động ngẫu nhiên từ 35 đến 65 giọt/phút
    const current_drop_rate = Math.floor(Math.random() * (65 - 35 + 1)) + 35;

    // 2. Giả lập khối lượng dịch đang vơi dần đi (mỗi 3s giảm khoảng 1-2 gram)
    current_weight -= (Math.random() * 2);
    if (current_weight < 30) current_weight = 30; // Chạm đáy 30g là vỏ bình

    // 3. Đóng gói JSON chuẩn như đã giao kèo
    const payload = {
        session_id: SESSION_ID,
        current_drop_rate: current_drop_rate,
        current_weight: parseFloat(current_weight.toFixed(2)) // Làm tròn 2 chữ số thập phân
    };

    try {
        // 4. Bắn API lên Server chính
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        // In ra màn hình để theo dõi
        console.log(`[${new Date().toLocaleTimeString()}] ESP Ảo gửi: ${payload.current_weight}g | ${payload.current_drop_rate} giọt/p -> Server báo thời gian còn: ${result.calculated_time} phút`);
        
    } catch (error) {
        console.error("❌ ESP Ảo không tìm thấy Server! Hãy chắc chắn Server cổng 8000 đang bật.");
    }

}, 3000); // 3000 ms = 3 giây gửi 1 lần