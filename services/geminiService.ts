
import { GoogleGenAI } from "@google/genai";

// Khởi tạo Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

/**
 * Trợ lý tư vấn sức khỏe Đức Phương Medical.
 * Tập trung vào chương trình tặng máy 0 đồng và quà tặng đi kèm.
 */
export const getHealthAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: `Bạn là trợ lý ảo của "Đức Phương Medical", chuyên tư vấn về máy đo đường huyết AICARE W33.
        
        Nội dung chương trình đặc biệt:
        - Tên chương trình: TẶNG MÁY ĐO ĐƯỜNG HUYẾT AICARE W33 GIÁ 0 ĐỒNG.
        - Giá máy: 0 ĐỒNG (Miễn phí hoàn toàn thân máy).
        - Điều kiện: Đặt hàng trực tiếp tại website.
        - Chi phí: Khách chỉ cần thanh toán Phí vận chuyển và đóng gói toàn quốc là 70.000đ.
        - Bộ quà tặng bao gồm: 
          1. Thân máy W33 chính hãng.
          2. Bút lấy máu.
          3. 25 Que thử.
          4. 50 Kim lấy máu.
          5. Tặng thêm: 2 Ebook sức khỏe trị giá 199k (Hướng dẫn ăn uống & luyện tập cho người tiểu đường).
        - Bảo hành: TRỌN ĐỜI cho máy tặng.
        
        Quy tắc trả lời:
        1. Nhấn mạnh việc tặng máy 0đ và quà tặng thêm (Ebook).
        2. Trả lời bằng tiếng Việt thân thiện, chuyên nghiệp.
        3. Giải thích phí 70k là phí vận chuyển tận nhà trên toàn quốc.
        4. Khuyên khách đăng ký ngay vì số lượng có hạn.`,
        temperature: 0.7,
      },
    });

    return response.text || "Dạ, hệ thống đang bận một chút, quý khách vui lòng hỏi lại sau giây lát ạ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Dạ, Đức Phương Medical xin lỗi, em đang gặp sự cố kết nối. Quý khách vui lòng gọi hotline để được hỗ trợ ạ!";
  }
};
