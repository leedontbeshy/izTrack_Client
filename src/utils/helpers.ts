/**
 * Helper functions và constants
 */

import type { TrackingStatus } from '@/types/tracking';

/**
 * Mapping tên hiển thị của carrier
 */
export const CARRIER_NAMES: Record<string, string> = {
  GHN: 'Giao Hàng Nhanh',
  JT_EXPRESS: 'J&T Express',
  SPX: 'Shopee Express',
  GHTK: 'Giao Hàng Tiết Kiệm',
};

/**
 * Mapping màu sắc cho status badge
 */
export const STATUS_COLORS: Record<TrackingStatus, string> = {
  pending: 'bg-yellow-500',
  picked_up: 'bg-blue-400',
  in_transit: 'bg-blue-500',
  out_for_delivery: 'bg-yellow-400',
  delivered: 'bg-green-500',
  failed: 'bg-red-500',
  returned: 'bg-red-400',
  cancelled: 'bg-gray-500',
  exception: 'bg-orange-500',
};

/**
 * Mapping label tiếng Việt cho status
 */
export const STATUS_LABELS: Record<TrackingStatus, string> = {
  pending: 'Chờ lấy hàng',
  picked_up: 'Đã lấy hàng',
  in_transit: 'Đang vận chuyển',
  out_for_delivery: 'Đang giao hàng',
  delivered: 'Đã giao hàng',
  failed: 'Giao thất bại',
  returned: 'Đã hoàn trả',
  cancelled: 'Đã hủy',
  exception: 'Có vấn đề',
};

/**
 * Error messages trong tiếng Việt
 */
export const ERROR_MESSAGES: Record<string, string> = {
  INVALID_TRACKING_CODE: 'Mã vận đơn không hợp lệ. Vui lòng kiểm tra lại.',
  CARRIER_NOT_DETECTED: 'Không thể xác định đơn vị vận chuyển. Vui lòng thử lại.',
  NETWORK_ERROR: 'Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.',
  SERVER_ERROR: 'Lỗi server. Vui lòng thử lại sau.',
  NOT_FOUND: 'Không tìm thấy thông tin vận đơn.',
  CELLPHONE_REQUIRED: 'Vui lòng nhập 4 số cuối số điện thoại người nhận.',
};

/**
 * Format date/time theo định dạng người dùng
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return dateString;
  }
}

/**
 * Format date only
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
}

/**
 * Format time only
 */
export function formatTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  } catch {
    return dateString;
  }
}

/**
 * Get carrier display name
 */
export function getCarrierName(carrier: string): string {
  return CARRIER_NAMES[carrier] || carrier;
}

/**
 * Get status color
 */
export function getStatusColor(status: TrackingStatus): string {
  return STATUS_COLORS[status] || 'bg-gray-500';
}

/**
 * Get status label
 */
export function getStatusLabel(status: TrackingStatus): string {
  return STATUS_LABELS[status] || status;
}

/**
 * Get error message
 */
export function getErrorMessage(errorCode: string): string {
  return ERROR_MESSAGES[errorCode] || 'Đã xảy ra lỗi không xác định';
}
