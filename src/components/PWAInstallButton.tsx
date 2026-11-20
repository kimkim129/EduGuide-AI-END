import { useState } from 'react';
import { Download, Share, PlusSquare, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
  fullWidth?: boolean;
}

export default function PWAInstallButton({
  compact = false,
  fullWidth = false,
}: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Ẩn nút cài đặt khi đang mở dưới dạng ứng dụng đã cài (standalone)
  if (isInstalled) {
    return null;
  }

  // Luồng cài đặt trực tiếp trên Android (Chrome / Edge / Samsung Internet) & Desktop Chromium
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1565C0] hover:bg-blue-800 active:scale-[0.98] text-white font-bold shadow-xs transition-all cursor-pointer shrink-0 ${
          compact
            ? 'min-h-[40px] px-2.5 py-1.5 text-xs'
            : 'min-h-[44px] px-3.5 py-2 text-xs sm:text-sm'
        } ${fullWidth ? 'w-full' : ''}`}
        aria-label="Cài ứng dụng EduGuide AI lên màn hình chính"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{compact ? 'Cài app' : 'Cài ứng dụng'}</span>
      </button>
    );
  }

  // Luồng hướng dẫn thêm vào màn hình chính trên iPhone / iPad qua Safari
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 active:scale-[0.98] text-[#1565C0] border border-blue-200 font-bold transition-all cursor-pointer shrink-0 ${
            compact
              ? 'min-h-[40px] px-2.5 py-1.5 text-xs'
              : 'min-h-[44px] px-3.5 py-2 text-xs sm:text-sm'
          } ${fullWidth ? 'w-full' : ''}`}
          aria-label="Hướng dẫn cài EduGuide AI trên iPhone"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>{compact ? 'Cài iOS' : 'Thêm vào MH chính'}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/55 backdrop-blur-xs p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-guide-title"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-5 shadow-2xl space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/apple-touch-icon.png"
                    alt="EduGuide AI"
                    className="w-11 h-11 rounded-xl border border-slate-200 shadow-xs shrink-0"
                  />
                  <div>
                    <h3
                      id="ios-install-guide-title"
                      className="text-base font-extrabold text-slate-950 leading-tight"
                    >
                      Cài EduGuide AI trên iPhone
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      Sử dụng trình duyệt Safari để thêm nhanh
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="min-h-[36px] min-w-[36px] rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                  aria-label="Đóng hướng dẫn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ol className="space-y-3 text-sm text-slate-800">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-[#1565C0] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="leading-relaxed">
                    Nhấn biểu tượng{' '}
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 font-bold text-[#1565C0] text-xs align-middle">
                      <Share className="w-3.5 h-3.5" />
                      Chia sẻ
                    </span>{' '}
                    ở thanh công cụ phía dưới của Safari.
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-[#1565C0] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="leading-relaxed">
                    Cuộn xuống và chọn{' '}
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-900 text-xs align-middle">
                      <PlusSquare className="w-3.5 h-3.5 text-[#1565C0]" />
                      Thêm vào MH chính
                    </span>{' '}
                    (Add to Home Screen).
                  </div>
                </li>

                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-[#1565C0] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="leading-relaxed">
                    Nhấn <strong>Thêm</strong> ở góc trên bên phải để đặt biểu tượng{' '}
                    <strong>EduGuide AI</strong> lên màn hình chính.
                  </div>
                </li>
              </ol>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full min-h-[44px] rounded-xl bg-[#1565C0] hover:bg-blue-800 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
