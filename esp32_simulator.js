// ============================================================
// esp32_simulator.js — Giả lập ESP32 gửi dữ liệu lên server
// Cách dùng:
//   1. Tạo 1 phiên truyền trên web
//   2. Copy session_id từ DB vào biến SESSION_ID bên dưới
//   3. Chạy: node esp32_simulator.js
// ============================================================

const API_URL    = 'http://localhost:8000/api/du-lieu-esp';
const SESSION_ID = '5a02157f-4da7-11f1-bbbc-04bf1bc64417'; // ← thay bằng session_id thật
// Thông số giả lập
const TRONG_LUONG_VO_CHAI = 30;  // gram
let   current_weight      = 500; // gram (tương đương ~470 ml ban đầu)
const TARGET_DROP_RATE    = 40;  // giọt/phút (giả lập tốc độ y lệnh)

console.log('🚀 ESP32 Simulator đang chạy...');
console.log(`   Session ID : ${SESSION_ID}`);
console.log(`   Server URL : ${API_URL}`);
console.log(`   Tốc độ mục tiêu: ${TARGET_DROP_RATE} giọt/phút`);
console.log('─'.repeat(55));

setInterval(async () => {
  // Giả lập tốc độ dao động ±20% quanh mục tiêu
  const noise = (Math.random() - 0.5) * TARGET_DROP_RATE * 0.4;
  const current_drop_rate = Math.max(1, Math.round(TARGET_DROP_RATE + noise));

  // Dịch vơi dần
  current_weight -= 0.5 + Math.random();
  if (current_weight < TRONG_LUONG_VO_CHAI) {
    current_weight = TRONG_LUONG_VO_CHAI;
  }

  // ====== TÍNH THỂ TÍCH CÒN LẠI ======
  const theTichConLai = current_weight - TRONG_LUONG_VO_CHAI;

  // ====== TÍNH THỜI GIAN CÒN LẠI ======
  // tốc độ ml/phút = giọt/phút × 0.05
  const tocDoMlPerMin = current_drop_rate * 0.05;

  // phút còn lại
  const thoi_gian_con_lai = Math.round(
    theTichConLai / tocDoMlPerMin
  );

  const payload = {
    session_id: SESSION_ID,
    current_weight: parseFloat(current_weight.toFixed(2)),
    current_drop_rate: current_drop_rate,

    // thêm field này
    thoi_gian_con_lai: thoi_gian_con_lai,
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    console.log(
      `[${new Date().toLocaleTimeString('vi-VN')}]` +
      `  Trọng lượng: ${payload.current_weight}g` +
      `  | Thể tích còn: ${theTichConLai.toFixed(1)} ml` +
      `  | Tốc độ: ${current_drop_rate} giọt/phút` +
      `  | Còn lại: ${thoi_gian_con_lai} phút`
    );

  } catch {
    console.error('❌ Không kết nối được server.');
  }

}, 3000);