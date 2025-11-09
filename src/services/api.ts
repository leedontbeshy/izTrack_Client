// API service layer for tracking functionality
/* globals fetch, URLSearchParams */

import type { UnifiedTrackingData, ApiResponse } from '@/types/tracking';
import { auth } from './firebase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Get auth headers with Firebase token
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn('Failed to get auth token:', error);
  }

  return headers;
}

export const trackingApi = {
  /**
   * Auto-detect carrier and track package
   * @param trackingCode - The tracking code to search for
   * @param cellphone - Optional 4-digit cellphone number (required for J&T Express)
   * @param carrier - Optional carrier selection for manual override
   * @returns Promise with unified tracking data
   */
  async track(
    trackingCode: string,
    cellphone?: string,
    carrier?: string,
  ): Promise<ApiResponse<UnifiedTrackingData>> {
    try {
      const params = new URLSearchParams();
      if (cellphone) {
        params.append('cellphone', cellphone);
      }
      if (carrier) {
        params.append('carrier', carrier);
      }

      const url = `${API_BASE_URL}/api/tracking/${trackingCode}${
        params.toString() ? `?${params.toString()}` : ''
      }`;

      const headers = await getAuthHeaders();

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message,
          error: errorData.error || {
            code: `HTTP_${response.status}`,
            message: `HTTP error! status: ${response.status}`,
          },
        };
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  },

  /**
   * Track with specific carrier
   * @param carrier - The carrier to use (ghn, jtexpress, spx)
   * @param trackingCode - The tracking code to search for
   * @param cellphone - Optional 4-digit cellphone number (required for J&T Express)
   * @returns Promise with unified tracking data
   */
  async trackByCarrier(
    carrier: 'ghn' | 'jtexpress' | 'spx',
    trackingCode: string,
    cellphone?: string,
  ): Promise<ApiResponse<UnifiedTrackingData>> {
    try {
      const params = new URLSearchParams();
      if (cellphone) {
        params.append('cellphone', cellphone);
      }

      const url = `${API_BASE_URL}/api/tracking/${carrier}/${trackingCode}${
        params.toString() ? `?${params.toString()}` : ''
      }`;

      const headers = await getAuthHeaders();

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message,
          error: errorData.error || {
            code: `HTTP_${response.status}`,
            message: `HTTP error! status: ${response.status}`,
          },
        };
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      };
    }
  },
};
