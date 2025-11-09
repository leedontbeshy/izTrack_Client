/**
 * Composable for tracking functionality
 * Manages state and API calls for package tracking
 */

import { ref, computed } from 'vue';
import type { UnifiedTrackingData, ApiResponse } from '@/types/tracking';
import { trackingApi } from '@/services/api';

export function useTracking() {
  // State
  const trackingData = ref<UnifiedTrackingData | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const suggestedCarriers = ref<string[]>([]);
  const requiresPhone = ref(false);
  const externalUrl = ref<string | null>(null);

  // Computed
  const hasData = computed(() => trackingData.value !== null);
  const hasError = computed(() => error.value !== null);
  const hasSuggestions = computed(() => suggestedCarriers.value.length > 0);

  /**
   * Track a package by tracking code
   * Supports both auto-detect and manual carrier selection
   */
  const trackPackage = async (trackingCode: string, cellphone?: string, carrier?: string) => {
    // Reset state
    isLoading.value = true;
    error.value = null;
    trackingData.value = null;
    suggestedCarriers.value = [];
    requiresPhone.value = false;
    externalUrl.value = null;

    try {
      const response: ApiResponse<UnifiedTrackingData> = await trackingApi.track(
        trackingCode,
        cellphone,
        carrier,
      );

      if (response.success && response.data) {
        trackingData.value = response.data;
        error.value = null;
      } else {
        error.value = response.error?.message || response.message || 'Không thể tra cứu đơn hàng';
        trackingData.value = null;

        // Handle suggestions and additional error info
        if (response.error?.possibleCarriers) {
          suggestedCarriers.value = response.error.possibleCarriers;
        }

        if (response.error?.requiresPhone) {
          requiresPhone.value = true;
        }

        if (response.error?.externalUrl) {
          externalUrl.value = response.error.externalUrl;
          // Auto-open external URL for unsupported carriers
          if (response.error?.code === 'CARRIER_NOT_SUPPORTED') {
            setTimeout(() => {
              window.open(response.error!.externalUrl!, '_blank', 'noopener,noreferrer');
            }, 1500); // Delay 1.5s để user đọc message
          }
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định';
      trackingData.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Reset all state to initial values
   */
  const reset = () => {
    trackingData.value = null;
    error.value = null;
    isLoading.value = false;
    suggestedCarriers.value = [];
    requiresPhone.value = false;
    externalUrl.value = null;
  };

  /**
   * Retry tracking with a specific carrier (used from suggestions)
   */
  const retryWithCarrier = (carrier: string) => {
    // Get the last tracking code from error state (if available)
    // For now, we'll need to track the last tracking code
    // This is a simplified implementation - in production you might want to store lastTrackingCode
    console.log('Retry with carrier:', carrier);
    // The TrackingForm will handle the actual retry by calling trackPackage again
  };

  /**
   * Open external tracking URL in new tab
   */
  const openExternalUrl = () => {
    if (externalUrl.value) {
      window.open(externalUrl.value, '_blank', 'noopener,noreferrer');
    }
  };

  return {
    // State
    trackingData,
    isLoading,
    error,
    suggestedCarriers,
    requiresPhone,
    externalUrl,

    // Computed
    hasData,
    hasError,
    hasSuggestions,

    // Methods
    trackPackage,
    reset,
    retryWithCarrier,
    openExternalUrl,
  };
}
