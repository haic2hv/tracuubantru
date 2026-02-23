/**
 * Student boarding information structure
 * Maps to Google Sheets columns B-N
 */
export interface StudentInfo {
  name: string;              // Column B: Họ và tên
  class: string;             // Column C: Lớp
  meals: number | string;    // Column D: Số bữa
  mealCost: number | string; // Column E: Tiền ăn
  serviceFee: number | string;     // Column F: Chi phí phục vụ
  initialCost: number | string;    // Column G: Chi phí ban đầu
  additionalCost: number | string; // Column H: Chi phí bổ sung
  electricityCost: number | string; // Column I: Tiền điện điều hòa
  totalCost: number | string;      // Column J: Tổng tiền
  notes: string;             // Column K: Ghi chú
  qrCode?: string;           // Column N: QRCode (URL to QR image)
}

/**
 * API search request
 */
export interface SearchRequest {
  name?: string;
  class?: string;
}

/**
 * API search response
 */
export interface SearchResponse {
  success: boolean;
  data?: StudentInfo[];
  error?: string;
  message?: string;
}
