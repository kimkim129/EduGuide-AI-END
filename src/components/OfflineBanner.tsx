import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-md z-50 flex items-start gap-2.5 rounded-xl bg-amber-600 text-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg border border-amber-500/70"
    >
      <WifiOff className="w-4 h-4 shrink-0 mt-0.5" />
      <span className="leading-snug">
        Mất kết nối Internet — Vui lòng kết nối mạng để tải dữ liệu khảo sát, tra cứu ngành học và lưu kết quả tư vấn.
      </span>
    </div>
  );
}
