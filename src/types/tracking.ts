/**
 * Unified Tracking Data Types
 * Định nghĩa cấu trúc dữ liệu thống nhất cho tất cả đơn vị vận chuyển
 * Đồng bộ với server types
 */

/**
 * Trạng thái đơn hàng chuẩn hóa
 */
export type TrackingStatus =
  | 'pending' // Chờ lấy hàng
  | 'picked_up' // Đã lấy hàng
  | 'in_transit' // Đang vận chuyển
  | 'out_for_delivery' // Đang giao hàng
  | 'delivered' // Đã giao hàng
  | 'failed' // Giao hàng thất bại
  | 'returned' // Đã hoàn trả
  | 'cancelled' // Đã hủy
  | 'exception'; // Có vấn đề

/**
 * Constants cho TrackingStatus
 */
export const TrackingStatusValues = {
  PENDING: 'pending' as const,
  PICKED_UP: 'picked_up' as const,
  IN_TRANSIT: 'in_transit' as const,
  OUT_FOR_DELIVERY: 'out_for_delivery' as const,
  DELIVERED: 'delivered' as const,
  FAILED: 'failed' as const,
  RETURNED: 'returned' as const,
  CANCELLED: 'cancelled' as const,
  EXCEPTION: 'exception' as const,
};

/**
 * Thông tin địa chỉ
 */
export interface AddressInfo {
  full_address: string;
  ward?: string;
  district?: string;
  province?: string;
  warehouse_name?: string;
}

/**
 * Thông tin người thực hiện
 */
export interface ExecutorInfo {
  name?: string;
  phone?: string;
}

/**
 * Lịch sử theo dõi đơn hàng
 */
export interface TrackingEvent {
  timestamp: string; // ISO 8601 format
  status: string; // Trạng thái gốc
  status_code?: string; // Mã trạng thái
  description: string; // Mô tả chi tiết
  location?: AddressInfo; // Vị trí hiện tại
  next_location?: AddressInfo; // Vị trí tiếp theo
  executor?: ExecutorInfo; // Người thực hiện
}

/**
 * Thông tin người gửi/nhận
 */
export interface PersonInfo {
  name: string;
  phone: string;
  address: string;
}

/**
 * Thông tin thời gian dự kiến
 */
export interface EstimatedTime {
  pickup_time?: string; // Thời gian lấy hàng dự kiến
  delivery_time_from?: string; // Thời gian giao hàng dự kiến (từ)
  delivery_time_to?: string; // Thời gian giao hàng dự kiến (đến)
  actual_pickup_time?: string; // Thời gian lấy hàng thực tế
  actual_delivery_time?: string; // Thời gian giao hàng thực tế
}

/**
 * Cấu trúc dữ liệu thống nhất cho tracking
 */
export interface UnifiedTrackingData {
  // Metadata
  carrier: 'GHN' | 'JT_EXPRESS' | 'SPX'; // Đơn vị vận chuyển
  tracking_number: string; // Mã vận đơn
  crawled_at: string; // Thời gian crawl dữ liệu (ISO 8601)

  // Trạng thái hiện tại
  current_status: TrackingStatus; // Trạng thái chuẩn hóa
  current_status_text: string; // Trạng thái dạng text gốc
  current_description: string; // Mô tả trạng thái hiện tại
  last_updated: string; // Thời gian cập nhật cuối cùng (ISO 8601)

  // Thông tin đơn hàng
  order_code?: string; // Mã đơn hàng của shop/khách hàng
  sender?: PersonInfo; // Thông tin người gửi
  receiver?: PersonInfo; // Thông tin người nhận
  estimated_time?: EstimatedTime; // Thời gian dự kiến

  // Lịch sử theo dõi (sắp xếp từ mới nhất đến cũ nhất)
  tracking_history: TrackingEvent[];

  // Dữ liệu gốc (optional, để debug)
  raw_data?: unknown;
}

/**
 * Response trả về từ API
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    possibleCarriers?: string[];
    suggestedCarrier?: string;
    requiresPhone?: boolean;
    externalUrl?: string;
  };
}

/**
 * Type alias cho API Response của tracking
 */
export type TrackingResponse = ApiResponse<UnifiedTrackingData>;
