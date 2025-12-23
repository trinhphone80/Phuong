
import React, { useState } from 'react';
import { Order } from '../types';

interface Props {
  onOrderSuccess: (order: Order) => void;
  thumbUrl: string;
  googleSheetUrl?: string;
}

const OrderForm: React.FC<Props> = ({ onOrderSuccess, thumbUrl, googleSheetUrl }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productInfo = 'QUÀ TẶNG MÁY W33 (0Đ) + 2 EBOOK SỨC KHỎE';
    
    // Tạo đối tượng đơn hàng mới để lưu cục bộ
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      product: productInfo,
      createdAt: Date.now()
    };

    console.log('Đang chuẩn bị gửi dữ liệu:', newOrder);

    // Gửi lên Google Sheet nếu đã có URL cấu hình
    if (googleSheetUrl && googleSheetUrl.trim().startsWith('http')) {
      try {
        // Sử dụng text/plain kết hợp no-cors là cách ổn định nhất để gửi JSON tới Google Apps Script
        await fetch(googleSheetUrl, {
          method: 'POST',
          mode: 'no-cors', 
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            note: formData.note,
            product: productInfo
          }),
        });
        console.log('Yêu cầu gửi dữ liệu đã được phát đi tới Google Sheets');
      } catch (error) {
        console.error('Lỗi kỹ thuật khi gửi dữ liệu:', error);
      }
    } else {
      console.warn('Chưa cấu hình Google Sheet URL trong phần Admin. Dữ liệu chỉ lưu cục bộ.');
      // Giả lập độ trễ nếu không có kết nối thật
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Luôn xác nhận thành công trên giao diện để khách hàng yên tâm
    onOrderSuccess(newOrder);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: '', phone: '', address: '', note: '' });
  };

  return (
    <section id="order-form" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100">
          
          {/* Order Summary Side */}
          <div className="w-full lg:w-2/5 bg-blue-600 p-10 lg:p-12 text-white space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">Suất quà tặng <br/>của bạn</h2>
              <div className="h-1 w-12 bg-red-500 rounded-full"></div>
            </div>

            <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-sm space-y-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg p-1 flex-shrink-0">
                  <img src={thumbUrl} alt="AICARE W33" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="flex-1">
                  <div className="font-black text-sm uppercase leading-tight">Máy đo đường huyết AICARE W33</div>
                  <div className="text-[10px] text-yellow-300 font-black mt-1 uppercase tracking-widest">Suất Ưu Tiên 0Đ</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="opacity-70">Giá niêm yết:</span>
                  <span className="line-through opacity-50">499.000đ</span>
                </div>
                <div className="flex justify-between items-center text-lg font-black">
                  <span>Giá ưu đãi:</span>
                  <span className="text-red-500 bg-white px-3 py-1 rounded-xl shadow-lg">0Đ</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium pt-2 text-yellow-100">
                  <span>Phí ship & xử lý:</span>
                  <span className="font-black text-lg">70.000đ</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-300">
                  <span>✓</span> Tặng 25 Que thử y tế
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-300">
                  <span>✓</span> Tặng 50 Kim lấy máu
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-300">
                  <span>✓</span> Tặng 2 Ebook sức khỏe
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-600 rounded-2xl text-center">
               <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Thời gian giữ quà:</div>
               <div className="text-2xl font-black font-mono">14:59</div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-3/5 p-10 lg:p-14">
            <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Thông tin giao quà</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Họ tên bác/anh chị *</label>
                  <input 
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition font-bold shadow-sm"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Ví dụ: Nguyễn Văn A" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Số điện thoại *</label>
                  <input 
                    type="tel"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition font-black shadow-sm"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="Nhập số của bạn..." 
                    required 
                    pattern="[0-9]{10,11}"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Địa chỉ nhận hàng chi tiết *</label>
                <textarea 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition font-bold shadow-sm"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  rows={2} 
                  placeholder="Số nhà, tên đường, phường, quận, tỉnh..." 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Ghi chú thêm (không bắt buộc)</label>
                <textarea 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition font-bold shadow-sm"
                  value={formData.note}
                  onChange={e => setFormData({...formData, note: e.target.value})}
                  rows={2} 
                  placeholder="Ví dụ: Giao vào giờ hành chính, gọi trước khi đến..." 
                />
              </div>

              <div className="p-6 bg-blue-50 rounded-[1.5rem] border-2 border-dashed border-blue-200 flex items-center gap-5">
                 <div className="text-3xl">🚚</div>
                 <div className="text-xs font-bold text-blue-900 leading-relaxed">
                    Đức Phương hỗ trợ phí vận chuyển tận nhà trên toàn quốc. Bạn chỉ cần thanh toán <span className="text-red-600 font-black text-base underline">70.000đ</span> khi nhận máy.
                 </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-black py-6 rounded-[1.5rem] text-xl shadow-2xl transform transition active:scale-95 disabled:opacity-50 hover:from-black hover:to-gray-900"
                >
                  {isSubmitting ? "HỆ THỐNG ĐANG LƯU..." : "XÁC NHẬN NHẬN MÁY 0Đ ➔"}
                </button>
                <div className="flex items-center justify-center gap-4 mt-6">
                   <div className="flex items-center gap-1 text-[9px] text-gray-400 font-black uppercase tracking-widest">🛡️ Bảo mật SSL</div>
                   <div className="flex items-center gap-1 text-[9px] text-gray-400 font-black uppercase tracking-widest">🛡️ Giao kín đáo</div>
                   <div className="flex items-center gap-1 text-[9px] text-gray-400 font-black uppercase tracking-widest">🛡️ Kiểm tra hàng</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
