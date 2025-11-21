<script setup lang="ts">
type CarrierCallback = (_carrier: string) => void;

interface Props {
  suggestedCarriers: string[];
  requiresPhone: boolean;
  externalUrl: string | null;
  onRetryWithCarrier: CarrierCallback;
  onOpenExternal: () => void;
}

defineProps<Props>();

const carrierLabels: Record<string, { name: string; icon: string }> = {
  GHN: { name: 'GHN - Giao Hang Nhanh', icon: '🚚' },
  SPX: { name: 'SPX - Shopee Express', icon: '📦' },
  LEX: { name: 'LEX - LEX Vietnam', icon: '✈️' },
  JT_EXPRESS: { name: 'J&T Express', icon: '🎯' },
  GHTK: { name: 'GHTK - Giao Hang Tiet Kiem', icon: '💼' },
  BEST_EXPRESS: { name: 'Best Express', icon: '⚡' },
};

const getCarrierInfo = (carrier: string) => {
  return carrierLabels[carrier] || { name: carrier, icon: '📦' };
};
</script>

<template>
  <div class="max-w-3xl mx-auto mt-8">
    <div class="suggestion-card">
      <div class="flex items-start gap-4 mb-6">
        <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #fef3c7">
          <span class="text-2xl">💡</span>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold mb-2" style="color: var(--color-text-primary)">
            Manual Carrier Selection Required
          </h3>
          <p class="text-base" style="color: var(--color-text-secondary)">
            We couldn't automatically detect your carrier. Please select one manually.
          </p>
        </div>
      </div>

      <div v-if="requiresPhone" class="warning-banner mb-6">
        <div class="flex items-center gap-3">
          <span class="text-xl">⚠️</span>
          <div>
            <p class="font-semibold" style="color: var(--color-warning)">Phone Number Required</p>
            <p class="text-sm mt-1" style="color: var(--color-text-secondary)">
              Please enter the last 4 digits of the receiver's phone number
            </p>
          </div>
        </div>
      </div>

      <div v-if="externalUrl" class="info-banner mb-6">
        <div class="flex items-start gap-3">
          <span class="text-xl flex-shrink-0">ℹ️</span>
          <div class="flex-1">
            <p class="font-semibold mb-2" style="color: var(--color-info)">External Tracking Available</p>
            <p class="text-sm mb-3" style="color: var(--color-text-secondary)">
              This carrier requires tracking on their official website
            </p>
            <button
              class="external-btn"
              @click="onOpenExternal"
            >
              Open Official Tracking Page
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="suggestedCarriers.length > 0">
        <h4 class="text-sm font-semibold mb-4" style="color: var(--color-text-primary)">
          Select Your Carrier
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="carrier in suggestedCarriers"
            :key="carrier"
            class="carrier-suggestion-btn"
            @click="onRetryWithCarrier(carrier)"
          >
            <span class="text-2xl mr-3">{{ getCarrierInfo(carrier).icon }}</span>
            <span class="font-medium">{{ getCarrierInfo(carrier).name }}</span>
            <svg class="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.suggestion-card {
  background-color: var(--color-secondary-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

.warning-banner {
  background-color: #fef3c7;
  border: 2px solid #fbbf24;
  border-radius: var(--radius-md);
  padding: 1rem;
}

.info-banner {
  background-color: #e0f2fe;
  border: 2px solid #0ea5e9;
  border-radius: var(--radius-md);
  padding: 1rem;
}

.carrier-suggestion-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-secondary-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  color: var(--color-text-primary);
  font-size: 0.9375rem;
}

.carrier-suggestion-btn:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.external-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  background-color: var(--color-info);
  color: white;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
}

.external-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}
</style>
