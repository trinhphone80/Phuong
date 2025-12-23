
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Countdown from './components/Countdown';
import OrderForm from './components/OrderForm';
import HealthAssistant from './components/HealthAssistant';
import AdminDashboard from './components/AdminDashboard';
import ProductGallery from './components/ProductGallery';
import { Order, AppConfig } from './types';
import { IMAGES, CONTACT } from './constants';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aicare_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('aicare_config');
    return saved ? JSON.parse(saved) : {
      heroImageUrl: IMAGES.hero,
      specsImageUrl: IMAGES.specs,
      thumbImageUrl: IMAGES.thumb,
      galleryImageUrls: IMAGES.gallery,
      googleSheetUrl: '', // Mặc định trống
    };
  });
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<{name: string, loc: string} | null>(null);

  useEffect(() => {
    localStorage.setItem('aicare_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aicare_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    const names = ["Chị Lan", "Anh Tuấn", "Cô Hạnh", "Chú Bình", "Bác Nam", "Chị Mai", "Anh Hoàng", "Cô Thảo"];
    const locs = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Bình Dương", "Nghệ An"];
    
    const triggerNotification = () => {
      setLastNotification({
        name: names[Math.floor(Math.random() * names.length)],
        loc: locs[Math.floor(Math.random() * locs.length)]
      });
      setTimeout(() => setLastNotification(null), 4000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) triggerNotification();
    }, 15000);
    
    const timeout = setTimeout(triggerNotification, 3000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const handleOrderSuccess = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
    setShowSuccess(order.name);
  }, []);

  const clearOrders = useCallback(() => {
    if (window.confirm('Xóa toàn bộ đơn hàng?')) setOrders([]);
  }, []);

  const updateConfig = useCallback((newConfig: AppConfig) => {
    setConfig(newConfig);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform origin-top translate-x-1/2 -z-10"></div>
        <div className="absolute top-40 left-10 w-64 h-64 bg-red-100/30 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-3/5 space-y-8 animate-fadeIn text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-red-50 text-red-600 px-6 py-2 rounded-full text-sm font-black tracking-widest border border-red-200 shadow-sm mx-auto lg:mx-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                CHIẾN DỊCH VÌ SỨC KHỎE CỘNG ĐỒNG
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-blue-600 uppercase tracking-[0.3em]">Đức Phương Medical Trân Trọng</h2>
                <div className="relative">
                  <h1 className="text-5xl md:text-8xl font-black leading-tight text-gray-900">
                    TẶNG MÁY <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 italic">AICARE W33</span>
                  </h1>
                  <div className="mt-4 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4">
                    <span className="text-3xl md:text-4xl font-bold text-gray-400 uppercase">GIÁ ĐẶC BIỆT:</span>
                    <span className="text-7xl md:text-9xl font-black text-red-600 drop-shadow-[0_10px_20px_rgba(220,38,38,0.3)] animate-pulse">
                      0 ĐỒNG
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                Cơ hội sở hữu máy đo đường huyết chuẩn bệnh viện mà <span className="text-red-600 font-bold underline underline-offset-4">không mất phí mua máy</span>. Chúng tôi muốn giúp 1 triệu người Việt kiểm soát tiểu đường tốt hơn.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto lg:mx-0">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🎁</div>
                  <div>
                    <div className="font-black text-gray-800 text-sm">Bộ Quà Tặng 499k</div>
                    <div className="text-xs text-gray-500">Que thử, Kim, Bút lấy máu</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">📚</div>
                  <div>
                    <div className="font-black text-gray-800 text-sm">2 Ebook Sức Khỏe</div>
                    <div className="text-xs text-gray-500">Hướng dẫn ăn uống & tập luyện</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">🛡️</div>
                  <div>
                    <div className="font-black text-gray-800 text-sm">Bảo Hành Trọn Đời</div>
                    <div className="text-xs text-gray-500">Lỗi 1 đổi 1 tận nhà</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">🚚</div>
                  <div>
                    <div className="font-black text-gray-800 text-sm">Ship Quà Toàn Quốc</div>
                    <div className="text-xs text-gray-500">Phí ship & xử lý chỉ 70k</div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a href="#order-form" className="inline-block w-full md:w-auto text-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black py-6 px-16 rounded-[2rem] text-2xl shadow-[0_20px_40px_rgba(220,38,38,0.25)] transition transform hover:-translate-y-2 active:scale-95 shaking-element">
                  NHẬN MÁY 0Đ NGAY
                  <div className="text-xs font-normal opacity-80 mt-1 uppercase tracking-widest">Giao quà tận nơi - Kiểm tra rồi nhận</div>
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-2/5">
              <div className="relative p-4">
                <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 -z-10 opacity-10"></div>
                <div className="relative rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-8 border-white group">
                  <img src={config.heroImageUrl} alt="AICARE W33" className="w-full h-auto object-cover transition duration-1000 group-hover:scale-105" />
                  <div className="absolute top-6 right-6 bg-red-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-black text-center animate-pulse border-2 border-white/50">
                    TẶNG<br/>0Đ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem icon="👨‍👩‍👧‍👦" num="15.200+" label="Khách hàng tin cậy" />
            <StatItem icon="✅" num="100%" label="Chính hãng AICARE" />
            <StatItem icon="📍" num="63" label="Tỉnh thành hỗ trợ" />
            <StatItem icon="⭐" num="4.9/5" label="Đánh giá hài lòng" />
          </div>
        </div>
      </section>

      <Countdown />

      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
             <div className="w-full lg:w-1/2 relative">
                <div className="absolute -z-10 w-[120%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                <img src={config.specsImageUrl} alt="Thông số máy" className="rounded-[3rem] shadow-2xl border-4 border-white relative z-10" />
             </div>
             <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Thông số chuyên sâu</div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">CÔNG NGHỆ ĐO <br/><span className="text-blue-600 underline decoration-red-500">CHÍNH XÁC NHẤT</span></h2>
                <div className="space-y-4">
                   <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-start gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0">⏱️</div>
                      <div>
                        <h4 className="font-black text-gray-800 text-lg">Kết quả sau 5 giây</h4>
                        <p className="text-gray-500 text-sm">Tiết kiệm thời gian, cho kết quả cực nhanh với độ sai số thấp nhất.</p>
                      </div>
                   </div>
                   <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-start gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0">💧</div>
                      <div>
                        <h4 className="font-black text-gray-800 text-lg">Mẫu máu cực nhỏ (0.7µL)</h4>
                        <p className="text-gray-500 text-sm">Không gây đau đớn khi lấy máu, tự động hút máu vào que thử.</p>
                      </div>
                   </div>
                   <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-start gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0">📺</div>
                      <div>
                        <h4 className="font-black text-gray-800 text-lg">Màn hình LCD cực lớn</h4>
                        <p className="text-gray-500 text-sm">Hiển thị số to, rõ ràng, phù hợp cho người cao tuổi mắt kém.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <ProductGallery images={config.galleryImageUrls} />

      <OrderForm 
        onOrderSuccess={handleOrderSuccess} 
        thumbUrl={config.thumbImageUrl} 
        googleSheetUrl={config.googleSheetUrl} // Truyền URL xuống form
      />

      <footer className="bg-gray-950 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <img src={IMAGES.logo} alt="Logo" className="h-16 invert grayscale brightness-200" />
              <h3 className="font-black text-2xl uppercase tracking-tighter text-red-500">ĐỨC PHƯƠNG MEDICAL</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Chúng tôi là đơn vị tiên phong trong việc cung cấp các giải pháp chăm sóc sức khỏe tại nhà cho bệnh nhân tiểu đường tại Việt Nam. Cam kết chất lượng và sự tận tâm.
              </p>
            </div>
            <div className="space-y-8">
              <h4 className="font-black text-lg uppercase tracking-widest border-l-4 border-red-600 pl-4">Thông tin liên hệ</h4>
              <div className="space-y-4 text-gray-400 text-sm">
                <p className="flex items-start gap-3">
                  <span className="text-blue-500">📍</span> 
                  {CONTACT.address}
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-blue-500">🏪</span> 
                  {CONTACT.showroom}
                </p>
                <p className="flex items-center gap-3 text-white font-black text-2xl pt-2">
                  <span className="text-red-500">📞</span> 
                  {CONTACT.phone}
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <h4 className="font-black text-lg uppercase tracking-widest border-l-4 border-red-600 pl-4">Chính sách</h4>
              <ul className="space-y-3 text-gray-400 text-sm font-medium">
                <li className="hover:text-white transition cursor-pointer">🛡️ Chính sách bảo hành trọn đời</li>
                <li className="hover:text-white transition cursor-pointer">🚚 Chính sách giao hàng & kiểm tra</li>
                <li className="hover:text-white transition cursor-pointer">🔒 Bảo mật thông tin khách hàng</li>
                <li className="hover:text-white transition cursor-pointer">↩️ Chính sách đổi trả 1-1</li>
              </ul>
              <button onClick={() => setIsAdminOpen(true)} className="text-[10px] text-gray-700 hover:text-gray-500 font-bold uppercase tracking-widest transition">Hệ thống quản trị</button>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-gray-900 text-center text-[11px] text-gray-600 font-bold uppercase tracking-widest">
            &copy; 2024 Đức Phương Medical. All rights reserved. Designed for Health.
          </div>
        </div>
      </footer>

      <HealthAssistant />
      {isAdminOpen && (
        <AdminDashboard 
          orders={orders} 
          onClose={() => setIsAdminOpen(false)} 
          onClear={clearOrders}
          config={config}
          onUpdateConfig={updateConfig}
        />
      )}

      {lastNotification && (
        <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/50 z-50 flex items-center gap-4 max-w-xs animate-slideInRight">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📦</div>
          <div>
            <div className="text-[10px] text-red-600 font-black uppercase tracking-wider">Đã đăng ký máy 0đ</div>
            <div className="text-sm font-black text-gray-900 leading-none mb-1">{lastNotification.name} - {lastNotification.loc}</div>
            <div className="text-[10px] text-gray-400 italic">Vừa xong • Chúc mừng bác!</div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-scaleUp border-8 border-green-50">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-xl shadow-green-200">✓</div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-tight">ĐĂNG KÝ <br/><span className="text-green-600">THÀNH CÔNG!</span></h3>
            <p className="text-gray-600 mb-10 leading-relaxed font-medium">
              Chào <span className="text-red-600 font-black">{showSuccess}</span>, bạn đã nhận được suất quà tặng máy AICARE W33 giá 0đ. Đức Phương Medical sẽ gọi điện sớm nhất để xác nhận địa chỉ.
            </p>
            <button onClick={() => setShowSuccess(null)} className="w-full bg-gray-900 text-white font-black py-5 rounded-[2rem] text-xl shadow-2xl active:scale-95 transition hover:bg-black">
              CẢM ƠN NHIỀU!
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg p-5 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] md:hidden z-40 flex items-center justify-between border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 line-through">GIÁ: 499.000Đ</span>
          <span className="text-3xl font-black text-red-600 leading-none">0 ĐỒNG</span>
          <span className="text-[10px] font-bold text-blue-600">SHIP QUÀ TẬN NHÀ</span>
        </div>
        <a href="#order-form" className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-red-200 active:scale-95 transition uppercase text-sm tracking-widest">
          NHẬN QUÀ NGAY
        </a>
      </div>
    </div>
  );
};

const StatItem = ({icon, num, label}: {icon: string, num: string, label: string}) => (
  <div className="text-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500 group">
    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <div className="text-4xl font-black text-gray-900 mb-1">{num}</div>
    <div className="text-[11px] text-gray-400 font-black uppercase tracking-widest">{label}</div>
  </div>
);

export default App;
