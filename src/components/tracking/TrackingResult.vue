<script setup lang="ts">
import { computed } from 'vue';
import type { UnifiedTrackingData } from '@/types/tracking';
import TrackingStatus from './TrackingStatus.vue';
import ShippingInfo from './ShippingInfo.vue';
import TrackingTimeline from './TrackingTimeline.vue';
import { getCarrierName } from '@/utils/helpers';

interface Props {
  data: UnifiedTrackingData;
}

const props = defineProps<Props>();

const carrierDisplay = computed(() => getCarrierName(props.data.carrier));

const hasShippingInfo = computed(() => props.data.sender || props.data.receiver);

const hasTrackingHistory = computed(
  () => props.data.tracking_history && props.data.tracking_history.length > 0,
);
</script>

<template>
  <div class="max-w-5xl mx-auto mt-12 space-y-6">
    <!-- Carrier Header -->
    <div class="card-elevated p-6 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="background-color: var(--color-accent)">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <p class="text-sm font-semibold uppercase tracking-wide mb-2" style="color: var(--color-text-muted)">
        Carrier
      </p>
      <h3 class="text-3xl md:text-4xl font-bold mb-3" style="color: var(--color-text-primary)">
        {{ carrierDisplay }}
      </h3>
      <p class="text-lg font-mono font-semibold mb-2" style="color: var(--color-text-secondary)">
        {{ data.tracking_number }}
      </p>
      <p v-if="data.order_code" class="text-sm" style="color: var(--color-text-muted)">
        Order: {{ data.order_code }}
      </p>
    </div>

    <!-- Status Section -->
    <TrackingStatus :data="data" />

    <!-- Shipping Info -->
    <ShippingInfo v-if="hasShippingInfo" :sender="data.sender" :receiver="data.receiver" />

    <!-- Timeline -->
    <TrackingTimeline v-if="hasTrackingHistory" :events="data.tracking_history" />

    <!-- No History Message -->
    <div v-else class="card-flat p-8 text-center">
      <svg class="w-16 h-16 mx-auto mb-4" style="color: var(--color-text-muted)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-base" style="color: var(--color-text-secondary)">No tracking history available yet</p>
    </div>
  </div>
</template>
